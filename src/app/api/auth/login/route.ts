import { NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/userRepo'
import { createUserSession, USER_COOKIE } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json() as { email: string; password: string }
    if (!body.email || !body.password) {
      return NextResponse.json({ success: false, message: 'Missing email or password' }, { status: 400 })
    }

    const user = await verifyPassword(body.email, body.password)
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const token = createUserSession(user.id)
    const res = NextResponse.json({ success: true, data: { id: user.id } })
    res.cookies.set({
      name: USER_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    })
    return res
  } catch (err: any) {
    console.error('Login error:', err)
    return NextResponse.json({ success: false, message: err?.message || 'Internal error' }, { status: 500 })
  }
}
