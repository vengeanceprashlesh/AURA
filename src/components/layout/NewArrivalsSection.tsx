'use client';

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

type ApiProduct = {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags?: string[];
  inStock?: boolean;
  stockQuantity?: number;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

const NewArrivalsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const cardWidth = 320; // Width of one card + gap
  const x = useMotionValue(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        const json = await res.json();
        const data: ApiProduct[] = json.data ?? json;
        // Sort by createdAt desc, fallback to as-is
        const sorted = [...data].sort((a, b) => {
          const da = a.createdAt ? new Date(a.createdAt as any).getTime() : 0;
          const db = b.createdAt ? new Date(b.createdAt as any).getTime() : 0;
          return db - da;
        });
        if (mounted) setItems(sorted.slice(0, 12));
      } catch (e) {
        console.error('Failed to load products', e);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const maxScroll = Math.max(0, (items.length - 3) * cardWidth); // Show 3 cards at a time

  const handleDragEnd = () => {
    const currentX = x.get();
    const closest = Math.round(currentX / -cardWidth);
    const clampedIndex = Math.max(0, Math.min(closest, Math.max(0, items.length - 3)));
    setCurrentIndex(clampedIndex);
  };

  const scroll = (direction: 'left' | 'right') => {
    const limit = Math.max(0, items.length - 3);
    const newIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(limit, currentIndex + 1);
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
              disabled={currentIndex === 0 || items.length <= 3}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              className="p-3 border border-charcoal-200 rounded-full hover:border-dusty-rose-500 hover:text-dusty-rose-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentIndex >= Math.max(0, items.length - 3)}
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
          {(loading ? [] : items).map((product, index) => (
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
              <ProductCard 
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                originalPrice={product.originalPrice}
                image={(product.images && product.images[0]) || 'https://placehold.co/600x800?text=No+Image'}
                rating={product.rating || 0}
                reviewCount={product.reviewCount || 0}
                isNew={Boolean(product.createdAt && (Date.now() - new Date(product.createdAt as any).getTime()) < 1000 * 60 * 60 * 24 * 30)}
                isSale={product.originalPrice !== undefined && product.originalPrice > product.price}
              />
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
          {Array.from({ length: Math.max(1, Math.max(0, items.length - 2)) }).map((_, index) => (
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
