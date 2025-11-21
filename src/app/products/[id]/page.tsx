import { ProductPageClient } from './ProductPageClient';

// Force dynamic rendering for real-time product data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductPageClient productId={id} />;
}
