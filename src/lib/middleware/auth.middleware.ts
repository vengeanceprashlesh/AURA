import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { errorResponse } from '../utils/response';

export const USER_COOKIE = 'user_session';
export const ADMIN_COOKIE = 'admin_session';

interface TokenPayload {
  id: string;
  exp: number;
  role?: 'user' | 'admin';
}

// Verify JWT-like token
function verifyToken(token: string, secret: string): { valid: boolean; payload?: TokenPayload } {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return { valid: false };
    
    const [body, sig] = parts;
    const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
    
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return { valid: false };
    }
    
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as TokenPayload;
    
    if (typeof payload.exp === 'number' && Date.now() > payload.exp) {
      return { valid: false };
    }
    
    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

// Create session token
export function createSession(id: string, role: 'user' | 'admin' = 'user', expiresInMs?: number): string {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_SECRET || 'dev-secret';
  const expiration = expiresInMs || (role === 'admin' ? 1000 * 60 * 60 * 8 : 1000 * 60 * 60 * 24 * 30);
  const payload: TokenPayload = { id, exp: Date.now() + expiration, role };
  
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  
  return `${body}.${sig}`;
}

// Verify user authentication
export async function verifyUserAuth(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE)?.value;
  
  if (!token) return null;
  
  const secret = process.env.JWT_SECRET || process.env.ADMIN_SECRET || 'dev-secret';
  const result = verifyToken(token, secret);
  
  if (!result.valid || !result.payload) return null;
  
  return { userId: result.payload.id };
}

// Verify admin authentication
export async function verifyAdminAuth(): Promise<{ adminId: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  
  if (!token) return null;
  
  const secret = process.env.JWT_SECRET || process.env.ADMIN_SECRET || 'dev-secret';
  const result = verifyToken(token, secret);
  
  if (!result.valid || !result.payload) return null;
  if (result.payload.role !== 'admin') return null;
  
  return { adminId: result.payload.id };
}

// Middleware to require user authentication
export async function requireUserAuth(
  request: NextRequest
): Promise<{ userId: string } | NextResponse> {
  const auth = await verifyUserAuth();
  
  if (!auth) {
    return errorResponse('Authentication required', 401, 'UNAUTHORIZED');
  }
  
  return auth;
}

// Middleware to require admin authentication
export async function requireAdminAuth(
  request: NextRequest
): Promise<{ adminId: string } | NextResponse> {
  const auth = await verifyAdminAuth();
  
  if (!auth) {
    return errorResponse('Admin authentication required', 401, 'UNAUTHORIZED');
  }
  
  return auth;
}

// Optional user authentication (doesn't fail if not authenticated)
export async function optionalUserAuth(): Promise<{ userId: string | null }> {
  const auth = await verifyUserAuth();
  return { userId: auth?.userId || null };
}

// Extract user ID from request headers (for API routes)
export function getUserIdFromRequest(request: NextRequest): string | null {
  const cookieStore = request.cookies;
  const token = cookieStore.get(USER_COOKIE)?.value;
  
  if (!token) return null;
  
  const secret = process.env.JWT_SECRET || process.env.ADMIN_SECRET || 'dev-secret';
  const result = verifyToken(token, secret);
  
  return result.valid && result.payload ? result.payload.id : null;
}
