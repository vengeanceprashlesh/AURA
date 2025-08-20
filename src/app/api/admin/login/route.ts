import { NextResponse } from 'next/server'
import { validateCredentials, createSession } from '@/lib/auth'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as { id?: string; password?: string }
  const { id, password } = body
  if (!id || !password) {
    return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 })
  }
  if (!validateCredentials(id, password)) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
  }
  const token = createSession(id)
  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  })
  return res
}
