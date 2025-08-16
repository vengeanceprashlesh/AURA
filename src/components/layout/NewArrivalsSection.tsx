'use client';

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

// Mock data for new arrivals
const mockProducts = [
  {
    id: '1',
    name: 'Elegant Silk Blouse',
    category: 'Women\'s Tops',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
    rating: 4.8,
    reviewCount: 24,
    isNew: true,
    isSale: true,
  },
  {
    id: '2',
    name: 'Minimalist Wool Coat',
    category: 'Outerwear',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1591369867040-6bafcf5e2cb9?w=400&h=600&fit=crop&crop=faces',
    rating: 4.9,
    reviewCount: 18,
    isNew: true,
  },
  {
    id: '3',
    name: 'Classic Denim Jacket',
    category: 'Jackets',
    price: 89.99,
    originalPrice: 110.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=faces',
    rating: 4.6,
    reviewCount: 32,
    isNew: true,
    isSale: true,
  },
  {
    id: '4',
    name: 'Flowy Summer Dress',
    category: 'Dresses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=faces',
    rating: 4.7,
    reviewCount: 41,
    isNew: true,
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 189.99,
    originalPrice: 229.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop&crop=faces',
    rating: 4.9,
    reviewCount: 15,
    isNew: true,
    isSale: true,
  },
  {
    id: '6',
    name: 'Cashmere Sweater',
    category: 'Knitwear',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=600&fit=crop&crop=faces',
    rating: 4.8,
    reviewCount: 27,
    isNew: true,
  },
];

const NewArrivalsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 320; // Width of one card + gap
  const maxScroll = (mockProducts.length - 3) * cardWidth; // Show 3 cards at a time
  const x = useMotionValue(0);

  const handleDragEnd = () => {
    const currentX = x.get();
    const closest = Math.round(currentX / -cardWidth);
    const clampedIndex = Math.max(0, Math.min(closest, mockProducts.length - 3));
    setCurrentIndex(clampedIndex);
  };

  const scroll = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(mockProducts.length - 3, currentIndex + 1);
    setCurrentIndex(newIndex);
  };

  // Animation variants for scroll-based reveal
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section 
      className="py-20 bg-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* This div centers the content and holds the title */}
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="flex items-center justify-between mb-12"
          variants={itemVariants}
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
              New Arrivals
            </h2>
            <p className="font-body text-charcoal-600 text-lg max-w-2xl">
              Discover the latest additions to our collection. Fresh styles that perfectly capture this season's trends.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {/* Navigation Buttons */}
            <motion.button
              onClick={() => scroll('left')}
              className="p-3 border border-charcoal-200 rounded-full hover:border-dusty-rose-500 hover:text-dusty-rose-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              className="p-3 border border-charcoal-200 rounded-full hover:border-dusty-rose-500 hover:text-dusty-rose-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentIndex >= mockProducts.length - 3}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
            
            {/* View All Link */}
            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="/new-arrivals"
                className="flex items-center gap-2 text-dusty-rose-500 font-medium hover:text-dusty-rose-600 transition-colors ml-4"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* This div allows the scroller to bleed to the edges */}
      <div className="w-full">
        {/* This is the ONLY div that should scroll */}
        <motion.div 
          className="flex gap-6 overflow-x-auto px-6 cursor-grab active:cursor-grabbing"
          variants={itemVariants}
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * cardWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ x }}
        >
          {mockProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              className="flex-shrink-0 w-80"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.6,
                  },
                },
              }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile View All Button and Progress Indicators */}
      <div className="container mx-auto px-6">
        {/* Mobile View All Button */}
        <motion.div 
          className="flex justify-center mt-8 md:hidden"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/new-arrivals"
              className="flex items-center gap-2 bg-dusty-rose-500 text-white px-6 py-3 rounded-full font-medium hover:bg-dusty-rose-600 transition-colors"
            >
              View All New Arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div 
          className="flex justify-center gap-2 mt-6"
          variants={itemVariants}
        >
          {Array.from({ length: Math.max(1, mockProducts.length - 2) }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-dusty-rose-500' : 'bg-charcoal-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NewArrivalsSection;
