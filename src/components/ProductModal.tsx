'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export default function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onToggleFavorite,
  isFavorite = false 
}: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem, openCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
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

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://placehold.co/600x800?text=No+Image'];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stockQuantity, prev + change)));
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    
    try {
      addItem(product, quantity, selectedSize);
      
      // Show success feedback
      setTimeout(() => {
        setIsAddingToCart(false);
        openCart();
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
            {/* Image Gallery */}
            <div className="relative bg-gradient-to-br from-rose-50 to-pink-50">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={images[selectedImageIndex].includes('placehold.co')}
                />
              </div>
              
              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === selectedImageIndex 
                            ? 'border-rose-500' 
                            : 'border-white/50 hover:border-white'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                          unoptimized={image.includes('placehold.co')}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 overflow-y-auto">
              <div className="space-y-6">
                {/* Product Title & Price */}
                <div>
                  <h1 className="text-3xl font-light text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-semibold text-gray-900">${product.price}</span>
                    {product.stockQuantity < 10 && (
                      <span className="text-sm text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
                        Only {product.stockQuantity} left
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviewCount || 0} reviews)
                    </span>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                )}

                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedSize === size
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAddingToCart}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isAddingToCart ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      toggleItem(product);
                      onToggleFavorite?.(product.id);
                    }}
                    className="w-full border border-gray-300 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        isInWishlist(product.id) 
                          ? 'fill-rose-500 text-rose-500' 
                          : 'text-gray-600'
                      }`}
                    />
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>

                {/* Features */}
                <div className="border-t pt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="h-5 w-5 text-rose-500" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <RotateCcw className="h-5 w-5 text-rose-500" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-rose-500" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
