import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse, createdResponse } from '@/lib/utils/response';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/wishlist
export const GET = withAuth(async (request, userId) => {
  const convex = getConvexClient();
  const wishlist = await convex.query(api.wishlist.getWishlist, {
    userId: userId as Id<"users">,
  });
  
  return successResponse(wishlist);
}, requireUserAuth);

// POST /api/v2/wishlist
export const POST = withAuth(async (request, userId) => {
  const { productId } = await request.json();
  
  const convex = getConvexClient();
  const wishlistId = await convex.mutation(api.wishlist.addToWishlist, {
    userId: userId as Id<"users">,
    productId: productId as Id<"products">,
  });
  
  return createdResponse({ id: wishlistId }, 'Added to wishlist');
}, requireUserAuth);

// DELETE /api/v2/wishlist/[id]
export const DELETE = withAuth(async (request, userId) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    throw new Error('Wishlist item ID required');
  }
  
  const convex = getConvexClient();
  await convex.mutation(api.wishlist.removeFromWishlist, {
    id: id as Id<"wishlist">,
  });
  
  return successResponse(null, 'Removed from wishlist');
}, requireUserAuth);
