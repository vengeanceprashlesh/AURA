'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion } from 'framer-motion';
import type { ProductCardData } from './ProductCard';
import { getSizesForCategory, type SizeOption, type ColorOption } from '@/utils/sizes';
import { formatPrice } from '@/utils/currency';
import { APP_CONFIG } from '@/config/constants';

interface ProductPageProps {
  product: ProductCardData;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem, openCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  // Convert Convex product to legacy Product type for cart
  const legacyProduct = {
    id: product._id,
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

  // Get category-specific sizes
  const categorySpecificSizes = getSizesForCategory(product.category);
  
  // Use product colors if available, otherwise use default images
  const availableColors = product.availableColors || [];
  const hasColorVariants = availableColors.length > 0;
  
  // Current images based on selected color
  const [currentImages, setCurrentImages] = useState<string[]>(() => {
    if (hasColorVariants && availableColors[0]?.images.length > 0) {
      return availableColors[0].images;
    }
    return product.images && product.images.length > 0 
      ? product.images 
      : ['https://placehold.co/600x800?text=No+Image'];
  });
  
  // Available sizes from product data or category defaults
  const availableSizes = product.availableSizes || categorySpecificSizes.map(s => s.label);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stockQuantity, prev + change)));
  };
  
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    
    // Switch images when color is selected
    if (hasColorVariants) {
      const selectedColorData = availableColors.find(c => c.name === colorName);
      if (selectedColorData && selectedColorData.images.length > 0) {
        setCurrentImages(selectedColorData.images);
        setSelectedImageIndex(0); // Reset to first image of new color
      }
    }
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    
    try {
      addItem(legacyProduct, quantity, selectedSize);
      
      setTimeout(() => {
        setIsAddingToCart(false);
        openCart();
      }, 800);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={currentImages[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized={currentImages[selectedImageIndex].includes('placehold.co')}
              />
              
            </motion.div>

            {/* Thumbnail Images */}
            {currentImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedImageIndex 
                        ? 'border-rose-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized={image.includes('placehold.co')}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <p className="text-sm uppercase tracking-wider text-rose-600 font-semibold mb-2">
                {product.category.replace('-', ' ')}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 4.8)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {product.rating || APP_CONFIG.PRODUCTS.DEFAULT_RATING}
                </span>
                <span className="text-gray-600">
                  ({product.reviewCount || APP_CONFIG.PRODUCTS.DEFAULT_REVIEW_COUNT} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description || 'A timeless piece that effortlessly combines elegance and comfort. Made from premium materials, this piece features a classic cut with modern styling details. Perfect for both professional and casual settings.'}
              </p>
            </div>

            {/* Color Selection */}
            {hasColorVariants && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Color: <span className="font-normal">{selectedColor || availableColors[0]?.name}</span>
                </h3>
                <div className="flex gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        (selectedColor || availableColors[0]?.name) === color.name
                          ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Size {product.category.includes('shoe') ? '(US Women\'s)' : ''}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 min-w-[60px] ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 text-gray-900 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}


            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="w-full bg-rose-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-rose-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              whileTap={{ scale: 0.98 }}
            >
              {isAddingToCart ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ShoppingBag className="h-6 w-6" />
                  </motion.div>
                  Adding to Cart...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-6 w-6" />
                  Add to Cart
                </>
              )}
            </motion.button>

            {/* Product Features */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-rose-500" />
                  <span>{APP_CONFIG.FEATURES.PREMIUM_MATERIALS}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-rose-500" />
                  <span>{APP_CONFIG.SHIPPING.FREE_SHIPPING_TEXT}</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-rose-500" />
                  <span>{APP_CONFIG.POLICIES.RETURN_POLICY_TEXT}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-rose-500" />
                  <span>Made with care and attention to detail</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
