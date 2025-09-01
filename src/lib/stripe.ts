import Stripe from 'stripe'

let stripe: Stripe | null = null

export function getStripe() {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripe = new Stripe(key, {
      // Use a stable API version. Adjust if needed.
      apiVersion: '2024-06-20' as any,
    })
  }
  return stripe
}
