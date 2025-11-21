import { NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/middleware/error.middleware';
import { successResponse } from '@/lib/utils/response';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/products/[id]
const handler = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const convex = getConvexClient();
  const product = await convex.query(api.products.getProduct, {
    id: params.id as Id<"products">,
  });
  
  return successResponse(product);
};

export const GET = withErrorHandler(handler);
