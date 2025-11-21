'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to require authentication for a page
 * Redirects to login if user is not authenticated
 */
export function useRequireAuth(redirectUrl: string = '/login') {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push(redirectUrl);
        }
    }, [isAuthenticated, isLoading, redirectUrl, router]);

    return { isAuthenticated, isLoading };
}

/**
 * Hook to redirect authenticated users away from auth pages
 * Useful for login/signup pages
 */
export function useRedirectIfAuthenticated(redirectUrl: string = '/') {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push(redirectUrl);
        }
    }, [isAuthenticated, isLoading, redirectUrl, router]);

    return { isAuthenticated, isLoading };
}
