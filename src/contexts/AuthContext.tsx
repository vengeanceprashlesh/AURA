'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    email: string;
    name: string;
    role?: 'user' | 'admin';
    avatar?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

interface SignupData {
    name: string;
    email: string;
    password: string;
    phone?: string;
    dob?: string;
    address?: any;
    preferences?: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            // Verify token and get user data
            const res = await fetch('/api/v2/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.data);
            } else {
                // Token invalid, clear it
                localStorage.removeItem('auth_token');
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('auth_token');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch('/api/v2/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token
            localStorage.setItem('auth_token', data.token);

            // Set user data
            setUser(data.user);

            // Redirect to home or previous page
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (signupData: SignupData) => {
        try {
            const res = await fetch('/api/v2/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Signup failed');
            }

            // Store token
            localStorage.setItem('auth_token', data.token);

            // Set user data
            setUser(data.user);

            // Redirect to home
            router.push('/');
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        router.push('/login');
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
