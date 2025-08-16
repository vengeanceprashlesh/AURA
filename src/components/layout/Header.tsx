'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, User, Menu, X, Search, Phone, Mail, Sparkles, Crown, Gift, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { navigationCategories } from '@/data/categories';
import MegaMenuDropdown from './MegaMenuDropdown';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { totalItems, toggleCart } = useCartStore();

  // Women's fashion mobile menu
  const mobileMenuLinks = [
    { href: '/categories/new-today', label: 'New Today', featured: true },
    { href: '/categories/dresses', label: 'Dresses' },
    { href: '/categories/clothing', label: 'Clothing' },
    { href: '/categories/shoes', label: 'Shoes' },
    { href: '/categories/accessories', label: 'Accessories' },
    { href: '/bestsellers', label: 'Bestsellers' },
    { href: '/categories/hot-list', label: 'Trending' },
    { href: '/categories/sale', label: 'Sale' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent tracking-wide">
                  AURA
                </div>
                <div className="text-[10px] text-gray-500 font-light tracking-[0.2em] -mt-1">
                  MARKETPLACE
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-8" onMouseLeave={() => setActiveCategory(null)}>
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-full px-8 py-2 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-1">
                {navigationCategories.map((category, index) => (
                  <motion.div 
                    key={category.id} 
                    className="relative"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onMouseEnter={() => setActiveCategory(category.id)}
                  >
                    <Link
                      href={category.href}
                      className={`relative px-5 py-3 text-sm font-medium tracking-wide transition-all duration-300 flex items-center space-x-2 rounded-full group ${
                        activeCategory === category.id
                          ? 'text-white bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg shadow-rose-200'
                          : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                      } ${
                        category.hot ? 'text-red-600 hover:text-red-700' : ''
                      } ${
                        category.sale ? 'text-red-600 hover:text-red-700' : ''
                      }`}
                    >
                      <span className="relative z-10">{category.name}</span>
                      {category.hot && (
                        <motion.span 
                          className="text-red-500 text-xs"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🔥
                        </motion.span>
                      )}
                      {category.sale && (
                        <motion.span 
                          className="text-red-600 text-xs bg-red-100 px-2 py-0.5 rounded-full"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          SALE
                        </motion.span>
                      )}
                      
                      {/* Elegant hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full opacity-0 group-hover:opacity-10"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1, opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                    
                    {category.subcategories && (
                      <MegaMenuDropdown
                        category={category}
                        isOpen={activeCategory === category.id}
                        onClose={() => setActiveCategory(null)}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <motion.button 
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </motion.button>

            {/* Wishlist */}
            <motion.button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group relative"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="h-5 w-5 group-hover:fill-current" />
              <span className="sr-only">Wishlist</span>
            </motion.button>

            {/* Shopping Bag */}
            <motion.button 
              onClick={toggleCart}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group relative"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-5 w-5" />
              {/* Cart badge */}
              {totalItems > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </motion.span>
              )}
              <span className="sr-only">Shopping bag</span>
            </motion.button>

            {/* User Account */}
            <motion.button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {/* Professional Mobile Navigation */}
        <motion.div 
          className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-4 pb-6 space-y-1 bg-white border-t border-gray-200">
            {mobileMenuLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors ${
                    link.featured ? 'text-rose-600 bg-rose-50 rounded-md' : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            
            {/* Professional Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-rose-50 rounded-md text-center"
            >
              <p className="text-sm text-rose-600 font-medium">Get 15% off your first order!</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
