'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import type { Product } from '@/types';

interface ProductGridProps {
  category: string;
  title?: string;
  emptyMessage?: string;
  className?: string;
  maxItems?: number;
}

export default function ProductGrid({ 
  category, 
  title = "Products", 
  emptyMessage = "No products found.",
  className = "",
  maxItems = 100
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data || []);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const displayProducts = products.slice(0, maxItems);

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="flex items-center space-x-2 text-gray-600">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span>Loading {title.toLowerCase()}...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-600 mb-4">{emptyMessage}</p>
        <Link href="/admin" className="text-rose-600 hover:text-rose-800 underline">
          Add some products in the admin panel
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500">{displayProducts.length} items</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* Wishlist Button */}
              <button 
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <Heart 
                  className={`h-4 w-4 transition-colors ${
                    favorites.has(product.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                />
              </button>

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={(product.images && product.images[0]) || 'https://placehold.co/400x400?text=No+Image'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized={(product.images && product.images[0]) ? false : true}
                />

                {/* Quick View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg">
                    <Eye className="h-4 w-4" />
                    QUICK VIEW
                  </button>
                </div>

                {/* New Badge */}
                {new Date(product.createdAt).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000) && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      NEW
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                {product.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">${product.price}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {product.inStock ? `Stock: ${product.stockQuantity}` : 'Out of Stock'}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  className="w-full mt-3 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
