'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Discover our latest fashion pieces',
    href: '/categories/clothing',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-pink-100 to-rose-100'
  },
  {
    id: 'dresses',
    name: 'Dresses',
    description: 'From casual to elegant occasions',
    href: '/categories/dresses',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-purple-100 to-pink-100'
  },
  {
    id: 'sets',
    name: 'Matching Sets',
    description: 'Perfectly coordinated pieces',
    href: '/categories/sets',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-blue-100 to-purple-100'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    description: 'Step out in style',
    href: '/categories/shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-yellow-100 to-orange-100'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look',
    href: '/categories/accessories',
    image: 'https://images.unsplash.com/photo-1506629905138-48ac2a2b2d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-green-100 to-blue-100'
  },
  {
    id: 'luxe-classics',
    name: 'Luxe Classics',
    description: 'Timeless luxury pieces',
    href: '/categories/luxe-classics',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-gray-100 to-slate-100'
  },
  {
    id: 'seasonal',
    name: 'Seasonal',
    description: 'Current season must-haves',
    href: '/categories/seasonal',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-rose-100 to-pink-100'
  },
  {
    id: 'summer',
    name: 'Summer',
    description: 'Summer vibes and vacation ready',
    href: '/categories/summer',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-red-100 to-orange-100'
  },
  {
    id: 'cotton',
    name: 'Cotton Shop',
    description: 'Comfortable cotton essentials',
    href: '/categories/cotton',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-blue-100 to-teal-100'
  },
  {
    id: 'gowns',
    name: 'Gowns',
    description: 'Elegant evening wear',
    href: '/categories/gowns',
    image: 'https://images.unsplash.com/photo-1566479179817-b83216806cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-purple-100 to-indigo-100'
  },
  {
    id: 'sale',
    name: 'Sale',
    description: 'Don\'t miss these deals',
    href: '/categories/sale',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-red-100 to-pink-100'
  },
  {
    id: 'new-today',
    name: 'New Today',
    description: 'Fresh arrivals daily',
    href: '/categories/new-today',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    color: 'from-emerald-100 to-teal-100'
  }
];

const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={category.href}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg sm:text-xl font-bold mb-2 tracking-tight">
                {category.name}
              </h3>
              <p className="text-sm sm:text-base opacity-90 mb-3">
                {category.description}
              </p>
              <div className="flex items-center text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  All Categories
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Explore our complete collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 bg-gradient-to-r from-purple-900 to-pink-700">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Shop All Categories
            </h2>
            <p className="text-lg sm:text-xl mb-6 max-w-2xl">
              Discover everything from everyday essentials to statement pieces
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Curated</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Quality</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Style</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Browse By Category
          </h3>
          <p className="text-gray-600">
            Find exactly what you're looking for
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
