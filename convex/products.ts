import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all products with optional filtering
export const getProducts = query({
  args: {
    category: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("products");

    if (args.category) {
      query = query.filter((q) => q.eq(q.field("category"), args.category));
    }

    if (args.featured !== undefined) {
      query = query.filter((q) => q.eq(q.field("featured"), args.featured));
    }

    if (args.search) {
      return await ctx.db
        .query("products")
        .withSearchIndex("search_products", (q) =>
          q.search("name", args.search!)
        )
        .collect();
    }

    const products = await query.collect();

    if (args.limit) {
      return products.slice(0, args.limit);
    }

    return products;
  },
});

// Get a single product by ID
export const getProduct = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get featured products
export const getFeaturedProducts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();

    if (args.limit) {
      return products.slice(0, args.limit);
    }

    return products;
  },
});

// Get products by category
export const getProductsByCategory = query({
  args: { 
    category: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();

    if (args.limit) {
      return products.slice(0, args.limit);
    }

    return products;
  },
});

// Add a new product
export const addProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    images: v.array(v.string()),
    category: v.string(),
    subcategory: v.optional(v.string()),
    tags: v.array(v.string()),
    inStock: v.boolean(),
    stockQuantity: v.number(),
    featured: v.optional(v.boolean()),
    brand: v.optional(v.string()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    // Skincare-specific data
    skincareData: v.optional(v.object({
      skinTypes: v.array(v.string()),
      concerns: v.array(v.string()),
      ageGroups: v.array(v.string()),
      keyIngredients: v.array(v.object({
        name: v.string(),
        concentration: v.optional(v.string()),
        purpose: v.string()
      })),
      applicationTime: v.array(v.string()),
      productType: v.string(),
      howToUse: v.array(v.string()),
      routineStep: v.number(),
      frequency: v.string(),
      volume: v.string(),
      isVegan: v.boolean(),
      isCrueltyFree: v.boolean(),
      isFragranceFree: v.boolean(),
      isHypoallergenic: v.boolean(),
      spfValue: v.optional(v.number()),
      fullDescription: v.string(),
      brand: v.string()
    })),
    // Optional variant support
    availableColors: v.optional(v.array(v.object({
      name: v.string(),
      value: v.string(),
      images: v.array(v.string()),
    }))),
    availableSizes: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const productId = await ctx.db.insert("products", {
      name: args.name,
      description: args.description,
      price: args.price,
      originalPrice: args.originalPrice,
      images: args.images,
      category: args.category,
      subcategory: args.subcategory,
      tags: args.tags,
      inStock: args.inStock,
      stockQuantity: args.stockQuantity,
      rating: args.rating || 0,
      reviewCount: args.reviewCount || 0,
      featured: args.featured || false,
      brand: args.brand,
      skincareData: args.skincareData,
      availableColors: args.availableColors,
      availableSizes: args.availableSizes,
      createdAt: now,
      updatedAt: now,
    });

    return productId;
  },
});

// Update a product
export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    originalPrice: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    subcategory: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    inStock: v.optional(v.boolean()),
    stockQuantity: v.optional(v.number()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

// Delete a product
export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Update product stock after purchase
export const updateProductStock = mutation({
  args: {
    id: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) throw new Error("Product not found");

    const newStockQuantity = product.stockQuantity - args.quantity;
    
    await ctx.db.patch(args.id, {
      stockQuantity: Math.max(0, newStockQuantity),
      inStock: newStockQuantity > 0,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Update product rating
export const updateProductRating = mutation({
  args: {
    productId: v.id("products"),
    newRating: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");

    const currentTotal = product.rating * product.reviewCount;
    const newReviewCount = product.reviewCount + 1;
    const newAverageRating = (currentTotal + args.newRating) / newReviewCount;

    await ctx.db.patch(args.productId, {
      rating: Math.round(newAverageRating * 10) / 10, // Round to 1 decimal
      reviewCount: newReviewCount,
      updatedAt: Date.now(),
    });

    return args.productId;
  },
});
