import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse } from '@/lib/utils/response';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/orders/[id]
export const GET = withAuth(async (request, userId, { params }: { params: { id: string } }) => {
  const convex = getConvexClient();
  const order = await convex.query(api.orders.getOrder, {
    id: params.id as Id<"orders">,
  });
  
  return successResponse(order);
}, requireUserAuth);

// PATCH /api/v2/orders/[id] - Cancel order
export const PATCH = withAuth(async (request, userId, { params }: { params: { id: string } }) => {
  const convex = getConvexClient();
  await convex.mutation(api.orders.cancelOrder, {
    id: params.id as Id<"orders">,
  });
  
  return successResponse(null, 'Order cancelled successfully');
}, requireUserAuth);
