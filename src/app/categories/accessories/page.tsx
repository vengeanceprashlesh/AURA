'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, TrendingUp, Flame, Eye } from 'lucide-react';

// Sample accessories products based on the screenshots
const accessoryProducts = [
  {
    id: 1,
    name: 'Rolex GMT-Master II Steel Pepsi Bezel Automatic Dial Watch',
    brand: 'FWRD Renew',
    price: '₹2,527,869.00',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1523170335258-f5c54737e7fe?w=400&h=600&fit=crop',
    category: 'Jewelry',
    subcategory: 'Watches',
    badge: 'PRE-OWNED',
    badgeColor: 'bg-gray-900',
    isTrending: false,
    soldCount: null,
    timeFrame: null,
    colors: [],
    isNew: false,
    onSale: false,
  },
  {
    id: 2,
    name: 'Coast Puffer Bucket Hat',
    brand: 'lack of Color',
    price: '₹7,757.94',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=600&fit=crop',
    category: 'Hats',
    subcategory: 'Bucket Hats',
    badge: 'NEW',
    badgeColor: 'bg-black',
    isTrending: false,
    soldCount: null,
    timeFrame: null,
    colors: [],
    isNew: true,
    onSale: false,
  },
  {
    id: 3,
    name: 'Summer Bucket Hat',
    brand: 'lack of Color',
    price: '₹9,501.30',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?w=400&h=600&fit=crop',
    category: 'Hats',
    subcategory: 'Bucket Hats',
    badge: 'NEW',
    badgeColor: 'bg-black',
    isTrending: true,
    soldCount: 11,
    timeFrame: '48 hrs',
    colors: [],
    isNew: true,
    onSale: false,
  },
  {
    id: 4,
    name: 'Atlas Belt',
    brand: 'peter do garments',
    price: '₹4,358.40',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop',
    category: 'Belts',
    subcategory: 'Leather Belts',
    badge: null,
    badgeColor: null,
    isTrending: true,
    soldCount: 15,
    timeFrame: '48 hrs',
    colors: ['black', 'brown'],
    isNew: false,
    onSale: false,
  },
  {
    id: 5,
    name: 'Outta Love',
    brand: 'Le Specs',
    price: '₹6,537.59',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop',
    category: 'Sunglasses & Eyewear',
    subcategory: 'Sunglasses',
    badge: null,
    badgeColor: null,
    isTrending: true,
    soldCount: 13,
    timeFrame: '48 hrs',
    colors: [],
    isNew: false,
    onSale: false,
  },
  {
    id: 6,
    name: 'Sweetheart Clip',
    brand: 'Emi Jay',
    price: '₹3,138.04',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop',
    category: 'Hair Accessories',
    subcategory: 'Hair Clips',
    badge: 'BEST SELLER',
    badgeColor: 'bg-black',
    isTrending: false,
    soldCount: null,
    timeFrame: null,
    colors: ['black', 'pink', 'blue', 'beige', 'cream'],
    isNew: false,
    onSale: false,
  },
  {
    id: 7,
    name: 'Chino Cap',
    brand: 'Polo Ralph Lauren',
    price: '₹4,358.40',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=600&fit=crop',
    category: 'Hats',
    subcategory: 'Baseball Caps',
    badge: null,
    badgeColor: null,
    isTrending: false,
    soldCount: null,
    timeFrame: null,
    colors: [],
    isNew: false,
    onSale: false,
  },
  {
    id: 8,
    name: 'Outta Love',
    brand: 'Le Specs',
    price: '₹6,537.59',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=600&fit=crop',
    category: 'Sunglasses & Eyewear',
    subcategory: 'Sunglasses',
    badge: 'BEST SELLER',
    badgeColor: 'bg-black',
    isTrending: true,
    soldCount: 18,
    timeFrame: '48 hrs',
    colors: [],
    isNew: false,
    onSale: false,
  },
];

const sidebarCategories = [
  { name: 'View All', href: '/categories/accessories', isActive: true },
  { name: 'Active', href: '/categories/accessories/active' },
  { name: 'Active Accessories', href: '/categories/accessories/active-accessories' },
  { name: 'Bags', href: '/categories/accessories/bags' },
  { name: 'Belts', href: '/categories/accessories/belts' },
  { name: 'Gloves', href: '/categories/accessories/gloves' },
  { name: 'Hair Accessories', href: '/categories/accessories/hair-accessories' },
  { name: 'Hats', href: '/categories/accessories/hats' },
  { name: 'Hats & Hair Accessories', href: '/categories/accessories/hats-hair' },
  { name: 'Home', href: '/categories/accessories/home' },
  { name: 'Jewelry', href: '/categories/accessories/jewelry' },
  { name: 'Keychains & Bag Charms', href: '/categories/accessories/keychains' },
  { name: 'Lifestyle & Gifts', href: '/categories/accessories/lifestyle' },
  { name: 'Pre-Owned', href: '/categories/accessories/pre-owned' },
  { name: 'Protective Face Masks', href: '/categories/accessories/masks' },
  { name: 'Scarves', href: '/categories/accessories/scarves' },
  { name: 'Socks', href: '/categories/accessories/socks' },
  { name: 'Sunglasses & Eyewear', href: '/categories/accessories/sunglasses' },
  { name: 'Tech Accessories', href: '/categories/accessories/tech' },
  { name: 'Travel', href: '/categories/accessories/travel' },
  { name: 'Water Bottles', href: '/categories/accessories/water-bottles' },
];

const designers = ['Designer', 'Le Specs', 'Emi Jay', 'Polo Ralph Lauren', 'FWRD Renew', 'lack of Color', 'peter do garments'];
const sizes = ['Size', 'XS', 'S', 'M', 'L', 'XL', 'One Size'];
const colors = ['Color', 'Black', 'White', 'Brown', 'Pink', 'Blue', 'Beige', 'Cream'];
const priceRanges = ['Price', 'Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹50,000', '₹50,000+'];

export default function AccessoriesPage() {
  const [selectedDesigner, setSelectedDesigner] = useState('Designer');
  const [selectedSize, setSelectedSize] = useState('Size');
  const [selectedColor, setSelectedColor] = useState('Color');
  const [selectedPrice, setSelectedPrice] = useState('Price');
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
  const filteredProducts = accessoryProducts
    .filter(product => {
      if (selectedDesigner !== 'Designer' && product.brand !== selectedDesigner) return false;
      if (selectedColor !== 'Color' && product.colors.length > 0 && !product.colors.some(color => 
        color.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return parseFloat(a.price.replace(/[₹,]/g, '')) - parseFloat(b.price.replace(/[₹,]/g, ''));
        case 'Price: High to Low':
          return parseFloat(b.price.replace(/[₹,]/g, '')) - parseFloat(a.price.replace(/[₹,]/g, ''));
        case 'Most Popular':
          return (b.soldCount || 0) - (a.soldCount || 0);
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">ACCESSORIES</h1>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">CATEGORY</h3>
              <nav className="space-y-2">
                {sidebarCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={`block text-sm transition-colors ${
                      category.isActive 
                        ? 'text-black font-medium' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Product Area */}
          <div className="flex-1">

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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                      {product.isTrending && (
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-orange-500" />
                            <span className="text-xs font-semibold text-gray-900">
                              TRENDING NOW!
                            </span>
                          </div>
                          {product.soldCount && (
                            <div className="text-xs text-gray-600 mt-0.5">
                              Sold {product.soldCount} times in the last {product.timeFrame}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Product Badge */}
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <div className={`${product.badgeColor || 'bg-black'} text-white text-xs font-bold px-2 py-1 rounded`}>
                            {product.badge}
                          </div>
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
                      {product.colors.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          {product.colors.slice(0, 5).map((color, index) => (
                            <div
                              key={index}
                              className={`w-4 h-4 rounded-full border border-gray-300 ${
                                color === 'white' ? 'bg-white' :
                                color === 'black' ? 'bg-black' :
                                color === 'brown' ? 'bg-amber-800' :
                                color === 'pink' ? 'bg-pink-300' :
                                color === 'blue' ? 'bg-blue-400' :
                                color === 'beige' ? 'bg-yellow-100' :
                                color === 'cream' ? 'bg-yellow-50' :
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
                  Load More Accessories
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
