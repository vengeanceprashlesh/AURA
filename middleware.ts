import { NextRequest, NextResponse } from 'next/server'

// Verify signed token: base64url(body).base64url(hmacSha256(body, secret)) and exp not expired
async function verifyToken(token?: string, secret?: string): Promise<boolean> {
  if (!token || !secret) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [body, sig] = parts
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(body))
  // base64url encode ArrayBuffer without Buffer
  const actual = base64UrlEncode(new Uint8Array(mac))
  if (sig !== actual) return false
  try {
    const jsonStr = decodeBase64Url(body)
    const json = JSON.parse(jsonStr) as { exp?: number }
    if (typeof json.exp === 'number' && Date.now() > json.exp) return false
  } catch {
    return false
  }
  return true
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
  const b64 = btoa(binary)
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function decodeBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (b64url.length % 4)) % 4)
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('admin_session')?.value
  const secret = process.env.ADMIN_SECRET || 'dev-secret'

  // Protect /admin pages
  if (pathname.startsWith('/admin')) {
    const isAuthFree = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
    const valid = await verifyToken(token, secret)
    if (!valid && !isAuthFree) {
      const url = new URL('/admin/login', req.url)
      return NextResponse.redirect(url)
    }
  }

  // Protect write operations on products API
  if ((pathname === '/api/products' && req.method === 'POST') ||
      (pathname.startsWith('/api/products/') && req.method === 'DELETE')) {
    const valid = await verifyToken(token, secret)
    if (!valid) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/products',
    '/api/products/:path*',
  ],
}
