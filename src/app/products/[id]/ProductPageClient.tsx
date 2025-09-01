'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { APP_CONFIG, getRandomRating, getRandomReviewCount } from '@/config/constants';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';

// Dynamic product data - in a real app, this would come from an API
const getProductData = (id: string) => ({
  id,
  name: 'Elegant Silk Blouse',
  category: 'Women\'s Tops',
  price: 10799, // Price in INR
  originalPrice: 13299, // Original price in INR
  description: 'A timeless silk blouse that effortlessly combines elegance and comfort. Made from premium mulberry silk, this piece features a classic cut with modern styling details. Perfect for both professional and casual settings.',
  features: [
    APP_CONFIG.FEATURES.PREMIUM_MATERIALS,
    'Classic tailored fit',
    'Mother-of-pearl buttons',
    'Dry clean only',
    'Made in India'
  ],
  images: [
    'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1591369867040-6bafcf5e2cb9?w=600&h=800&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&crop=faces'
  ],
  sizes: APP_CONFIG.SIZES.CLOTHING,
  colors: [
    { name: 'Cream', value: '#F5F5DC', available: true },
    { name: 'Blush', value: '#FFC0CB', available: true },
    { name: 'Navy', value: '#1e3a8a', available: false },
    { name: 'Black', value: '#000000', available: true }
  ],
  rating: getRandomRating(),
  reviewCount: getRandomReviewCount(),
  inStock: true,
  stockQuantity: Math.floor(Math.random() * 50) + 5 // Random stock between 5-55
});

export function ProductPageClient({ productId }: { productId: string }) {
  const product = getProductData(productId);
  const { addItem } = useCartStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    // Convert to Product type for the store
    const productForCart: Product = {
      ...product,
      tags: [],
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addItem({
      product: productForCart,
      quantity,
      selectedSize,
      selectedColor
    });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Navigation */}
      <div className="bg-white border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-charcoal-600 hover:text-dusty-rose-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="text-charcoal-400">/</div>
            <Link href="/shop" className="text-charcoal-600 hover:text-dusty-rose-500 transition-colors">
              Shop
            </Link>
            <div className="text-charcoal-400">/</div>
            <span className="text-dusty-rose-500">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`flex-shrink-0 relative aspect-[3/4] w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === selectedImageIndex 
                      ? 'border-dusty-rose-500' 
                      : 'border-transparent hover:border-beige-300'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-dusty-rose-500 font-medium text-sm uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-charcoal-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-charcoal-600 text-sm">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-heading text-2xl font-bold text-charcoal-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-charcoal-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">
                Color: <span className="text-dusty-rose-500">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.name === color.name
                        ? 'border-charcoal-900'
                        : 'border-charcoal-200'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    whileHover={color.available ? { scale: 1.1 } : {}}
                    whileTap={color.available ? { scale: 0.9 } : {}}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">Size</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-dusty-rose-500 bg-dusty-rose-500 text-white'
                        : 'border-charcoal-200 text-charcoal-700 hover:border-dusty-rose-500'
                    }`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">

              <div className="flex gap-4">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-dusty-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-dusty-rose-600 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 border rounded-lg transition-colors ${
                    isWishlisted
                      ? 'border-dusty-rose-500 bg-dusty-rose-50 text-dusty-rose-500'
                      : 'border-charcoal-200 hover:border-dusty-rose-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-beige-200 pt-6">
              <h3 className="font-medium text-charcoal-900 mb-4">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-charcoal-700">
                    <div className="w-1.5 h-1.5 bg-dusty-rose-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t border-beige-200 pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-dusty-rose-500 mt-0.5" />
                  <div>
                  <p className="font-medium text-charcoal-900">Free Shipping</p>
                  <p className="text-sm text-charcoal-600">{APP_CONFIG.SHIPPING.FREE_SHIPPING_TEXT.replace('Free shipping on ', 'On ')}</p>
                  </div>
                </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-dusty-rose-500 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Easy Returns</p>
                  <p className="text-sm text-charcoal-600">{APP_CONFIG.POLICIES.RETURN_POLICY_TEXT}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-dusty-rose-500 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Secure Payment</p>
                  <p className="text-sm text-charcoal-600">{APP_CONFIG.FEATURES.SECURE_PAYMENT}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
