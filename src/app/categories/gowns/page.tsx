'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react';

// Mock product data for Gowns Collection
const products = [
  {
    id: 1,
    name: "Midnight Silk Gown",
    price: 399.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1566479179817-b83216806cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: "Ethereal Chiffon Evening Gown",
    price: 349.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 156,
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: "Velvet Statement Gown",
    price: 459.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 67,
    isNew: false,
    isSale: false
  },
  {
    id: 4,
    name: "Sequined Party Dress",
    price: 299.99,
    originalPrice: 379.99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 123,
    isNew: false,
    isSale: true
  },
  {
    id: 5,
    name: "Classic Black Tie Gown",
    price: 529.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 201,
    isNew: true,
    isSale: false
  },
  {
    id: 6,
    name: "Bohemian Maxi Dress",
    price: 199.99,
    originalPrice: 259.99,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 89,
    isNew: false,
    isSale: true
  },
  {
    id: 7,
    name: "Modern Minimalist Gown",
    price: 379.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 134,
    isNew: false,
    isSale: false
  },
  {
    id: 8,
    name: "Vintage Inspired Gown",
    price: 329.99,
    originalPrice: 429.99,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 78,
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

export default function GownsPage() {
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
                  Cool Girl Gowns
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Elegant evening wear for every special occasion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-64 sm:h-80 bg-gradient-to-r from-purple-900 to-indigo-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566479179817-b83216806cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Cool Girl Gowns
            </h2>
            <p className="text-lg sm:text-xl mb-6 max-w-2xl">
              Make an unforgettable impression with our collection of sophisticated evening gowns
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Evening Wear</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Red Carpet</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Black Tie</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Occasions Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Galas</h3>
            <p className="text-gray-600 text-sm">Perfect for charity events and formal galas</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Weddings</h3>
            <p className="text-gray-600 text-sm">Elegant options for wedding guests</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-rose-500 rounded-full"></div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Cocktail</h3>
            <p className="text-gray-600 text-sm">Sophisticated cocktail party attire</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-full"></div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Awards</h3>
            <p className="text-gray-600 text-sm">Red carpet ready evening wear</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {products.length} Elegant Gowns
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
            Load More Gowns
          </button>
        </div>
      </div>
    </div>
  );
}

