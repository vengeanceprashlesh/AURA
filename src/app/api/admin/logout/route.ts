import { NextResponse } from 'next/server'

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
}

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url))
  res.cookies.set('admin_session', '', { ...cookieOptions, maxAge: 0 })
  return res
}

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url))
  res.cookies.set('admin_session', '', { ...cookieOptions, maxAge: 0 })
  return res
}
