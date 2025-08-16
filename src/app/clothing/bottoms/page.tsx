'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Filter, Heart, ShoppingBag, Eye, Star, Zap, Users, Ruler, Target } from 'lucide-react';

interface BottomProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  type: 'jeans' | 'trousers' | 'shorts' | 'skirts' | 'leggings' | 'culottes';
  fit: 'skinny' | 'straight' | 'wide' | 'bootcut' | 'relaxed';
  rise: 'low' | 'mid' | 'high';
  length: 'mini' | 'short' | 'midi' | 'maxi' | 'ankle' | 'full';
  bodyType: ('pear' | 'apple' | 'hourglass' | 'rectangle')[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestseller: boolean;
  fabricStretch: number; // 0-100
  occasion: ('casual' | 'work' | 'formal' | 'activewear')[];
}

interface FitGuide {
  bodyType: string;
  description: string;
  recommendedFits: string[];
  avoidFits: string[];
  tips: string[];
}

export default function BottomsPage() {
  const [products, setProducts] = useState<BottomProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<BottomProduct[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [selectedRise, setSelectedRise] = useState<string>('all');
  const [selectedBodyType, setSelectedBodyType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFitFinder, setShowFitFinder] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Sample data
  const sampleProducts: BottomProduct[] = [
    {
      id: '1',
      name: 'Perfect Fit High-Rise Jeans',
      brand: 'DENIM LUXE',
      price: 189,
      originalPrice: 225,
      image: '/api/placeholder/300/400',
      type: 'jeans',
      fit: 'straight',
      rise: 'high',
      length: 'full',
      bodyType: ['pear', 'hourglass', 'rectangle'],
      colors: ['dark-wash', 'light-wash', 'black'],
      sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
      rating: 4.9,
      reviews: 234,
      isNew: true,
      isBestseller: false,
      fabricStretch: 2,
      occasion: ['casual', 'work']
    },
    {
      id: '2',
      name: 'Executive Tailored Trousers',
      brand: 'PROFESSIONAL',
      price: 245,
      image: '/api/placeholder/300/400',
      type: 'trousers',
      fit: 'straight',
      rise: 'mid',
      length: 'full',
      bodyType: ['apple', 'hourglass', 'rectangle'],
      colors: ['black', 'navy', 'charcoal', 'camel'],
      sizes: ['0', '2', '4', '6', '8', '10', '12', '14'],
      rating: 4.8,
      reviews: 156,
      isNew: false,
      isBestseller: true,
      fabricStretch: 5,
      occasion: ['work', 'formal']
    },
    {
      id: '3',
      name: 'Flowing Midi Skirt',
      brand: 'ETHEREAL',
      price: 125,
      originalPrice: 165,
      image: '/api/placeholder/300/400',
      type: 'skirts',
      fit: 'relaxed',
      rise: 'high',
      length: 'midi',
      bodyType: ['pear', 'apple', 'hourglass', 'rectangle'],
      colors: ['floral', 'solid-black', 'navy', 'sage'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.7,
      reviews: 89,
      isNew: false,
      isBestseller: true,
      fabricStretch: 0,
      occasion: ['casual', 'work']
    },
    {
      id: '4',
      name: 'Athletic Leggings',
      brand: 'FLEX FIT',
      price: 78,
      image: '/api/placeholder/300/400',
      type: 'leggings',
      fit: 'skinny',
      rise: 'high',
      length: 'full',
      bodyType: ['pear', 'apple', 'hourglass', 'rectangle'],
      colors: ['black', 'navy', 'forest', 'burgundy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      rating: 4.6,
      reviews: 445,
      isNew: false,
      isBestseller: true,
      fabricStretch: 90,
      occasion: ['activewear', 'casual']
    },
    {
      id: '5',
      name: 'Wide-Leg Culottes',
      brand: 'MODERN CHIC',
      price: 155,
      image: '/api/placeholder/300/400',
      type: 'culottes',
      fit: 'wide',
      rise: 'high',
      length: 'midi',
      bodyType: ['apple', 'rectangle'],
      colors: ['beige', 'black', 'white', 'rust'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.5,
      reviews: 67,
      isNew: true,
      isBestseller: false,
      fabricStretch: 10,
      occasion: ['casual', 'work']
    }
  ];

  const fitGuides: FitGuide[] = [
    {
      bodyType: 'Pear',
      description: 'Hips wider than shoulders, defined waist',
      recommendedFits: ['straight', 'bootcut', 'wide'],
      avoidFits: ['skinny'],
      tips: ['High-rise styles balance proportions', 'Wide-leg creates flow', 'Avoid tight fits around hips']
    },
    {
      bodyType: 'Apple',
      description: 'Broader shoulders and bust, narrow hips',
      recommendedFits: ['straight', 'wide', 'relaxed'],
      avoidFits: ['low rise'],
      tips: ['High-rise creates definition', 'Wide styles balance torso', 'Avoid clingy fabrics around middle']
    },
    {
      bodyType: 'Hourglass',
      description: 'Balanced shoulders and hips, defined waist',
      recommendedFits: ['straight', 'skinny', 'bootcut'],
      avoidFits: [],
      tips: ['Most fits work well', 'Emphasize natural waistline', 'Avoid baggy styles that hide curves']
    },
    {
      bodyType: 'Rectangle',
      description: 'Similar measurements throughout',
      recommendedFits: ['skinny', 'straight', 'wide'],
      avoidFits: [],
      tips: ['Create curves with fit choices', 'Low-rise can add hip curves', 'Wide-leg adds visual weight to lower body']
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const typeMatch = selectedType === 'all' || product.type === selectedType;
      const fitMatch = selectedFit === 'all' || product.fit === selectedFit;
      const riseMatch = selectedRise === 'all' || product.rise === selectedRise;
      const bodyTypeMatch = selectedBodyType === 'all' || product.bodyType.includes(selectedBodyType as any);
      
      return typeMatch && fitMatch && riseMatch && bodyTypeMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedType, selectedFit, selectedRise, selectedBodyType, sortBy]);

  const getTypeIcon = (type: string) => {
    const icons = {
      'jeans': '👖',
      'trousers': '👔',
      'shorts': '🩳',
      'skirts': '👗',
      'leggings': '🧘',
      'culottes': '👘'
    };
    return icons[type as keyof typeof icons] || '👖';
  };

  const getStretchColor = (stretch: number) => {
    if (stretch >= 70) return 'text-green-600 bg-green-50';
    if (stretch >= 30) return 'text-yellow-600 bg-yellow-50';
    if (stretch >= 10) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getStretchLabel = (stretch: number) => {
    if (stretch >= 70) return 'High Stretch';
    if (stretch >= 30) return 'Medium Stretch';
    if (stretch >= 10) return 'Low Stretch';
    return 'No Stretch';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Scissors className="h-12 w-12 text-blue-300" />
              <h1 className="text-6xl md:text-7xl font-playfair font-bold">Bottoms</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 font-light">
              Find your perfect fit with our intelligent sizing guide
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-300" />
                <span>Fit Finder Tool</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-300" />
                <span>Body Type Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-yellow-300" />
                <span>Detailed Measurements</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="all">All Types</option>
              <option value="jeans">Jeans</option>
              <option value="trousers">Trousers</option>
              <option value="shorts">Shorts</option>
              <option value="skirts">Skirts</option>
              <option value="leggings">Leggings</option>
              <option value="culottes">Culottes</option>
            </select>

            {/* Fit Filter */}
            <select
              value={selectedFit}
              onChange={(e) => setSelectedFit(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="all">All Fits</option>
              <option value="skinny">Skinny</option>
              <option value="straight">Straight</option>
              <option value="wide">Wide Leg</option>
              <option value="bootcut">Bootcut</option>
              <option value="relaxed">Relaxed</option>
            </select>

            {/* Rise Filter */}
            <select
              value={selectedRise}
              onChange={(e) => setSelectedRise(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="all">All Rise</option>
              <option value="low">Low Rise</option>
              <option value="mid">Mid Rise</option>
              <option value="high">High Rise</option>
            </select>

            {/* Body Type Filter */}
            <select
              value={selectedBodyType}
              onChange={(e) => setSelectedBodyType(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="all">All Body Types</option>
              <option value="pear">Pear</option>
              <option value="apple">Apple</option>
              <option value="hourglass">Hourglass</option>
              <option value="rectangle">Rectangle</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Fit Finder Toggle */}
            <button
              onClick={() => setShowFitFinder(!showFitFinder)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                showFitFinder
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Target className="h-4 w-4" />
              Fit Finder
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Fit Guide Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Body Type Guide
              </h3>
              
              <div className="space-y-4">
                {fitGuides.map((guide, index) => (
                  <div key={index} className="border-l-4 border-indigo-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{guide.bodyType}</h4>
                    <p className="text-xs text-gray-600 mb-2">{guide.description}</p>
                    <div className="text-xs">
                      <div className="text-green-600 mb-1">✓ {guide.recommendedFits.join(', ')}</div>
                      {guide.avoidFits.length > 0 && (
                        <div className="text-red-600">✗ {guide.avoidFits.join(', ')}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Chart */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-indigo-600" />
                Size Chart
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>24/XS:</span>
                  <span>24-25"</span>
                </div>
                <div className="flex justify-between">
                  <span>26/S:</span>
                  <span>26-27"</span>
                </div>
                <div className="flex justify-between">
                  <span>28/M:</span>
                  <span>28-29"</span>
                </div>
                <div className="flex justify-between">
                  <span>30/L:</span>
                  <span>30-31"</span>
                </div>
              </div>
            </div>

            {/* Fit Tips */}
            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Fit Tips</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div>• High-rise elongates legs</div>
                <div>• Wide-leg balances curves</div>
                <div>• Straight fits are universally flattering</div>
                <div>• Check fabric stretch for comfort</div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
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
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            NEW
                          </div>
                        )}
                        {product.isBestseller && (
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            BESTSELLER
                          </div>
                        )}
                      </div>

                      {/* Body Type Indicator */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {product.bodyType.length} body types
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
                          className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-gray-900 hover:text-white backdrop-blur-md transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 backdrop-blur-md transition-colors"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                          {product.brand}
                        </p>
                        <h3 className="font-playfair text-lg font-bold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      </div>

                      {/* Fit Details */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{getTypeIcon(product.type)}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                          {product.fit} fit
                        </span>
                        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full capitalize">
                          {product.rise} rise
                        </span>
                      </div>

                      {/* Fabric Stretch */}
                      <div className="mb-4">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStretchColor(product.fabricStretch)}`}>
                          <Zap className="h-3 w-3" />
                          {getStretchLabel(product.fabricStretch)}
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-gray-500">Colors:</span>
                        <div className="flex gap-1">
                          {product.colors.slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                              style={{
                                backgroundColor: color === 'dark-wash' ? '#2d3748' :
                                               color === 'light-wash' ? '#a0aec0' :
                                               color === 'charcoal' ? '#36454f' :
                                               color === 'navy' ? '#000080' :
                                               color === 'camel' ? '#c19a6b' :
                                               color === 'sage' ? '#9caf88' :
                                               color === 'floral' ? '#ff69b4' :
                                               color === 'solid-black' ? '#000000' :
                                               color === 'forest' ? '#355e3b' :
                                               color === 'burgundy' ? '#800020' :
                                               color === 'beige' ? '#f5f5dc' :
                                               color === 'rust' ? '#b7410e' : color
                              }}
                            />
                          ))}
                          {product.colors.length > 4 && (
                            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Body Types */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-1">Recommended for:</div>
                        <div className="flex flex-wrap gap-1">
                          {product.bodyType.map((type, index) => (
                            <span
                              key={index}
                              className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full capitalize"
                            >
                              {type}
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
                        <div className="text-xs text-gray-500">
                          {product.sizes.length} sizes
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👖</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bottoms found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more products</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fit Finder Modal */}
      <AnimatePresence>
        {showFitFinder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFitFinder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <Target className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Perfect Fit Finder</h2>
                <p className="text-gray-600">Answer a few questions to find your ideal bottoms</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What's your body type?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {fitGuides.map((guide) => (
                      <button
                        key={guide.bodyType}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors text-left"
                      >
                        <div className="font-semibold text-gray-900">{guide.bodyType}</div>
                        <div className="text-xs text-gray-500">{guide.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What occasion are you shopping for?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                      Work & Professional
                    </button>
                    <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                      Casual & Weekend
                    </button>
                    <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                      Formal Events
                    </button>
                    <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                      Active & Athletic
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowFitFinder(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowFitFinder(false)}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Find My Fit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styling Tips */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Perfect Fit Guide</h2>
            <p className="text-lg text-gray-600">Expert tips for finding bottoms that flatter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Know Your Measurements</h3>
              <p className="text-sm text-gray-600">
                Measure your waist, hips, and inseam for the most accurate fit. Consider rise preference too.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👗</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Consider Your Body Type</h3>
              <p className="text-sm text-gray-600">
                Different cuts flatter different body types. Use our body type guide to find your perfect match.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fabric Matters</h3>
              <p className="text-sm text-gray-600">
                Check stretch content for comfort. Non-stretch fabrics provide structure, while stretch adds comfort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
