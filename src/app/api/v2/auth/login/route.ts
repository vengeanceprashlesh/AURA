import { NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/middleware/error.middleware';
import { createSession, USER_COOKIE } from '@/lib/middleware/auth.middleware';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { validateRequest, loginSchema } from '@/lib/utils/validators';
import { userService } from '@/lib/services/user.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handler(request: NextRequest) {
  const body = await request.json();

  // Validate request
  const data = validateRequest(loginSchema, body);

  // Verify credentials
  const user = await userService.verifyCredentials(data.email, data.password);

  // Create session token
  const token = createSession(user._id, 'user');

  // Create response
  const response = successResponse(
    {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    },
    'Login successful'
  );

  // Set cookie
  response.cookies.set({
    name: USER_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}

export const POST = withErrorHandler(handler);
