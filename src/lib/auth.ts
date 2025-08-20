import { cookies } from 'next/headers'
import crypto from 'crypto'

export const ADMIN_COOKIE = 'admin_session'

// Create a signed session token with HMAC-SHA256. Payload contains id and exp.
function sign(payload: Record<string, any>, secret: string) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${sig}`
}

function verify(token: string, secret: string): { valid: boolean; payload?: any } {
  const parts = token.split('.')
  if (parts.length !== 2) return { valid: false }
  const [body, sig] = parts
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return { valid: false }
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (typeof payload.exp === 'number' && Date.now() > payload.exp) return { valid: false }
    return { valid: true, payload }
  } catch {
    return { valid: false }
  }
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  if (!token) return false
  const secret = process.env.ADMIN_SECRET || 'dev-secret'
  return verify(token, secret).valid
}

export function createSession(id: string) {
  const secret = process.env.ADMIN_SECRET || 'dev-secret'
  const eightHours = 1000 * 60 * 60 * 8
  const payload = { id, exp: Date.now() + eightHours }
  return sign(payload, secret)
}

// If ADMIN_PASSWORD_HASH and optional ADMIN_SALT are provided, validate against hash (sha256).
// Fallback to plain-text env comparison for local/dev.
export function validateCredentials(id: string, password: string) {
  const envId = process.env.ADMIN_ID?.trim()
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim()
  const salt = (process.env.ADMIN_SALT || '').trim()
  const plain = process.env.ADMIN_PASSWORD?.trim()

  // TEMP DEBUG: Verify envs are loaded at runtime (remove after verifying)
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Auth] ENV loaded:', {
      envId,
      hasPlain: !!plain,
      hasHash: !!hash,
    })
  }

  // Development fallback: if env vars are missing in dev, allow default creds
  if (!envId) {
    if (process.env.NODE_ENV !== 'production') {
      const fallbackId = 'admin'
      const fallbackPass = 'admin@123'
      return id === fallbackId && password === fallbackPass
    }
    return false
  }
  if (hash) {
    const digest = crypto.createHash('sha256').update(password + salt).digest('hex')
    return id === envId && crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hash))
  }
  // Fallback to plain password for development if hash not set
  return id === envId && !!plain && password === plain
}
