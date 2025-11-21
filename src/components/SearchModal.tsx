'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Search, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { APP_CONFIG } from '@/config/constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingSearches = [
    'Accessories',
    'Rose Gold Jewelry',
    'Summer Hats',
    'Designer Bags',
    'Sunglasses',
    'Silk Scarves'
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
      
      // Load recent searches from localStorage
      const saved = localStorage.getItem('aura-recent-searches');
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (error) {
          console.error('Error loading recent searches:', error);
        }
      }
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
      setSearchResults([]);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const debounceTimer = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v2/products?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data || []);
      } else {
        // Fallback to mock results
        setSearchResults(getMockSearchResults(query));
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults(getMockSearchResults(query));
    } finally {
      setIsLoading(false);
    }
  };

  const getMockSearchResults = (query: string): Product[] => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Rose Gold Necklace',
        description: 'Elegant rose gold chain necklace',
        price: 45.99,
        images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop'],
        category: 'accessories',
        tags: ['jewelry', 'necklace', 'rose gold'],
        inStock: true,
        stockQuantity: 15,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Designer Sunglasses',
        description: 'Stylish designer sunglasses',
        price: 89.99,
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop'],
        category: 'accessories',
        tags: ['sunglasses', 'designer', 'eyewear'],
        inStock: true,
        stockQuantity: 8,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Silk Scarf',
        description: 'Luxurious silk scarf with floral pattern',
        price: 32.00,
        images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop'],
        category: 'accessories',
        tags: ['scarf', 'silk', 'luxury'],
        inStock: true,
        stockQuantity: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches
      const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('aura-recent-searches', JSON.stringify(newRecentSearches));
      
      setSearchQuery(query);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('aura-recent-searches');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-16 p-4">
        <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
          
          {/* Search Header */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-100">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder={APP_CONFIG.UI_TEXT.COMMON.SEARCH_PLACEHOLDER}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearch(searchQuery);
                  }
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-lg"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Searching...</span>
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && !isLoading && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={(product.images && product.images[0]) || 'https://placehold.co/48x48?text=No+Image'}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          unoptimized={(product.images && product.images[0]) ? false : true}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-900">${product.price}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-rose-500 transition-colors mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchQuery.length > 2 && searchResults.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">Try searching for something else</p>
              </div>
            )}

            {/* Default State - Recent & Trending */}
            {searchQuery.length <= 2 && (
              <div className="p-6 space-y-6">
                
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Search className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Searches
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700 font-medium">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
