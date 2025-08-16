'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Filter, 
  Grid3X3, 
  List, 
  Search,
  Sparkles,
  Crown,
  Wand2,
  Gem,
  ShoppingBag,
  ArrowRight,
  Palette,
  Droplets,
  Sun,
  Moon,
  Zap,
  Gift
} from 'lucide-react';

interface BeautyProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  images: string[];
  shades: string[];
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestseller: boolean;
  isVegan: boolean;
  isCrueltyFree: boolean;
  skinType: string[];
  benefits: string[];
}

const mockProducts: BeautyProduct[] = [
  {
    id: '1',
    name: 'Radiant Glow Foundation',
    brand: 'LUXE BEAUTY',
    price: 58,
    salePrice: 45,
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    shades: ['Fair', 'Light', 'Medium', 'Tan', 'Deep'],
    category: 'Makeup',
    subcategory: 'Face',
    rating: 4.8,
    reviews: 1247,
    isNew: false,
    isBestseller: true,
    isVegan: true,
    isCrueltyFree: true,
    skinType: ['All Skin Types'],
    benefits: ['Long-wearing', 'Buildable Coverage', 'SPF 30']
  },
  {
    id: '2',
    name: 'Velvet Matte Lipstick',
    brand: 'KISS & TELL',
    price: 32,
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    shades: ['Ruby Red', 'Rose Pink', 'Coral Kiss', 'Berry Bliss', 'Nude Dream'],
    category: 'Makeup',
    subcategory: 'Lips',
    rating: 4.9,
    reviews: 892,
    isNew: true,
    isBestseller: false,
    isVegan: true,
    isCrueltyFree: true,
    skinType: ['All Skin Types'],
    benefits: ['Long-lasting', '8-Hour Wear', 'Transfer-proof']
  },
  {
    id: '3',
    name: 'Hydrating Vitamin C Serum',
    brand: 'GLOW LABS',
    price: 89,
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    shades: [],
    category: 'Skincare',
    subcategory: 'Serums',
    rating: 4.7,
    reviews: 2156,
    isNew: false,
    isBestseller: true,
    isVegan: true,
    isCrueltyFree: true,
    skinType: ['All Skin Types', 'Sensitive'],
    benefits: ['Brightening', 'Anti-aging', 'Hydrating']
  },
  {
    id: '4',
    name: 'Shimmer Eyeshadow Palette',
    brand: 'SPARKLE & SHINE',
    price: 65,
    salePrice: 39,
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    shades: ['Rose Gold Collection', 'Sunset Vibes', 'Ocean Dreams'],
    category: 'Makeup',
    subcategory: 'Eyes',
    rating: 4.6,
    reviews: 567,
    isNew: true,
    isBestseller: false,
    isVegan: false,
    isCrueltyFree: true,
    skinType: ['All Skin Types'],
    benefits: ['Highly Pigmented', 'Blendable', 'Long-wearing']
  }
];

const categories = [
  { id: 'makeup', name: 'Makeup', icon: Palette, color: 'soft-pink' },
  { id: 'skincare', name: 'Skincare', icon: Droplets, color: 'lavender' },
  { id: 'fragrance', name: 'Fragrance', icon: Sparkles, color: 'blush' },
  { id: 'haircare', name: 'Hair Care', icon: Wand2, color: 'sage' }
];

const subcategories = {
  makeup: ['Face', 'Eyes', 'Lips', 'Cheeks', 'Brows'],
  skincare: ['Cleansers', 'Moisturizers', 'Serums', 'Masks', 'Treatments'],
  fragrance: ['Perfume', 'Body Mist', 'Candles'],
  haircare: ['Shampoo', 'Conditioner', 'Styling', 'Treatments']
};

export default function BeautyPage() {
  const [products, setProducts] = useState<BeautyProduct[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<BeautyProduct[]>(mockProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '3']));

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getShadeColor = (shade: string) => {
    const shadeColors: { [key: string]: string } = {
      'Fair': '#f7e7ce',
      'Light': '#f1d5b5',
      'Medium': '#d4a574',
      'Tan': '#c4915c',
      'Deep': '#8b5d3b',
      'Ruby Red': '#dc2626',
      'Rose Pink': '#f472b6',
      'Coral Kiss': '#fb7185',
      'Berry Bliss': '#be185d',
      'Nude Dream': '#d4a574'
    };
    return shadeColors[shade] || '#e5e7eb';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink-50 via-white to-lavender-50">
      {/* Beautiful Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-soft-pink-100 via-blush-100 to-lavender-100 py-24">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-soft-pink-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-lavender-200 rounded-full opacity-40 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-blush-200 rounded-full opacity-25 blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Palette className="h-12 w-12 text-soft-pink-500" />
              <h1 className="text-5xl md:text-7xl font-playfair font-bold bg-gradient-to-r from-soft-pink-600 via-blush-500 to-lavender-600 bg-clip-text text-transparent">
                💄 Beauty 💫
              </h1>
              <Sparkles className="h-12 w-12 text-lavender-500" />
            </div>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto font-light mb-8">
              Discover your most beautiful self with our curated collection of makeup, skincare, and beauty essentials ✨
            </p>
            
            {/* Beauty Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Crown, text: 'Premium Brands' },
                { icon: Heart, text: 'Cruelty-Free' },
                { icon: Droplets, text: 'Clean Beauty' },
                { icon: Gift, text: 'Free Samples' }
              ].map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-soft-pink-200"
                >
                  <Icon className="h-8 w-8 text-soft-pink-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-charcoal-700">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-soft-pink-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4 overflow-x-auto">
            <motion.button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-2 py-3 px-4 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-soft-pink-100 text-soft-pink-600 border-2 border-soft-pink-300'
                  : 'text-charcoal-600 hover:text-soft-pink-600 hover:bg-soft-pink-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="h-4 w-4" />
              All Beauty
            </motion.button>
            
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 py-3 px-4 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? `bg-${category.color}-100 text-${category.color}-600 border-2 border-${category.color}-300`
                      : 'text-charcoal-600 hover:text-soft-pink-600 hover:bg-soft-pink-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-soft-pink-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="h-4 w-4 text-soft-pink-600" />
              <span className="font-medium text-charcoal-700">Filters</span>
            </motion.button>
            
            <div className="text-charcoal-600">
              <span className="font-medium">{filteredProducts.length}</span> beauty products found
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white rounded-full border border-soft-pink-200 text-charcoal-700 focus:ring-2 focus:ring-soft-pink-300 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="bestsellers">Bestsellers</option>
              <option value="new">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            {/* View Toggle */}
            <div className="flex items-center bg-white rounded-full p-1 shadow-md border border-soft-pink-200">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'grid' ? 'bg-soft-pink-100 text-soft-pink-600' : 'text-charcoal-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="h-4 w-4" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'list' ? 'bg-soft-pink-100 text-soft-pink-600' : 'text-charcoal-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-soft-pink-100 ${
                viewMode === 'list' ? 'flex gap-6 p-6' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-48 flex-shrink-0 rounded-2xl' : 'aspect-square'
              }`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-gradient-to-r from-soft-pink-500 to-blush-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      NEW
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      BESTSELLER
                    </span>
                  )}
                  {product.salePrice && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      SALE
                    </span>
                  )}
                </div>

                {/* Certifications */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {product.isVegan && (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-bold">
                      VEGAN
                    </span>
                  )}
                  {product.isCrueltyFree && (
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-bold">
                      CF
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <motion.button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      favorites.has(product.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-charcoal-600 hover:text-red-500'
                    }`} 
                  />
                </motion.button>

                {/* Quick Add Overlay */}
                {viewMode === 'grid' && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <motion.button
                      className="bg-white text-charcoal-900 px-6 py-2 rounded-full font-semibold hover:bg-soft-pink-50 transition-colors flex items-center gap-2"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      Quick Add
                      <ShoppingBag className="h-4 w-4" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-soft-pink-600 uppercase tracking-wider mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-playfair font-bold text-lg text-charcoal-900 line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-charcoal-500">({product.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-red-600">${product.salePrice}</span>
                      <span className="text-lg text-charcoal-400 line-through">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-charcoal-900">${product.price}</span>
                  )}
                </div>

                {/* Shades */}
                {product.shades.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-charcoal-600 mb-2">
                      {product.shades.length} shade{product.shades.length > 1 ? 's' : ''} available
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {product.shades.slice(0, 5).map((shade, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: getShadeColor(shade) }}
                          title={shade}
                        />
                      ))}
                      {product.shades.length > 5 && (
                        <div className="w-6 h-6 rounded-full bg-charcoal-100 flex items-center justify-center">
                          <span className="text-xs text-charcoal-600">+{product.shades.length - 5}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.benefits.slice(0, 2).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-soft-pink-50 text-soft-pink-600 px-2 py-1 rounded-full border border-soft-pink-200"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-soft-pink-500 to-blush-500 text-white py-3 rounded-full font-semibold hover:from-soft-pink-600 hover:to-blush-600 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Beauty Services Section */}
      <div className="bg-gradient-to-br from-lavender-100 to-blush-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Wand2 className="h-10 w-10 text-lavender-500" />
              <h2 className="text-4xl font-playfair font-bold bg-gradient-to-r from-soft-pink-600 to-lavender-600 bg-clip-text text-transparent">
                ✨ Beauty Services
              </h2>
              <Crown className="h-10 w-10 text-soft-pink-500" />
            </div>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto mb-12 font-light">
              Elevate your beauty routine with our expert services and personalized recommendations
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-soft-pink-200 hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <Palette className="h-12 w-12 text-soft-pink-500 mx-auto mb-4" />
                <h3 className="font-playfair font-bold text-lg mb-2">💄 Virtual Makeover</h3>
                <p className="text-charcoal-600 text-sm">Try on makeup virtually with our AR technology</p>
              </motion.div>
              
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-lavender-200 hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <Droplets className="h-12 w-12 text-lavender-500 mx-auto mb-4" />
                <h3 className="font-playfair font-bold text-lg mb-2">🧴 Skincare Analysis</h3>
                <p className="text-charcoal-600 text-sm">Get personalized skincare recommendations</p>
              </motion.div>
              
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-blush-200 hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <Crown className="h-12 w-12 text-blush-500 mx-auto mb-4" />
                <h3 className="font-playfair font-bold text-lg mb-2">👑 Beauty Consultation</h3>
                <p className="text-charcoal-600 text-sm">Book a session with our beauty experts</p>
              </motion.div>
              
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-sage-200 hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <Gift className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                <h3 className="font-playfair font-bold text-lg mb-2">🎁 Beauty Box</h3>
                <p className="text-charcoal-600 text-sm">Monthly curated beauty products delivered</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Clean Beauty Promise */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Heart className="h-10 w-10 text-soft-pink-500 fill-soft-pink-500" />
              <h2 className="text-3xl font-playfair font-bold text-charcoal-900">
                💚 Our Clean Beauty Promise
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Clean Ingredients</h3>
                <p className="text-xs text-charcoal-600">Free from harmful chemicals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🐰</span>
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Cruelty-Free</h3>
                <p className="text-xs text-charcoal-600">Never tested on animals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">♻️</span>
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Sustainable</h3>
                <p className="text-xs text-charcoal-600">Eco-friendly packaging</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Effective</h3>
                <p className="text-xs text-charcoal-600">Proven results you'll love</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
