import { NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/middleware/error.middleware';
import { createSession, ADMIN_COOKIE } from '@/lib/middleware/auth.middleware';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { userService } from '@/lib/services/user.service';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const loginSchema = z.object({
    id: z.string().min(1, 'Admin ID is required'),
    password: z.string().min(1, 'Password is required'),
});

async function handler(request: NextRequest) {
    const body = await request.json();

    // Validate request
    const result = loginSchema.safeParse(body);
    if (!result.success) {
        return errorResponse('Invalid request data', 400, 'VALIDATION_ERROR', result.error.flatten());
    }

    const { id, password } = result.data;


    try {
        // Verify credentials
        // Assuming 'id' is the email for now, as per standard auth
        const user = await userService.verifyCredentials(id, password);

        // Check if user has admin role
        if (user.role !== 'admin') {
            return errorResponse('Unauthorized access', 403, 'FORBIDDEN');
        }

        // Create admin session token
        const token = createSession(user._id, 'admin');

        // Create response
        const response = successResponse(
            {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            'Admin login successful'
        );

        // Set admin cookie
        response.cookies.set({
            name: ADMIN_COOKIE,
            value: token,
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 8, // 8 hours for admin session
        });


        return response;
    } catch (error: any) {
        // Handle specific auth errors or generic ones
        if (error.message === 'Invalid credentials') {
            return errorResponse('Invalid credentials', 401, 'UNAUTHORIZED');
        }
        throw error;
    }
}

export const POST = withErrorHandler(handler);
