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

interface TrendingSectionProps {
  compact?: boolean;
  maxCategories?: number;
  className?: string;
}

export default function TrendingSection({ compact = false, maxCategories = 4, className = "" }: TrendingSectionProps) {
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
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&h=600',
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
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600',
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
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
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
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&h=600',
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
          image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=600',
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

  const categoriesToShow = trendCategories.slice(0, maxCategories);

  // Simulate live updates
  useEffect(() => {
    if (isLiveUpdating && !compact) {
      const interval = setInterval(() => {
        // This would update trend scores in a real app
        console.log('Live update...');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLiveUpdating, compact]);

  if (compact) {
    // Compact version for sidebar/smaller spaces
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-beige-200 p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-red-500" />
          <h3 className="font-heading text-xl font-bold text-charcoal-900">Trending Now</h3>
        </div>
        
        <div className="space-y-4">
          {categoriesToShow.map((category, index) => {
            const Icon = category.icon;
            const topProduct = category.products[0];
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setActiveCategory(index)}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryGradient(category.color)} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {topProduct?.name || 'No products'}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${getTrendColor(topProduct?.trendScore || 0)}`}>
                  {topProduct?.trendScore || 0}
                </div>
              </motion.div>
            );
          })}
        </div>

        {!compact && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isLiveUpdating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isLiveUpdating ? 'Live' : 'Paused'}</span>
              </div>
              <span>Updated 2 min ago</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full version for main content areas
  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Flame className="h-8 w-8 text-red-500" />
          <h2 className="font-heading text-3xl font-bold text-charcoal-900">
            What's Trending
          </h2>
          <TrendingUp className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
          Real-time fashion trends powered by social engagement and style influence
        </p>
      </div>

      {/* Time Filter */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-sm font-medium text-gray-600">Trending over:</span>
        {(['1h', '24h', '7d', '30d'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              timeframe === period
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {period === '1h' ? 'Hour' : 
             period === '24h' ? 'Today' :
             period === '7d' ? 'Week' : 'Month'}
          </button>
        ))}
      </div>

      {/* Category Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {categoriesToShow.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                activeCategory === index
                  ? `border-transparent bg-gradient-to-br ${getCategoryGradient(category.color)} text-white shadow-lg scale-105`
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <Icon className={`h-6 w-6 mx-auto mb-2 ${
                  activeCategory === index ? 'text-white' : `text-${category.color}-500`
                }`} />
                <div className="font-bold text-sm mb-1">{category.name}</div>
                <div className={`text-xs ${
                  activeCategory === index ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {category.products.length} items
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Category Products */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {categoriesToShow[activeCategory] && (
            <div>
              {/* Category Description */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${getCategoryGradient(categoriesToShow[activeCategory].color)} text-white px-6 py-2 rounded-full mb-3`}
                >
                  {React.createElement(categoriesToShow[activeCategory].icon, { className: "h-5 w-5" })}
                  <span className="font-bold">{categoriesToShow[activeCategory].name}</span>
                </motion.div>
                <p className="text-gray-600 max-w-xl mx-auto">
                  {categoriesToShow[activeCategory].description}
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoriesToShow[activeCategory].products.map((product, productIndex) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + productIndex * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group relative"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1 ${getTrendColor(product.trendScore)} px-2 py-1 rounded-full text-xs font-bold`}>
                          <TrendingUp className="h-3 w-3" />
                          {product.trendScore}
                        </div>
                      </div>

                      {product.isViral && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            VIRAL
                          </div>
                        </div>
                      )}

                      {/* Growth Rate */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <ArrowUp className="h-3 w-3" />
                          +{product.growthRate}%
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
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
                          <Heart className="h-3 w-3" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                        </button>
                        
                        <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white backdrop-blur-md transition-colors">
                          <Share2 className="h-3 w-3" />
                        </button>
                        
                        <button className={`p-2 rounded-full bg-gradient-to-r ${getCategoryGradient(categoriesToShow[activeCategory].color)} text-white backdrop-blur-md transition-colors`}>
                          <ShoppingBag className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          {product.brand}
                        </p>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                      </div>

                      {/* Social Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
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

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
