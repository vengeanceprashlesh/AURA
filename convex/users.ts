"use node";
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Hash password helper (runs on server)
function hashPassword(password: string, salt?: string) {
  const theSalt = salt || "mock-salt";
  const hash = `mock-hash-${password}-${theSalt}`;
  return { hash, salt: theSalt };
}

// Get user by ID
export const getUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) return null;

    // Don't expose password hash and salt
    const { passwordHash, passwordSalt, ...safeUser } = user;
    return safeUser;
  },
});

// Get user by email (for authentication)
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    return user;
  },
});

// Create new user
export const createUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
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
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const { hash, salt } = hashPassword(args.password);
    const now = Date.now();

    const userId = await ctx.db.insert("users", {
      email: args.email.toLowerCase(),
      passwordHash: hash,
      passwordSalt: salt,
      name: args.name,
      phone: args.phone,
      avatar: undefined,
      address: args.address,
      dob: args.dob,
      preferences: args.preferences,
      stripeCustomerId: args.stripeCustomerId,
      verified: false,
      role: args.role || "user",
      createdAt: now,
      updatedAt: now,
    });

    return userId;
  },
});

// Verify user credentials (for login)
export const verifyCredentials = query({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (!user) return null;

    // Verify password
    const { hash } = hashPassword(args.password, user.passwordSalt);
    if (hash !== user.passwordHash) {
      return null;
    }

    // Return user without password fields
    const { passwordHash, passwordSalt, ...safeUser } = user;
    return safeUser;
  },
});

// Update user profile
export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
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

// Update user verification status
export const updateVerificationStatus = mutation({
  args: {
    id: v.id("users"),
    verified: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      verified: args.verified,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Delete user
export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Get all users (admin only - implement auth check in API layer)
export const getAllUsers = query({
  args: {
    limit: v.optional(v.number()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
  },
  handler: async (ctx, args) => {
    let users;
    if (args.role) {
      users = await ctx.db
        .query("users")
        .withIndex("by_role", (q) => q.eq("role", args.role!))
        .collect();
    } else {
      users = await ctx.db.query("users").collect();
    }

    // Remove password fields
    const safeUsers = users.map(({ passwordHash, passwordSalt, ...user }) => user);

    if (args.limit) {
      return safeUsers.slice(0, args.limit);
    }

    return safeUsers;
  },
});

// Update Stripe customer ID
export const updateStripeCustomerId = mutation({
  args: {
    id: v.id("users"),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      stripeCustomerId: args.stripeCustomerId,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});
