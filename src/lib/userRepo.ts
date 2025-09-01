import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

export interface UserRecord {
  id: string
  email: string
  passwordHash: string
  passwordSalt: string
  name: string
  phone?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
  dob?: string
  preferences?: {
    sizes?: string[]
    colors?: string[]
    categories?: string[]
  }
  stripeCustomerId: string
  verified?: boolean
  createdAt: string
  updatedAt: string
}

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'users.json')

async function ensureFile() {
  try {
    await fs.access(DATA_PATH)
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
    await fs.writeFile(DATA_PATH, '[]', 'utf-8')
  }
}

async function readAll(): Promise<UserRecord[]> {
  await ensureFile()
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as UserRecord[]
}

async function writeAll(list: UserRecord[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2), 'utf-8')
}

export function hashPassword(password: string, salt?: string) {
  const theSalt = salt || crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, theSalt, 64).toString('hex')
  return { hash, salt: theSalt }
}

export async function createUser(input: Omit<UserRecord, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash' | 'passwordSalt'> & { password: string }) {
  const list = await readAll()
  if (list.find(u => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error('Email already exists')
  }
  const { hash, salt } = hashPassword(input.password)
  const now = new Date().toISOString()
  const user: UserRecord = {
    id: crypto.randomUUID(),
    email: input.email,
    passwordHash: hash,
    passwordSalt: salt,
    name: input.name,
    phone: input.phone,
    address: input.address,
    dob: input.dob,
    preferences: input.preferences,
    stripeCustomerId: input.stripeCustomerId,
    verified: input.verified ?? false,
    createdAt: now,
    updatedAt: now,
  }
  list.push(user)
  await writeAll(list)
  return user
}

export async function findUserByEmail(email: string) {
  const list = await readAll()
  return list.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export async function verifyPassword(email: string, password: string) {
  const user = await findUserByEmail(email)
  if (!user) return null
  const { hash } = hashPassword(password, user.passwordSalt)
  if (crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(user.passwordHash))) {
    return user
  }
  return null
}
