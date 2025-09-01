import { mutation } from "./_generated/server";

export const seedSampleProducts = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if products already exist
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length > 0) {
      return { message: "Sample products already exist", count: existingProducts.length };
    }

    const sampleProducts = [
      // Dresses
      {
        name: "Elegant Maxi Dress",
        description: "A flowing maxi dress perfect for summer evenings and special occasions. Made with premium fabric and elegant design.",
        price: 89.99,
        originalPrice: 120.00,
        images: [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
          "https://images.unsplash.com/photo-1566479179817-c4f95f9d8b12?w=500&h=600&fit=crop"
        ],
        category: "dresses",
        subcategory: "maxi",
        tags: ["elegant", "evening", "summer", "flowy"],
        inStock: true,
        stockQuantity: 25,
        featured: true,
      },
      {
        name: "Little Black Dress",
        description: "The classic little black dress that's perfect for any occasion. Timeless elegance meets modern style.",
        price: 75.00,
        images: [
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop"
        ],
        category: "dresses",
        subcategory: "cocktail",
        tags: ["classic", "black", "versatile", "timeless"],
        inStock: true,
        stockQuantity: 30,
        featured: true,
      },
      {
        name: "Floral Midi Dress",
        description: "Beautiful floral midi dress perfect for spring and summer outings. Comfortable and stylish.",
        price: 65.00,
        originalPrice: 85.00,
        images: [
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
        ],
        category: "dresses",
        subcategory: "midi",
        tags: ["floral", "spring", "casual", "feminine"],
        inStock: true,
        stockQuantity: 20,
        featured: false,
      },

      // Clothing
      {
        name: "Premium Cotton Blazer",
        description: "Professional blazer made from premium cotton blend. Perfect for office wear and business meetings.",
        price: 125.00,
        images: [
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop"
        ],
        category: "clothing",
        subcategory: "blazers",
        tags: ["professional", "cotton", "business", "formal"],
        inStock: true,
        stockQuantity: 15,
        featured: true,
      },
      {
        name: "Casual Denim Jacket",
        description: "Classic denim jacket with modern fit. A wardrobe essential for casual and layered looks.",
        price: 55.00,
        images: [
          "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&h=600&fit=crop"
        ],
        category: "clothing",
        subcategory: "jackets",
        tags: ["denim", "casual", "layering", "classic"],
        inStock: true,
        stockQuantity: 40,
        featured: false,
      },
      {
        name: "Silk Blouse",
        description: "Luxurious silk blouse with elegant draping. Perfect for both professional and evening wear.",
        price: 95.00,
        originalPrice: 140.00,
        images: [
          "https://images.unsplash.com/photo-1564257577142-be8d8b8b3b6f?w=500&h=600&fit=crop"
        ],
        category: "clothing",
        subcategory: "blouses",
        tags: ["silk", "luxury", "elegant", "professional"],
        inStock: true,
        stockQuantity: 18,
        featured: true,
      },

      // Accessories
      {
        name: "Designer Leather Handbag",
        description: "Premium leather handbag with gold hardware. Spacious interior with multiple compartments.",
        price: 180.00,
        originalPrice: 250.00,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"
        ],
        category: "accessories",
        subcategory: "handbags",
        tags: ["leather", "designer", "luxury", "handbag"],
        inStock: true,
        stockQuantity: 12,
        featured: true,
      },
      {
        name: "Statement Earrings",
        description: "Bold statement earrings that add glamour to any outfit. Made with high-quality materials.",
        price: 35.00,
        images: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop"
        ],
        category: "accessories",
        subcategory: "jewelry",
        tags: ["statement", "glamour", "earrings", "gold"],
        inStock: true,
        stockQuantity: 50,
        featured: false,
      },
      {
        name: "Luxury Silk Scarf",
        description: "Beautiful silk scarf with artistic print. Can be worn in multiple ways for different looks.",
        price: 45.00,
        images: [
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
        ],
        category: "accessories",
        subcategory: "scarves",
        tags: ["silk", "luxury", "artistic", "versatile"],
        inStock: true,
        stockQuantity: 25,
        featured: false,
      },

      // Beauty
      {
        name: "Premium Skincare Set",
        description: "Complete skincare routine set with cleanser, serum, and moisturizer. Natural and organic ingredients.",
        price: 78.00,
        originalPrice: 95.00,
        images: [
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop"
        ],
        category: "beauty",
        subcategory: "skincare",
        tags: ["skincare", "organic", "natural", "routine"],
        inStock: true,
        stockQuantity: 35,
        featured: true,
      },
      {
        name: "Luxury Lipstick Collection",
        description: "Set of 3 luxury lipsticks in complementary shades. Long-lasting and highly pigmented.",
        price: 42.00,
        images: [
          "https://images.unsplash.com/photo-1586244439413-bc2288941dda?w=500&h=600&fit=crop"
        ],
        category: "beauty",
        subcategory: "makeup",
        tags: ["lipstick", "luxury", "collection", "pigmented"],
        inStock: true,
        stockQuantity: 28,
        featured: false,
      },

      // Cotton Collection
      {
        name: "Organic Cotton T-Shirt",
        description: "Soft organic cotton t-shirt with relaxed fit. Perfect for everyday wear and casual outings.",
        price: 28.00,
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop"
        ],
        category: "cotton",
        subcategory: "tops",
        tags: ["organic", "cotton", "casual", "comfortable"],
        inStock: true,
        stockQuantity: 60,
        featured: false,
      },
      {
        name: "Cotton Midi Skirt",
        description: "A-line cotton midi skirt with elastic waistband. Comfortable and stylish for warm weather.",
        price: 38.00,
        images: [
          "https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=500&h=600&fit=crop"
        ],
        category: "cotton",
        subcategory: "skirts",
        tags: ["cotton", "midi", "comfortable", "summer"],
        inStock: true,
        stockQuantity: 22,
        featured: false,
      }
    ];

    const now = Date.now();
    let insertedCount = 0;

    for (const product of sampleProducts) {
      try {
        await ctx.db.insert("products", {
          ...product,
          rating: 0,
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        });
        insertedCount++;
      } catch (error) {
        console.error("Error inserting product:", error);
      }
    }

    return { message: `Successfully seeded ${insertedCount} sample products`, count: insertedCount };
  },
});
