'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Heart } from 'lucide-react';

const BagsPage = () => {
  const categories = [
    { 
      id: 'handbags', 
      name: 'Handbags', 
      href: '/categories/accessories/bags/handbags', 
      count: 48,
      description: 'Stylish handbags for every occasion',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=300'
    },
    { 
      id: 'backpacks', 
      name: 'Backpacks', 
      href: '/categories/accessories/bags/backpacks', 
      count: 18,
      description: 'Functional backpacks for work and travel',
      image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=400&h=300'
    },
  ];

  const featuredBags = [
    {
      id: 1,
      name: 'Classic Leather Tote',
      price: 189.99,
      originalPrice: 229.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      isNew: false,
      onSale: true
    },
    {
      id: 2,
      name: 'Urban Backpack',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=300&h=400&fit=crop',
      isNew: true,
      onSale: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section - Mobile Responsive */}
      <div className="relative h-48 sm:h-64 lg:h-80 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&h=600)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
              Bags
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Complete your look with our stunning collection of bags. From everyday essentials to statement pieces.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumb - Mobile Responsive */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 overflow-x-auto">
          <Link href="/" className="hover:text-amber-600 whitespace-nowrap">Home</Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <Link href="/categories" className="hover:text-amber-600 whitespace-nowrap">Categories</Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <Link href="/categories/accessories" className="hover:text-amber-600 whitespace-nowrap">Accessories</Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="text-amber-600 font-medium whitespace-nowrap">Bags</span>
        </nav>

        {/* Category Navigation - Mobile Responsive */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
            Shop by Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={category.href} className="group block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40 sm:h-48 lg:h-56 bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.count} items
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-medium text-amber-600 group-hover:text-amber-700">
                        Shop Now
                      </span>
                      <ChevronRight className="h-4 w-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products - Mobile Responsive */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
            Featured Bags
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredBags.map((bag) => (
              <div key={bag.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 sm:h-56 lg:h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={bag.image}
                    alt={bag.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {bag.isNew && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                      NEW
                    </div>
                  )}
                  {bag.onSale && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                      SALE
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{bag.name}</h3>
                  <div className="flex items-center justify-between">
                    {bag.onSale && bag.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-red-600">${bag.price}</span>
                        <span className="text-sm text-gray-500 line-through">${bag.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-amber-600">${bag.price}</span>
                    )}
                    <button className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters Section - Mobile Responsive */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Filter by</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>All Sizes</option>
                <option>Mini</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>All Materials</option>
                <option>Leather</option>
                <option>Canvas</option>
                <option>Synthetic</option>
                <option>Fabric</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>All Colors</option>
                <option>Black</option>
                <option>Brown</option>
                <option>Navy</option>
                <option>Tan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
        </section>

        {/* Info Section - Mobile Responsive */}
        <section className="bg-amber-50 rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left">
            Why Choose Our Bags?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Quality Materials</h3>
              <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
                <li>• Premium leather and durable fabrics</li>
                <li>• Reinforced stitching and construction</li>
                <li>• Water-resistant treatments</li>
                <li>• Quality hardware and zippers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Perfect for Every Occasion</h3>
              <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
                <li>• Professional work bags</li>
                <li>• Casual everyday styles</li>
                <li>• Travel and adventure ready</li>
                <li>• Evening and special events</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BagsPage;
