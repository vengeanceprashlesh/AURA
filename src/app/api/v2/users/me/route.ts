import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse } from '@/lib/utils/response';
import { validateRequest, updateUserSchema } from '@/lib/utils/validators';
import { userService } from '@/lib/services/user.service';
import { Id } from '../../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v2/users/me - Get current user profile
export const GET = withAuth(async (request, userId) => {
  const user = await userService.getUser(userId as Id<"users">);
  return successResponse(user);
}, requireUserAuth);

// PATCH /api/v2/users/me - Update current user profile
export const PATCH = withAuth(async (request, userId) => {
  const body = await request.json();
  const data = validateRequest(updateUserSchema, body);
  
  await userService.updateUser(userId as Id<"users">, data);
  return successResponse(null, 'Profile updated successfully');
}, requireUserAuth);

// DELETE /api/v2/users/me - Delete account
export const DELETE = withAuth(async (request, userId) => {
  await userService.deleteUser(userId as Id<"users">);
  return successResponse(null, 'Account deleted successfully');
}, requireUserAuth);
