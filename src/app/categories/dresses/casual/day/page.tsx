'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, ShoppingBag } from 'lucide-react';

const dayDresses = [
  {
    id: 101,
    name: 'Botanical Print Day Dress',
    price: 78.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces',
    brand: 'Garden Party',
    rating: 4.8,
    reviews: 124,
    isNew: true,
    onSale: false,
    colors: ['Green', 'Navy', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 102,
    name: 'Striped Cotton Day Dress',
    price: 65.99,
    originalPrice: 85.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
    brand: 'Daily Comfort',
    rating: 4.6,
    reviews: 89,
    isNew: false,
    onSale: true,
    colors: ['Navy/White', 'Black/White', 'Red/White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 103,
    name: 'Linen Blend Day Dress',
    price: 92.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=faces',
    brand: 'Natural Elegance',
    rating: 4.9,
    reviews: 156,
    isNew: true,
    onSale: false,
    colors: ['Beige', 'White', 'Sage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 104,
    name: 'Polka Dot Day Dress',
    price: 69.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=faces',
    brand: 'Vintage Vibes',
    rating: 4.7,
    reviews: 203,
    isNew: false,
    onSale: false,
    colors: ['Navy/White', 'Black/White', 'Green/White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 105,
    name: 'Jersey Knit Day Dress',
    price: 54.99,
    originalPrice: 72.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=faces',
    brand: 'Comfort First',
    rating: 4.5,
    reviews: 167,
    isNew: false,
    onSale: true,
    colors: ['Gray', 'Navy', 'Black', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 106,
    name: 'Embroidered Day Dress',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?w=400&h=600&fit=crop&crop=faces',
    brand: 'Artisan Style',
    rating: 4.8,
    reviews: 145,
    isNew: true,
    onSale: false,
    colors: ['White', 'Cream', 'Light Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  }
];

export default function DayDressesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-pink-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories" className="text-gray-700 hover:text-pink-600">
                  Categories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/dresses" className="text-gray-700 hover:text-pink-600">
                  Dresses
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/dresses/casual" className="text-gray-700 hover:text-pink-600">
                  Casual
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-pink-600 font-medium">Day Dresses</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Day Dresses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comfortable and stylish day dresses perfect for everyday adventures, brunch dates, and casual outings. 
            Designed for all-day comfort without compromising on style.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Sellers</option>
              <option>Highest Rated</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{dayDresses.length} items</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {dayDresses.map((dress) => (
            <div key={dress.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 h-64 relative overflow-hidden">
                <Image
                  src={dress.image}
                  alt={dress.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {dress.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
                    NEW
                  </div>
                )}
                {dress.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">{dress.name}</h3>
                
                {/* Colors */}
                <div className="flex items-center mb-2">
                  <span className="text-xs text-gray-500 mr-2">Colors:</span>
                  <div className="flex space-x-1">
                    {dress.colors.slice(0, 3).map((color, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        {color}{index < Math.min(dress.colors.length - 1, 2) && ','}
                      </div>
                    ))}
                    {dress.colors.length > 3 && <span className="text-xs text-gray-500">+{dress.colors.length - 3}</span>}
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
                      <span className="text-xl font-bold text-pink-600">${dress.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{dress.reviews} reviews</span>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Description */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Day Dresses</h2>
          <div className="prose prose-pink max-w-none">
            <p className="text-gray-600 mb-4">
              Day dresses are the perfect blend of comfort and style, designed for your everyday adventures. 
              Whether you're running errands, meeting friends for coffee, or enjoying a leisurely weekend, 
              these versatile pieces will keep you looking effortlessly chic.
            </p>
            <p className="text-gray-600 mb-4">
              Our collection features a variety of silhouettes, from relaxed fit-and-flare styles to 
              body-skimming jersey knits. Each dress is carefully selected for quality fabrics that 
              move with you throughout your day.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect For:</h3>
            <ul className="text-gray-600 list-disc list-inside space-y-1 mb-4">
              <li>Casual office environments</li>
              <li>Weekend brunch with friends</li>
              <li>Shopping and errands</li>
              <li>Picnics and outdoor activities</li>
              <li>Travel and vacation</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Styling Tips:</h3>
            <ul className="text-gray-600 list-disc list-inside space-y-1">
              <li>Pair with sneakers or flats for ultimate comfort</li>
              <li>Add a denim jacket or cardigan for layering</li>
              <li>Accessorize with a crossbody bag and simple jewelry</li>
              <li>Choose breathable fabrics like cotton and jersey for all-day comfort</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
