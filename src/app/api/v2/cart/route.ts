import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse, createdResponse } from '@/lib/utils/response';
import { validateRequest, addToCartSchema } from '@/lib/utils/validators';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/cart - Get user's cart
export const GET = withAuth(async (request, userId) => {
  const convex = getConvexClient();
  
  const cart = await convex.query(api.cart.getCart, {
    userId: userId as Id<"users">,
  });
  
  return successResponse(cart);
}, requireUserAuth);

// POST /api/v2/cart - Add item to cart
export const POST = withAuth(async (request, userId) => {
  const body = await request.json();
  const data = validateRequest(addToCartSchema, body);
  
  const convex = getConvexClient();
  
  const cartItemId = await convex.mutation(api.cart.addToCart, {
    userId: userId as Id<"users">,
    productId: data.productId as Id<"products">,
    quantity: data.quantity,
    selectedSize: data.selectedSize,
    selectedColor: data.selectedColor,
  });
  
  return createdResponse({ id: cartItemId }, 'Item added to cart');
}, requireUserAuth);

// DELETE /api/v2/cart - Clear cart
export const DELETE = withAuth(async (request, userId) => {
  const convex = getConvexClient();
  
  await convex.mutation(api.cart.clearCart, {
    userId: userId as Id<"users">,
  });
  
  return successResponse(null, 'Cart cleared');
}, requireUserAuth);
