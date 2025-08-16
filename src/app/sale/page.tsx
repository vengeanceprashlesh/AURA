'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Flame, ShoppingBag, Heart, Eye, Star, Gift, Bell, Trophy, Target, Sparkles, Crown } from 'lucide-react';

interface SaleProduct {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  category: string;
  endTime: Date;
  stockLeft: number;
  isFlashSale: boolean;
  isFinalSale: boolean;
  salesCount: number;
  rating: number;
  reviews: number;
}

interface FlashSale {
  id: string;
  name: string;
  description: string;
  timeLeft: { hours: number; minutes: number; seconds: number };
  products: SaleProduct[];
  minDiscount: number;
  maxDiscount: number;
}

export default function SalePage() {
  const [activeTab, setActiveTab] = useState<'flash' | 'clearance' | 'bundles'>('flash');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<Set<string>>(new Set());
  const [points, setPoints] = useState(1250); // Gamification points
  const [nextReward, setNextReward] = useState(500); // Points needed for next reward

  // Flash Sale Timer
  const [flashSaleTime, setFlashSaleTime] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30
  });

  const flashSales: FlashSale[] = [
    {
      id: '1',
      name: 'Designer Flash',
      description: 'Luxury brands up to 70% off',
      timeLeft: flashSaleTime,
      minDiscount: 40,
      maxDiscount: 70,
      products: [
        {
          id: '1',
          name: 'Silk Evening Gown',
          brand: 'LUXE COUTURE',
          originalPrice: 850,
          salePrice: 255,
          discount: 70,
          image: '/api/placeholder/300/400',
          category: 'Dresses',
          endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
          stockLeft: 3,
          isFlashSale: true,
          isFinalSale: false,
          salesCount: 47,
          rating: 4.9,
          reviews: 23
        },
        {
          id: '2',
          name: 'Cashmere Blazer',
          brand: 'ELITE THREAD',
          originalPrice: 650,
          salePrice: 325,
          discount: 50,
          image: '/api/placeholder/300/400',
          category: 'Outerwear',
          endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
          stockLeft: 8,
          isFlashSale: true,
          isFinalSale: false,
          salesCount: 89,
          rating: 4.8,
          reviews: 156
        }
      ]
    }
  ];

  const clearanceProducts: SaleProduct[] = [
    {
      id: '3',
      name: 'Summer Midi Dress',
      brand: 'SEASONAL STYLES',
      originalPrice: 180,
      salePrice: 45,
      discount: 75,
      image: '/api/placeholder/300/400',
      category: 'Dresses',
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      stockLeft: 12,
      isFlashSale: false,
      isFinalSale: true,
      salesCount: 234,
      rating: 4.6,
      reviews: 89
    }
  ];

  // Update flash sale timer
  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSaleTime(prev => {
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

  const getDiscountColor = (discount: number) => {
    if (discount >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (discount >= 50) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (discount >= 30) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getStockUrgency = (stock: number) => {
    if (stock <= 3) return 'text-red-600 bg-red-50';
    if (stock <= 10) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const addToWishlist = (productId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
        setPoints(p => p + 10); // Gamification: earn points for wishlisting
      }
      return newSet;
    });
  };

  const toggleNotification = (productId: string) => {
    setNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const purchaseProduct = (product: SaleProduct) => {
    // Gamification: earn points based on purchase
    const pointsEarned = Math.floor(product.salePrice / 10);
    setPoints(p => p + pointsEarned);
    
    // Show success animation or modal here
    console.log(`Purchased ${product.name} for $${product.salePrice}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Elegant Hero Section for Women */}
      <div className="relative overflow-hidden bg-gradient-to-br from-soft-pink-500 via-blush-500 to-lavender-500 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Sparkles className="h-16 w-16 text-yellow-300 animate-pulse" />
              <h1 className="text-6xl md:text-7xl font-playfair font-bold">✨ SALE ✨</h1>
              <Heart className="h-12 w-12 text-yellow-300 animate-bounce fill-yellow-300" />
            </div>
            <p className="text-2xl md:text-3xl mb-8 text-pink-100 font-light">
              💖 Up to 70% off beautiful fashion & beauty - Your dream wardrobe awaits! 💫
            </p>
            
            {/* Beautiful Rewards Stats for Women */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 max-w-3xl mx-auto border border-white/20">
              <div className="flex items-center justify-center gap-12 text-sm">
                <div className="text-center">
                  <Crown className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
                  <div className="font-bold text-2xl text-yellow-200">{points.toLocaleString()}</div>
                  <div className="text-pink-100 font-medium">✨ Style Points</div>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 mx-auto mb-3 text-pink-300 fill-pink-300" />
                  <div className="font-bold text-2xl text-yellow-200">{nextReward}</div>
                  <div className="text-pink-100 font-medium">💖 To VIP Perks</div>
                </div>
                <div className="text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-3 text-lavender-300" />
                  <div className="font-bold text-2xl text-yellow-200">QUEEN</div>
                  <div className="text-pink-100 font-medium">👑 Beauty Status</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Elegant Flash Sale Banner */}
      <div className="bg-gradient-to-r from-soft-pink-600 to-blush-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                <span className="font-bold text-lg">✨ FLASH SALE ENDS IN:</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 rounded-lg px-4 py-2">
                <div className="text-center">
                  <div className="text-xl font-bold">{flashSaleTime.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs">HRS</div>
                </div>
                <div className="text-white">:</div>
                <div className="text-center">
                  <div className="text-xl font-bold">{flashSaleTime.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs">MIN</div>
                </div>
                <div className="text-white">:</div>
                <div className="text-center">
                  <div className="text-xl font-bold">{flashSaleTime.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs">SEC</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-light">Save up to</div>
              <div className="text-3xl font-bold text-yellow-300">💖 70% OFF 💖</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'flash', label: 'Flash Sales', icon: Zap },
              { id: 'clearance', label: 'Final Clearance', icon: Flame },
              { id: 'bundles', label: 'Bundle Deals', icon: Gift }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'flash' && (
            <motion.div
              key="flash"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {flashSales[0].products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden group relative"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`${getDiscountColor(product.discount)} border-2 px-3 py-2 rounded-full font-bold text-sm`}>
                          -{product.discount}%
                        </div>
                      </div>

                      {/* Flash Sale Badge */}
                      {product.isFlashSale && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            FLASH
                          </div>
                        </div>
                      )}

                      {/* Stock Urgency */}
                      <div className="absolute bottom-4 left-4">
                        <div className={`${getStockUrgency(product.stockLeft)} px-2 py-1 rounded-full text-xs font-bold`}>
                          Only {product.stockLeft} left!
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToWishlist(product.id)}
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
                          onClick={() => toggleNotification(product.id)}
                          className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                            notifications.has(product.id)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white'
                          }`}
                        >
                          <Bell className="h-4 w-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-gray-900 hover:text-white backdrop-blur-md transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                      </div>

                      {/* Sales Counter */}
                      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-xs">
                          <div className="flex items-center gap-1 mb-1">
                            <Flame className="h-3 w-3 text-orange-400" />
                            <span className="font-bold">{product.salesCount} sold</span>
                          </div>
                          <div className="text-gray-300">in last 24h</div>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
                          {product.brand}
                        </p>
                        <h3 className="font-playfair text-lg font-bold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-red-600">${product.salePrice}</span>
                        <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                        <span className="text-sm font-bold text-green-600">
                          Save ${product.originalPrice - product.salePrice}
                        </span>
                      </div>

                      {/* Timer */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Sale ends in:</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="font-mono font-bold">
                              {flashSaleTime.hours}h {flashSaleTime.minutes}m {flashSaleTime.seconds}s
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${((2 * 60 * 60) - (flashSaleTime.hours * 60 * 60 + flashSaleTime.minutes * 60 + flashSaleTime.seconds)) / (2 * 60 * 60) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Purchase Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => purchaseProduct(product)}
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:from-red-700 hover:to-pink-700 transition-colors"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Buy Now - Flash Sale
                      </motion.button>

                      {/* Points Reward */}
                      <div className="mt-2 text-center">
                        <span className="text-xs text-green-600">
                          Earn {Math.floor(product.salePrice / 10)} reward points
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'clearance' && (
            <motion.div
              key="clearance"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <Flame className="h-24 w-24 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Final Clearance</h2>
              <p className="text-lg text-gray-600">End-of-season pieces up to 80% off</p>
              <p className="text-sm text-gray-500 mt-2">All sales final - No returns or exchanges</p>
            </motion.div>
          )}

          {activeTab === 'bundles' && (
            <motion.div
              key="bundles"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <Gift className="h-24 w-24 text-purple-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bundle Deals</h2>
              <p className="text-lg text-gray-600">Mix and match for extra savings</p>
              <p className="text-sm text-gray-500 mt-2">Buy 2 get 30% off, Buy 3 get 50% off</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Drop Alerts */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Bell className="h-12 w-12 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-4xl font-playfair font-bold mb-4">Never Miss a Sale</h2>
            <p className="text-xl text-purple-100 mb-8">
              Get instant alerts when your wishlist items go on sale
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">Price Drop Alerts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Silk Evening Gown</span>
                  <span className="font-bold text-yellow-300">-70%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Designer Handbag</span>
                  <span className="font-bold text-yellow-300">-45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Leather Boots</span>
                  <span className="font-bold text-yellow-300">-60%</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-white text-purple-600 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Enable Notifications
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gamification Progress */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Reward Progress</h2>
            <p className="text-lg text-gray-600">Earn points with every purchase and unlock exclusive benefits</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{points.toLocaleString()} Points</h3>
                <p className="text-gray-600">VIP Member Status</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Next reward in</div>
                <div className="text-xl font-bold text-purple-600">{nextReward} points</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to next reward</span>
                <span>{((2000 - nextReward) / 2000 * 100).toFixed(0)}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(2000 - nextReward) / 2000 * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-purple-50 rounded-xl">
                <Gift className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-sm font-semibold">Free Shipping</div>
                <div className="text-xs text-gray-500">500 points</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-semibold">Early Access</div>
                <div className="text-xs text-gray-500">1,000 points</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm font-semibold">VIP Discount</div>
                <div className="text-xs text-gray-500">2,000 points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
