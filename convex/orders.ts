import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get orders by user
export const getOrdersByUser = query({
  args: { 
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    // Fetch product details for each order item
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const itemsWithProducts = await Promise.all(
          order.items.map(async (item) => {
            const product = await ctx.db.get(item.productId);
            return { ...item, product };
          })
        );
        return { ...order, items: itemsWithProducts };
      })
    );

    if (args.limit) {
      return ordersWithProducts.slice(0, args.limit);
    }

    return ordersWithProducts;
  },
});

// Get single order
export const getOrder = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    if (!order) return null;

    // Fetch product details
    const itemsWithProducts = await Promise.all(
      order.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return { ...item, product };
      })
    );

    return { ...order, items: itemsWithProducts };
  },
});

// Create order
export const createOrder = mutation({
  args: {
    userId: v.id("users"),
    items: v.array(v.object({
      productId: v.id("products"),
      quantity: v.number(),
      price: v.number(),
      selectedSize: v.optional(v.string()),
    })),
    totalAmount: v.number(),
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const estimatedDelivery = now + (7 * 24 * 60 * 60 * 1000); // 7 days

    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      items: args.items,
      totalAmount: args.totalAmount,
      status: "pending",
      shippingAddressId: args.shippingAddressId,
      billingAddressId: args.billingAddressId,
      paymentMethod: args.paymentMethod,
      createdAt: now,
      estimatedDelivery,
    });

    // Update product stock
    await Promise.all(
      args.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        if (product) {
          const newStock = Math.max(0, product.stockQuantity - item.quantity);
          await ctx.db.patch(item.productId, {
            stockQuantity: newStock,
            inStock: newStock > 0,
            updatedAt: now,
          });
        }
      })
    );

    return orderId;
  },
});

// Update order status
export const updateOrderStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
      v.literal("refunded")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });

    return args.id;
  },
});

// Cancel order
export const cancelOrder = mutation({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "pending" && order.status !== "confirmed") {
      throw new Error("Cannot cancel order with status: " + order.status);
    }

    // Restore product stock
    const now = Date.now();
    await Promise.all(
      order.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        if (product) {
          const newStock = product.stockQuantity + item.quantity;
          await ctx.db.patch(item.productId, {
            stockQuantity: newStock,
            inStock: newStock > 0,
            updatedAt: now,
          });
        }
      })
    );

    await ctx.db.patch(args.id, {
      status: "cancelled",
    });

    return args.id;
  },
});

// Get all orders (admin)
export const getAllOrders = query({
  args: {
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
      v.literal("refunded")
    )),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("orders");

    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status));
    }

    const orders = await query.order("desc").collect();

    if (args.limit) {
      return orders.slice(0, args.limit);
    }

    return orders;
  },
});
