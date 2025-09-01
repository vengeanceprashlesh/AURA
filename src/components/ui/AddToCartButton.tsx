'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/ToastManager';
import type { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: string;
  onSizeSelect?: (size: string) => void;
  variant?: 'icon' | 'button' | 'full';
  className?: string;
  requireSize?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedSize,
  onSizeSelect,
  variant = 'icon',
  className = '',
  requireSize = false,
}) => {
  const quantity = 1; // Fixed quantity of 1
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (requireSize && !selectedSize) {
      showToast({
        type: 'error',
        title: 'Size Required',
        description: 'Please select a size before adding to cart.',
      });
      return;
    }


    setIsLoading(true);

    try {
      // Simulate a brief loading state for UX
      await new Promise(resolve => setTimeout(resolve, 300));

      addItem(product, quantity, selectedSize);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      showToast({
        type: 'success',
        title: 'Added to Cart!',
        description: `${product.name} ${selectedSize ? `(${selectedSize})` : ''} has been added to your cart.`,
      });

      // Auto-open cart for better UX
      setTimeout(() => openCart(), 500);

    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Add',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`p-2 bg-white/90 backdrop-blur-sm text-charcoal-700 rounded-full hover:bg-dusty-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            />
          ) : showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Check className="h-4 w-4 text-green-600" />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <ShoppingBag className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Size Selection */}
        {requireSize && (
          <div>
            <label className="block text-sm font-medium text-charcoal-900 mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <motion.button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    onSizeSelect?.(size);
                  }}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'bg-dusty-rose-500 text-white border-dusty-rose-500'
                      : 'bg-white text-charcoal-700 border-gray-300 hover:border-dusty-rose-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
        )}


        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isLoading || (requireSize && !selectedSize)}
          className="w-full bg-dusty-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-dusty-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                />
              ) : showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <ShoppingBag className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
            <span>
              {isLoading
                ? 'Adding...'
                : showSuccess
                ? 'Added!'
                : 'Add to Cart'}
            </span>
          </div>
        </motion.button>
      </div>
    );
  }

  // Default button variant
  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`bg-dusty-rose-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-dusty-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            />
          ) : showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Check className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <ShoppingBag className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
        <span>
          {isLoading
            ? 'Adding...'
            : showSuccess
            ? 'Added!'
            : 'Add to Cart'}
        </span>
      </div>
    </motion.button>
  );
};

export default AddToCartButton;
