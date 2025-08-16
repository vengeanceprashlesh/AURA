'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Sparkles, Heart, ShoppingBag, ArrowRight, Timer, Star, Waves } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  theme: string;
  description: string;
  products: Product[];
  color: string;
  dropTime: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew: boolean;
  rating: number;
  stockLevel: 'low' | 'medium' | 'high';
}

export default function FreshDropsPage() {
  const [activeCollection, setActiveCollection] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });

  const collections: Collection[] = [
    {
      id: '1',
      name: 'Ocean Breeze',
      theme: 'Coastal Elegance',
      description: 'Flowing fabrics meet seaside sophistication',
      color: 'blue',
      dropTime: '9:00 AM EST',
      products: [
        {
          id: '1',
          name: 'Tidal Wave Dress',
          brand: 'AZURE',
          price: 298,
          originalPrice: 350,
          image: '/api/placeholder/300/400',
          category: 'Dresses',
          isNew: true,
          rating: 4.9,
          stockLevel: 'medium'
        },
        {
          id: '2',
          name: 'Seashell Blazer',
          brand: 'MARINE',
          price: 425,
          image: '/api/placeholder/300/400',
          category: 'Outerwear',
          isNew: true,
          rating: 4.8,
          stockLevel: 'low'
        }
      ]
    },
    {
      id: '2',
      name: 'Golden Hour',
      theme: 'Sunset Luxury',
      description: 'Warm tones that capture magic hour',
      color: 'orange',
      dropTime: '2:00 PM EST',
      products: [
        {
          id: '3',
          name: 'Amber Silk Top',
          brand: 'SOLEIL',
          price: 189,
          image: '/api/placeholder/300/400',
          category: 'Tops',
          isNew: true,
          rating: 4.7,
          stockLevel: 'high'
        },
        {
          id: '4',
          name: 'Sunset Palazzo Pants',
          brand: 'HORIZON',
          price: 245,
          originalPrice: 295,
          image: '/api/placeholder/300/400',
          category: 'Bottoms',
          isNew: true,
          rating: 4.8,
          stockLevel: 'medium'
        }
      ]
    },
    {
      id: '3',
      name: 'Midnight Garden',
      theme: 'Dark Romance',
      description: 'Mysterious botanicals for evening',
      color: 'purple',
      dropTime: '6:00 PM EST',
      products: [
        {
          id: '5',
          name: 'Night Bloom Gown',
          brand: 'NOIR GARDEN',
          price: 650,
          image: '/api/placeholder/300/400',
          category: 'Dresses',
          isNew: true,
          rating: 5.0,
          stockLevel: 'low'
        }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStockColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCollectionGradient = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-600 to-cyan-600';
      case 'orange': return 'from-orange-500 to-pink-500';
      case 'purple': return 'from-purple-600 to-indigo-600';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0">
          <Waves className="absolute top-10 left-10 h-32 w-32 opacity-10 animate-pulse" />
          <Waves className="absolute bottom-10 right-10 h-24 w-24 opacity-10 animate-pulse delay-1000" />
          <Droplet className="absolute top-1/2 left-1/4 h-16 w-16 opacity-20 animate-bounce" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Droplet className="h-12 w-12 text-teal-300" />
              <h1 className="text-6xl md:text-7xl font-playfair font-bold">Fresh Drops</h1>
              <Sparkles className="h-8 w-8 text-blue-300 animate-pulse" />
            </div>
            <p className="text-2xl md:text-3xl mb-8 text-blue-100 font-light">
              Curated collections dropping throughout the day
            </p>
            
            {/* Next Drop Countdown */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-sm text-blue-200 mb-2">Next drop in:</p>
              <div className="flex justify-center gap-4 text-2xl font-bold">
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-blue-200 mt-1">hours</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-blue-200 mt-1">min</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-blue-200 mt-1">sec</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Collection Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-4 overflow-x-auto">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(index)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCollection === index
                    ? `bg-gradient-to-r ${getCollectionGradient(collection.color)} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4" />
                  <span>{collection.name}</span>
                  <span className="text-xs opacity-75">{collection.dropTime}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Collection */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCollection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          {collections[activeCollection] && (
            <div>
              {/* Collection Header */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${getCollectionGradient(collections[activeCollection].color)} text-white px-8 py-4 rounded-full mb-6`}
                >
                  <Timer className="h-5 w-5" />
                  <span className="font-semibold">Dropped at {collections[activeCollection].dropTime}</span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-playfair font-bold text-gray-900 mb-4"
                >
                  {collections[activeCollection].name}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 mb-2"
                >
                  {collections[activeCollection].theme}
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-500 max-w-2xl mx-auto"
                >
                  {collections[activeCollection].description}
                </motion.p>
              </div>

              {/* Products Grid */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {collections[activeCollection].products.map((product, productIndex) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + productIndex * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden group relative"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          NEW DROP
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(product.stockLevel)}`}>
                          {product.stockLevel.toUpperCase()} STOCK
                        </div>
                      </div>

                      {/* Floating Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            const newFavorites = new Set(favorites);
                            if (newFavorites.has(product.id)) {
                              newFavorites.delete(product.id);
                            } else {
                              newFavorites.add(product.id);
                            }
                            setFavorites(newFavorites);
                          }}
                          className={`p-3 rounded-full backdrop-blur-md transition-colors ${
                            favorites.has(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <Heart className="h-4 w-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                        </motion.button>
                      </div>

                      {/* Quick Add Button */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full bg-gradient-to-r ${getCollectionGradient(collections[activeCollection].color)} text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 backdrop-blur-md`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Quick Add
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          {product.brand}
                        </p>
                        <h3 className="font-playfair text-lg font-bold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Upcoming Drops Teaser */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-playfair font-bold mb-4">Tomorrow's Drops</h2>
            <p className="text-gray-300 mb-8 text-lg">Preview what's coming next</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Morning Mist</h3>
                <p className="text-gray-300 text-sm mb-3">Ethereal pieces for dawn wanderers</p>
                <p className="text-teal-300 font-semibold">8:00 AM EST</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Urban Edge</h3>
                <p className="text-gray-300 text-sm mb-3">Street-inspired luxury meets comfort</p>
                <p className="text-orange-300 font-semibold">1:00 PM EST</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Starlight Soirée</h3>
                <p className="text-gray-300 text-sm mb-3">Evening glamour redefined</p>
                <p className="text-purple-300 font-semibold">7:00 PM EST</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
