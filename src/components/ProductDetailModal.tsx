'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Sun,
  TestTube,
  Clock,
  Truck,
  RotateCcw,
  Shield,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';
import { formatPrice } from '@/utils/currency';
import { useCartStore } from '@/store/cartStore';

interface ProductDetailModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose 
}: ProductDetailModalProps) {
  const { addItem } = useCartStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setIsAddingToCart(false);
      setShowSuccess(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const skincareData = product.skincareData || {};
  const brand = product.brand || skincareData.brand || 'Unknown Brand';
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://placehold.co/600x800?text=No+Image'];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product.stockQuantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product.inStock || isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      const cartProduct = {
        id: product._id || product.id,
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
        brand: brand,
        originalPrice: product.originalPrice,
        description: product.description,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      addItem({
        product: cartProduct,
        quantity
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsAddingToCart(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {brand}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{(product.rating || 4.5).toFixed(1)}</span>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-h-[calc(90vh-80px)] overflow-hidden">
            {/* Image Gallery */}
            <div className="relative bg-gradient-to-br from-rose-50 to-purple-50">
              <div className="relative aspect-[4/5] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[selectedImageIndex]}
                      alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={images[selectedImageIndex].includes('placehold.co')}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Product Features Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {skincareData.isVegan && (
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg" title="Vegan">
                      <Leaf className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                  {skincareData.isCrueltyFree && (
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg" title="Cruelty Free">
                      <Heart className="h-4 w-4 text-pink-500" />
                    </div>
                  )}
                  {skincareData.spfValue && (
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg" title={`SPF ${skincareData.spfValue}`}>
                      <Sun className="h-4 w-4 text-yellow-500" />
                    </div>
                  )}
                  {skincareData.isHypoallergenic && (
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg" title="Hypoallergenic">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 overflow-x-auto bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === selectedImageIndex 
                              ? 'border-rose-500' 
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                            unoptimized={image.includes('placehold.co')}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 overflow-y-auto">
              <div className="space-y-6">
                {/* Product Title & Price */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xl text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <span className="text-sm text-green-600 font-medium">
                          Save {formatPrice(product.originalPrice - product.price)} 
                          ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2 mb-4">
                    {product.inStock ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="h-4 w-4" />
                        <span className="text-sm font-medium">In Stock</span>
                        {product.stockQuantity <= 5 && (
                          <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                            Only {product.stockQuantity} left
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About this product</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  {skincareData.fullDescription && (
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      {skincareData.fullDescription}
                    </p>
                  )}
                </div>

                {/* Key Ingredients */}
                {skincareData.keyIngredients && skincareData.keyIngredients.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Ingredients</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {skincareData.keyIngredients.map((ingredient: any, index: number) => (
                        <div key={index} className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-purple-900">
                              {typeof ingredient === 'string' ? ingredient : ingredient.name}
                            </span>
                            {ingredient.concentration && (
                              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                {ingredient.concentration}
                              </span>
                            )}
                          </div>
                          {ingredient.purpose && (
                            <p className="text-sm text-purple-700 mt-1">
                              {ingredient.purpose}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Specifications */}
                {(skincareData.volume || skincareData.applicationTime || skincareData.routineStep) && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {skincareData.volume && (
                        <div className="flex items-center gap-2">
                          <TestTube className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            Volume: <strong>{skincareData.volume}</strong>
                          </span>
                        </div>
                      )}
                      {skincareData.applicationTime && skincareData.applicationTime.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            Use: <strong>{skincareData.applicationTime.join(', ').replace(/_/g, ' ')}</strong>
                          </span>
                        </div>
                      )}
                      {skincareData.routineStep && (
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            Step: <strong>{skincareData.routineStep}</strong>
                          </span>
                        </div>
                      )}
                      {skincareData.productType && (
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            Type: <strong>{skincareData.productType}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (product.stockQuantity || 10)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isAddingToCart}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {showSuccess ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Added to Cart!</span>
                        </>
                      ) : isAddingToCart ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-5 w-5" />
                          <span>Add to Cart • {formatPrice(product.price * quantity)}</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={toggleWishlist}
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                        isWishlisted
                          ? 'border-rose-500 bg-rose-50 text-rose-600'
                          : 'border-gray-300 hover:border-rose-300 hover:bg-rose-50 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                    </motion.button>
                  </div>
                </div>

                {/* Shipping & Returns */}
                <div className="border-t pt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Truck className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Free Shipping</p>
                        <p className="text-sm text-gray-600">On orders over ₹1000</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <RotateCcw className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Easy Returns</p>
                        <p className="text-sm text-gray-600">30-day return policy</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Shield className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Secure Payment</p>
                        <p className="text-sm text-gray-600">100% secure checkout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
