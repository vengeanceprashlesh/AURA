'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, ShoppingBag, Sun } from 'lucide-react';

const sunHats = [
  {
    id: 801,
    name: 'Wide Brim Straw Hat',
    price: 49.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=600&fit=crop&crop=center',
    brand: 'Summer Shade',
    rating: 4.8,
    reviews: 342,
    isNew: false,
    onSale: false,
    colors: ['Natural', 'White', 'Black'],
    materials: ['Straw', 'Cotton Band', 'Adjustable'],
    brimSize: 'Wide (4 inches)',
    uvProtection: 'UPF 50+'
  },
  {
    id: 802,
    name: 'Foldable Sun Visor',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?w=400&h=600&fit=crop&crop=center',
    brand: 'Active Sun',
    rating: 4.6,
    reviews: 189,
    isNew: false,
    onSale: true,
    colors: ['Navy', 'White', 'Pink', 'Khaki'],
    materials: ['Nylon', 'Adjustable Strap', 'Foldable Design'],
    brimSize: 'Medium (3 inches)',
    uvProtection: 'UPF 40+'
  },
  {
    id: 803,
    name: 'Bucket Sun Hat',
    price: 39.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=600&fit=crop&crop=center',
    brand: 'Beach Vibes',
    rating: 4.7,
    reviews: 267,
    isNew: true,
    onSale: false,
    colors: ['Denim', 'Khaki', 'White', 'Black'],
    materials: ['Cotton Canvas', 'Chin Strap', 'Packable'],
    brimSize: 'Medium (2.5 inches)',
    uvProtection: 'UPF 30+'
  },
  {
    id: 804,
    name: 'Elegant Sun Hat',
    price: 79.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop&crop=center',
    brand: 'Resort Chic',
    rating: 4.9,
    reviews: 156,
    isNew: true,
    onSale: false,
    colors: ['Natural', 'Black', 'Cream'],
    materials: ['Paper Straw', 'Grosgrain Ribbon', 'Structured Brim'],
    brimSize: 'Extra Wide (5 inches)',
    uvProtection: 'UPF 50+'
  },
  {
    id: 805,
    name: 'Sports Sun Cap',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=600&fit=crop&crop=center',
    brand: 'Athletic Pro',
    rating: 4.5,
    reviews: 298,
    isNew: false,
    onSale: true,
    colors: ['Navy', 'Black', 'Gray', 'White'],
    materials: ['Performance Fabric', 'Moisture Wicking', 'Adjustable'],
    brimSize: 'Standard (3 inches)',
    uvProtection: 'UPF 45+'
  },
  {
    id: 806,
    name: 'Garden Sun Hat',
    price: 35.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882f6d?w=400&h=600&fit=crop&crop=center',
    brand: 'Garden Style',
    rating: 4.4,
    reviews: 234,
    isNew: false,
    onSale: false,
    colors: ['Floral Print', 'Solid Beige', 'Blue Pattern'],
    materials: ['Cotton', 'Floral Lining', 'Tie Closure'],
    brimSize: 'Wide (4 inches)',
    uvProtection: 'UPF 35+'
  }
];

export default function SunHatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-orange-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories" className="text-gray-700 hover:text-orange-600">
                  Categories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/accessories" className="text-gray-700 hover:text-orange-600">
                  Accessories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/accessories/hats" className="text-gray-700 hover:text-orange-600">
                  Hats
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-orange-600 font-medium">Sun Hats</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sun className="w-10 h-10 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Sun Hats</h1>
            <Sun className="w-10 h-10 text-yellow-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay stylish and protected with our collection of sun hats. From wide-brim elegance to 
            sporty visors, find the perfect hat for your sunny day adventures.
          </p>
        </div>

        {/* Sun Protection Info */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 mb-8 border border-yellow-200">
          <div className="flex items-center mb-4">
            <Sun className="w-6 h-6 text-orange-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Why Sun Protection Matters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Protects from harmful UV rays year-round</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Prevents sunburn and skin damage</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Keeps you cool and comfortable</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 border-l-4 border-yellow-400">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Styles</option>
                <option>Wide Brim</option>
                <option>Bucket Hat</option>
                <option>Visor</option>
                <option>Cap</option>
                <option>Fedora</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UV Protection</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Protection Levels</option>
                <option>UPF 50+ (Excellent)</option>
                <option>UPF 40-49 (Very Good)</option>
                <option>UPF 25-39 (Good)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brim Size</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Sizes</option>
                <option>Wide (4+ inches)</option>
                <option>Medium (2.5-4 inches)</option>
                <option>Narrow (2.5 inches)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>UV Protection Level</option>
                <option>Best Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sunHats.map((hat) => (
            <div key={hat.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-yellow-50 to-orange-50 h-64 relative overflow-hidden">
                <Image
                  src={hat.image}
                  alt={hat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {hat.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                    NEW
                  </div>
                )}
                {hat.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Heart className="w-4 h-4 text-orange-500 hover:fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold rounded">
                  {hat.uvProtection}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{hat.brand}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{hat.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{hat.name}</h3>
                
                {/* Brim Size and UV Protection */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {hat.brimSize}
                  </span>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {hat.uvProtection}
                  </span>
                </div>

                {/* Materials */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {hat.materials.slice(0, 2).map((material, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {material}
                    </span>
                  ))}
                  {hat.materials.length > 2 && (
                    <span className="text-xs text-gray-500">+{hat.materials.length - 2}</span>
                  )}
                </div>

                {/* Colors */}
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-500 mr-2">Colors:</span>
                  <span className="text-xs text-gray-600">{hat.colors.length} options</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    {hat.onSale && hat.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-red-600">${hat.price}</span>
                        <span className="text-sm text-gray-500 line-through">${hat.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-orange-600">${hat.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{hat.reviews} reviews</span>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Info */}
        <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-yellow-400">
          <div className="flex items-center mb-4">
            <Sun className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Your Guide to Sun Hat Protection</h2>
          </div>
          <div className="prose prose-orange max-w-none">
            <p className="text-gray-600 mb-4">
              The right sun hat is your first line of defense against harmful UV rays while keeping you 
              stylish and comfortable. Understanding UV protection ratings and hat styles helps you make 
              the best choice for your lifestyle and sun exposure needs.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                  UV Protection Guide:
                </h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li><strong>UPF 50+:</strong> Blocks 98% of UV rays (Excellent)</li>
                  <li><strong>UPF 25-49:</strong> Blocks 96-98% of UV rays (Very Good)</li>
                  <li><strong>UPF 15-24:</strong> Blocks 93-96% of UV rays (Good)</li>
                  <li>Darker colors generally offer better protection</li>
                  <li>Tightly woven fabrics block more UV rays</li>
                  <li>Wet fabric may reduce UV protection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect For:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Beach vacations and pool days</li>
                  <li>Gardening and outdoor activities</li>
                  <li>Hiking and nature walks</li>
                  <li>Outdoor festivals and events</li>
                  <li>Golf and sports activities</li>
                  <li>Daily sun protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
