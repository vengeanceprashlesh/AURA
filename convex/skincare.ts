import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get skincare products with filtering
export const getSkincareProducts = query({
  args: {
    category: v.optional(v.string()),
    skinType: v.optional(v.string()),
    concern: v.optional(v.string()),
    priceRange: v.optional(v.object({
      min: v.number(),
      max: v.number()
    })),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("products");
    
    // Filter by main skincare category
    query = query.filter((q) => q.eq(q.field("category"), "skincare"));
    
    // Filter by subcategory (skincare category)
    if (args.category) {
      query = query.filter((q) => q.eq(q.field("subcategory"), args.category));
    }
    
    // Filter by featured status
    if (args.featured !== undefined) {
      query = query.filter((q) => q.eq(q.field("featured"), args.featured));
    }
    
    // Filter by price range
    if (args.priceRange) {
      query = query.filter((q) => 
        q.gte(q.field("price"), args.priceRange!.min) &&
        q.lte(q.field("price"), args.priceRange!.max)
      );
    }
    
    // Get results
    let results = await query.collect();
    
    // Additional filtering for skincare-specific fields (stored in tags or custom fields)
    if (args.skinType) {
      results = results.filter(product => 
        product.tags?.includes(args.skinType!) ||
        (product as any).skincareData?.skinTypes?.includes(args.skinType!)
      );
    }
    
    if (args.concern) {
      results = results.filter(product =>
        product.tags?.includes(args.concern!) ||
        (product as any).skincareData?.concerns?.includes(args.concern!)
      );
    }
    
    // Apply limit
    if (args.limit) {
      results = results.slice(0, args.limit);
    }
    
    return results;
  },
});

// Add skincare product with extended data
export const addSkincareProduct = mutation({
  args: {
    name: v.string(),
    brand: v.string(),
    description: v.string(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    images: v.array(v.string()),
    stockQuantity: v.number(),
    featured: v.boolean(),
    
    // Skincare-specific data
    skincareData: v.object({
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
      fullDescription: v.string()
    })
  },
  handler: async (ctx, args) => {
    const { skincareData, ...productData } = args;
    
    // Create the complete skincare data with brand from the main product data
    const completeSkincareData = {
      ...skincareData,
      brand: args.brand // Ensure brand is included in skincareData
    };
    
    const productId = await ctx.db.insert("products", {
      ...productData,
      category: "skincare",
      subcategory: skincareData.productType,
      tags: [
        ...skincareData.skinTypes,
        ...skincareData.concerns,
        skincareData.productType,
        ...(skincareData.isVegan ? ['vegan'] : []),
        ...(skincareData.isCrueltyFree ? ['cruelty-free'] : []),
        ...(skincareData.isFragranceFree ? ['fragrance-free'] : []),
        ...(skincareData.isHypoallergenic ? ['hypoallergenic'] : [])
      ],
      inStock: productData.stockQuantity > 0,
      rating: 4.5, // Default rating
      reviewCount: 0,
      // Store skincare-specific data
      skincareData: completeSkincareData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return productId;
  },
});

// Update skincare product
export const updateSkincareProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    brand: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    originalPrice: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
    stockQuantity: v.optional(v.number()),
    featured: v.optional(v.boolean()),
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
      fullDescription: v.string()
    }))
  },
  handler: async (ctx, args) => {
    const { id, skincareData, ...updates } = args;
    
    let updateData: any = {
      ...updates,
      updatedAt: Date.now(),
    };
    
    if (skincareData) {
      // Ensure brand is included in skincareData when updating
      const completeSkincareData = {
        ...skincareData,
        brand: updates.brand || args.brand || '' // Use updated brand or provided brand
      };
      
      updateData.skincareData = completeSkincareData;
      updateData.tags = [
        ...skincareData.skinTypes,
        ...skincareData.concerns,
        skincareData.productType,
        ...(skincareData.isVegan ? ['vegan'] : []),
        ...(skincareData.isCrueltyFree ? ['cruelty-free'] : []),
        ...(skincareData.isFragranceFree ? ['fragrance-free'] : []),
        ...(skincareData.isHypoallergenic ? ['hypoallergenic'] : [])
      ];
    }
    
    if (updates.stockQuantity !== undefined) {
      updateData.inStock = updates.stockQuantity > 0;
    }
    
    await ctx.db.patch(id, updateData);
    return id;
  },
});

// Get skincare analytics
export const getSkincareAnalytics = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products")
      .filter((q) => q.eq(q.field("category"), "skincare"))
      .collect();
    
    // Calculate analytics
    const totalProducts = products.length;
    const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
    const featuredProducts = products.filter(p => p.featured).length;
    const inStockProducts = products.filter(p => p.inStock).length;
    
    // Analyze skin types and concerns from tags
    const skinTypeCounts: Record<string, number> = {};
    const concernCounts: Record<string, number> = {};
    
    products.forEach(product => {
      const skincareData = (product as any).skincareData;
      if (skincareData) {
        skincareData.skinTypes?.forEach((type: string) => {
          skinTypeCounts[type] = (skinTypeCounts[type] || 0) + 1;
        });
        skincareData.concerns?.forEach((concern: string) => {
          concernCounts[concern] = (concernCounts[concern] || 0) + 1;
        });
      }
    });
    
    return {
      totalProducts,
      averagePrice,
      featuredProducts,
      inStockProducts,
      stockPercentage: (inStockProducts / totalProducts) * 100,
      skinTypeCounts,
      concernCounts,
      priceDistribution: {
        under1000: products.filter(p => p.price < 1000).length,
        between1000and3000: products.filter(p => p.price >= 1000 && p.price < 3000).length,
        over3000: products.filter(p => p.price >= 3000).length
      }
    };
  },
});

// Search skincare products
export const searchSkincareProducts = query({
  args: {
    searchTerm: v.string(),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const products = await ctx.db.query("products")
      .filter((q) => q.eq(q.field("category"), "skincare"))
      .collect();
    
    const searchTerm = args.searchTerm.toLowerCase();
    
    const filtered = products.filter(product => {
      const searchIn = [
        product.name,
        product.description,
        ...(product.tags || []),
        (product as any).skincareData?.fullDescription || '',
        ...((product as any).skincareData?.keyIngredients?.map((i: any) => i.name) || [])
      ].join(' ').toLowerCase();
      
      return searchIn.includes(searchTerm);
    });
    
    return args.limit ? filtered.slice(0, args.limit) : filtered;
  },
});
