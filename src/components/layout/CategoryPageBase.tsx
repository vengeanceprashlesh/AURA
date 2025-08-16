'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

interface CategoryPageBaseProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  products?: any[];
  categories?: Array<{
    id: string;
    name: string;
    href: string;
    count?: number;
  }>;
  filters?: Array<{
    id: string;
    name: string;
    options: Array<{
      id: string;
      name: string;
      count?: number;
    }>;
  }>;
}

const CategoryPageBase = ({ 
  title, 
  description, 
  backgroundImage,
  products = [],
  categories = [],
  filters = []
}: CategoryPageBaseProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  
  // Sample products data if none provided
  const sampleProducts = products.length > 0 ? products : [
    {
      id: '1',
      name: 'Sample Product 1',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'Sample Brand',
      sale: true
    },
    {
      id: '2',
      name: 'Sample Product 2',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=500',
      brand: 'Sample Brand',
      sale: false
    },
    // Add more sample products...
  ];

  const defaultFilters = filters.length > 0 ? filters : [
    {
      id: 'size',
      name: 'Size',
      options: [
        { id: 'xs', name: 'XS', count: 12 },
        { id: 's', name: 'S', count: 24 },
        { id: 'm', name: 'M', count: 36 },
        { id: 'l', name: 'L', count: 28 },
        { id: 'xl', name: 'XL', count: 16 },
      ]
    },
    {
      id: 'color',
      name: 'Color',
      options: [
        { id: 'black', name: 'Black', count: 45 },
        { id: 'white', name: 'White', count: 32 },
        { id: 'red', name: 'Red', count: 18 },
        { id: 'blue', name: 'Blue', count: 22 },
      ]
    },
    {
      id: 'price',
      name: 'Price',
      options: [
        { id: 'under50', name: 'Under $50', count: 15 },
        { id: '50to100', name: '$50 - $100', count: 28 },
        { id: '100to200', name: '$100 - $200', count: 35 },
        { id: 'over200', name: 'Over $200', count: 22 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center text-white"
        style={{ 
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative text-center z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p 
              className="text-lg md:text-xl max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Navigation */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={category.href}
                  className="px-4 py-2 bg-white rounded-lg border border-beige-200 hover:border-dusty-rose-300 hover:bg-dusty-rose-50 transition-colors"
                >
                  <span className="font-medium text-charcoal-700">{category.name}</span>
                  {category.count && (
                    <span className="ml-2 text-sm text-charcoal-500">({category.count})</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-beige-200 rounded-lg"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>

            <div className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              {defaultFilters.map((filter) => (
                <div key={filter.id} className="bg-white p-4 rounded-lg border border-beige-200">
                  <h3 className="font-medium text-charcoal-900 mb-3">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-beige-300 text-dusty-rose-500 focus:ring-dusty-rose-500"
                        />
                        <span className="ml-2 text-sm text-charcoal-700">{option.name}</span>
                        {option.count && (
                          <span className="ml-auto text-xs text-charcoal-500">({option.count})</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-charcoal-600">{sampleProducts.length} products</p>
              
              <div className="flex items-center gap-4">
                <select className="px-3 py-2 border border-beige-200 rounded-lg focus:ring-2 focus:ring-dusty-rose-500 focus:border-transparent">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Most Popular</option>
                </select>
                
                <div className="flex border border-beige-200 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-dusty-rose-100 text-dusty-rose-600' : 'text-charcoal-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-dusty-rose-100 text-dusty-rose-600' : 'text-charcoal-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div 
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
              layout
            >
              {sampleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPageBase;
