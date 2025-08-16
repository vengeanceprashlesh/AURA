'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationCategories } from '@/data/categories';
import MegaMenuDropdown from './MegaMenuDropdown';

const CategoryNavigation = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleMouseEnter = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const handleCloseDropdown = () => {
    setActiveCategory(null);
  };

  return (
    <nav className="hidden md:flex justify-center items-center space-x-8 bg-white border-t border-gray-200 py-0 relative" onMouseLeave={handleMouseLeave}>
      {navigationCategories.map((category) => (
        <div key={category.id} className="relative" onMouseEnter={() => handleMouseEnter(category.id)}>
          <Link
            href={category.href}
            className={`px-4 py-4 text-sm font-medium tracking-wide transition-all duration-200 flex items-center space-x-1 group border-b-2 border-transparent ${
              activeCategory === category.id
                ? 'text-rose-600 border-rose-600'
                : 'text-gray-700 hover:text-rose-600 hover:border-gray-300'
            } ${
              category.hot ? 'text-red-600' : ''
            } ${
              category.sale ? 'text-red-600' : ''
            }`}
          >
            <span className="font-medium">{category.name}</span>
            {category.hot && <span className="text-red-500 text-xs ml-1">•</span>}
            {category.sale && <span className="text-red-600 text-xs ml-1">•</span>}
          </Link>
          
          {activeCategory === category.id && (
            <motion.div
              className="absolute left-1/2 -bottom-2 h-0.5 w-1/2 bg-dusty-rose-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              style={{ transform: 'translateX(-50%)' }}
            />
          )}

          {category.subcategories && (
            <MegaMenuDropdown
              category={category}
              isOpen={activeCategory === category.id}
              onClose={handleCloseDropdown}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default CategoryNavigation;
