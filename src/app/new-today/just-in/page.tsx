'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, ShoppingBag, Eye, Filter, Star, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  justIn: boolean;
  hoursAgo: number;
  colors: string[];
  rating: number;
  reviewCount: number;
  isLimited: boolean;
}

export default function JustInPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const products: Product[] = [
    {
      id: '1',
      name: 'Ethereal Silk Blazer',
      brand: 'LUXE THREAD',
      price: 389,
      originalPrice: 459,
      image: '/api/placeholder/300/400',
      category: 'Outerwear',
      justIn: true,
      hoursAgo: 2,
      colors: ['black', 'cream', 'dusty-rose'],
      rating: 4.8,
      reviewCount: 23,
      isLimited: true
    },
    {
      id: '2',
      name: 'Aurora Midi Dress',
      brand: 'MOONLIGHT ATELIER',
      price: 245,
      image: '/api/placeholder/300/400',
      category: 'Dresses',
      justIn: true,
      hoursAgo: 5,
      colors: ['sage', 'midnight', 'pearl'],
      rating: 4.9,
      reviewCount: 41,
      isLimited: false
    },
    {
      id: '3',
      name: 'Crystalline Heels',
      brand: 'PRISM',
      price: 195,
      originalPrice: 245,
      image: '/api/placeholder/300/400',
      category: 'Shoes',
      justIn: true,
      hoursAgo: 8,
      colors: ['clear', 'rose-gold', 'silver'],
      rating: 4.7,
      reviewCount: 67,
      isLimited: true
    }
  ];

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const getTimeText = (hoursAgo: number) => {
    if (hoursAgo < 1) return 'Just now';
    if (hoursAgo === 1) return '1 hour ago';
    return `${hoursAgo} hours ago`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-yellow-300" />
              <h1 className="text-5xl md:text-6xl font-playfair font-bold">Just In</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-rose-100">
              Fresh arrivals, curated moments, limitless possibilities
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Updated every hour</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Handpicked by our stylists</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="dresses">Dresses</option>
                <option value="outerwear">Outerwear</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'grid-cols-1 gap-6'
          }`}
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden group ${
                  viewMode === 'list' ? 'flex gap-6' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-[3/4]'} overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      <Clock className="h-3 w-3" />
                      {getTimeText(product.hoursAgo)}
                    </div>
                  </div>

                  {product.isLimited && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        LIMITED
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        favorites.has(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-purple-600 hover:text-white backdrop-blur-sm transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 backdrop-blur-sm transition-colors">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-2">
                    <p className="text-xs font-medium text-purple-600 mb-1">{product.brand}</p>
                    <h3 className="font-playfair text-lg font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{
                          backgroundColor: color === 'clear' ? 'transparent' : 
                                         color === 'dusty-rose' ? '#d4a5a5' :
                                         color === 'sage' ? '#9caf88' :
                                         color === 'midnight' ? '#2c3e50' :
                                         color === 'pearl' ? '#f8f8ff' :
                                         color === 'rose-gold' ? '#e8b4a0' : color
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4">Never Miss a Drop</h2>
          <p className="text-purple-100 mb-8">Be the first to know when new pieces arrive</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
