import { NextResponse } from 'next/server'
import { addProduct, getProducts } from '@/lib/productRepo'
import { Product } from '@/types'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') ?? undefined
  const data = await getProducts(category ?? undefined)
  return NextResponse.json({ success: true, data })
}

export async function POST(req: Request) {
  const body = await req.json() as Partial<Product> & { name: string; price: number; images: string[]; category: string; description?: string; stockQuantity?: number; inStock?: boolean; tags?: string[]; originalPrice?: number; featured?: boolean }

  if (!body.name || !body.price || !Array.isArray(body.images) || !body.category) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
  }

  const product = await addProduct({
    name: body.name,
    description: body.description ?? '',
    price: body.price,
    originalPrice: body.originalPrice,
    images: body.images,
    category: body.category,
    subcategory: body.subcategory,
    tags: body.tags ?? [],
    inStock: body.inStock ?? true,
    stockQuantity: body.stockQuantity ?? 0,
    rating: body.rating ?? 0,
    reviewCount: body.reviewCount ?? 0,
    featured: body.featured ?? false,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Product)

  return NextResponse.json({ success: true, data: product })
}
