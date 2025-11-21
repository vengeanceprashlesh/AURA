import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all categories
export const getCategories = query({
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

// Get category by slug
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get subcategories
export const getSubcategories = query({
  args: { parentId: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_parent", (q) => q.eq("parentId", args.parentId))
      .collect();
  },
});

// Create category
export const createCategory = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    parentId: v.optional(v.id("categories")),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error("Category with this slug already exists");
    }

    const categoryId = await ctx.db.insert("categories", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      image: args.image,
      parentId: args.parentId,
    });

    return categoryId;
  },
});

// Update category
export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    parentId: v.optional(v.id("categories")),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // If updating slug, check uniqueness
    if (updates.slug) {
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", updates.slug!))
        .first();

      if (existing && existing._id !== id) {
        throw new Error("Category with this slug already exists");
      }
    }

    await ctx.db.patch(id, updates);
    return id;
  },
});

// Delete category
export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    // Check if category has subcategories
    const subcategories = await ctx.db
      .query("categories")
      .withIndex("by_parent", (q) => q.eq("parentId", args.id))
      .collect();

    if (subcategories.length > 0) {
      throw new Error("Cannot delete category with subcategories");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
