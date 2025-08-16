'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isSale?: boolean;
  href?: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  rating = 0,
  reviewCount = 0,
  isNew = false,
  isSale = false,
  href = `/products/${id}`,
  className = '',
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log(`Added ${name} to cart`);
  };

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div 
      className={`group relative bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${className}`}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link href={href} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-beige-50">
          {/* Product Image */}
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Badges */}
          <motion.div 
            className="absolute top-3 left-3 flex flex-col gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <AnimatePresence>
              {isNew && (
                <motion.span 
                  className="px-2 py-1 bg-dusty-rose-500 text-white text-xs font-medium rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  New
                </motion.span>
              )}
              {isSale && (
                <motion.span 
                  className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  -{discountPercentage}%
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons */}
          <AnimatePresence>
            {(isHovered || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
              <motion.div 
                className="absolute top-3 right-3 flex flex-col gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
              >
                <motion.button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                    isWishlisted 
                      ? 'bg-dusty-rose-500 text-white' 
                      : 'bg-white/80 text-charcoal-700 hover:bg-dusty-rose-500 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </motion.div>
                </motion.button>
                
                <motion.button
                  onClick={handleAddToCart}
                  className="p-2 bg-white/80 backdrop-blur-sm text-charcoal-700 rounded-full hover:bg-dusty-rose-500 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ShoppingBag className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick View Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="bg-white text-charcoal-900 px-4 py-2 rounded-full font-medium text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Quick View
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <motion.div 
          className="p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {/* Category */}
          <motion.p 
            className="text-charcoal-500 text-sm font-body mb-1 uppercase tracking-wider"
            whileHover={{ color: "#ca6f72" }}
          >
            {category}
          </motion.p>

          {/* Product Name */}
          <motion.h3 
            className="font-heading text-lg font-semibold text-charcoal-900 mb-2 line-clamp-2 transition-colors"
            whileHover={{ color: "#ca6f72" }}
          >
            {name}
          </motion.h3>

          {/* Rating */}
          {rating > 0 && (
            <motion.div 
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Star
                      className={`h-3 w-3 ${
                        index < Math.floor(rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-charcoal-200'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-charcoal-500 text-xs font-body">
                ({reviewCount})
              </span>
            </motion.div>
          )}

          {/* Price */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-heading text-lg font-bold text-charcoal-900">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <motion.span 
                className="font-body text-sm text-charcoal-500 line-through"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {formatPrice(originalPrice)}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
