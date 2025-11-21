'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

export function ProtectedRoute({
    children,
    requireAuth = true,
    redirectTo = '/login'
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && requireAuth && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated and auth is required
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
