'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, TrendingUp, Clock, Sparkles } from 'lucide-react';
import TrendingSection from '@/components/TrendingSection';

export default function NewArrivals() {
  const newArrivals = [
    {
      id: 1,
      name: "Silk Wrap Midi Dress",
      price: "$189",
      originalPrice: "$245",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600",
      badge: "JUST IN",
      rating: 4.9,
      reviews: 127,
      isNew: true
    },
    {
      id: 2,
      name: "Cashmere Blend Cardigan",
      price: "$156",
      originalPrice: "$195",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600",
      badge: "TRENDING",
      rating: 4.8,
      reviews: 89,
      isNew: true
    },
    {
      id: 3,
      name: "High-Waisted Wide Leg Pants",
      price: "$98",
      originalPrice: "$128",
      image: "https://images.unsplash.com/photo-1506629905136-b5f3fde5ee30?auto=format&fit=crop&w=400&h=600",
      badge: "BESTSELLER",
      rating: 4.9,
      reviews: 234,
      isNew: true
    },
    {
      id: 4,
      name: "Statement Pearl Earrings",
      price: "$67",
      originalPrice: "$89",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&h=600",
      badge: "LIMITED",
      rating: 4.7,
      reviews: 156,
      isNew: true
    },
    {
      id: 5,
      name: "Luxury Leather Handbag",
      price: "$299",
      originalPrice: "$399",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=600",
      badge: "EXCLUSIVE",
      rating: 4.9,
      reviews: 78,
      isNew: true
    },
    {
      id: 6,
      name: "Strappy Block Heels",
      price: "$135",
      originalPrice: "$175",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&h=600",
      badge: "HOT",
      rating: 4.8,
      reviews: 203,
      isNew: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-purple-100/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="h-8 w-8 text-rose-500" />
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900">
                New Arrivals
              </h1>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Fresh off the runway. The latest must-haves that fashion-forward women are already obsessing over.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Updated daily • Last updated 2 hours ago</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-900">Filter by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                <option>All Categories</option>
                <option>Dresses</option>
                <option>Tops</option>
                <option>Bottoms</option>
                <option>Accessories</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                <option>All Sizes</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        item.badge === 'JUST IN' ? 'bg-green-500' :
                        item.badge === 'TRENDING' ? 'bg-blue-500' :
                        item.badge === 'BESTSELLER' ? 'bg-purple-500' :
                        item.badge === 'LIMITED' ? 'bg-red-500' :
                        item.badge === 'EXCLUSIVE' ? 'bg-black' :
                        'bg-orange-500'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                      <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500" />
                    </button>
                    {/* Quick Add */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Quick Add</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({item.reviews})</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-rose-600">{item.price}</span>
                      <span className="text-lg text-gray-500 line-through">{item.originalPrice}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        SAVE {Math.round(((parseFloat(item.originalPrice.slice(1)) - parseFloat(item.price.slice(1))) / parseFloat(item.originalPrice.slice(1))) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingSection compact={false} maxCategories={4} className="" />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Never Miss a Drop</h2>
            <p className="text-xl mb-8 opacity-90">
              Be the first to know about new arrivals, exclusive sales, and styling tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
