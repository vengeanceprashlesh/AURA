'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sun, Snowflake, Flower, ShoppingBag, Heart, Eye, Filter, Calendar, Thermometer } from 'lucide-react';

interface Season {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  temperature: string;
  mood: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  season: string;
  materials: string[];
  sustainability: 'eco' | 'organic' | 'recycled' | 'standard';
  rating: number;
  isLimited: boolean;
}

export default function SeasonalFreshPage() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filterBy, setFilterBy] = useState('all');

  const seasons: Season[] = [
    {
      id: 'spring',
      name: 'Spring Awakening',
      icon: Flower,
      color: 'green',
      description: 'Fresh beginnings, blooming colors, gentle fabrics',
      temperature: '15°C - 20°C',
      mood: 'Renewal & Growth',
      products: [
        {
          id: '1',
          name: 'Blossom Silk Dress',
          brand: 'PETALS',
          price: 385,
          originalPrice: 450,
          image: '/api/placeholder/300/400',
          category: 'Dresses',
          season: 'spring',
          materials: ['Organic Silk', 'Bamboo Fiber'],
          sustainability: 'organic',
          rating: 4.9,
          isLimited: true
        },
        {
          id: '2',
          name: 'Garden Party Blazer',
          brand: 'BLOOM ATELIER',
          price: 295,
          image: '/api/placeholder/300/400',
          category: 'Outerwear',
          season: 'spring',
          materials: ['Linen', 'Hemp'],
          sustainability: 'eco',
          rating: 4.7,
          isLimited: false
        }
      ]
    },
    {
      id: 'summer',
      name: 'Summer Radiance',
      icon: Sun,
      color: 'yellow',
      description: 'Sun-kissed days, flowing fabrics, vibrant energy',
      temperature: '25°C - 30°C',
      mood: 'Freedom & Joy',
      products: [
        {
          id: '3',
          name: 'Sunset Maxi Dress',
          brand: 'SOLAR BREEZE',
          price: 225,
          image: '/api/placeholder/300/400',
          category: 'Dresses',
          season: 'summer',
          materials: ['Cotton', 'Lyocell'],
          sustainability: 'organic',
          rating: 4.8,
          isLimited: false
        },
        {
          id: '4',
          name: 'Ocean Breeze Top',
          brand: 'TIDE',
          price: 145,
          originalPrice: 180,
          image: '/api/placeholder/300/400',
          category: 'Tops',
          season: 'summer',
          materials: ['Recycled Polyester', 'Organic Cotton'],
          sustainability: 'recycled',
          rating: 4.6,
          isLimited: true
        }
      ]
    },
    {
      id: 'autumn',
      name: 'Autumn Harvest',
      icon: Leaf,
      color: 'orange',
      description: 'Rich textures, warm tones, cozy sophistication',
      temperature: '10°C - 18°C',
      mood: 'Comfort & Elegance',
      products: [
        {
          id: '5',
          name: 'Maple Cashmere Coat',
          brand: 'AUTUMN LUXE',
          price: 750,
          image: '/api/placeholder/300/400',
          category: 'Outerwear',
          season: 'autumn',
          materials: ['Cashmere', 'Wool'],
          sustainability: 'standard',
          rating: 5.0,
          isLimited: true
        }
      ]
    },
    {
      id: 'winter',
      name: 'Winter Elegance',
      icon: Snowflake,
      color: 'blue',
      description: 'Luxurious warmth, refined layers, crystalline beauty',
      temperature: '0°C - 8°C',
      mood: 'Sophistication & Warmth',
      products: [
        {
          id: '6',
          name: 'Snow Queen Puffer',
          brand: 'ARCTIC CHIC',
          price: 495,
          originalPrice: 625,
          image: '/api/placeholder/300/400',
          category: 'Outerwear',
          season: 'winter',
          materials: ['Down', 'Recycled Nylon'],
          sustainability: 'recycled',
          rating: 4.9,
          isLimited: false
        }
      ]
    }
  ];

  const getSustainabilityBadge = (type: string) => {
    switch (type) {
      case 'eco': return { color: 'bg-green-500', text: 'ECO' };
      case 'organic': return { color: 'bg-emerald-500', text: 'ORGANIC' };
      case 'recycled': return { color: 'bg-blue-500', text: 'RECYCLED' };
      default: return { color: 'bg-gray-500', text: 'STANDARD' };
    }
  };

  const getSeasonGradient = (color: string) => {
    switch (color) {
      case 'green': return 'from-green-500 to-emerald-500';
      case 'yellow': return 'from-yellow-400 to-orange-400';
      case 'orange': return 'from-orange-500 to-red-500';
      case 'blue': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 0; // Spring
    if (month >= 5 && month <= 7) return 1; // Summer
    if (month >= 8 && month <= 10) return 2; // Autumn
    return 3; // Winter
  };

  useEffect(() => {
    setActiveSeason(getCurrentSeason());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="absolute inset-0">
          {/* Animated seasonal elements */}
          <div className="absolute top-10 left-10 animate-float">
            <Leaf className="h-20 w-20 opacity-20 text-green-300" />
          </div>
          <div className="absolute top-1/4 right-20 animate-pulse">
            <Flower className="h-16 w-16 opacity-15 text-pink-300" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-bounce">
            <Sun className="h-12 w-12 opacity-25 text-yellow-300" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Calendar className="h-12 w-12 text-green-300" />
              </motion.div>
              <h1 className="text-6xl md:text-7xl font-playfair font-bold">Seasonal Fresh</h1>
            </div>
            <p className="text-2xl md:text-3xl mb-8 text-green-100 font-light">
              Nature-inspired collections that evolve with the seasons
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="text-center">
                <Thermometer className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                <div className="font-semibold">Current Season</div>
                <div className="text-green-200">{seasons[getCurrentSeason()]?.name}</div>
              </div>
              <div className="text-center">
                <Leaf className="h-6 w-6 mx-auto mb-2 text-green-300" />
                <div className="font-semibold">Sustainability Focus</div>
                <div className="text-green-200">Eco-Conscious Materials</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Season Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seasons.map((season, index) => {
              const Icon = season.icon;
              return (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(index)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeSeason === index
                      ? `border-${season.color}-500 bg-gradient-to-br ${getSeasonGradient(season.color)} text-white shadow-xl scale-105`
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${activeSeason === index ? 'text-white' : `text-${season.color}-500`}`} />
                    <div className="font-bold text-lg mb-1">{season.name.split(' ')[0]}</div>
                    <div className={`text-xs ${activeSeason === index ? 'text-white/80' : 'text-gray-500'}`}>
                      {season.temperature}
                    </div>
                  </div>
                  {activeSeason === index && (
                    <motion.div
                      layoutId="season-indicator"
                      className="absolute inset-0 rounded-2xl border-2 border-white/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Season Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSeason}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          {seasons[activeSeason] && (
            <div>
              {/* Season Header */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${getSeasonGradient(seasons[activeSeason].color)} text-white px-8 py-4 rounded-full mb-6`}
                >
                  {React.createElement(seasons[activeSeason].icon, { className: "h-6 w-6" })}
                  <span className="font-bold text-lg">{seasons[activeSeason].mood}</span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-playfair font-bold text-gray-900 mb-4"
                >
                  {seasons[activeSeason].name}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                  {seasons[activeSeason].description}
                </motion.p>
              </div>

              {/* Products Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {seasons[activeSeason].products.map((product, productIndex) => {
                  const sustainabilityBadge = getSustainabilityBadge(product.sustainability);
                  
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + productIndex * 0.1 }}
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
                        
                        {/* Sustainability Badge */}
                        <div className="absolute top-4 left-4">
                          <div className={`${sustainabilityBadge.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                            {sustainabilityBadge.text}
                          </div>
                        </div>

                        {product.isLimited && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              LIMITED EDITION
                            </div>
                          </div>
                        )}

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-3">
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
                              <Heart className="h-5 w-5" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 rounded-full bg-white/90 text-gray-700 hover:bg-gray-900 hover:text-white backdrop-blur-md transition-colors"
                            >
                              <Eye className="h-5 w-5" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`p-3 rounded-full bg-gradient-to-r ${getSeasonGradient(seasons[activeSeason].color)} text-white backdrop-blur-md transition-colors`}
                            >
                              <ShoppingBag className="h-5 w-5" />
                            </motion.button>
                          </div>
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

                        {/* Materials */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {product.materials.slice(0, 2).map((material, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-3 w-3 rounded-full ${
                                      i < Math.floor(product.rating) ? `bg-${seasons[activeSeason].color}-400` : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Seasonal Style Guide */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Seasonal Style Guide</h2>
            <p className="text-xl text-gray-600">Expert tips for transitioning your wardrobe</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <Leaf className="h-12 w-12 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Choices</h3>
              <p className="text-gray-600 mb-4">
                Choose pieces made from organic, recycled, or eco-friendly materials that align with nature's cycles.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Organic cotton and linen for spring/summer</li>
                <li>• Recycled wool for autumn/winter</li>
                <li>• Timeless designs that transcend seasons</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <Calendar className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Seasonal Transitions</h3>
              <p className="text-gray-600 mb-4">
                Master the art of layering and transitional pieces for seamless seasonal style evolution.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Light layers for spring transitions</li>
                <li>• Breathable fabrics for summer comfort</li>
                <li>• Rich textures for autumn warmth</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom animation keyframes
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = customStyles;
  document.head.appendChild(styleSheet);
}
