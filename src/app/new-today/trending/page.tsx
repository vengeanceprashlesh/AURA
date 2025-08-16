'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Flame, Heart, Share2, ShoppingBag, Eye, Users, ArrowUp, Zap, Star } from 'lucide-react';

interface TrendingProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  trendScore: number;
  socialMentions: number;
  likes: number;
  shares: number;
  influencerWorn: string[];
  hashtags: string[];
  growthRate: number;
  isViral: boolean;
  timeframe: '1h' | '24h' | '7d' | '30d';
}

interface TrendCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  products: TrendingProduct[];
}

export default function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);

  const trendCategories: TrendCategory[] = [
    {
      id: 'viral',
      name: 'Going Viral',
      icon: Flame,
      color: 'red',
      description: 'The hottest pieces breaking the internet right now',
      products: [
        {
          id: '1',
          name: 'Cloud Nine Puffer Jacket',
          brand: 'ATMOSPHERE',
          price: 289,
          originalPrice: 350,
          image: '/api/placeholder/300/400',
          category: 'Outerwear',
          trendScore: 98,
          socialMentions: 15420,
          likes: 89250,
          shares: 12400,
          influencerWorn: ['@styleicon', '@fashionista_daily', '@trendsetter_x'],
          hashtags: ['#CloudNineStyle', '#PufferTrend', '#ViralFashion'],
          growthRate: 340,
          isViral: true,
          timeframe: '24h'
        },
        {
          id: '2',
          name: 'Liquid Metal Midi Skirt',
          brand: 'FUTURE PAST',
          price: 195,
          image: '/api/placeholder/300/400',
          category: 'Bottoms',
          trendScore: 94,
          socialMentions: 9850,
          likes: 67300,
          shares: 8900,
          influencerWorn: ['@futurist_fashion', '@metallic_muse'],
          hashtags: ['#LiquidMetal', '#FuturisticFashion', '#TrendAlert'],
          growthRate: 285,
          isViral: true,
          timeframe: '24h'
        }
      ]
    },
    {
      id: 'celebrity',
      name: 'Celebrity Spotlight',
      icon: Star,
      color: 'yellow',
      description: 'Pieces spotted on your favorite celebrities',
      products: [
        {
          id: '3',
          name: 'Red Carpet Gown',
          brand: 'STARLIGHT COUTURE',
          price: 1250,
          originalPrice: 1500,
          image: '/api/placeholder/300/400',
          category: 'Dresses',
          trendScore: 91,
          socialMentions: 6700,
          likes: 45200,
          shares: 5600,
          influencerWorn: ['@celebrity_a', '@redcarpet_queen'],
          hashtags: ['#RedCarpetGlam', '#CelebrityStyle', '#GownGoals'],
          growthRate: 220,
          isViral: false,
          timeframe: '24h'
        }
      ]
    },
    {
      id: 'streetstyle',
      name: 'Street Style Surge',
      icon: TrendingUp,
      color: 'blue',
      description: 'Urban fashion that\'s taking over the streets',
      products: [
        {
          id: '4',
          name: 'Oversized Grunge Hoodie',
          brand: 'URBAN REBEL',
          price: 145,
          originalPrice: 180,
          image: '/api/placeholder/300/400',
          category: 'Tops',
          trendScore: 87,
          socialMentions: 12300,
          likes: 34500,
          shares: 4200,
          influencerWorn: ['@streetstyle_official', '@urban_edge'],
          hashtags: ['#GrungeRevival', '#StreetStyle', '#OversizedTrend'],
          growthRate: 150,
          isViral: false,
          timeframe: '7d'
        }
      ]
    },
    {
      id: 'emerging',
      name: 'Emerging Trends',
      icon: Zap,
      color: 'purple',
      description: 'Tomorrow\'s trends starting today',
      products: [
        {
          id: '5',
          name: 'Holographic Mini Dress',
          brand: 'NEON DREAMS',
          price: 225,
          image: '/api/placeholder/300/400',
          category: 'Dresses',
          trendScore: 79,
          socialMentions: 3400,
          likes: 18600,
          shares: 2800,
          influencerWorn: ['@neon_goddess', '@holographic_style'],
          hashtags: ['#HolographicFashion', '#EmergingTrend', '#FutureFashion'],
          growthRate: 420,
          isViral: false,
          timeframe: '7d'
        }
      ]
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getTrendColor = (score: number) => {
    if (score >= 90) return 'text-red-500 bg-red-50';
    if (score >= 80) return 'text-orange-500 bg-orange-50';
    if (score >= 70) return 'text-yellow-500 bg-yellow-50';
    return 'text-blue-500 bg-blue-50';
  };

  const getCategoryGradient = (color: string) => {
    switch (color) {
      case 'red': return 'from-red-500 to-pink-500';
      case 'yellow': return 'from-yellow-400 to-orange-400';
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'purple': return 'from-purple-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  // Simulate live updates
  useEffect(() => {
    if (isLiveUpdating) {
      const interval = setInterval(() => {
        // This would update trend scores in a real app
        console.log('Live update...');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLiveUpdating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 animate-pulse">
            <Flame className="h-24 w-24 opacity-20 text-orange-300" />
          </div>
          <div className="absolute top-1/3 right-20 animate-bounce">
            <TrendingUp className="h-16 w-16 opacity-15 text-pink-300" />
          </div>
          <div className="absolute bottom-20 left-1/3 animate-pulse delay-1000">
            <Zap className="h-20 w-20 opacity-25 text-yellow-300" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Flame className="h-16 w-16 text-yellow-300" />
              </motion.div>
              <h1 className="text-6xl md:text-7xl font-playfair font-bold">Trending</h1>
            </div>
            <p className="text-2xl md:text-3xl mb-8 text-pink-100 font-light">
              What's hot right now in fashion
            </p>

            {/* Live Status */}
            <div className="flex items-center justify-center gap-8 text-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isLiveUpdating ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="font-semibold">
                  {isLiveUpdating ? 'Live Updates' : 'Paused'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-300" />
                <span>2.4M tracking trends</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-300" />
                <span>Updated every 5 minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">Trending over:</span>
              {(['1h', '24h', '7d', '30d'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    timeframe === period
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === '1h' ? 'Last Hour' : 
                   period === '24h' ? 'Today' :
                   period === '7d' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsLiveUpdating(!isLiveUpdating)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isLiveUpdating
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isLiveUpdating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              {isLiveUpdating ? 'Live' : 'Paused'}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(index)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeCategory === index
                      ? `border-transparent bg-gradient-to-br ${getCategoryGradient(category.color)} text-white shadow-xl scale-105`
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <Icon className={`h-8 w-8 mx-auto mb-3 ${
                      activeCategory === index ? 'text-white' : `text-${category.color}-500`
                    }`} />
                    <div className="font-bold text-lg mb-1">{category.name}</div>
                    <div className={`text-xs ${
                      activeCategory === index ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {category.products.length} items trending
                    </div>
                  </div>
                  {activeCategory === index && (
                    <motion.div
                      layoutId="category-indicator"
                      className="absolute inset-0 rounded-2xl ring-2 ring-white/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Category Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          {trendCategories[activeCategory] && (
            <div>
              {/* Category Header */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${getCategoryGradient(trendCategories[activeCategory].color)} text-white px-8 py-4 rounded-full mb-6`}
                >
                  {React.createElement(trendCategories[activeCategory].icon, { className: "h-6 w-6" })}
                  <span className="font-bold text-lg">{trendCategories[activeCategory].name}</span>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                  {trendCategories[activeCategory].description}
                </motion.p>
              </div>

              {/* Trending Products Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {trendCategories[activeCategory].products.map((product, productIndex) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + productIndex * 0.1 }}
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
                      
                      {/* Trend Score Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`flex items-center gap-1 ${getTrendColor(product.trendScore)} px-3 py-2 rounded-full text-sm font-bold`}>
                          <TrendingUp className="h-4 w-4" />
                          {product.trendScore}
                        </div>
                      </div>

                      {product.isViral && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            VIRAL
                          </div>
                        </div>
                      )}

                      {/* Growth Rate Indicator */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <ArrowUp className="h-3 w-3" />
                          +{product.growthRate}%
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                          className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                            favorites.has(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <Heart className="h-4 w-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white backdrop-blur-md transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-2 rounded-full bg-gradient-to-r ${getCategoryGradient(trendCategories[activeCategory].color)} text-white backdrop-blur-md transition-colors`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          {product.brand}
                        </p>
                        <h3 className="font-playfair text-lg font-bold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                      </div>

                      {/* Social Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span className="text-xs font-bold text-gray-900">{formatNumber(product.likes)}</span>
                          </div>
                          <div className="text-xs text-gray-500">Likes</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Share2 className="h-3 w-3 text-blue-500" />
                            <span className="text-xs font-bold text-gray-900">{formatNumber(product.shares)}</span>
                          </div>
                          <div className="text-xs text-gray-500">Shares</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="h-3 w-3 text-green-500" />
                            <span className="text-xs font-bold text-gray-900">{formatNumber(product.socialMentions)}</span>
                          </div>
                          <div className="text-xs text-gray-500">Mentions</div>
                        </div>
                      </div>

                      {/* Hashtags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.hashtags.slice(0, 2).map((hashtag, index) => (
                            <span
                              key={index}
                              className={`text-xs bg-gradient-to-r ${getCategoryGradient(trendCategories[activeCategory].color)} text-white px-2 py-1 rounded-full`}
                            >
                              {hashtag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Influencers */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-1">Worn by:</div>
                        <div className="flex flex-wrap gap-1">
                          {product.influencerWorn.slice(0, 2).map((influencer, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {influencer}
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
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Trend Insights */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <TrendingUp className="h-12 w-12 text-pink-400 mx-auto mb-6" />
            <h2 className="text-4xl font-playfair font-bold mb-4">Trend Insights</h2>
            <p className="text-gray-300 text-lg">Data-driven fashion intelligence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center"
            >
              <Flame className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Real-Time Tracking</h3>
              <p className="text-gray-300 text-sm">
                Our AI monitors social media, runway shows, and street style to identify emerging trends instantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center"
            >
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Community Driven</h3>
              <p className="text-gray-300 text-sm">
                Powered by millions of fashion enthusiasts sharing, liking, and engaging with style content.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center"
            >
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Predictive Analytics</h3>
              <p className="text-gray-300 text-sm">
                Advanced algorithms predict what will be trending next, keeping you ahead of the curve.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
