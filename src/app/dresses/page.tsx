'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Filter, 
  Grid3X3, 
  List, 
  ChevronDown, 
  Search,
  Sparkles,
  Crown,
  Flower,
  Wand2,
  Gem,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

interface Dress {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isFavorite: boolean;
  category: string;
  occasion: string;
  style: string;
}

const mockDresses: Dress[] = [
  {
    id: '1',
    name: 'Silk Wrap Evening Dress',
    brand: 'LUXE COUTURE',
    price: 459,
    salePrice: 229,
    images: ['/api/placeholder/300/400', '/api/placeholder/300/400'],
    colors: ['Blush Pink', 'Midnight Blue', 'Champagne'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 127,
    isNew: true,
    isFavorite: false,
    category: 'Evening',
    occasion: 'Formal',
    style: 'Wrap'
  },
  {
    id: '2',
    name: 'Floral Maxi Sundress',
    brand: 'BLOOM & BEAUTY',
    price: 189,
    images: ['/api/placeholder/300/400', '/api/placeholder/300/400'],
    colors: ['Coral Floral', 'Lavender Garden', 'Rose Bouquet'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 89,
    isNew: false,
    isFavorite: true,
    category: 'Casual',
    occasion: 'Day',
    style: 'Maxi'
  },
  {
    id: '3',
    name: 'Little Black Cocktail Dress',
    brand: 'CLASSIC CHARM',
    price: 299,
    images: ['/api/placeholder/300/400', '/api/placeholder/300/400'],
    colors: ['Black', 'Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviews: 203,
    isNew: false,
    isFavorite: false,
    category: 'Cocktail',
    occasion: 'Party',
    style: 'Fitted'
  },
  {
    id: '4',
    name: 'Boho Lace Mini Dress',
    brand: 'FREE SPIRIT',
    price: 149,
    salePrice: 99,
    images: ['/api/placeholder/300/400', '/api/placeholder/300/400'],
    colors: ['Cream', 'Dusty Rose', 'Sage Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 156,
    isNew: true,
    isFavorite: true,
    category: 'Casual',
    occasion: 'Day',
    style: 'Boho'
  }
];

export default function DressesPage() {
  const [dresses, setDresses] = useState<Dress[]>(mockDresses);
  const [filteredDresses, setFilteredDresses] = useState<Dress[]>(mockDresses);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['2', '4']));
  
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    sizes: [] as string[],
    colors: [] as string[],
    occasions: [] as string[],
    brands: [] as string[]
  });

  const toggleFavorite = (dressId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dressId)) {
        newSet.delete(dressId);
      } else {
        newSet.add(dressId);
      }
      return newSet;
    });
  };

  const occasions = ['Day', 'Formal', 'Party', 'Wedding', 'Brunch'];
  const brands = ['LUXE COUTURE', 'BLOOM & BEAUTY', 'CLASSIC CHARM', 'FREE SPIRIT'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink-50 via-white to-lavender-50">
      {/* Beautiful Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-soft-pink-100 via-blush-100 to-lavender-100 py-20">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-soft-pink-200 rounded-full opacity-40 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-lavender-200 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blush-200 rounded-full opacity-35 blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Flower className="h-12 w-12 text-soft-pink-500" />
              <h1 className="text-5xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-soft-pink-600 via-blush-500 to-lavender-600 bg-clip-text text-transparent">
                ✨ Dresses ✨
              </h1>
              <Crown className="h-12 w-12 text-lavender-500" />
            </div>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto font-light mb-8">
              From casual sundresses to elegant evening gowns, find your perfect dress for every special moment 💖
            </p>
            
            {/* Quick Filter Chips */}
            <div className="flex flex-wrap justify-center gap-3">
              {['New Arrivals', 'Evening Wear', 'Casual', 'Sale', 'Size Inclusive'].map((chip, index) => (
                <motion.button
                  key={chip}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-6 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-medium text-charcoal-700 hover:bg-soft-pink-100 transition-all border border-soft-pink-200 hover:border-soft-pink-300"
                >
                  {chip}
                </motion.button>
              ))}
            </div>
          </motion.div>
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
              <span className="font-medium">{filteredDresses.length}</span> beautiful dresses found
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
              <option value="newest">Newest First</option>
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

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                className="w-80 bg-white rounded-3xl p-6 shadow-lg border border-soft-pink-200 h-fit"
              >
                <h3 className="font-playfair font-bold text-xl text-charcoal-900 mb-6 flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-soft-pink-500" />
                  Find Your Perfect Dress
                </h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-charcoal-700 mb-3">
                    💰 Price Range
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      className="w-full accent-soft-pink-500"
                    />
                    <div className="flex justify-between text-xs text-charcoal-500">
                      <span>$0</span>
                      <span>$500+</span>
                    </div>
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-charcoal-700 mb-3">
                    📏 Size (Size Inclusive!)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        className="py-2 px-3 text-sm border border-soft-pink-200 rounded-lg hover:bg-soft-pink-50 hover:border-soft-pink-300 transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-charcoal-700 mb-3">
                    🎉 Occasion
                  </label>
                  <div className="space-y-2">
                    {occasions.map(occasion => (
                      <label key={occasion} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-soft-pink-300 text-soft-pink-600 focus:ring-soft-pink-500"
                        />
                        <span className="ml-2 text-sm text-charcoal-600">{occasion}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-3">
                    ✨ Brand
                  </label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-soft-pink-300 text-soft-pink-600 focus:ring-soft-pink-500"
                        />
                        <span className="ml-2 text-sm text-charcoal-600">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDresses.map((dress, index) => (
                  <motion.div
                    key={dress.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-soft-pink-100"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={dress.images[0]}
                        alt={dress.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {dress.isNew && (
                          <span className="bg-gradient-to-r from-soft-pink-500 to-blush-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            NEW
                          </span>
                        )}
                        {dress.salePrice && (
                          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            SALE
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <motion.button
                        onClick={() => toggleFavorite(dress.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart 
                          className={`h-4 w-4 transition-colors ${
                            favorites.has(dress.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-charcoal-600 hover:text-red-500'
                          }`} 
                        />
                      </motion.button>

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <motion.button
                          className="bg-white text-charcoal-900 px-6 py-2 rounded-full font-semibold hover:bg-soft-pink-50 transition-colors flex items-center gap-2"
                          initial={{ y: 10, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                        >
                          Quick View
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-soft-pink-600 uppercase tracking-wider mb-1">
                          {dress.brand}
                        </p>
                        <h3 className="font-playfair font-bold text-lg text-charcoal-900 line-clamp-2">
                          {dress.name}
                        </h3>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{dress.rating}</span>
                        </div>
                        <span className="text-xs text-charcoal-500">({dress.reviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        {dress.salePrice ? (
                          <>
                            <span className="text-2xl font-bold text-red-600">${dress.salePrice}</span>
                            <span className="text-lg text-charcoal-400 line-through">${dress.price}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-charcoal-900">${dress.price}</span>
                        )}
                      </div>

                      {/* Colors */}
                      <div className="mb-4">
                        <p className="text-xs text-charcoal-600 mb-2">{dress.colors.length} colors available</p>
                        <div className="flex gap-2">
                          {dress.colors.slice(0, 3).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ 
                                backgroundColor: color.includes('Pink') ? '#fda4af' : 
                                               color.includes('Blue') ? '#93c5fd' :
                                               color.includes('Champagne') ? '#fde68a' :
                                               color.includes('Black') ? '#374151' :
                                               color.includes('Coral') ? '#fb7185' :
                                               color.includes('Lavender') ? '#c4b5fd' :
                                               color.includes('Rose') ? '#fb7185' :
                                               color.includes('Cream') ? '#fef3c7' :
                                               color.includes('Green') ? '#86efac' : '#e5e7eb'
                              }}
                            />
                          ))}
                          {dress.colors.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-charcoal-100 flex items-center justify-center">
                              <span className="text-xs text-charcoal-600">+{dress.colors.length - 3}</span>
                            </div>
                          )}
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
            ) : (
              /* List View */
              <div className="space-y-6">
                {filteredDresses.map((dress, index) => (
                  <motion.div
                    key={dress.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 gap-6 border border-soft-pink-100"
                  >
                    <div className="w-48 h-64 flex-shrink-0">
                      <img
                        src={dress.images[0]}
                        alt={dress.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs font-semibold text-soft-pink-600 uppercase tracking-wider mb-1">
                            {dress.brand}
                          </p>
                          <h3 className="font-playfair font-bold text-xl text-charcoal-900">
                            {dress.name}
                          </h3>
                        </div>
                        <motion.button
                          onClick={() => toggleFavorite(dress.id)}
                          className="p-2 hover:bg-soft-pink-50 rounded-full transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart 
                            className={`h-5 w-5 ${
                              favorites.has(dress.id) 
                                ? 'text-red-500 fill-red-500' 
                                : 'text-charcoal-600'
                            }`} 
                          />
                        </motion.button>
                      </div>
                      
                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{dress.rating}</span>
                        </div>
                        <span className="text-xs text-charcoal-500">({dress.reviews} reviews)</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center gap-3 mb-4">
                        {dress.salePrice ? (
                          <>
                            <span className="text-2xl font-bold text-red-600">${dress.salePrice}</span>
                            <span className="text-lg text-charcoal-400 line-through">${dress.price}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-charcoal-900">${dress.price}</span>
                        )}
                      </div>
                      
                      {/* Description */}
                      <p className="text-charcoal-600 mb-4">
                        Perfect for {dress.occasion.toLowerCase()} occasions. Available in {dress.colors.length} beautiful colors.
                      </p>
                      
                      {/* Add to Cart Button */}
                      <motion.button
                        className="bg-gradient-to-r from-soft-pink-500 to-blush-500 text-white px-8 py-3 rounded-full font-semibold hover:from-soft-pink-600 hover:to-blush-600 transition-all flex items-center gap-2"
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
            )}
          </div>
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="bg-gradient-to-br from-lavender-100 to-blush-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Gem className="h-10 w-10 text-lavender-500" />
              <h2 className="text-4xl font-playfair font-bold bg-gradient-to-r from-soft-pink-600 to-lavender-600 bg-clip-text text-transparent">
                💫 Style Inspiration
              </h2>
              <Sparkles className="h-10 w-10 text-soft-pink-500" />
            </div>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto mb-12 font-light">
              Get personalized styling tips and outfit ideas to make every dress look amazing on you!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-soft-pink-200">
                <Crown className="h-12 w-12 text-soft-pink-500 mx-auto mb-4" />
                <h3 className="font-playfair font-bold text-lg mb-2">👑 Personal Stylist</h3>
                <p className="text-charcoal-600 text-sm">Get 1-on-1 styling advice from our fashion experts</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-lavender-200">
                <Wand2 className="h-12 w-12 text-lavender-500 mx-auto mb-4" />
                <h3 className="font-playfair font-bold text-lg mb-2">✨ Style Quiz</h3>
                <p className="text-charcoal-600 text-sm">Discover your personal style with our fun quiz</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-blush-200">
                <Heart className="h-12 w-12 text-blush-500 mx-auto mb-4 fill-blush-500" />
                <h3 className="font-playfair font-bold text-lg mb-2">💖 Size Guide</h3>
                <p className="text-charcoal-600 text-sm">Find your perfect fit with our detailed size guide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
