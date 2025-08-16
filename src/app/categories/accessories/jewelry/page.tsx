'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, ShoppingBag, Sparkles } from 'lucide-react';

const jewelry = [
  {
    id: 601,
    name: 'Layered Gold Chain Necklace',
    price: 68.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop&crop=center',
    brand: 'Golden Thread',
    rating: 4.8,
    reviews: 456,
    isNew: true,
    onSale: false,
    materials: ['18k Gold Plated', 'Hypoallergenic', 'Tarnish Resistant'],
    type: 'Necklace',
    occasion: ['Everyday', 'Date Night', 'Work']
  },
  {
    id: 602,
    name: 'Pearl Drop Earrings',
    price: 45.99,
    originalPrice: 65.99,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop&crop=center',
    brand: 'Pearl Essence',
    rating: 4.9,
    reviews: 312,
    isNew: false,
    onSale: true,
    materials: ['Freshwater Pearls', 'Sterling Silver', 'Secure Backing'],
    type: 'Earrings',
    occasion: ['Formal', 'Wedding', 'Office']
  },
  {
    id: 603,
    name: 'Minimalist Ring Set',
    price: 39.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=600&fit=crop&crop=center',
    brand: 'Simple Luxe',
    rating: 4.7,
    reviews: 689,
    isNew: false,
    onSale: false,
    materials: ['Sterling Silver', 'Adjustable', 'Set of 5'],
    type: 'Rings',
    occasion: ['Everyday', 'Casual', 'Stacking']
  },
  {
    id: 604,
    name: 'Statement Crystal Bracelet',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&h=600&fit=crop&crop=center',
    brand: 'Crystal Dreams',
    rating: 4.6,
    reviews: 234,
    isNew: true,
    onSale: false,
    materials: ['Swarovski Crystals', 'Gold Filled', 'Magnetic Clasp'],
    type: 'Bracelet',
    occasion: ['Evening', 'Special Events', 'Parties']
  },
  {
    id: 605,
    name: 'Vintage Inspired Brooch',
    price: 52.99,
    originalPrice: 72.99,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop&crop=center',
    brand: 'Retro Charm',
    rating: 4.5,
    reviews: 167,
    isNew: false,
    onSale: true,
    materials: ['Antique Brass', 'Rhinestones', 'Secure Pin'],
    type: 'Brooch',
    occasion: ['Vintage Style', 'Formal', 'Unique']
  },
  {
    id: 606,
    name: 'Delicate Chain Anklet',
    price: 24.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594736797933-d0b71abcfac6?w=400&h=600&fit=crop&crop=center',
    brand: 'Beach Vibes',
    rating: 4.4,
    reviews: 523,
    isNew: false,
    onSale: false,
    materials: ['Gold Filled', 'Adjustable Length', 'Charm Detail'],
    type: 'Anklet',
    occasion: ['Summer', 'Beach', 'Casual']
  }
];

export default function JewelryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-amber-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories" className="text-gray-700 hover:text-amber-600">
                  Categories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link href="/categories/accessories" className="text-gray-700 hover:text-amber-600">
                  Accessories
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-amber-600 font-medium">Jewelry</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-amber-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Jewelry</h1>
            <Sparkles className="w-10 h-10 text-amber-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated collection of elegant jewelry pieces that add the perfect finishing touch 
            to any outfit. From everyday essentials to statement pieces.
          </p>
        </div>

        {/* Jewelry Types */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-l-4 border-amber-400">
          <div className="flex items-center mb-4">
            <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Shop by Type</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            {['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Brooches', 'Anklets'].map((type, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-gray-700 font-medium">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 border-l-4 border-amber-400">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Types</option>
                <option>Necklaces</option>
                <option>Earrings</option>
                <option>Rings</option>
                <option>Bracelets</option>
                <option>Brooches</option>
                <option>Anklets</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Materials</option>
                <option>Gold</option>
                <option>Silver</option>
                <option>Rose Gold</option>
                <option>Pearls</option>
                <option>Crystals</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Occasions</option>
                <option>Everyday</option>
                <option>Formal</option>
                <option>Wedding</option>
                <option>Evening</option>
                <option>Work</option>
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
          {jewelry.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-amber-50 to-yellow-50 h-64 relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.isNew && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                    NEW
                  </div>
                )}
                {item.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Heart className="w-4 h-4 text-amber-500 hover:fill-current" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{item.brand}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                
                {/* Type Badge */}
                <div className="flex items-center mb-2">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>

                {/* Materials */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.materials.slice(0, 2).map((material, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {material}
                    </span>
                  ))}
                  {item.materials.length > 2 && (
                    <span className="text-xs text-gray-500">+{item.materials.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    {item.onSale && item.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-red-600">${item.price}</span>
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-amber-600">${item.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{item.reviews} reviews</span>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-md hover:from-amber-500 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Info */}
        <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-amber-400">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-amber-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">About Our Jewelry Collection</h2>
          </div>
          <div className="prose prose-amber max-w-none">
            <p className="text-gray-600 mb-4">
              Our carefully curated jewelry collection features pieces that effortlessly transition from 
              day to night, casual to formal. Each piece is selected for its quality, craftsmanship, 
              and ability to complement your personal style.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                  Quality Promise:
                </h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Hypoallergenic materials for sensitive skin</li>
                  <li>Tarnish-resistant finishes</li>
                  <li>Secure clasps and settings</li>
                  <li>Quality control tested</li>
                  <li>Gift-ready packaging</li>
                  <li>30-day return policy</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Styling Tips:</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Layer delicate necklaces for a trendy look</li>
                  <li>Mix metals for modern styling</li>
                  <li>Choose statement pieces as focal points</li>
                  <li>Consider your neckline when selecting necklaces</li>
                  <li>Stack rings and bracelets for texture</li>
                  <li>Match jewelry metals to your watch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
