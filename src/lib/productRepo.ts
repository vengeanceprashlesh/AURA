import { promises as fs } from 'fs'
import path from 'path'
import { Product } from '@/types'
import { randomUUID } from 'crypto'

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'products.json')

async function ensureFile() {
  try {
    await fs.access(DATA_PATH)
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
    await fs.writeFile(DATA_PATH, '[]', 'utf-8')
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  await ensureFile()
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  const list = JSON.parse(raw) as Product[]
  if (!category) return list
  return list.filter((p) => p.category === category)
}

export async function addProduct(input: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'featured'> & Partial<Pick<Product, 'rating' | 'reviewCount' | 'featured'>>): Promise<Product> {
  await ensureFile()
  const now = new Date()
  const newProduct: Product = {
    id: randomUUID(),
    rating: input.rating ?? 0,
    reviewCount: input.reviewCount ?? 0,
    featured: input.featured ?? false,
    createdAt: now,
    updatedAt: now,
    ...input,
  }

  const list = await getProducts()
  list.push(newProduct)
  await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2), 'utf-8')
  return newProduct
}

export async function removeProduct(id: string): Promise<boolean> {
  await ensureFile()
  const list = await getProducts()
  const next = list.filter((p) => p.id !== id)
  const changed = next.length !== list.length
  if (changed) {
    await fs.writeFile(DATA_PATH, JSON.stringify(next, null, 2), 'utf-8')
  }
  return changed
}
