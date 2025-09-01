'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Eye, 
  ShoppingCart,
  Leaf,
  ShieldCheck,
  Sun,
  TestTube,
  Clock,
  Plus,
  Check
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Id } from '../../convex/_generated/dataModel';
import { formatPrice } from '@/lib/utils';
import { APP_CONFIG, isProductNew } from '@/config/constants';

export interface ProductCardData {
  _id: Id<"products">;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: number;
  updatedAt: number;
}

interface ProductCardProps {
  product: ProductCardData;
  onQuickView?: (product: ProductCardData) => void;
  className?: string;
}

export default function ProductCard({ 
  product, 
  onQuickView, 
  className = "" 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  
  const { addItem, openCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  // Convert Convex product to legacy Product type for cart
  const legacyProduct = {
    id: product._id as string, // Convert Convex ID to string
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    tags: product.tags,
    inStock: product.inStock,
    stockQuantity: product.stockQuantity,
    rating: product.rating,
    reviewCount: product.reviewCount,
    featured: product.featured,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    
    try {
      addItem(legacyProduct, 1);
      setShowAddedAnimation(true);
      
      setTimeout(() => {
        setShowAddedAnimation(false);
        setIsAddingToCart(false);
      }, 1500);
    } catch (error) {
      console.error('[ProductCard] Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product.inStock) return;
    
    addItem(legacyProduct, 1);
    openCart();
  };

  const handleToggleWishlist = () => {
    toggleItem(legacyProduct);
  };


  return (
    <motion.div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Clickable overlay for product page navigation */}
      <Link href={`/product/${product._id}`} className="absolute inset-0 z-0" />
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <Image
          src={product.images[0] || 'https://placehold.co/400x500?text=No+Image'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={!product.images[0] || product.images[0].includes('placehold.co')}
        />

        {/* Out of Stock Badge - Keep only this essential one */}
          {!product.inStock && (
            <div className="absolute top-3 left-3">
              <div className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {APP_CONFIG.UI_TEXT.PRODUCT.SOLD_OUT}
              </div>
            </div>
          )}

        {/* Wishlist Button */}
        <button 
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg z-20"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isInWishlist(product._id) 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>

        {/* Hover Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex gap-3">
                <motion.button
                  onClick={() => onQuickView?.(product)}
                  className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye className="h-5 w-5" />
                </motion.button>
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isAddingToCart ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <ShoppingCart className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Added to Cart Animation */}
        <AnimatePresence>
          {showAddedAnimation && (
            <motion.div
              className="absolute inset-0 bg-green-500/90 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="text-white text-center">
                <ShoppingBag className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">{APP_CONFIG.UI_TEXT.PRODUCT.ADDED_TO_CART}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="space-y-3">
          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
            {product.subcategory && ` • ${product.subcategory}`}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 relative z-10">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative z-10"
            >
              <ShoppingBag className="h-4 w-4" />
              {isAddingToCart ? APP_CONFIG.UI_TEXT.PRODUCT.ADDING : APP_CONFIG.UI_TEXT.PRODUCT.ADD_TO_CART}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="px-4 py-2 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
            >
              {APP_CONFIG.UI_TEXT.PRODUCT.BUY_NOW}
            </button>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
