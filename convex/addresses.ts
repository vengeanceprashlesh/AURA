import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get user's addresses
export const getAddresses = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("addresses")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get single address
export const getAddress = query({
  args: { id: v.id("addresses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create address
export const createAddress = mutation({
  args: {
    userId: v.id("users"),
    street: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),
    country: v.string(),
    isDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // If this is default, unset other defaults
    if (args.isDefault) {
      const existingAddresses = await ctx.db
        .query("addresses")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect();

      await Promise.all(
        existingAddresses
          .filter((addr) => addr.isDefault)
          .map((addr) => ctx.db.patch(addr._id, { isDefault: false }))
      );
    }

    const addressId = await ctx.db.insert("addresses", {
      userId: args.userId,
      street: args.street,
      city: args.city,
      state: args.state,
      zipCode: args.zipCode,
      country: args.country,
      isDefault: args.isDefault || false,
    });

    return addressId;
  },
});

// Update address
export const updateAddress = mutation({
  args: {
    id: v.id("addresses"),
    street: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    country: v.optional(v.string()),
    isDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // If setting as default, unset others
    if (updates.isDefault) {
      const address = await ctx.db.get(id);
      if (address) {
        const otherAddresses = await ctx.db
          .query("addresses")
          .withIndex("by_user", (q) => q.eq("userId", address.userId))
          .collect();

        await Promise.all(
          otherAddresses
            .filter((addr) => addr._id !== id && addr.isDefault)
            .map((addr) => ctx.db.patch(addr._id, { isDefault: false }))
        );
      }
    }

    await ctx.db.patch(id, updates);
    return id;
  },
});

// Delete address
export const deleteAddress = mutation({
  args: { id: v.id("addresses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
