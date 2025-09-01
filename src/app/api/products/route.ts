import { NextResponse } from 'next/server';
import { api } from '../../../../convex/_generated/api';
import { getConvexClient } from '../../../lib/convex-client';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') ?? undefined;
  const search = searchParams.get('search')?.trim().toLowerCase();
  const featured = searchParams.get('featured') === 'true' ? true : undefined;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

  try {
    const convex = getConvexClient();
    const products = await convex.query(api.products.getProducts, {
      category,
      search,
      featured,
      limit,
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.price || !Array.isArray(body.images) || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const convex = getConvexClient();
    const productId = await convex.mutation(api.products.addProduct, {
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
      featured: body.featured ?? false,
    });

    return NextResponse.json({ success: true, data: { id: productId } });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add product' },
      { status: 500 }
    );
  }
}
