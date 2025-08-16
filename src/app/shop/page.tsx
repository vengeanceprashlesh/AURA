'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Filter, Grid, List, Heart, Star } from 'lucide-react';

// Mock product data - in a real app this would come from an API/database
const products = [
  {
    id: 1,
    name: 'Elegant Silk Blouse',
    category: 'Tops',
    subcategory: 'Blouses',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
    brand: 'Elegant Co',
    rating: 4.8,
    reviews: 24,
    colors: ['Cream', 'Black', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    onSale: true,
  },
  {
    id: 2,
    name: 'High-Waist Denim Jeans',
    category: 'Bottoms',
    subcategory: 'Jeans',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=600&fit=crop&crop=faces',
    brand: 'Denim Dreams',
    rating: 4.6,
    reviews: 156,
    colors: ['Blue', 'Black', 'White'],
    sizes: ['24', '26', '28', '30', '32'],
    isNew: false,
    onSale: false,
  },
  {
    id: 3,
    name: 'Floral Summer Dress',
    category: 'Dresses',
    subcategory: 'Casual',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces',
    brand: 'Summer Breeze',
    rating: 4.9,
    reviews: 89,
    colors: ['Floral', 'White', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    onSale: false,
  },
  {
    id: 4,
    name: 'Leather Ankle Boots',
    category: 'Shoes',
    subcategory: 'Boots',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=faces',
    brand: 'Urban Step',
    rating: 4.7,
    reviews: 203,
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    isNew: false,
    onSale: true,
  },
  {
    id: 5,
    name: 'Designer Handbag',
    category: 'Accessories',
    subcategory: 'Bags',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop&crop=faces',
    brand: 'Luxury Lane',
    rating: 4.8,
    reviews: 67,
    colors: ['Black', 'Brown', 'Beige'],
    sizes: ['One Size'],
    isNew: true,
    onSale: false,
  },
  {
    id: 6,
    name: 'Cozy Knit Sweater',
    category: 'Tops',
    subcategory: 'Sweaters',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1591369867040-6bafcf5e2cb9?w=400&h=600&fit=crop&crop=faces',
    brand: 'Cozy Co',
    rating: 4.5,
    reviews: 112,
    colors: ['Cream', 'Pink', 'Grey'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    onSale: false,
  },
  {
    id: 7,
    name: 'Little Black Dress',
    category: 'Dresses',
    subcategory: 'Formal',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?w=400&h=600&fit=crop&crop=faces',
    brand: 'Classic Elegance',
    rating: 4.9,
    reviews: 345,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    onSale: false,
  },
  {
    id: 8,
    name: 'Wide-Leg Trousers',
    category: 'Bottoms',
    subcategory: 'Trousers',
    price: 119.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=faces',
    brand: 'Modern Fit',
    rating: 4.6,
    reviews: 78,
    colors: ['Black', 'Navy', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    onSale: true,
  },
];

const categories = [
  { name: 'All', value: '' },
  { name: 'Tops', value: 'Tops' },
  { name: 'Bottoms', value: 'Bottoms' },
  { name: 'Dresses', value: 'Dresses' },
  { name: 'Shoes', value: 'Shoes' },
  { name: 'Accessories', value: 'Accessories' },
];

const sortOptions = [
  { name: 'Featured', value: 'featured' },
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
  { name: 'Most Popular', value: 'popular' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => !selectedCategory || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return a.isNew ? -1 : 1;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popular':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Header */}
      <div className="bg-white border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
            <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-charcoal-900 font-medium">Shop</span>
          </nav>

          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-4">
              Shop All Products
            </h1>
            <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
              Discover our complete collection of carefully curated fashion pieces
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Category Filter */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-beige-200">
              <h3 className="font-semibold text-charcoal-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-dusty-rose-500 text-white'
                        : 'text-charcoal-700 hover:bg-beige-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-beige-200">
              <h3 className="font-semibold text-charcoal-900 mb-4">Quick Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-charcoal-300 text-dusty-rose-500" />
                  <span className="ml-2 text-charcoal-700">On Sale</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-charcoal-300 text-dusty-rose-500" />
                  <span className="ml-2 text-charcoal-700">New Arrivals</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-charcoal-300 text-dusty-rose-500" />
                  <span className="ml-2 text-charcoal-700">Free Shipping</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-sm border border-beige-200">
              <div className="flex items-center gap-4">
                <span className="text-charcoal-700">
                  {filteredProducts.length} products
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-700 bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-charcoal-200 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-dusty-rose-500 text-white' : 'text-charcoal-700'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-dusty-rose-500 text-white' : 'text-charcoal-700'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <div key={product.id} className={viewMode === 'grid' ? '' : 'bg-white rounded-lg shadow-sm border border-beige-200'}>
                  <Link href={`/products/${product.id}`} className="group block">
                    <div className={viewMode === 'grid' 
                      ? 'bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow'
                      : 'flex gap-4 p-4'
                    }>
                      <div className={viewMode === 'grid' 
                        ? 'relative aspect-[3/4] overflow-hidden'
                        : 'relative w-32 h-32 bg-beige-50 rounded-lg overflow-hidden flex-shrink-0'
                      }>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-dusty-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">
                              NEW
                            </span>
                          </div>
                        )}
                        {product.onSale && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                              SALE
                            </span>
                          </div>
                        )}
                        <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 min-w-0'}>
                        <div className="text-xs text-charcoal-500 mb-1">{product.brand}</div>
                        <h3 className="font-medium text-charcoal-900 mb-2 group-hover:text-dusty-rose-500 transition-colors">
                          {product.name}
                        </h3>
                        <div className="text-xs text-charcoal-600 mb-2">{product.category}</div>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-charcoal-200'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-charcoal-500">({product.reviews})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-charcoal-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-charcoal-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        {viewMode === 'list' && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.colors.slice(0, 3).map((color, index) => (
                                <span key={index} className="text-xs bg-beige-100 text-charcoal-600 px-2 py-1 rounded">
                                  {color}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {product.sizes.slice(0, 4).map((size, index) => (
                                <span key={index} className="text-xs bg-beige-100 text-charcoal-600 px-2 py-1 rounded">
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-dusty-rose-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-dusty-rose-600 transition-colors">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
