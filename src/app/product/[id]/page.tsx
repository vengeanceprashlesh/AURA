'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import ProductPage from '@/components/ProductPage';
import { notFound } from 'next/navigation';

// Force dynamic rendering for real-time product data
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always get fresh data

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const productId = params.id as Id<"products">;
  const product = useQuery(api.products.getProduct, { id: productId });

  if (product === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-600">
          <svg className="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-lg">Loading product...</span>
        </div>
      </div>
    );
  }

  if (product === null) {
    notFound();
  }

  return <ProductPage product={product} />;
}
