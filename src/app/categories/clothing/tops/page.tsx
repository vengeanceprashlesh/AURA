'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Filter, Heart, Grid3X3, List, SlidersHorizontal, Zap, TrendingUp } from 'lucide-react';

export default function TopsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Silk Camisole with Lace Trim',
      brand: 'Flora Nikrooz',
      price: '₹5,927.42',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=600',
      badges: ['TRENDING NOW!', 'BEST SELLER'],
      soldCount: 18,
      colors: ['beige', 'black', 'white'],
      href: '/products/1',
      isTrending: true
    },
    {
      id: 2,
      name: 'Oversized Blazer',
      brand: 'Maude Club',
      price: '₹10,721.65',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600',
      badges: ['BEST SELLER'],
      soldCount: 25,
      colors: ['navy', 'black', 'cream'],
      href: '/products/2',
      isTrending: false
    },
    {
      id: 3,
      name: 'Short Sleeve Pocket T-Shirt',
      brand: 'Polo Ralph Lauren',
      price: '₹3,922.56',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=600',
      badges: ['BEST SELLER'],
      soldCount: 12,
      colors: ['grey', 'white', 'navy'],
      href: '/products/3',
      isTrending: false
    },
    {
      id: 4,
      name: 'Cropped Knit Sweater',
      brand: 'SPANX',
      price: '₹3,312.38',
      originalPrice: '₹4,150.47',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
      badges: ['BEST SELLER'],
      soldCount: 31,
      colors: ['pink', 'black', 'cream'],
      href: '/products/4',
      isTrending: false
    },
    {
      id: 5,
      name: 'Ribbed Tank Top',
      brand: 'Everlane',
      price: '₹2,156.78',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=600',
      badges: ['NEW'],
      soldCount: 7,
      colors: ['white', 'black', 'grey'],
      href: '/products/5',
      isTrending: false
    },
    {
      id: 6,
      name: 'Vintage Band Tee',
      brand: 'Free People',
      price: '₹4,285.92',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&h=600',
      badges: [],
      soldCount: 3,
      colors: ['black', 'white', 'grey'],
      href: '/products/6',
      isTrending: false
    }
  ];

  const filters = {
    category: [
      { name: 'All Tops', count: 2847, active: true },
      { name: 'Blouses', count: 567, active: false },
      { name: 'T-Shirts', count: 823, active: false },
      { name: 'Sweaters', count: 432, active: false },
      { name: 'Camisoles', count: 298, active: false },
      { name: 'Blazers', count: 187, active: false }
    ],
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    color: ['Black', 'White', 'Beige', 'Navy', 'Pink', 'Grey', 'Red'],
    price: ['Under ₹2,000', '₹2,000 - ₹5,000', '₹5,000 - ₹10,000', 'Over ₹10,000'],
    designer: ['Flora Nikrooz', 'Maude Club', 'Polo Ralph Lauren', 'SPANX', 'Everlane', 'Free People']
  };

  const trendingTopics = [
    { name: 'Lingerie as Outerwear', count: 234, icon: '✨' },
    { name: 'Oversized Blazers', count: 567, icon: '👔' },
    { name: 'Cropped Sweaters', count: 345, icon: '🧥' },
    { name: 'Silk Camisoles', count: 456, icon: '💫' }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-dusty-rose-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-2">
              Tops
            </h1>
            <p className="text-lg text-charcoal-700">
              Discover your next favorite piece from our curated collection
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories/clothing" className="hover:text-dusty-rose-500">Clothing</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Tops</span>
        </nav>

        {/* Trending Topics Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-beige-200 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-5 w-5 text-dusty-rose-500" />
            <h3 className="font-medium text-charcoal-900">Trending Now</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <Link
                key={topic.name}
                href={`/trending/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center space-x-2 px-3 py-2 bg-beige-50 hover:bg-dusty-rose-50 rounded-full text-sm text-charcoal-700 hover:text-dusty-rose-600 transition-colors"
              >
                <span>{topic.icon}</span>
                <span>{topic.name}</span>
                <span className="text-xs text-charcoal-500">({topic.count})</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-semibold text-charcoal-900">Filters</h2>
                <button className="text-sm text-dusty-rose-500 hover:text-dusty-rose-600">
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {filters.category.map((cat) => (
                    <label key={cat.name} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          defaultChecked={cat.active}
                          className="w-4 h-4 text-dusty-rose-500 border-charcoal-300 focus:ring-dusty-rose-500"
                        />
                        <span className="ml-2 text-sm text-charcoal-700">{cat.name}</span>
                      </div>
                      <span className="text-xs text-charcoal-500">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Designer Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal-900 mb-3">Designer</h3>
                <div className="space-y-2">
                  {filters.designer.map((designer) => (
                    <label key={designer} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-dusty-rose-500 border-charcoal-300 rounded focus:ring-dusty-rose-500"
                      />
                      <span className="ml-2 text-sm text-charcoal-700">{designer}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal-900 mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {filters.size.map((size) => (
                    <button
                      key={size}
                      className="px-3 py-2 text-sm border border-charcoal-300 rounded hover:border-dusty-rose-500 hover:bg-dusty-rose-50 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.color.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-charcoal-200 hover:border-charcoal-400"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-medium text-charcoal-900 mb-3">Price</h3>
                <div className="space-y-2">
                  {filters.price.map((price) => (
                    <label key={price} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-dusty-rose-500 border-charcoal-300 rounded focus:ring-dusty-rose-500"
                      />
                      <span className="ml-2 text-sm text-charcoal-700">{price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="font-heading text-2xl font-bold text-charcoal-900">
                  All Tops
                </h2>
                <p className="text-charcoal-600 mt-1">
                  {products.length * 1000} items found
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-beige-200 rounded-lg hover:bg-beige-50 transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-beige-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-dusty-rose-500"
                >
                  <option value="featured">Sort By Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>

                {/* View Toggle */}
                <div className="flex items-center bg-white border border-beige-200 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-dusty-rose-500 text-white' : 'text-charcoal-600'} rounded-l-lg transition-colors`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-dusty-rose-500 text-white' : 'text-charcoal-600'} rounded-r-lg transition-colors`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Items per page */}
                <select className="px-3 py-2 bg-white border border-beige-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-dusty-rose-500">
                  <option>View 500</option>
                  <option>View 100</option>
                  <option>View 50</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <Link key={product.id} href={product.href} className="group">
                  <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] bg-beige-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isTrending && (
                          <div className="flex items-center space-x-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            <Zap className="h-3 w-3" />
                            <span>TRENDING NOW!</span>
                          </div>
                        )}
                        {product.badges.includes('BEST SELLER') && (
                          <span className="bg-charcoal-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                            BEST SELLER
                          </span>
                        )}
                        {product.badges.includes('NEW') && (
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-charcoal-600" />
                      </button>

                      {/* Trending Info */}
                      {product.isTrending && (
                        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-charcoal-700">
                          Sold {product.soldCount} times in the last 48 hrs
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="text-xs text-charcoal-600 mb-1 font-medium uppercase tracking-wide">
                        {product.brand}
                      </div>
                      <h3 className="font-medium text-charcoal-900 mb-2 line-clamp-2 group-hover:text-dusty-rose-500 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-charcoal-900">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-charcoal-500 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        {/* Color Options */}
                        <div className="flex space-x-1">
                          {product.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-charcoal-200"
                              style={{ backgroundColor: color === 'beige' ? '#F5E6D3' : color === 'cream' ? '#F7F3E9' : color === 'navy' ? '#1F2937' : color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="inline-flex items-center px-8 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors">
                Load More Items
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
