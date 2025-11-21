import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse, createdResponse } from '@/lib/utils/response';
import { validateRequest, createAddressSchema, updateAddressSchema } from '@/lib/utils/validators';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/addresses
export const GET = withAuth(async (request, userId) => {
  const convex = getConvexClient();
  const addresses = await convex.query(api.addresses.getAddresses, {
    userId: userId as Id<"users">,
  });
  
  return successResponse(addresses);
}, requireUserAuth);

// POST /api/v2/addresses
export const POST = withAuth(async (request, userId) => {
  const body = await request.json();
  const data = validateRequest(createAddressSchema, body);
  
  const convex = getConvexClient();
  const addressId = await convex.mutation(api.addresses.createAddress, {
    userId: userId as Id<"users">,
    ...data,
  });
  
  return createdResponse({ id: addressId }, 'Address created');
}, requireUserAuth);

// PATCH /api/v2/addresses?id=xxx
export const PATCH = withAuth(async (request, userId) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) throw new Error('Address ID required');
  
  const body = await request.json();
  const data = validateRequest(updateAddressSchema, body);
  
  const convex = getConvexClient();
  await convex.mutation(api.addresses.updateAddress, {
    id: id as Id<"addresses">,
    ...data,
  });
  
  return successResponse(null, 'Address updated');
}, requireUserAuth);

// DELETE /api/v2/addresses?id=xxx
export const DELETE = withAuth(async (request, userId) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) throw new Error('Address ID required');
  
  const convex = getConvexClient();
  await convex.mutation(api.addresses.deleteAddress, {
    id: id as Id<"addresses">,
  });
  
  return successResponse(null, 'Address deleted');
}, requireUserAuth);
