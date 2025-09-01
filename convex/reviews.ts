import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get reviews for a product
export const getReviewsByProduct = query({
  args: { 
    productId: v.id("products"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_product", (q) => q.eq("productId", args.productId))
      .order("desc")
      .collect();

    if (args.limit) {
      return reviews.slice(0, args.limit);
    }

    return reviews;
  },
});

// Get review statistics for a product
export const getReviewStats = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_product", (q) => q.eq("productId", args.productId))
      .collect();

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    const ratingDistribution = reviews.reduce((dist, review) => {
      dist[review.rating as keyof typeof dist] = (dist[review.rating as keyof typeof dist] || 0) + 1;
      return dist;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length,
      ratingDistribution,
    };
  },
});

// Add a new review
export const addReview = mutation({
  args: {
    productId: v.id("products"),
    userId: v.optional(v.string()),
    userName: v.string(),
    userAvatar: v.optional(v.string()),
    rating: v.number(),
    title: v.string(),
    comment: v.string(),
    verified: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Validate rating is between 1-5
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const reviewId = await ctx.db.insert("reviews", {
      ...args,
      helpful: 0,
      verified: args.verified || false,
      createdAt: Date.now(),
    });

    // Update product rating
    const product = await ctx.db.get(args.productId);
    if (product) {
      const currentTotal = product.rating * product.reviewCount;
      const newReviewCount = product.reviewCount + 1;
      const newAverageRating = (currentTotal + args.rating) / newReviewCount;

      await ctx.db.patch(args.productId, {
        rating: Math.round(newAverageRating * 10) / 10,
        reviewCount: newReviewCount,
        updatedAt: Date.now(),
      });
    }

    return reviewId;
  },
});

// Mark review as helpful
export const markReviewHelpful = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);
    if (!review) throw new Error("Review not found");

    await ctx.db.patch(args.reviewId, {
      helpful: review.helpful + 1,
    });

    return args.reviewId;
  },
});

// Delete a review
export const deleteReview = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);
    if (!review) throw new Error("Review not found");

    await ctx.db.delete(args.reviewId);

    // Update product rating after deletion
    const product = await ctx.db.get(review.productId);
    if (product && product.reviewCount > 1) {
      const currentTotal = product.rating * product.reviewCount;
      const newReviewCount = product.reviewCount - 1;
      const newAverageRating = (currentTotal - review.rating) / newReviewCount;

      await ctx.db.patch(review.productId, {
        rating: Math.round(newAverageRating * 10) / 10,
        reviewCount: newReviewCount,
        updatedAt: Date.now(),
      });
    } else if (product && product.reviewCount === 1) {
      // This was the last review
      await ctx.db.patch(review.productId, {
        rating: 0,
        reviewCount: 0,
        updatedAt: Date.now(),
      });
    }

    return args.reviewId;
  },
});
