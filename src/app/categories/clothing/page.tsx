'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Grid, List, Heart, Star } from 'lucide-react';

type ApiProduct = {
  id: string;
  name: string;
  description?: string;
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

const subcategories = [
  { name: 'All', value: '' },
  { name: 'Tops', value: 'Tops' },
  { name: 'Bottoms', value: 'Bottoms' },
  { name: 'Outerwear', value: 'Outerwear' },
];

export default function ClothingPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products?category=clothing', { cache: 'no-store' });
        const data = await res.json();
        const list: ApiProduct[] = data.data ?? data; // support either {data:[]} or []
        if (mounted) setItems(list);
      } catch (e) {
        console.error('Failed to fetch clothing products', e);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);
  
  // Filter and sort products
  const filteredProducts = items
    .filter(product => !selectedSubcategory || product.subcategory === selectedSubcategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (new Date(b.createdAt || 0).getTime()) - (new Date(a.createdAt || 0).getTime());
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popular':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return 0;
      }
    });
  const featuredItems = [
    {
      id: 'essential-blazers',
      name: 'Essential Blazers',
      href: '/collections/blazers',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&h=400',
      description: 'Perfect for work and play',
    },
    {
      id: 'denim-edit',
      name: 'Denim Edit',
      href: '/collections/denim',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&h=400',
      description: 'Find your perfect fit',
    },
  ];

  const categories = [
    {
      name: 'Tops',
      href: '/categories/clothing/tops',
      items: [
        'Blouses', 'Shirts', 'T-Shirts', 'Tank Tops', 'Sweaters', 'Cardigans'
      ]
    },
    {
      name: 'Bottoms',
      href: '/categories/clothing/bottoms',
      items: [
        'Jeans', 'Trousers', 'Leggings', 'Skirts', 'Shorts'
      ]
    },
    {
      name: 'Outerwear',
      href: '/categories/clothing/outerwear',
      items: [
        'Coats', 'Jackets', 'Blazers', 'Vests'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Header */}
      <div className="bg-white border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
            <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-charcoal-900 font-medium">Clothing</span>
          </nav>

          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-4">
              Clothing
            </h1>
            <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
              Discover our complete collection of clothing for every occasion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Subcategory Filter */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-beige-200">
              <h3 className="font-semibold text-charcoal-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory.value}
                    onClick={() => setSelectedSubcategory(subcategory.value)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedSubcategory === subcategory.value
                        ? 'bg-dusty-rose-500 text-white'
                        : 'text-charcoal-700 hover:bg-beige-100'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-sm border border-beige-200">
              <div className="flex items-center gap-4">
                <span className="text-charcoal-700">
                  {loading ? 'Loading...' : `${filteredProducts.length} products`}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-700 bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={(product.images && product.images[0]) || 'https://placehold.co/600x800?text=No+Image'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.createdAt && (Date.now() - new Date(product.createdAt).getTime()) < 1000*60*60*24*30 && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-dusty-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            NEW
                          </span>
                        </div>
                      )}
                      {product.originalPrice !== undefined && product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            SALE
                          </span>
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <div className="text-xs text-charcoal-500 mb-1">{(product as any).brand || (product.tags && product.tags[0]) || '—'}</div>
                      <h3 className="font-medium text-charcoal-900 mb-2 group-hover:text-dusty-rose-500 transition-colors">
                        {product.name}
                      </h3>
                      <div className="text-xs text-charcoal-600 mb-2">{product.subcategory || '—'}</div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-charcoal-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-charcoal-500">({product.reviewCount || 0})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-charcoal-900">
                          ${product.price}
                        </span>
                        {product.originalPrice !== undefined && (
                          <span className="text-sm text-charcoal-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-dusty-rose-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-dusty-rose-600 transition-colors">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
