'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, TrendingUp, Flame, Eye } from 'lucide-react';
import type { Product } from '@/types';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

// Sample accessories products based on the screenshots (fallback)
const sampleAccessoryProducts = [
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
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [accessoryProducts, setAccessoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleItem, isInWishlist } = useWishlist();

  // Fetch products from API
  useEffect(() => {
    async function fetchAccessories() {
      setLoading(true);
      try {
        const res = await fetch('/api/products?category=accessories');
        if (res.ok) {
          const data = await res.json();
          setAccessoryProducts(data.data || []);
        } else {
          // Fallback to sample data if API fails
          setAccessoryProducts(transformSampleProducts());
        }
      } catch (err) {
        setError('Failed to load products');
        // Fallback to sample data
        setAccessoryProducts(transformSampleProducts());
      } finally {
        setLoading(false);
      }
    }
    fetchAccessories();
  }, []);

  // Transform sample products to match Product type
  const transformSampleProducts = () => {
    return sampleAccessoryProducts.map(product => ({
      id: String(product.id),
      name: product.name,
      description: '',
      price: parseFloat(product.price.replace(/[₹,]/g, '')),
      images: [product.image],
      category: 'accessories',
      tags: [],
      inStock: true,
      stockQuantity: 10,
      rating: 0,
      reviewCount: 0,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  };

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
    
    // Also update wishlist context
    const product = accessoryProducts.find(p => p.id === productId);
    if (product) {
      toggleItem(product);
    }
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filter and sort products
  const filteredProducts = accessoryProducts
    .filter(product => {
      // Add any filtering logic here
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-800 mb-4 tracking-wide">Accessories</h1>
          <div className="flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400"></div>
          </div>
        </div>

        <div>
          {/* Main Product Area */}
          <div className="w-full">


            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Loading accessories...</span>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-800 mb-8">New Collection Coming Soon</h3>
                    <Link href="/admin" className="inline-flex items-center px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                      Add Products
                    </Link>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="group cursor-pointer" onClick={() => openProductModal(product)}>
                      <div className="relative bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-rose-100">
                        {/* Wishlist Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <Heart 
                            className={`h-5 w-5 transition-colors ${
                              isInWishlist(product.id) 
                                ? 'fill-rose-500 text-rose-500' 
                                : 'text-gray-400 hover:text-rose-500'
                            }`}
                          />
                        </button>

                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
                          <Image
                            src={(product.images && product.images[0]) || 'https://placehold.co/400x400?text=No+Image'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            unoptimized={(product.images && product.images[0]) ? false : true}
                          />

                          {/* Quick View Button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openProductModal(product);
                              }}
                              className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium hover:bg-rose-50 transition-colors flex items-center gap-2 shadow-lg"
                            >
                              <Eye className="h-4 w-4" />
                              Quick View
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <h3 className="font-medium text-gray-800 mb-3 group-hover:text-rose-600 transition-colors line-clamp-2 text-lg">
                            {product.name}
                          </h3>
                          
                          {product.description && (
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                          )}
                          
                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <span className="text-xl font-semibold text-gray-800">${product.price}</span>
                            </div>
                            <div className="text-xs text-rose-400 bg-rose-50 px-2 py-1 rounded-full">
                              {product.stockQuantity} left
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedProduct ? favorites.has(selectedProduct.id) : false}
      />
    </div>
  );
}
