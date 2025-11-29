import { NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/middleware/error.middleware';
import { createSession, USER_COOKIE } from '@/lib/middleware/auth.middleware';
import { createdResponse } from '@/lib/utils/response';
import { validateRequest, signupSchema } from '@/lib/utils/validators';
import { userService } from '@/lib/services/user.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handler(request: NextRequest) {
  const body = await request.json();

  // Validate request
  const data = validateRequest(signupSchema, body);

  // Create user
  const userId = await userService.createUser(data);

  // Create session token
  const token = createSession(userId as string, 'user');

  // Create response
  const response = createdResponse(
    {
      user: {
        id: userId,
        email: data.email,
        name: data.name,
      },
    },
    'User created successfully'
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
