import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get user's cart
export const getCart = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Fetch product details for each cart item
    const cartWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          ...item,
          product,
        };
      })
    );

    return cartWithProducts;
  },
});

// Add item to cart
export const addToCart = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
    selectedSize: v.optional(v.string()),
    selectedColor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if product exists and is in stock
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (!product.inStock) {
      throw new Error("Product is out of stock");
    }

    // Check if item already exists in cart
    const existingItem = await ctx.db
      .query("cart")
      .withIndex("by_user_product", (q) =>
        q.eq("userId", args.userId).eq("productId", args.productId)
      )
      .filter((q) => {
        let filter = q.eq(q.field("userId"), args.userId);
        filter = q.and(filter, q.eq(q.field("productId"), args.productId));
        
        if (args.selectedSize) {
          filter = q.and(filter, q.eq(q.field("selectedSize"), args.selectedSize));
        }
        if (args.selectedColor) {
          filter = q.and(filter, q.eq(q.field("selectedColor"), args.selectedColor));
        }
        
        return filter;
      })
      .first();

    const now = Date.now();

    if (existingItem) {
      // Update quantity if item exists
      await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
        updatedAt: now,
      });
      return existingItem._id;
    } else {
      // Add new item
      const cartItemId = await ctx.db.insert("cart", {
        userId: args.userId,
        productId: args.productId,
        quantity: args.quantity,
        selectedSize: args.selectedSize,
        selectedColor: args.selectedColor,
        price: product.price,
        addedAt: now,
        updatedAt: now,
      });
      return cartItemId;
    }
  },
});

// Update cart item quantity
export const updateCartItem = mutation({
  args: {
    id: v.id("cart"),
    quantity: v.optional(v.number()),
    selectedSize: v.optional(v.string()),
    selectedColor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    if (updates.quantity !== undefined && updates.quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await ctx.db.delete(id);
      return id;
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

// Remove item from cart
export const removeFromCart = mutation({
  args: { id: v.id("cart") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Clear user's cart
export const clearCart = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));

    return { success: true, deletedCount: cartItems.length };
  },
});

// Get cart count
export const getCartCount = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
});

// Get cart total
export const getCartTotal = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
});
