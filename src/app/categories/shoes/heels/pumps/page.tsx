'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, ShoppingBag } from 'lucide-react';

const pumps = [
  {
    id: 401,
    name: 'Classic Black Pumps',
    price: 149.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop&crop=center',
    brand: 'Elegant Steps',
    rating: 4.8,
    reviews: 342,
    isNew: false,
    onSale: false,
    colors: ['Black', 'Navy', 'Brown', 'Nude'],
    heelHeight: '3 inches',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    features: ['Cushioned Insole', 'Non-slip sole', 'Leather upper']
  },
  {
    id: 402,
    name: 'Nude Patent Pumps',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center',
    brand: 'Luxe Collection',
    rating: 4.7,
    reviews: 268,
    isNew: false,
    onSale: true,
    colors: ['Nude', 'Black Patent', 'Red Patent'],
    heelHeight: '4 inches',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '10'],
    features: ['Patent leather', 'Pointed toe', 'Slip-resistant']
  },
  {
    id: 403,
    name: 'Suede Block Heel Pumps',
    price: 165.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=600&fit=crop&crop=center',
    brand: 'Modern Classic',
    rating: 4.9,
    reviews: 189,
    isNew: true,
    onSale: false,
    colors: ['Taupe Suede', 'Black Suede', 'Gray Suede'],
    heelHeight: '2.5 inches',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5'],
    features: ['Block heel', 'Suede material', 'Comfortable fit']
  },
  {
    id: 404,
    name: 'Pointed Toe Stiletto Pumps',
    price: 189.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=600&fit=crop&crop=center',
    brand: 'High Fashion',
    rating: 4.6,
    reviews: 156,
    isNew: true,
    onSale: false,
    colors: ['Black', 'Red', 'Leopard Print'],
    heelHeight: '4.5 inches',
    sizes: ['5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5'],
    features: ['Stiletto heel', 'Pointed toe', 'Evening wear']
  },
  {
    id: 405,
    name: 'Mary Jane Pumps',
    price: 139.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=600&fit=crop&crop=center',
    brand: 'Vintage Inspired',
    rating: 4.5,
    reviews: 203,
    isNew: false,
    onSale: true,
    colors: ['Black', 'Brown', 'Wine'],
    heelHeight: '2 inches',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'],
    features: ['Strap closure', 'Low heel', 'Retro style']
  },
  {
    id: 406,
    name: 'Platform Pumps',
    price: 175.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?w=400&h=600&fit=crop&crop=center',
    brand: 'Bold Heights',
    rating: 4.7,
    reviews: 124,
    isNew: true,
    onSale: false,
    colors: ['Black', 'Nude', 'Metallic'],
    heelHeight: '5 inches (1" platform)',
    sizes: ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'],
    features: ['Platform sole', 'Extra height', 'Statement piece']
  }
];

export default function PumpsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-purple-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories" className="text-gray-700 hover:text-purple-600">
                  Categories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/shoes" className="text-gray-700 hover:text-purple-600">
                  Shoes
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/shoes/heels" className="text-gray-700 hover:text-purple-600">
                  Heels
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-purple-600 font-medium">Pumps</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pump Heels</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Classic and elegant pump heels that elevate any outfit. From office meetings to evening events, 
            find the perfect pair to complete your sophisticated look.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 border-l-4 border-purple-400">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heel Height</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Heights</option>
                <option>Low (1-2")</option>
                <option>Medium (2-3")</option>
                <option>High (3-4")</option>
                <option>Very High (4")</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Colors</option>
                <option>Black</option>
                <option>Nude/Beige</option>
                <option>Brown</option>
                <option>Navy</option>
                <option>Red</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Sizes</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
                <option>8.5</option>
                <option>9</option>
                <option>9.5</option>
                <option>10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {pumps.map((pump) => (
            <div key={pump.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 h-64 relative overflow-hidden">
                <Image
                  src={pump.image}
                  alt={pump.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {pump.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                    NEW
                  </div>
                )}
                {pump.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Heart className="w-4 h-4 text-purple-500 hover:fill-current" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{pump.brand}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{pump.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{pump.name}</h3>
                
                {/* Heel Height */}
                <div className="flex items-center mb-2">
                  <span className="text-xs text-gray-500 mr-2">Heel:</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {pump.heelHeight}
                  </span>
                </div>

                {/* Available Colors */}
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-500 mr-2">Colors:</span>
                  <span className="text-xs text-gray-600">{pump.colors.length} options</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    {pump.onSale && pump.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-red-600">${pump.price}</span>
                        <span className="text-sm text-gray-500 line-through">${pump.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-purple-600">${pump.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{pump.reviews} reviews</span>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-md hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-md">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Info */}
        <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-purple-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Pump Heels</h2>
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-4">
              Pump heels are the quintessential classic shoe that every woman should have in her closet. 
              These timeless shoes feature a closed-toe design with no fastenings, making them easy to slip on 
              and perfect for professional and formal occasions.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect For:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Business meetings and interviews</li>
                  <li>Formal events and weddings</li>
                  <li>Professional office wear</li>
                  <li>Date nights and dinner parties</li>
                  <li>Graduation ceremonies</li>
                  <li>Special occasions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Styling Tips:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Choose nude pumps to elongate legs</li>
                  <li>Black pumps are the most versatile</li>
                  <li>Match heel height to comfort level</li>
                  <li>Consider cushioned insoles for all-day wear</li>
                  <li>Keep spare flats in your bag for emergencies</li>
                  <li>Break in new pumps gradually</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
