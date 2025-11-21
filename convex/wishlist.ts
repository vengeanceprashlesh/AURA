import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get user's wishlist
export const getWishlist = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const wishlistItems = await ctx.db
      .query("wishlist")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    // Fetch product details
    const wishlistWithProducts = await Promise.all(
      wishlistItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return { ...item, product };
      })
    );

    return wishlistWithProducts;
  },
});

// Add to wishlist
export const addToWishlist = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    // Check if already in wishlist
    const existing = await ctx.db
      .query("wishlist")
      .withIndex("by_user_product", (q) =>
        q.eq("userId", args.userId).eq("productId", args.productId)
      )
      .first();

    if (existing) {
      throw new Error("Product already in wishlist");
    }

    const wishlistId = await ctx.db.insert("wishlist", {
      userId: args.userId,
      productId: args.productId,
      addedAt: Date.now(),
    });

    return wishlistId;
  },
});

// Remove from wishlist
export const removeFromWishlist = mutation({
  args: { id: v.id("wishlist") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Check if product is in wishlist
export const isInWishlist = query({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("wishlist")
      .withIndex("by_user_product", (q) =>
        q.eq("userId", args.userId).eq("productId", args.productId)
      )
      .first();

    return !!item;
  },
});
