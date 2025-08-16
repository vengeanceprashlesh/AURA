'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Filter, Heart, ShoppingBag, Eye, Star, Zap, Palette, Ruler, Camera } from 'lucide-react';

interface TopProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  type: 'blouse' | 'tshirt' | 'sweater' | 'blazer' | 'tank' | 'cardigan';
  style: 'casual' | 'professional' | 'elegant' | 'sporty' | 'bohemian';
  fit: 'slim' | 'regular' | 'oversized' | 'loose';
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestseller: boolean;
  sustainabilityScore: number;
  virtualTryOn: boolean;
}

interface StyleGuide {
  occasion: string;
  description: string;
  topTypes: string[];
  styling: string[];
  colors: string[];
}

export default function TopsPage() {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TopProduct[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Sample data
  const sampleProducts: TopProduct[] = [
    {
      id: '1',
      name: 'Silk Cascade Blouse',
      brand: 'ETHEREAL',
      price: 189,
      originalPrice: 225,
      image: '/api/placeholder/300/400',
      type: 'blouse',
      style: 'elegant',
      fit: 'regular',
      colors: ['ivory', 'dusty-rose', 'sage'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.8,
      reviews: 127,
      isNew: true,
      isBestseller: false,
      sustainabilityScore: 85,
      virtualTryOn: true
    },
    {
      id: '2',
      name: 'Power Blazer',
      brand: 'EXECUTIVE',
      price: 295,
      image: '/api/placeholder/300/400',
      type: 'blazer',
      style: 'professional',
      fit: 'slim',
      colors: ['black', 'navy', 'charcoal'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      rating: 4.9,
      reviews: 203,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 72,
      virtualTryOn: true
    },
    {
      id: '3',
      name: 'Cloud Cashmere Sweater',
      brand: 'LUXE KNIT',
      price: 245,
      originalPrice: 295,
      image: '/api/placeholder/300/400',
      type: 'sweater',
      style: 'casual',
      fit: 'oversized',
      colors: ['cream', 'camel', 'forest'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.7,
      reviews: 89,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 90,
      virtualTryOn: false
    },
    {
      id: '4',
      name: 'Athletic Tank',
      brand: 'ACTIVE AURA',
      price: 45,
      image: '/api/placeholder/300/400',
      type: 'tank',
      style: 'sporty',
      fit: 'slim',
      colors: ['black', 'white', 'sage', 'coral'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.6,
      reviews: 345,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 78,
      virtualTryOn: true
    }
  ];

  const styleGuides: StyleGuide[] = [
    {
      occasion: 'Office Professional',
      description: 'Polished and sophisticated looks for the workplace',
      topTypes: ['blazers', 'blouses', 'sweaters'],
      styling: ['Tuck into high-waist trousers', 'Layer over camisoles', 'Pair with structured accessories'],
      colors: ['navy', 'black', 'ivory', 'charcoal']
    },
    {
      occasion: 'Weekend Casual',
      description: 'Comfortable yet stylish for leisure activities',
      topTypes: ['t-shirts', 'cardigans', 'tanks'],
      styling: ['Pair with denim', 'Layer for versatility', 'Add sneakers for comfort'],
      colors: ['white', 'sage', 'denim', 'coral']
    },
    {
      occasion: 'Evening Elegant',
      description: 'Sophisticated pieces for dinner and events',
      topTypes: ['blouses', 'blazers'],
      styling: ['Tuck into midi skirts', 'Add statement jewelry', 'Pair with heels'],
      colors: ['black', 'dusty-rose', 'gold', 'deep-navy']
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const typeMatch = selectedType === 'all' || product.type === selectedType;
      const styleMatch = selectedStyle === 'all' || product.style === selectedStyle;
      const fitMatch = selectedFit === 'all' || product.fit === selectedFit;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return typeMatch && styleMatch && fitMatch && priceMatch;
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
  }, [products, selectedType, selectedStyle, selectedFit, priceRange, sortBy]);

  const getTypeIcon = (type: string) => {
    const icons = {
      'blouse': '👔',
      'tshirt': '👕',
      'sweater': '🧥',
      'blazer': '👨‍💼',
      'tank': '🎽',
      'cardigan': '🧥'
    };
    return icons[type as keyof typeof icons] || '👕';
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shirt className="h-12 w-12 text-pink-300" />
              <h1 className="text-6xl md:text-7xl font-playfair font-bold">Tops</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 font-light">
              Elevate your wardrobe with perfectly crafted pieces
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-300" />
                <span>Virtual Try-On Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-green-300" />
                <span>Multiple Colors & Fits</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-yellow-300" />
                <span>Size Guide Included</span>
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
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="all">All Types</option>
              <option value="blouse">Blouses</option>
              <option value="tshirt">T-Shirts</option>
              <option value="sweater">Sweaters</option>
              <option value="blazer">Blazers</option>
              <option value="tank">Tanks</option>
              <option value="cardigan">Cardigans</option>
            </select>

            {/* Style Filter */}
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="all">All Styles</option>
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
              <option value="elegant">Elegant</option>
              <option value="sporty">Sporty</option>
              <option value="bohemian">Bohemian</option>
            </select>

            {/* Fit Filter */}
            <select
              value={selectedFit}
              onChange={(e) => setSelectedFit(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="all">All Fits</option>
              <option value="slim">Slim Fit</option>
              <option value="regular">Regular Fit</option>
              <option value="oversized">Oversized</option>
              <option value="loose">Loose Fit</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Virtual Try-On Toggle */}
            <button
              onClick={() => setShowVirtualTryOn(!showVirtualTryOn)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                showVirtualTryOn
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Camera className="h-4 w-4" />
              Virtual Try-On Only
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Style Guide Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600" />
                Style Guides
              </h3>
              
              <div className="space-y-4">
                {styleGuides.map((guide, index) => (
                  <div key={index} className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{guide.occasion}</h4>
                    <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                    <div className="text-xs text-purple-600">
                      {guide.topTypes.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Guide */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-purple-600" />
                Size Guide
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>XS:</span>
                  <span>32-34"</span>
                </div>
                <div className="flex justify-between">
                  <span>S:</span>
                  <span>34-36"</span>
                </div>
                <div className="flex justify-between">
                  <span>M:</span>
                  <span>36-38"</span>
                </div>
                <div className="flex justify-between">
                  <span>L:</span>
                  <span>38-40"</span>
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

                      {/* Virtual Try-On Button */}
                      {product.virtualTryOn && (
                        <div className="absolute top-4 right-4">
                          <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                            <Camera className="h-4 w-4" />
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
                          className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 backdrop-blur-md transition-colors"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
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

                      {/* Type & Style */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{getTypeIcon(product.type)}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                          {product.style}
                        </span>
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full capitalize">
                          {product.fit} fit
                        </span>
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
                                backgroundColor: color === 'ivory' ? '#f8f4f0' :
                                               color === 'dusty-rose' ? '#d4a5a5' :
                                               color === 'sage' ? '#9caf88' :
                                               color === 'charcoal' ? '#36454f' :
                                               color === 'navy' ? '#000080' :
                                               color === 'cream' ? '#f5f5dc' :
                                               color === 'camel' ? '#c19a6b' :
                                               color === 'forest' ? '#355e3b' :
                                               color === 'coral' ? '#ff7f50' : color
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

                      {/* Sustainability Score */}
                      <div className="mb-4">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSustainabilityColor(product.sustainabilityScore)}`}>
                          <Zap className="h-3 w-3" />
                          Sustainability: {product.sustainabilityScore}%
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
                <div className="text-6xl mb-4">👔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tops found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more products</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Care Instructions */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Care & Styling Tips</h2>
            <p className="text-lg text-gray-600">Keep your tops looking their best</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧼</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Washing</h3>
              <p className="text-sm text-gray-600">
                Follow care labels carefully. Use cold water for delicate fabrics like silk and cashmere.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👔</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Styling</h3>
              <p className="text-sm text-gray-600">
                Layer pieces for versatility. Tuck blouses for formal looks, leave untucked for casual vibes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Storage</h3>
              <p className="text-sm text-gray-600">
                Hang blazers and delicate blouses. Fold knitwear to maintain shape and prevent stretching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
