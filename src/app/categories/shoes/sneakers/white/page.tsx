'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, ShoppingBag, Zap } from 'lucide-react';

const whiteSneakers = [
  {
    id: 501,
    name: 'Classic White Leather Sneakers',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center',
    brand: 'Clean Steps',
    rating: 4.8,
    reviews: 1256,
    isNew: false,
    onSale: false,
    colors: ['Pure White', 'Off-White', 'Cream'],
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'],
    features: ['Leather Upper', 'Cushioned Sole', 'Breathable Lining']
  },
  {
    id: 502,
    name: 'Chunky White Sneakers',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=600&fit=crop&crop=center',
    brand: 'Bold Sole',
    rating: 4.6,
    reviews: 892,
    isNew: false,
    onSale: true,
    colors: ['White/Silver', 'White/Gold', 'All White'],
    sizes: ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    features: ['Platform Sole', 'Dad Shoe Style', 'Mixed Materials']
  },
  {
    id: 503,
    name: 'Minimalist White Sneakers',
    price: 79.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=600&fit=crop&crop=center',
    brand: 'Simple Style',
    rating: 4.9,
    reviews: 724,
    isNew: true,
    onSale: false,
    colors: ['Bright White', 'Ivory', 'Pearl'],
    sizes: ['5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'],
    features: ['Ultra Clean Design', 'Vegan Leather', 'Zero Waste Packaging']
  },
  {
    id: 504,
    name: 'Athletic White Sneakers',
    price: 149.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=600&fit=crop&crop=center',
    brand: 'Sport Pro',
    rating: 4.7,
    reviews: 1087,
    isNew: true,
    onSale: false,
    colors: ['White/Black', 'All White', 'White/Blue'],
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'],
    features: ['Memory Foam', 'Arch Support', 'Moisture Wicking']
  },
  {
    id: 505,
    name: 'Canvas White Sneakers',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882f6d?w=400&h=600&fit=crop&crop=center',
    brand: 'Canvas Co',
    rating: 4.4,
    reviews: 563,
    isNew: false,
    onSale: true,
    colors: ['Canvas White', 'Vintage White', 'Snow White'],
    sizes: ['5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    features: ['Canvas Material', 'Flexible Sole', 'Easy Care']
  },
  {
    id: 506,
    name: 'Designer White Sneakers',
    price: 299.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=600&fit=crop&crop=center',
    brand: 'Luxury Line',
    rating: 4.8,
    reviews: 245,
    isNew: true,
    onSale: false,
    colors: ['Designer White', 'Monochrome', 'Premium White'],
    sizes: ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    features: ['Premium Leather', 'Hand Crafted', 'Limited Edition']
  }
];

export default function WhiteSneakersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories" className="text-gray-700 hover:text-gray-900">
                  Categories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/shoes" className="text-gray-700 hover:text-gray-900">
                  Shoes
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/shoes/sneakers" className="text-gray-700 hover:text-gray-900">
                  Sneakers
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-gray-900 font-medium">White Sneakers</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-gray-700 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">White Sneakers</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clean, crisp, and versatile white sneakers that go with everything. The ultimate wardrobe staple 
            for effortless style and all-day comfort.
          </p>
        </div>

        {/* Why White Sneakers */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-center mb-4">
            <Zap className="w-5 h-5 text-gray-700 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Why White Sneakers?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-700">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Matches every outfit and color</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Timeless and never goes out of style</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Perfect for casual to smart-casual looks</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Easy to style up or down</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Styles</option>
                <option>Classic</option>
                <option>Chunky/Dad Shoe</option>
                <option>Minimalist</option>
                <option>Athletic</option>
                <option>Canvas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Materials</option>
                <option>Leather</option>
                <option>Canvas</option>
                <option>Synthetic</option>
                <option>Mesh</option>
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
                <option>11</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Most Popular</option>
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
          {whiteSneakers.map((sneaker) => (
            <div key={sneaker.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-50 h-64 relative overflow-hidden">
                <Image
                  src={sneaker.image}
                  alt={sneaker.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {sneaker.isNew && (
                  <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                    NEW
                  </div>
                )}
                {sneaker.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded shadow-lg">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Heart className="w-4 h-4 text-gray-600 hover:fill-current" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{sneaker.brand}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{sneaker.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{sneaker.name}</h3>
                
                {/* Key Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {sneaker.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {sneaker.features.length > 2 && (
                    <span className="text-xs text-gray-500">+{sneaker.features.length - 2}</span>
                  )}
                </div>

                {/* Available Sizes */}
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-500 mr-2">Sizes:</span>
                  <span className="text-xs text-gray-600">{sneaker.sizes.length} available</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    {sneaker.onSale && sneaker.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-red-600">${sneaker.price}</span>
                        <span className="text-sm text-gray-500 line-through">${sneaker.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">${sneaker.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{sneaker.reviews} reviews</span>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Info */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The White Sneaker Edit</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              White sneakers are the ultimate wardrobe chameleon. They're the one shoe that can instantly 
              elevate a casual outfit while remaining comfortable enough for all-day wear. From minimalist 
              leather styles to chunky dad sneakers, white footwear has become synonymous with effortless cool.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect Pairings:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Denim and white tee for classic casual</li>
                  <li>Midi dresses for feminine-sporty mix</li>
                  <li>Tailored pants for smart-casual office</li>
                  <li>Athleisure for gym-to-street style</li>
                  <li>Maxi skirts for boho-chic vibes</li>
                  <li>Cropped jeans to show off the shoes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Care Tips:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Clean regularly with mild soap and water</li>
                  <li>Use a soft brush for stubborn stains</li>
                  <li>Air dry away from direct sunlight</li>
                  <li>Protect with waterproof spray</li>
                  <li>Store with shoe trees to maintain shape</li>
                  <li>Rotate pairs to extend lifespan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
