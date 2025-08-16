'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star } from 'lucide-react';

// Dress products with variety
const dressProducts = [
  {
    id: 3,
    name: 'Floral Summer Dress',
    subcategory: 'Casual',
    occasion: 'Daytime',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces',
    brand: 'Summer Breeze',
    rating: 4.9,
    reviews: 89,
    isNew: true,
    onSale: false,
  },
  {
    id: 7,
    name: 'Little Black Dress',
    subcategory: 'Formal',
    occasion: 'Evening',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?w=400&h=600&fit=crop&crop=faces',
    brand: 'Classic Elegance',
    rating: 4.9,
    reviews: 345,
    isNew: false,
    onSale: false,
  },
  {
    id: 21,
    name: 'Bohemian Maxi Dress',
    subcategory: 'Casual',
    occasion: 'Vacation',
    price: 89.99,
    originalPrice: 120.99,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=faces',
    brand: 'Boho Dreams',
    rating: 4.7,
    reviews: 156,
    isNew: false,
    onSale: true,
  },
  {
    id: 22,
    name: 'Midi Wrap Dress',
    subcategory: 'Work',
    occasion: 'Business',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=faces',
    brand: 'Professional Style',
    rating: 4.6,
    reviews: 203,
    isNew: true,
    onSale: false,
  },
  {
    id: 23,
    name: 'Cocktail Party Dress',
    subcategory: 'Formal',
    occasion: 'Party',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=faces',
    brand: 'Party Perfect',
    rating: 4.8,
    reviews: 127,
    isNew: true,
    onSale: false,
  },
  {
    id: 24,
    name: 'Vintage A-Line Dress',
    subcategory: 'Casual',
    occasion: 'Brunch',
    price: 109.99,
    originalPrice: 139.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
    brand: 'Retro Charm',
    rating: 4.5,
    reviews: 78,
    isNew: false,
    onSale: true,
  },
];

const subcategories = [
  { name: 'All Dresses', value: '' },
  { name: 'Casual', value: 'Casual' },
  { name: 'Formal', value: 'Formal' },
  { name: 'Work', value: 'Work' },
];

const occasions = [
  { name: 'All Occasions', value: '' },
  { name: 'Daytime', value: 'Daytime' },
  { name: 'Evening', value: 'Evening' },
  { name: 'Party', value: 'Party' },
  { name: 'Business', value: 'Business' },
  { name: 'Vacation', value: 'Vacation' },
];

export default function DressesPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Filter products based on selections
  const filteredProducts = dressProducts.filter((product) => {
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    const matchesOccasion = !selectedOccasion || product.occasion === selectedOccasion;
    return matchesSubcategory && matchesOccasion;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return Number(b.isNew) - Number(a.isNew);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-dusty-rose-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-2">
              DRESSES
            </h1>
            <p className="text-lg text-charcoal-700">
              Find the perfect dress for every occasion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Dresses</span>
        </nav>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-beige-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Category
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full px-3 py-2 border border-beige-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dusty-rose-500"
              >
                {subcategories.map((subcategory) => (
                  <option key={subcategory.value} value={subcategory.value}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Occasion
              </label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full px-3 py-2 border border-beige-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dusty-rose-500"
              >
                {occasions.map((occasion) => (
                  <option key={occasion.value} value={occasion.value}>
                    {occasion.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-beige-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dusty-rose-500"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-charcoal-600">
                {sortedProducts.length} dress{sortedProducts.length !== 1 ? 'es' : ''} found
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-dusty-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    NEW
                  </div>
                )}
                {product.onSale && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    SALE
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Heart className="h-4 w-4 text-charcoal-600" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-charcoal-500 uppercase tracking-wide">{product.brand}</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-charcoal-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-medium text-charcoal-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {product.onSale && product.originalPrice ? (
                      <>
                        <span className="text-lg font-semibold text-red-600">${product.price}</span>
                        <span className="text-sm text-charcoal-500 line-through">${product.originalPrice}</span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold text-charcoal-900">${product.price}</span>
                    )}
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium text-dusty-rose-600 hover:text-dusty-rose-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
                <div className="mt-2 text-xs text-charcoal-500">
                  {product.reviews} review{product.reviews !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-600 text-lg mb-4">No dresses found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedSubcategory('');
                setSelectedOccasion('');
              }}
              className="text-dusty-rose-600 hover:text-dusty-rose-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
