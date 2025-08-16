'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Heart, Ruler, Info, Star, Filter } from 'lucide-react';

export default function BottomsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showFitGuide, setShowFitGuide] = useState(false);

  const products = [
    {
      id: 1,
      name: 'High-Waisted Wide Leg Jeans',
      brand: 'AGOLDE',
      price: '₹15,480.65',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=600',
      category: 'jeans',
      fit: 'High-Rise',
      inseam: '32"',
      rise: '11.5"',
      sizes: ['24', '25', '26', '27', '28', '29', '30'],
      colors: ['denim-blue', 'black', 'white'],
      rating: 4.8,
      reviews: 156,
      href: '/products/1'
    },
    {
      id: 2,
      name: 'Pleated Mini Skirt',
      brand: 'Polo Ralph Lauren',
      price: '₹8,750.43',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&h=600',
      category: 'skirts',
      fit: 'Regular',
      inseam: null,
      rise: null,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['navy', 'black', 'plaid'],
      rating: 4.6,
      reviews: 89,
      href: '/products/2'
    },
    {
      id: 3,
      name: 'Tailored Straight Trousers',
      brand: 'The Frankie Shop',
      price: '₹12,350.78',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600',
      category: 'trousers',
      fit: 'Mid-Rise',
      inseam: '30"',
      rise: '9"',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['black', 'navy', 'cream'],
      rating: 4.9,
      reviews: 234,
      href: '/products/3'
    },
    {
      id: 4,
      name: 'Athletic Leggings',
      brand: 'Alo Yoga',
      price: '₹6,890.32',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
      category: 'leggings',
      fit: 'Compression',
      inseam: '25"',
      rise: '8"',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['black', 'grey', 'navy'],
      rating: 4.7,
      reviews: 567,
      href: '/products/4'
    }
  ];

  const fitGuides = {
    jeans: [
      { type: 'Skinny', description: 'Fitted through hip and thigh, tapered leg', bodyType: 'All body types' },
      { type: 'Straight', description: 'Straight leg from hip to ankle', bodyType: 'Rectangle, Pear' },
      { type: 'Wide Leg', description: 'Relaxed fit through hip and thigh, wide leg', bodyType: 'Apple, Rectangle' },
      { type: 'Bootcut', description: 'Fitted through thigh, slightly flared from knee', bodyType: 'Pear, Hourglass' }
    ],
    trousers: [
      { type: 'Slim', description: 'Fitted through hip and thigh', bodyType: 'All body types' },
      { type: 'Wide Leg', description: 'Relaxed fit, flowing silhouette', bodyType: 'Petite, Rectangle' },
      { type: 'Cropped', description: 'Shortened length, modern cut', bodyType: 'Tall, Rectangle' }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Bottoms', count: 1842 },
    { id: 'jeans', name: 'Jeans', count: 567 },
    { id: 'trousers', name: 'Trousers', count: 234 },
    { id: 'skirts', name: 'Skirts', count: 456 },
    { id: 'leggings', name: 'Leggings', count: 189 },
    { id: 'shorts', name: 'Shorts', count: 396 }
  ];

  const filteredProducts = activeTab === 'all' ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-charcoal-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-2">
              Bottoms
            </h1>
            <p className="text-lg text-charcoal-700">
              Find your perfect fit with our comprehensive size guide
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories/clothing" className="hover:text-dusty-rose-500">Clothing</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Bottoms</span>
        </nav>

        {/* Fit Guide Banner */}
        <div className="mb-8 bg-dusty-rose-50 rounded-lg border border-dusty-rose-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Ruler className="h-6 w-6 text-dusty-rose-600" />
              <div>
                <h3 className="font-heading text-lg font-semibold text-charcoal-900">Perfect Fit Guarantee</h3>
                <p className="text-charcoal-700">Use our fit guide to find your perfect size every time</p>
              </div>
            </div>
            <button
              onClick={() => setShowFitGuide(!showFitGuide)}
              className="px-4 py-2 bg-dusty-rose-500 text-white rounded-lg hover:bg-dusty-rose-600 transition-colors"
            >
              {showFitGuide ? 'Hide' : 'Show'} Fit Guide
            </button>
          </div>
        </div>

        {/* Fit Guide Modal */}
        {showFitGuide && (
          <div className="mb-8 bg-white rounded-lg shadow-lg border border-beige-200 p-6">
            <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-4">Fit Guide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Jeans Fit Guide */}
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-3 flex items-center">
                  <span className="mr-2">👖</span> Jeans Fit Guide
                </h4>
                <div className="space-y-3">
                  {fitGuides.jeans.map((fit) => (
                    <div key={fit.type} className="border border-beige-200 rounded-lg p-3">
                      <div className="font-medium text-charcoal-900">{fit.type}</div>
                      <div className="text-sm text-charcoal-600 mt-1">{fit.description}</div>
                      <div className="text-xs text-dusty-rose-600 mt-1">Best for: {fit.bodyType}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trousers Fit Guide */}
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-3 flex items-center">
                  <span className="mr-2">👔</span> Trousers Fit Guide
                </h4>
                <div className="space-y-3">
                  {fitGuides.trousers.map((fit) => (
                    <div key={fit.type} className="border border-beige-200 rounded-lg p-3">
                      <div className="font-medium text-charcoal-900">{fit.type}</div>
                      <div className="text-sm text-charcoal-600 mt-1">{fit.description}</div>
                      <div className="text-xs text-dusty-rose-600 mt-1">Best for: {fit.bodyType}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-beige-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-5 w-5 text-dusty-rose-500" />
                <span className="font-medium text-charcoal-900">Size Guide Tips</span>
              </div>
              <ul className="text-sm text-charcoal-700 space-y-1">
                <li>• Measure your waist at the narrowest point</li>
                <li>• Measure your hips at the fullest point</li>
                <li>• For inseam, measure from crotch to desired hem length</li>
                <li>• Consider the stretch of the fabric when choosing size</li>
              </ul>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="mb-6">
          <div className="border-b border-beige-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                    activeTab === category.id
                      ? 'border-dusty-rose-500 text-dusty-rose-600'
                      : 'border-transparent text-charcoal-500 hover:text-charcoal-700 hover:border-charcoal-300'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 px-2 py-1 text-xs bg-beige-100 text-charcoal-600 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={product.href} className="group">
              <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] bg-beige-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-charcoal-600" />
                  </button>

                  {/* Fit Badge */}
                  {product.fit && (
                    <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-charcoal-700">
                      {product.fit}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-charcoal-600 mb-1 font-medium uppercase tracking-wide">
                    {product.brand}
                  </div>
                  <h3 className="font-medium text-charcoal-900 mb-2 line-clamp-2 group-hover:text-dusty-rose-500 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Fit Details */}
                  <div className="mb-3 text-xs text-charcoal-600 space-y-1">
                    {product.inseam && <div>Inseam: {product.inseam}</div>}
                    {product.rise && <div>Rise: {product.rise}</div>}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-charcoal-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-charcoal-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-charcoal-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Available Sizes Indicator */}
                    <div className="text-xs text-charcoal-500">
                      {product.sizes.length} sizes
                    </div>
                  </div>

                  {/* Color Options */}
                  <div className="flex space-x-2 mt-3">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-charcoal-200"
                        style={{ 
                          backgroundColor: color === 'denim-blue' ? '#4169E1' : 
                                         color === 'plaid' ? '#8B4513' : color 
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Denim Care Guide */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-beige-200 p-8">
          <h3 className="font-heading text-2xl font-bold text-charcoal-900 mb-6">Denim Care Guide</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-dusty-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧼</span>
              </div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Wash Inside Out</h4>
              <p className="text-sm text-charcoal-600">Turn jeans inside out before washing to preserve color and reduce fading.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-dusty-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❄️</span>
              </div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Cold Water Only</h4>
              <p className="text-sm text-charcoal-600">Use cold water to prevent shrinking and maintain the integrity of the denim.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-dusty-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌬️</span>
              </div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Air Dry</h4>
              <p className="text-sm text-charcoal-600">Hang dry or lay flat to prevent shrinking and maintain shape.</p>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors">
            Load More Items
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
