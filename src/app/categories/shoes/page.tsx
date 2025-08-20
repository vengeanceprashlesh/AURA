'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Eye } from 'lucide-react';

type ApiProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  createdAt?: string | Date;
};

const designers = ['All', 'adidas Originals', 'Asics', 'Steve Madden', 'Veja', 'Tony Bianco', 'Havaianas'];
const sizes = ['All', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
const colors = ['All', 'Black', 'White', 'Brown', 'Navy', 'Gray', 'Tan', 'Green', 'Nude'];
const priceRanges = ['All', 'Under £5,000', '£5,000 - £10,000', '£10,000 - £15,000', '£15,000+'];
const heelHeights = ['All', 'Flat', 'Low (1-2")', 'Mid (2-3")', 'High (3-4")', 'Very High (4"+)'];

export default function ShoesPage() {
  const [selectedDesigner, setSelectedDesigner] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedHeelHeight, setSelectedHeelHeight] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [viewCount, setViewCount] = useState(500);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products?category=shoes', { cache: 'no-store' });
        const data = await res.json();
        const list: ApiProduct[] = data.data ?? data;
        if (mounted) setItems(list);
      } catch (e) {
        console.error('Failed to fetch shoes', e);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Filter and sort products
  const filteredProducts = items
    .filter(product => {
      // Designer filter mapped to first tag (if any)
      const brand = (product.tags && product.tags[0]) || '';
      if (selectedDesigner !== 'All' && brand !== selectedDesigner) return false;
      // Color filter skipped (no colors in API)
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Most Popular':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'Newest':
          return (new Date(b.createdAt || 0).getTime()) - (new Date(a.createdAt || 0).getTime());
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            <strong className="text-black">{loading ? 'Loading...' : `${filteredProducts.length.toLocaleString()} ITEMS`}</strong>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Featured">Featured</option>
                  <option value="Newest">Newest</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Most Popular">Most Popular</option>
                </select>
                <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* View Count */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View</span>
              <div className="relative">
                <select
                  value={viewCount}
                  onChange={(e) => setViewCount(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                </select>
                <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, viewCount).map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Wishlist Button */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
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
                    src={(product.images && product.images[0]) || 'https://placehold.co/600x600?text=No+Image'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Badges intentionally omitted for API-backed products */}

                  {/* Best Seller Badge intentionally omitted */}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      QUICK VIEW
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="text-xs text-gray-600 mb-1">{(product.tags && product.tags[0]) || '—'}</div>
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.originalPrice !== undefined && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Color Options intentionally omitted */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > viewCount && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setViewCount(prev => prev + 500)}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Load More Shoes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
