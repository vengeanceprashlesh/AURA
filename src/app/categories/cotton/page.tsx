'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react';

// Mock product data for Cotton Collection
const products = [
  {
    id: 1,
    name: "Organic Cotton Basic Tee",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 267,
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: "Cotton Loungewear Set",
    price: 89.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 198,
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: "Breathable Cotton Dress",
    price: 79.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 145,
    isNew: false,
    isSale: false
  },
  {
    id: 4,
    name: "Cotton Canvas Pants",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 176,
    isNew: false,
    isSale: true
  },
  {
    id: 5,
    name: "Soft Cotton Cardigan",
    price: 99.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 234,
    isNew: true,
    isSale: false
  },
  {
    id: 6,
    name: "Cotton Sleep Set",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 123,
    isNew: false,
    isSale: true
  },
  {
    id: 7,
    name: "Oversized Cotton Shirt",
    price: 55.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1566479179817-b83216806cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 189,
    isNew: false,
    isSale: false
  },
  {
    id: 8,
    name: "Cotton Blend Joggers",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1506629905138-48ac2a2b2d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isSale: true
  }
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  return (
    <motion.div
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>

        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>

        <button className="absolute bottom-3 left-3 right-3 bg-black text-white py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800">
          <ShoppingBag className="w-4 h-4 inline mr-2" />
          Add to Cart
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function CottonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
                  The Cotton Shop
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Comfortable cotton essentials for every day
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-64 sm:h-80 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              The Cotton Shop
            </h2>
            <p className="text-lg sm:text-xl mb-6 max-w-2xl">
              Discover our collection of premium cotton pieces designed for comfort and style
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">100% Cotton</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Breathable</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Sustainable</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Benefits Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Comfort</h3>
            <p className="text-gray-600 text-sm">Soft, breathable cotton that feels amazing against your skin</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
            <p className="text-gray-600 text-sm">Sustainably sourced cotton for a better planet</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Versatile Style</h3>
            <p className="text-gray-600 text-sm">Perfect for any occasion, from casual to smart-casual</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {products.length} Cotton Products
          </h3>
          
          <div className="flex gap-2 sm:gap-4">
            <select className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
