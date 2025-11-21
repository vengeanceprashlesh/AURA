import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
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
    rating: v.number(),
    reviewCount: v.number(),
    featured: v.boolean(),
    brand: v.optional(v.string()),
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
    // Product variants with colors/sizes and their images
    variants: v.optional(v.array(v.object({
      id: v.string(),
      color: v.object({
        name: v.string(),
        value: v.string(), // hex color or color name
        images: v.array(v.string()), // specific images for this color
      }),
      sizes: v.array(v.object({
        size: v.string(),
        stockQuantity: v.number(),
        price: v.optional(v.number()), // size-specific price if different
      })),
      inStock: v.boolean(),
    }))),
    // Available sizes for this product category
    availableSizes: v.optional(v.array(v.string())),
    // Available colors for this product
    availableColors: v.optional(v.array(v.object({
      name: v.string(),
      value: v.string(),
      images: v.array(v.string()),
    }))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .index("by_rating", ["rating"])
    .searchIndex("search_products", {
      searchField: "name",
      filterFields: ["category", "inStock", "featured"]
    }),

  reviews: defineTable({
    productId: v.id("products"),
    userId: v.optional(v.string()),
    userName: v.string(),
    userAvatar: v.optional(v.string()),
    rating: v.number(),
    title: v.string(),
    comment: v.string(),
    helpful: v.number(),
    verified: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_rating", ["rating"]),

  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    passwordSalt: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    avatar: v.optional(v.string()),
    address: v.optional(v.object({
      line1: v.optional(v.string()),
      line2: v.optional(v.string()),
      city: v.optional(v.string()),
      state: v.optional(v.string()),
      postal_code: v.optional(v.string()),
      country: v.optional(v.string()),
    })),
    dob: v.optional(v.string()),
    preferences: v.optional(v.object({
      sizes: v.optional(v.array(v.string())),
      colors: v.optional(v.array(v.string())),
      categories: v.optional(v.array(v.string())),
    })),
    stripeCustomerId: v.optional(v.string()),
    verified: v.boolean(),
    role: v.union(v.literal("user"), v.literal("admin")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  addresses: defineTable({
    userId: v.id("users"),
    street: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),
    country: v.string(),
    isDefault: v.boolean(),
  })
    .index("by_user", ["userId"]),

  orders: defineTable({
    userId: v.id("users"),
    items: v.array(v.object({
      productId: v.id("products"),
      quantity: v.number(),
      price: v.number(),
      selectedSize: v.optional(v.string()),
    })),
    totalAmount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
      v.literal("refunded")
    ),
    shippingAddressId: v.id("addresses"),
    billingAddressId: v.id("addresses"),
    paymentMethod: v.object({
      type: v.union(
        v.literal("card"),
        v.literal("paypal"),
        v.literal("apple_pay"),
        v.literal("google_pay")
      ),
      last4: v.optional(v.string()),
      brand: v.optional(v.string()),
    }),
    createdAt: v.number(),
    estimatedDelivery: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    parentId: v.optional(v.id("categories")),
  })
    .index("by_slug", ["slug"])
    .index("by_parent", ["parentId"]),

  wishlist: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    addedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_product", ["productId"])
    .index("by_user_product", ["userId", "productId"]),

  cart: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
    selectedSize: v.optional(v.string()),
    selectedColor: v.optional(v.string()),
    price: v.number(), // Store price at time of adding to cart
    addedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_product", ["productId"])
    .index("by_user_product", ["userId", "productId"]),
});
