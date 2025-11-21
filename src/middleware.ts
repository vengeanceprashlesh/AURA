import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = [
    '/profile',
    '/orders',
    '/wishlist',
    '/checkout',
    '/account',
];

// Define auth routes (redirect to home if already logged in)
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if route is auth page
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Redirect to login if accessing protected route without token
    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // Redirect to home if accessing auth pages while logged in
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
