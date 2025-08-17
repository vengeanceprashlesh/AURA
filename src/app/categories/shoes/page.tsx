'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Star, TrendingUp, Flame, Eye } from 'lucide-react';

// Sample shoe products based on the screenshot
const shoeProducts = [
  {
    id: 1,
    name: 'Gazelle Indoor',
    brand: 'adidas Originals',
    price: '£10,460.15',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
    subcategory: 'Sneakers',
    rating: 4.8,
    reviews: 156,
    isTrending: true,
    soldCount: 8,
    timeFrame: '48 hrs',
    colors: ['navy', 'white'],
    isNew: false,
    onSale: false,
  },
  {
    id: 2,
    name: 'Gel-1130 Sneaker',
    brand: 'Asics',
    price: '£8,716.79',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=600&fit=crop',
    subcategory: 'Sneakers',
    rating: 4.6,
    reviews: 89,
    isTrending: false,
    soldCount: null,
    timeFrame: null,
    colors: ['white', 'gray'],
    isNew: false,
    onSale: false,
  },
  {
    id: 3,
    name: 'Riggs Boot',
    brand: 'Steve Madden',
    price: '£17,346.41',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop',
    subcategory: 'Boots',
    rating: 4.7,
    reviews: 234,
    isTrending: true,
    soldCount: 6,
    timeFrame: '48 hrs',
    colors: ['brown'],
    isNew: false,
    onSale: false,
  },
  {
    id: 4,
    name: 'Hadyn Sandal',
    brand: 'Steve Madden',
    price: '£5,142.91',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=600&fit=crop',
    subcategory: 'Sandals',
    rating: 4.5,
    reviews: 167,
    inDemand: true,
    soldCount: 52,
    timeFrame: '48 hrs',
    colors: ['tan'],
    isNew: false,
    onSale: false,
    isBestSeller: true,
  },
  {
    id: 5,
    name: 'Campo Sneaker',
    brand: 'Veja',
    price: '£13,162.35',
    originalPrice: '£15,254.38',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=600&fit=crop',
    subcategory: 'Sneakers',
    rating: 4.9,
    reviews: 203,
    isTrending: true,
    soldCount: 9,
    timeFrame: '48 hrs',
    colors: ['white', 'green'],
    isNew: false,
    onSale: true,
  },
  {
    id: 6,
    name: 'x REVOLVE Krista Sandal',
    brand: 'Tony Bianco',
    price: '£13,511.02',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    subcategory: 'Sandals',
    rating: 4.8,
    reviews: 145,
    isTrending: true,
    soldCount: 20,
    timeFrame: '48 hrs',
    colors: ['white', 'black', 'nude'],
    isNew: false,
    onSale: false,
  },
  {
    id: 7,
    name: 'Handball Spezial',
    brand: 'adidas Originals',
    price: '£9,234.56',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=600&fit=crop',
    subcategory: 'Sneakers',
    rating: 4.7,
    reviews: 178,
    isTrending: true,
    soldCount: 12,
    timeFrame: '48 hrs',
    colors: ['brown', 'white'],
    isNew: false,
    onSale: false,
  },
  {
    id: 8,
    name: 'Classic Flip Flops',
    brand: 'Havaianas',
    price: '£2,145.67',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fcde?w=400&h=600&fit=crop',
    subcategory: 'Sandals',
    rating: 4.4,
    reviews: 892,
    isTrending: false,
    soldCount: null,
    timeFrame: null,
    colors: ['black'],
    isNew: false,
    onSale: false,
  },
];

const designers = ['All', 'adidas Originals', 'Asics', 'Steve Madden', 'Veja', 'Tony Bianco', 'Havaianas'];
const sizes = ['All', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
const colors = ['All', 'Black', 'White', 'Brown', 'Navy', 'Gray', 'Tan', 'Green', 'Nude'];
const priceRanges = ['All', 'Under £5,000', '£5,000 - £10,000', '£10,000 - £15,000', '£15,000+'];
const heelHeights = ['All', 'Flat', 'Low (1-2")', 'Mid (2-3")', 'High (3-4")', 'Very High (4"+)'];

export default function ShoesPage() {
  const [selectedDesigner, setSelectedDesigner] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedHeelHeight, setSelectedHeelHeight] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [viewCount, setViewCount] = useState(500);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Filter and sort products
  const filteredProducts = shoeProducts
    .filter(product => {
      if (selectedDesigner !== 'All' && product.brand !== selectedDesigner) return false;
      if (selectedColor !== 'All' && !product.colors.some(color => 
        color.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return parseFloat(a.price.replace(/[£,]/g, '')) - parseFloat(b.price.replace(/[£,]/g, ''));
        case 'Price: High to Low':
          return parseFloat(b.price.replace(/[£,]/g, '')) - parseFloat(a.price.replace(/[£,]/g, ''));
        case 'Most Popular':
          return b.reviews - a.reviews;
        case 'Newest':
          return a.isNew ? -1 : 1;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            <strong className="text-black">{filteredProducts.length.toLocaleString()} ITEMS</strong>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Featured">Featured</option>
                  <option value="Newest">Newest</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Most Popular">Most Popular</option>
                </select>
                <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* View Count */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View</span>
              <div className="relative">
                <select
                  value={viewCount}
                  onChange={(e) => setViewCount(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                </select>
                <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, viewCount).map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Wishlist Button */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      favorites.has(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Trending/Status Badge */}
                  {(product.isTrending || product.inDemand) && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center gap-1">
                        {product.isTrending && <TrendingUp className="h-3 w-3 text-orange-500" />}
                        {product.inDemand && <Flame className="h-3 w-3 text-red-500" />}
                        <span className="text-xs font-semibold text-gray-900">
                          {product.isTrending ? 'TRENDING NOW!' : 'IN DEMAND!'}
                        </span>
                      </div>
                      {product.soldCount && (
                        <div className="text-xs text-gray-600 mt-0.5">
                          Sold {product.soldCount} times in the last {product.timeFrame}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Best Seller Badge */}
                  {product.isBestSeller && (
                    <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                      BEST SELLER
                    </div>
                  )}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      QUICK VIEW
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="text-xs text-gray-600 mb-1">{product.brand}</div>
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Color Options */}
                  {product.colors.length > 1 && (
                    <div className="flex items-center gap-1 mt-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full border border-gray-300 ${
                            color === 'white' ? 'bg-white' :
                            color === 'black' ? 'bg-black' :
                            color === 'navy' ? 'bg-blue-900' :
                            color === 'brown' ? 'bg-amber-800' :
                            color === 'gray' ? 'bg-gray-400' :
                            color === 'tan' ? 'bg-yellow-600' :
                            color === 'green' ? 'bg-green-600' :
                            color === 'nude' ? 'bg-rose-200' :
                            'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > viewCount && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setViewCount(prev => prev + 500)}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Load More Shoes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
