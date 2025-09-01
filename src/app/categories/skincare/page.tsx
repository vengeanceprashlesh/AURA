'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { 
  Heart, 
  Sparkles, 
  Star, 
  Leaf, 
  TestTube, 
  ShieldCheck, 
  Sun,
  X,
  ArrowRight,
  CheckCircle,
  Eye,
  Droplets,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/currency';
import SkinQuiz from '@/components/SkinQuiz';
import { useCart } from '@/contexts/CartContext';
import ProductDetailModal from '@/components/ProductDetailModal';

export default function SkincarePage() {
  const [skinProfile, setSkinProfile] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use Convex to get real skincare products
  const products = useQuery(api.products.getProducts, { 
    category: 'skincare'
  });

  const loading = products === undefined;

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 via-white to-purple-50/20">

      {/* Skin Quiz Section */}
      <section id="skin-quiz" className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-rose-500" />
              <h2 className="text-3xl font-light text-gray-900">Discover Your Skin Type</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our personalized skin analysis quiz to find products perfectly suited for your unique needs
            </p>
          </motion.div>
          
          <SkinQuiz 
            products={products || []} 
            onComplete={(result) => {
              setSkinProfile(result.skinProfile);
              console.log('Quiz completed:', result);
            }} 
          />
        </div>
      </section>

      {/* Filter Bar & Products */}
      <section id="products" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.map((product, index) => (
                <SkincareProductCard 
                  key={product._id} 
                  product={product} 
                  index={index} 
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          )}

          {(!products || products.length === 0) && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TestTube className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Check back soon for new products to discover!</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

// Skincare Product Card Component
function SkincareProductCard({ 
  product, 
  index, 
  onProductClick 
}: { 
  product: any; 
  index: number; 
  onProductClick?: (product: any) => void;
}) {
  const { addItem } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Extract skincare data from the product
  const skincareData = product.skincareData || {};
  const brand = product.brand || skincareData.brand || 'Unknown Brand';

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock || isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      // Convert the product to the expected format for the cart
      const cartProduct = {
        id: product._id as string, // Convert Convex ID to string
        name: product.name,
        price: product.price,
        images: product.images || [],
        category: product.category,
        subcategory: product.subcategory,
        tags: product.tags || [],
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        featured: product.featured || false,
        originalPrice: product.originalPrice,
        description: product.description,
        createdAt: new Date(product.createdAt || Date.now()),
        updatedAt: new Date(product.updatedAt || Date.now())
      };
      
      // Use CartContext addItem method (expects product, quantity, selectedSize)
      addItem(cartProduct, 1);
      
      // Brief delay to show loading state
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 800);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center">
            <TestTube className="h-12 w-12 text-rose-300" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              FEATURED
            </span>
          )}
        </div>

        {/* Features Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {skincareData.isVegan && <Leaf className="h-4 w-4 text-green-500 bg-white rounded-full p-1" />}
          {skincareData.isCrueltyFree && <Heart className="h-4 w-4 text-pink-500 bg-white rounded-full p-1" />}
          {skincareData.spfValue && <Sun className="h-4 w-4 text-yellow-500 bg-white rounded-full p-1" />}
          {skincareData.isHypoallergenic && <ShieldCheck className="h-4 w-4 text-blue-500 bg-white rounded-full p-1" />}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{brand}</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">{product.rating || 4.5}</span>
          </div>
        </div>

        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Key Ingredients */}
        <div className="flex flex-wrap gap-1 mb-4">
          {skincareData.keyIngredients?.slice(0, 2).map((ingredient: any, i: number) => (
            <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
              {ingredient.name || ingredient}
            </span>
          ))}
          {(skincareData.keyIngredients?.length || 0) > 2 && (
            <span className="text-xs text-gray-500">
              +{(skincareData.keyIngredients?.length || 0) - 2} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <motion.button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[90px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAddingToCart ? (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs">Adding...</span>
              </div>
            ) : product.inStock ? (
              'Add to Cart'
            ) : (
              'Out of Stock'
            )}
          </motion.button>
        </div>

        {/* Volume and Application Time */}
        {(skincareData.volume || skincareData.applicationTime) && (
          <div className="mt-3 p-2 bg-rose-50 rounded-lg">
            <div className="flex items-center gap-3 text-xs text-rose-700">
              {skincareData.volume && (
                <span className="flex items-center gap-1">
                  <TestTube className="h-3 w-3" />
                  {skincareData.volume}
                </span>
              )}
              {skincareData.applicationTime?.length > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {skincareData.applicationTime[0].replace('_', ' ')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
