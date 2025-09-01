'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, User, Menu, X, Search, Phone, Mail, Sparkles, Crown, Gift, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import SearchModal from '@/components/SearchModal';
import { navigationCategories } from '@/data/categories';
import { APP_CONFIG } from '@/config/constants';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  // Get mobile menu links from configuration
  const mobileMenuLinks = APP_CONFIG.NAVIGATION.MOBILE_MENU_LINKS;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent tracking-wide">
                  {APP_CONFIG.STORE_NAME.toUpperCase()}
                </div>
                <div className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-500 font-light tracking-[0.2em] -mt-1">
                  {APP_CONFIG.STORE_SUBTITLE}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search - Hidden on mobile */}
            <motion.button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="sr-only">{APP_CONFIG.UI_TEXT.COMMON.SEARCH}</span>
            </motion.button>

            {/* Wishlist - Hidden on small mobile */}
            <Link href="/profile?tab=wishlist">
              <motion.button 
                className="hidden sm:flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group relative"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-4 sm:h-5 w-4 sm:w-5 group-hover:fill-current" />
                {/* Wishlist badge */}
                {wishlistCount > 0 && (
                  <motion.span 
                    className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold shadow-lg text-[10px] sm:text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </motion.span>
                )}
                <span className="sr-only">{APP_CONFIG.UI_TEXT.WISHLIST.TITLE}</span>
              </motion.button>
            </Link>

            {/* Shopping Bag */}
            <motion.button 
              onClick={toggleCart}
              className="flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group relative"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5" />
              {/* Cart badge */}
              {totalItems > 0 && (
                <motion.span 
                  className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold shadow-lg text-[10px] sm:text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </motion.span>
              )}
              <span className="sr-only">{APP_CONFIG.UI_TEXT.CART.TITLE}</span>
            </motion.button>

            {/* User Account - Hidden on small mobile */}
            <Link href="/profile">
              <motion.button 
                className="hidden sm:flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="sr-only">{APP_CONFIG.UI_TEXT.PROFILE.ACCOUNT_INFO}</span>
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 ml-1"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </motion.div>
              <span className="sr-only">Toggle menu</span>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <motion.div 
          className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-4 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-lg rounded-b-lg mx-2 sm:mx-4">
            {mobileMenuLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3.5 text-base font-medium transition-all duration-200 rounded-lg ${
                    link.featured 
                      ? 'text-rose-600 bg-gradient-to-r from-rose-50 to-rose-100 border border-rose-200' 
                      : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50 hover:translate-x-1'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.featured && <span className="text-rose-500 text-sm">🔥</span>}
                </Link>
              </motion.div>
            ))}
            
            {/* Mobile Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 space-y-3"
            >
              {/* Search Button for Mobile */}
              <button 
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span className="font-medium">Search Products</span>
              </button>
              
              {/* Account Button for Mobile */}
              <div className="sm:hidden">
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <User className="h-5 w-5" />
                    <span className="font-medium">My Account</span>
                  </button>
                </Link>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
};

export default Header;
