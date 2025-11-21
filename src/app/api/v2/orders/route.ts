import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse, createdResponse } from '@/lib/utils/response';
import { validateRequest, createOrderSchema } from '@/lib/utils/validators';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/orders - Get user's orders
export const GET = withAuth(async (request, userId) => {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  const convex = getConvexClient();
  const orders = await convex.query(api.orders.getOrdersByUser, {
    userId: userId as Id<"users">,
    limit,
  });
  
  return successResponse(orders);
}, requireUserAuth);

// POST /api/v2/orders - Create new order
export const POST = withAuth(async (request, userId) => {
  const body = await request.json();
  const data = validateRequest(createOrderSchema, body);
  
  const convex = getConvexClient();
  const orderId = await convex.mutation(api.orders.createOrder, {
    userId: userId as Id<"users">,
    items: data.items.map(item => ({
      productId: item.productId as Id<"products">,
      quantity: item.quantity,
      price: item.price,
      selectedSize: item.selectedSize,
    })),
    totalAmount: data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    shippingAddressId: data.shippingAddressId as Id<"addresses">,
    billingAddressId: data.billingAddressId as Id<"addresses">,
    paymentMethod: data.paymentMethod,
  });
  
  return createdResponse({ orderId }, 'Order created successfully');
}, requireUserAuth);
