import { cookies } from 'next/headers';

/**
 * Server-side authentication check
 * Checks if admin/user is authenticated by verifying auth token in cookies
 */
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        return false;
    }

    // TODO: Verify token with backend if needed
    // For now, just check if token exists
    return true;
}

/**
 * Get current user from cookies/session
 */
export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        return null;
    }

    // TODO: Fetch user data from backend using token
    // For now, return basic structure
    return {
        token: token.value,
    };
}
