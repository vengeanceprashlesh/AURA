'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Grid, List, ChevronDown, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for products - in a real app, this would come from an API
const mockProducts = [
  {
    id: 1,
    name: "Silk Wrap Dress",
    brand: "Designer Brand",
    price: 198,
    originalPrice: 298,
    images: ["/api/placeholder/300/400", "/api/placeholder/300/400"],
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isSale: true,
    rating: 4.5,
    reviews: 124
  },
  {
    id: 2,
    name: "Cropped Blazer",
    brand: "Fashion House",
    price: 159,
    images: ["/api/placeholder/300/400", "/api/placeholder/300/400"],
    colors: ["Beige", "Black", "White"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: "High Waisted Jeans",
    brand: "Denim Co",
    price: 128,
    images: ["/api/placeholder/300/400"],
    colors: ["Blue", "Black", "Light Wash"],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    rating: 4.6,
    reviews: 203
  },
  {
    id: 4,
    name: "Bodysuit",
    brand: "Basics",
    price: 45,
    images: ["/api/placeholder/300/400"],
    colors: ["Black", "White", "Nude"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.3,
    reviews: 156
  },
  {
    id: 5,
    name: "Maxi Skirt",
    brand: "Flowing",
    price: 89,
    originalPrice: 129,
    images: ["/api/placeholder/300/400"],
    colors: ["Floral", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isSale: true,
    rating: 4.4,
    reviews: 78
  },
  {
    id: 6,
    name: "Crop Top",
    brand: "Trendy",
    price: 38,
    images: ["/api/placeholder/300/400"],
    colors: ["White", "Black", "Pink"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    rating: 4.2,
    reviews: 91
  }
];

const categories = [
  "All", "Dresses", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"
];

const sortOptions = [
  "Featured",
  "New Arrivals", 
  "Best Sellers",
  "Price: Low to High",
  "Price: High to Low",
  "Highest Rated"
];

const WomensPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const formatPrice = (price: number) => `$${price}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-light text-black mb-2">
              WOMEN
            </h1>
            <p className="text-gray-600 text-lg">
              Discover the latest trends and timeless pieces
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Categories */}
            <div className="flex items-center space-x-8 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'text-black border-b-2 border-black pb-1'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-black transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>FILTER</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm text-gray-700 bg-white border-none outline-none cursor-pointer appearance-none pr-6"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      SORT: {option.toUpperCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 ${viewMode === 'grid' ? 'text-black' : 'text-gray-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 ${viewMode === 'list' ? 'text-black' : 'text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0">
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-3">PRICE</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Under $50
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      $50 - $100
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      $100 - $200
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Over $200
                    </label>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-3">SIZE</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className="border border-gray-300 py-2 text-sm hover:border-black transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-sm font-medium text-black mb-3">COLOR</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      { name: "Black", value: "#000000" },
                      { name: "White", value: "#FFFFFF" },
                      { name: "Red", value: "#DC2626" },
                      { name: "Blue", value: "#2563EB" },
                      { name: "Green", value: "#16A34A" },
                      { name: "Pink", value: "#EC4899" },
                    ].map((color) => (
                      <button
                        key={color.name}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-black transition-colors"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {mockProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative">
                      {/* Product Image */}
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 space-y-1">
                          {product.isNew && (
                            <span className="bg-black text-white text-xs px-2 py-1 font-medium">
                              NEW
                            </span>
                          )}
                          {product.isSale && (
                            <span className="bg-red-600 text-white text-xs px-2 py-1 font-medium">
                              SALE
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                          <Heart className="h-4 w-4 text-gray-700 hover:text-black" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="mt-4 space-y-2">
                        <div className="text-xs text-gray-500 uppercase tracking-wider">
                          {product.brand}
                        </div>
                        
                        <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-black">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Colors */}
                        <div className="flex items-center space-x-1 mt-2">
                          <span className="text-xs text-gray-500">
                            {product.colors.length} color{product.colors.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-white border border-black text-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomensPage;
