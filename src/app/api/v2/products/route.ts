import { NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/middleware/error.middleware';
import { successResponse } from '@/lib/utils/response';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../convex/_generated/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/products
const handler = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? undefined;
  const search = searchParams.get('search') ?? undefined;
  const featured = searchParams.get('featured') === 'true' ? true : undefined;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  const convex = getConvexClient();
  const products = await convex.query(api.products.getProducts, {
    category,
    search,
    featured,
    limit,
  });
  
  return successResponse(products);
};

export const GET = withErrorHandler(handler);
