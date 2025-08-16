'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, ShoppingBag, Sun } from 'lucide-react';

const sundresses = [
  {
    id: 201,
    name: 'Tropical Print Sundress',
    price: 68.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces',
    brand: 'Beach Vibes',
    rating: 4.9,
    reviews: 256,
    isNew: true,
    onSale: false,
    colors: ['Coral', 'Turquoise', 'Yellow'],
    features: ['Adjustable Straps', 'Lined', 'Pockets']
  },
  {
    id: 202,
    name: 'Gingham Check Sundress',
    price: 52.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
    brand: 'Country Charm',
    rating: 4.7,
    reviews: 189,
    isNew: false,
    onSale: true,
    colors: ['Blue/White', 'Pink/White', 'Green/White'],
    features: ['Button Front', 'Tie Waist', 'Cotton Blend']
  },
  {
    id: 203,
    name: 'Flowy Chiffon Sundress',
    price: 85.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=faces',
    brand: 'Dreamy Days',
    rating: 4.8,
    reviews: 145,
    isNew: true,
    onSale: false,
    colors: ['Lavender', 'Peach', 'Mint'],
    features: ['Fully Lined', 'Elastic Waist', 'Flare Sleeves']
  },
  {
    id: 204,
    name: 'Denim Pinafore Sundress',
    price: 76.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=faces',
    brand: 'Casual Cool',
    rating: 4.6,
    reviews: 167,
    isNew: false,
    onSale: false,
    colors: ['Light Wash', 'Medium Wash', 'Dark Wash'],
    features: ['Adjustable Straps', 'Front Pockets', '100% Cotton']
  },
  {
    id: 205,
    name: 'Smocked Bodice Sundress',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=faces',
    brand: 'Sweet Summer',
    rating: 4.8,
    reviews: 234,
    isNew: false,
    onSale: true,
    colors: ['White', 'Blush', 'Sky Blue'],
    features: ['Smocked Bodice', 'Ruffled Hem', 'Strapless Option']
  },
  {
    id: 206,
    name: 'Wrap Style Sundress',
    price: 72.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?w=400&h=600&fit=crop&crop=faces',
    brand: 'Elegant Ease',
    rating: 4.9,
    reviews: 198,
    isNew: true,
    onSale: false,
    colors: ['Navy Floral', 'Red Dots', 'Black Print'],
    features: ['Wrap Front', 'Tie Closure', 'V-Neck']
  }
];

export default function SundressesPage() {
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
                <Link href="/categories/dresses" className="text-gray-700 hover:text-orange-600">
                  Dresses
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/dresses/casual" className="text-gray-700 hover:text-orange-600">
                  Casual
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-orange-600 font-medium">Sundresses</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sun className="w-10 h-10 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Sundresses</h1>
            <Sun className="w-10 h-10 text-yellow-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Light, breezy, and effortlessly beautiful sundresses perfect for warm weather adventures. 
            From beach days to garden parties, find your perfect sunny day companion.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm border-l-4 border-yellow-400">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Sellers</option>
              <option>Most Popular</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{sundresses.length} summer favorites</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sundresses.map((dress) => (
            <div key={dress.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
              <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-yellow-100 to-orange-100 h-64 relative overflow-hidden">
                <Image
                  src={dress.image}
                  alt={dress.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {dress.isNew && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                    NEW
                  </div>
                )}
                {dress.onSale && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-red-400 to-red-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Heart className="w-4 h-4 text-red-500 hover:fill-current" />
                  </button>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{dress.brand}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{dress.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{dress.name}</h3>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {dress.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {dress.features.length > 2 && (
                    <span className="text-xs text-gray-500">+{dress.features.length - 2}</span>
                  )}
                </div>

                {/* Colors */}
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-500 mr-2">Colors:</span>
                  <div className="flex space-x-1">
                    {dress.colors.map((color, index) => (
                      <div key={index} className="w-4 h-4 rounded-full border border-gray-200 bg-gradient-to-br from-yellow-200 to-orange-200" title={color} />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    {dress.onSale && dress.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-red-600">${dress.price}</span>
                        <span className="text-sm text-gray-500 line-through">${dress.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-orange-600">${dress.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{dress.reviews} reviews</span>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Description */}
        <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-yellow-400">
          <div className="flex items-center mb-4">
            <Sun className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">About Sundresses</h2>
          </div>
          <div className="prose prose-orange max-w-none">
            <p className="text-gray-600 mb-4">
              Sundresses are the epitome of effortless summer style. These lightweight, feminine pieces 
              are designed to keep you cool and comfortable while looking absolutely radiant under the sun. 
              Perfect for vacations, beach days, picnics, and any warm-weather occasion.
            </p>
            <p className="text-gray-600 mb-4">
              Our sundress collection features breathable fabrics like cotton, linen, and chiffon in 
              vibrant prints and classic solids. From mini to maxi lengths, each dress is crafted 
              to flatter your figure while providing the freedom to move and dance in the sunshine.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                  Perfect For:
                </h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Beach vacations and resort wear</li>
                  <li>Summer festivals and outdoor events</li>
                  <li>Garden parties and BBQs</li>
                  <li>Casual date nights</li>
                  <li>Weekend farmers markets</li>
                  <li>Travel and sightseeing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Summer Styling Tips:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Pair with sandals for a relaxed look</li>
                  <li>Add a sun hat and sunglasses for protection</li>
                  <li>Layer with a light cardigan for air conditioning</li>
                  <li>Accessorize with delicate jewelry</li>
                  <li>Choose breathable undergarments</li>
                  <li>Don't forget sunscreen for exposed areas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
