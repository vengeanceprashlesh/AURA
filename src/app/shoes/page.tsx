'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Eye, Star, Filter, Zap, Footprints, Sparkles, RotateCcw, Activity } from 'lucide-react';

interface ShoeProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'heels' | 'flats' | 'boots' | 'sneakers' | 'sandals';
  heelHeight: number; // in inches
  comfortRating: number; // 1-10
  occasion: ('casual' | 'work' | 'formal' | 'party' | 'athletic')[];
  colors: string[];
  sizes: number[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestseller: boolean;
  comfortTech: string[];
  has3DView: boolean;
  sustainabilityScore: number;
}

interface ComfortTechnology {
  name: string;
  description: string;
  icon: string;
  benefits: string[];
}

export default function ShoesPage() {
  const [products, setProducts] = useState<ShoeProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShoeProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [heelRange, setHeelRange] = useState<[number, number]>([0, 6]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [show3DOnly, setShow3DOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Sample data
  const sampleProducts: ShoeProduct[] = [
    {
      id: '1',
      name: 'Cloud Nine Comfort Heels',
      brand: 'ELEVATION',
      price: 295,
      originalPrice: 350,
      image: '/api/placeholder/300/400',
      category: 'heels',
      heelHeight: 3.5,
      comfortRating: 9,
      occasion: ['work', 'formal', 'party'],
      colors: ['black', 'nude', 'burgundy'],
      sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      rating: 4.8,
      reviews: 342,
      isNew: true,
      isBestseller: false,
      comfortTech: ['Memory Foam', 'Arch Support', 'Cushioned Sole'],
      has3DView: true,
      sustainabilityScore: 78
    },
    {
      id: '2',
      name: 'Ballet Perfect Flats',
      brand: 'GRACE',
      price: 145,
      image: '/api/placeholder/300/400',
      category: 'flats',
      heelHeight: 0,
      comfortRating: 8,
      occasion: ['casual', 'work'],
      colors: ['black', 'nude', 'navy', 'blush'],
      sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
      rating: 4.7,
      reviews: 289,
      isNew: false,
      isBestseller: true,
      comfortTech: ['Flexible Sole', 'Breathable Lining'],
      has3DView: true,
      sustainabilityScore: 85
    },
    {
      id: '3',
      name: 'Urban Explorer Boots',
      brand: 'TREK',
      price: 385,
      originalPrice: 450,
      image: '/api/placeholder/300/400',
      category: 'boots',
      heelHeight: 1.5,
      comfortRating: 9,
      occasion: ['casual'],
      colors: ['black', 'brown', 'cognac'],
      sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      rating: 4.9,
      reviews: 156,
      isNew: false,
      isBestseller: true,
      comfortTech: ['Waterproof', 'Insulated', 'Grip Sole'],
      has3DView: false,
      sustainabilityScore: 72
    },
    {
      id: '4',
      name: 'Performance Sneakers',
      brand: 'ACTIVE AURA',
      price: 165,
      image: '/api/placeholder/300/400',
      category: 'sneakers',
      heelHeight: 1,
      comfortRating: 10,
      occasion: ['athletic', 'casual'],
      colors: ['white', 'black', 'gray', 'pink'],
      sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      rating: 4.6,
      reviews: 523,
      isNew: true,
      isBestseller: false,
      comfortTech: ['Air Cushioning', 'Moisture Wicking', 'Lightweight'],
      has3DView: true,
      sustainabilityScore: 88
    }
  ];

  const comfortTechnologies: ComfortTechnology[] = [
    {
      name: 'Memory Foam',
      description: 'Molds to your foot shape for personalized comfort',
      icon: '🧠',
      benefits: ['Custom fit', 'Pressure relief', 'All-day comfort']
    },
    {
      name: 'Arch Support',
      description: 'Built-in support for proper foot alignment',
      icon: '🏗️',
      benefits: ['Better posture', 'Reduced fatigue', 'Foot health']
    },
    {
      name: 'Cushioned Sole',
      description: 'Extra padding for impact absorption',
      icon: '☁️',
      benefits: ['Shock absorption', 'Joint protection', 'Walking comfort']
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const occasionMatch = selectedOccasion === 'all' || product.occasion.includes(selectedOccasion as any);
      const heelMatch = product.heelHeight >= heelRange[0] && product.heelHeight <= heelRange[1];
      const viewMatch = !show3DOnly || product.has3DView;
      
      return categoryMatch && occasionMatch && heelMatch && viewMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'comfort':
        filtered.sort((a, b) => b.comfortRating - a.comfortRating);
        break;
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
  }, [products, selectedCategory, selectedOccasion, heelRange, show3DOnly, sortBy]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      'heels': '👠',
      'flats': '🥿',
      'boots': '👢',
      'sneakers': '👟',
      'sandals': '👡'
    };
    return icons[category as keyof typeof icons] || '👞';
  };

  const getComfortColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 bg-green-50';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-50';
    if (rating >= 4) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getHeelDescription = (height: number) => {
    if (height === 0) return 'Flat';
    if (height <= 1) return 'Low';
    if (height <= 3) return 'Mid';
    if (height <= 4) return 'High';
    return 'Very High';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Footprints className="h-12 w-12 text-pink-300" />
              <h1 className="text-6xl md:text-7xl font-playfair font-bold">Shoes</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-rose-100 font-light">
              Step into comfort and style with our curated collection
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-blue-300" />
                <span>360° 3D View</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-300" />
                <span>Comfort Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span>Occasion Matcher</span>
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
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            >
              <option value="all">All Categories</option>
              <option value="heels">Heels</option>
              <option value="flats">Flats</option>
              <option value="boots">Boots</option>
              <option value="sneakers">Sneakers</option>
              <option value="sandals">Sandals</option>
            </select>

            {/* Occasion Filter */}
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            >
              <option value="all">All Occasions</option>
              <option value="casual">Casual</option>
              <option value="work">Work</option>
              <option value="formal">Formal</option>
              <option value="party">Party</option>
              <option value="athletic">Athletic</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="comfort">Most Comfortable</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* 3D View Toggle */}
            <button
              onClick={() => setShow3DOnly(!show3DOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                show3DOnly
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <RotateCcw className="h-4 w-4" />
              3D View Only
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Comfort Tech Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-pink-600" />
                Comfort Technology
              </h3>
              
              <div className="space-y-4">
                {comfortTechnologies.map((tech, index) => (
                  <div key={index} className="border-l-4 border-pink-200 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{tech.icon}</span>
                      <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{tech.description}</p>
                    <div className="text-xs text-pink-600">
                      {tech.benefits.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heel Height Guide */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Heel Height Guide</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Flat (0")</span>
                  <div className="w-8 h-2 bg-gray-300 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Low (1-2")</span>
                  <div className="w-12 h-2 bg-yellow-400 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mid (2-3")</span>
                  <div className="w-16 h-2 bg-orange-400 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>High (3-4")</span>
                  <div className="w-20 h-2 bg-red-400 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Very High (4"+)</span>
                  <div className="w-24 h-2 bg-purple-500 rounded"></div>
                </div>
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

                      {/* 3D View Button */}
                      {product.has3DView && (
                        <div className="absolute top-4 right-4">
                          <button className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        </div>
                      )}

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
                          className="p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 backdrop-blur-md transition-colors"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-pink-600 uppercase tracking-wider mb-1">
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

                      {/* Category & Heel Height */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{getCategoryIcon(product.category)}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                          {product.category}
                        </span>
                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                          {getHeelDescription(product.heelHeight)} ({product.heelHeight}")
                        </span>
                      </div>

                      {/* Comfort Rating */}
                      <div className="mb-4">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getComfortColor(product.comfortRating)}`}>
                          <Activity className="h-3 w-3" />
                          Comfort: {product.comfortRating}/10
                        </div>
                      </div>

                      {/* Comfort Technologies */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-1">Comfort Tech:</div>
                        <div className="flex flex-wrap gap-1">
                          {product.comfortTech.slice(0, 2).map((tech, index) => (
                            <span
                              key={index}
                              className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {product.comfortTech.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                              +{product.comfortTech.length - 2} more
                            </span>
                          )}
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
                                backgroundColor: color === 'nude' ? '#d4a574' :
                                               color === 'burgundy' ? '#800020' :
                                               color === 'blush' ? '#de5d83' :
                                               color === 'navy' ? '#000080' :
                                               color === 'cognac' ? '#a0522d' :
                                               color === 'brown' ? '#8b4513' :
                                               color === 'gray' ? '#808080' :
                                               color === 'pink' ? '#ffc0cb' : color
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
                <div className="text-6xl mb-4">👠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No shoes found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more products</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shoe Care Tips */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Shoe Care & Styling</h2>
            <p className="text-lg text-gray-600">Keep your shoes looking their best</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧽</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Regular Cleaning</h3>
              <p className="text-sm text-gray-600">
                Clean regularly with appropriate products. Use shoe trees to maintain shape between wears.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👠</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Perfect Fit</h3>
              <p className="text-sm text-gray-600">
                Shop in the afternoon when feet are slightly swollen for the most accurate fit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Proper Storage</h3>
              <p className="text-sm text-gray-600">
                Store in dust bags or boxes. Keep boots upright with boot trees to prevent creasing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
