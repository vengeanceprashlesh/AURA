'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, ShoppingBag, RotateCcw } from 'lucide-react';

const wrapDresses = [
  {
    id: 301,
    name: 'Classic Wrap Midi Dress',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces',
    brand: 'Timeless Style',
    rating: 4.8,
    reviews: 342,
    isNew: false,
    onSale: false,
    colors: ['Black', 'Navy', 'Burgundy', 'Forest Green'],
    lengths: ['Mini', 'Midi', 'Maxi'],
    features: ['Adjustable Tie', 'V-Neck', 'Long Sleeves']
  },
  {
    id: 302,
    name: 'Floral Print Wrap Dress',
    price: 72.99,
    originalPrice: 95.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
    brand: 'Garden Romance',
    rating: 4.7,
    reviews: 218,
    isNew: false,
    onSale: true,
    colors: ['Blush Floral', 'Navy Floral', 'Green Floral'],
    lengths: ['Mini', 'Midi'],
    features: ['Wrap Tie', 'Short Sleeves', 'Lined']
  },
  {
    id: 303,
    name: 'Jersey Knit Wrap Dress',
    price: 65.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=faces',
    brand: 'Comfort Plus',
    rating: 4.9,
    reviews: 467,
    isNew: true,
    onSale: false,
    colors: ['Charcoal', 'Teal', 'Mauve', 'Olive'],
    lengths: ['Midi', 'Maxi'],
    features: ['Stretch Fabric', '3/4 Sleeves', 'Machine Washable']
  },
  {
    id: 304,
    name: 'Satin Wrap Evening Dress',
    price: 135.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=faces',
    brand: 'Evening Luxe',
    rating: 4.6,
    reviews: 156,
    isNew: true,
    onSale: false,
    colors: ['Champagne', 'Deep Red', 'Midnight Blue'],
    lengths: ['Midi', 'Maxi'],
    features: ['Satin Finish', 'Wrap Belt', 'Fully Lined']
  },
  {
    id: 305,
    name: 'Polka Dot Wrap Dress',
    price: 58.99,
    originalPrice: 78.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=faces',
    brand: 'Retro Chic',
    rating: 4.5,
    reviews: 289,
    isNew: false,
    onSale: true,
    colors: ['Black/White', 'Navy/White', 'Red/White'],
    lengths: ['Mini', 'Midi'],
    features: ['Retro Style', 'Belt Tie', 'Cotton Blend']
  },
  {
    id: 306,
    name: 'Bohemian Wrap Maxi Dress',
    price: 98.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?w=400&h=600&fit=crop&crop=faces',
    brand: 'Boho Dreams',
    rating: 4.8,
    reviews: 203,
    isNew: true,
    onSale: false,
    colors: ['Paisley Print', 'Sunset Ombre', 'Earth Tone'],
    lengths: ['Maxi'],
    features: ['Bell Sleeves', 'Tie Waist', 'Flowing Fabric']
  }
];

export default function WrapDressesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-rose-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories" className="text-gray-700 hover:text-rose-600">
                  Categories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/dresses" className="text-gray-700 hover:text-rose-600">
                  Dresses
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/dresses/casual" className="text-gray-700 hover:text-rose-600">
                  Casual
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-rose-600 font-medium">Wrap Dresses</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <RotateCcw className="w-8 h-8 text-rose-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Wrap Dresses</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Universally flattering wrap dresses that enhance your natural silhouette. 
            The timeless wrap style offers comfort, elegance, and versatility for any occasion.
          </p>
        </div>

        {/* Style Guide */}
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <RotateCcw className="w-5 h-5 text-rose-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Why Choose Wrap Dresses?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Flattering for all body types with adjustable fit</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Versatile styling from casual to formal</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Comfortable wrap-around design</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm border-l-4 border-rose-400">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Highest Rated</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{wrapDresses.length} wrap styles</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {wrapDresses.map((dress) => (
            <div key={dress.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-rose-100 to-pink-100 h-64 relative overflow-hidden">
                <Image
                  src={dress.image}
                  alt={dress.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {dress.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                    NEW
                  </div>
                )}
                {dress.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Heart className="w-4 h-4 text-rose-500 hover:fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <RotateCcw className="w-5 h-5 text-white/80" />
                </div>
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
                
                {/* Lengths Available */}
                <div className="flex items-center mb-2">
                  <span className="text-xs text-gray-500 mr-2">Lengths:</span>
                  <div className="flex space-x-1">
                    {dress.lengths.map((length, index) => (
                      <span key={index} className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">
                        {length}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {dress.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {dress.features.length > 2 && (
                    <span className="text-xs text-gray-500">+{dress.features.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    {dress.onSale && dress.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-red-600">${dress.price}</span>
                        <span className="text-sm text-gray-500 line-through">${dress.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-rose-600">${dress.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{dress.reviews} reviews</span>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-md hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-md">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Description */}
        <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-rose-400">
          <div className="flex items-center mb-4">
            <RotateCcw className="w-6 h-6 text-rose-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">About Wrap Dresses</h2>
          </div>
          <div className="prose prose-rose max-w-none">
            <p className="text-gray-600 mb-4">
              Wrap dresses are a wardrobe essential that has stood the test of time. Originally popularized 
              in the 1970s, this iconic silhouette continues to be a favorite for its universally flattering 
              fit and effortless elegance. The wrap design creates a beautiful V-neckline while the tie closure 
              allows you to adjust the fit to your preference.
            </p>
            <p className="text-gray-600 mb-4">
              From casual day dresses to sophisticated evening wear, our wrap dress collection offers styles 
              for every occasion. The adjustable nature of wrap dresses makes them perfect for changing body 
              shapes and sizes, ensuring you always look and feel your best.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect For:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Office and business meetings</li>
                  <li>Date nights and dinner parties</li>
                  <li>Wedding guest attire</li>
                  <li>Brunch with friends</li>
                  <li>Travel and vacation</li>
                  <li>Maternity and nursing friendly</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Styling Tips:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Tie at natural waist for most flattering silhouette</li>
                  <li>Layer with blazers for professional look</li>
                  <li>Add statement jewelry to elevate the outfit</li>
                  <li>Choose the right undergarments for smooth lines</li>
                  <li>Belt over the wrap for extra definition</li>
                  <li>Pair with heels to elongate the legs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
