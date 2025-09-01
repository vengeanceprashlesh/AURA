import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createUser } from '@/lib/userRepo'
import { createUserSession, USER_COOKIE } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      name: string
      email: string
      password: string
      phone?: string
      address?: { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string }
      dob?: string
      preferences?: { sizes?: string[]; colors?: string[]; categories?: string[] }
    }

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    // Create Stripe customer
    const stripe = getStripe()
    const customer = await stripe.customers.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address ? {
        line1: body.address.line1,
        line2: body.address.line2,
        city: body.address.city,
        state: body.address.state,
        postal_code: body.address.postal_code,
        country: body.address.country,
      } : undefined,
      metadata: {
        app_user: 'true',
      }
    })

    // Persist user
    const user = await createUser({
      email: body.email,
      name: body.name,
      phone: body.phone,
      address: body.address,
      dob: body.dob,
      preferences: body.preferences,
      stripeCustomerId: customer.id,
      verified: false,
      password: body.password,
    })

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
    console.error('Signup error:', err)
    return NextResponse.json({ success: false, message: err?.message || 'Internal error' }, { status: 500 })
  }
}
