'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';
import ProductGrid from '@/components/DynamicProductGrid';

const JewelryPage = () => {
  const categories = [
    { 
      id: 'necklaces', 
      name: 'Necklaces', 
      href: '/categories/accessories/jewelry/necklaces', 
      count: 32,
      description: 'Elegant necklaces for every occasion',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&h=300'
    },
    { 
      id: 'earrings', 
      name: 'Earrings', 
      href: '/categories/accessories/jewelry/earrings', 
      count: 28,
      description: 'Beautiful earrings to frame your face',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&h=300'
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Hero Section - Mobile Responsive */}
      <div className="relative h-48 sm:h-64 lg:h-80 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&h=600)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 mr-2 sm:mr-3" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                Jewelry
              </h1>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 ml-2 sm:ml-3" />
            </div>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Discover our curated collection of elegant jewelry pieces that add the perfect finishing touch to any outfit.
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
          <span className="text-amber-600 font-medium whitespace-nowrap">Jewelry</span>
        </nav>

        {/* Category Navigation - Mobile Responsive */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 mr-2" />
            Shop by Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={category.href} className="group block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-amber-400">
                  <div className="relative h-40 sm:h-48 lg:h-56 bg-gradient-to-br from-amber-50 to-yellow-50">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 bg-amber-100 px-2 py-1 rounded-full">
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
          <div className="flex items-center mb-6 sm:mb-8 justify-center sm:justify-start">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 mr-2" />
          </div>
          <ProductGrid 
            category="jewelry" 
            title="Jewelry"
            emptyMessage="No jewelry available. Add some jewelry in the admin panel!"
            className=""
          />
        </section>

        {/* Filters Section - Mobile Responsive */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8 border-l-4 border-amber-400">
          <div className="flex items-center mb-4">
            <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Filter by</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>All Materials</option>
                <option>Gold</option>
                <option>Silver</option>
                <option>Rose Gold</option>
                <option>Pearls</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>All Occasions</option>
                <option>Everyday</option>
                <option>Formal</option>
                <option>Wedding</option>
                <option>Evening</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>All Prices</option>
                <option>Under $50</option>
                <option>$50 - $100</option>
                <option>$100 - $200</option>
                <option>Over $200</option>
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
        <section className="bg-amber-50 rounded-lg p-6 sm:p-8 border-l-4 border-amber-400">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-amber-500 mr-2" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
              About Our Jewelry Collection
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                Quality Promise
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
                <li>â€¢ Hypoallergenic materials for sensitive skin</li>
                <li>â€¢ Tarnish-resistant finishes</li>
                <li>â€¢ Secure clasps and settings</li>
                <li>â€¢ Quality control tested</li>
                <li>â€¢ Gift-ready packaging</li>
                <li>â€¢ 30-day return policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Styling Tips</h3>
              <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
                <li>â€¢ Layer delicate necklaces for a trendy look</li>
                <li>â€¢ Mix metals for modern styling</li>
                <li>â€¢ Choose statement pieces as focal points</li>
                <li>â€¢ Consider your neckline when selecting necklaces</li>
                <li>â€¢ Stack rings and bracelets for texture</li>
                <li>â€¢ Match jewelry metals to your watch</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JewelryPage;

