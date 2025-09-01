'use client';

import Link from "next/link";
import { ArrowRight, Star, Sparkles, Flame, Wind, Crown, Heart, Flower, Gem, Wand2, Palette, Scissors, ShoppingBag, Truck, RefreshCw, Shield, Award, Clock, DollarSign, Users, TrendingUp } from "lucide-react";
import { motion } from 'framer-motion';
import { FeaturedCollectionsSection } from '@/components/layout';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - Sets of the Season - Mobile Responsive */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          {/* Left Image - Hidden on mobile */}
          <div className="relative bg-gradient-to-br from-yellow-100 to-yellow-200 hidden md:block">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-yellow-400 bg-opacity-20"></div>
          </div>
          
          {/* Center Content - Full width on mobile */}
          <div className="flex flex-col items-center justify-center bg-white p-4 sm:p-6 md:p-8 lg:p-16 text-center relative z-10 md:col-span-1 col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black mb-1 sm:mb-2 md:mb-4 tracking-tight">
                SETS
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-gray-600 mb-1 sm:mb-2 md:mb-4">OF THE</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black mb-3 sm:mb-4 md:mb-6 tracking-tight">
                SEASON
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm mx-auto leading-relaxed px-2 sm:px-4">
                We love something matching—especially if it's in butter yellow.
              </p>
              <Link 
                href="/categories/new-today" 
                className="inline-block bg-black text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-sm"
              >
                SHOP NOW
              </Link>
            </motion.div>
          </div>
          
          {/* Right Image - Hidden on mobile */}
          <div className="relative bg-gradient-to-br from-yellow-100 to-yellow-200 hidden md:block">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-yellow-400 bg-opacity-20"></div>
          </div>
        </div>
        
        {/* Mobile background image */}
        <div className="md:hidden absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center opacity-20"></div>
      </section>

      {/* Seasonal Collections - Visual Grid - Mobile Responsive */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          {/* Two side-by-side banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {/* IT'S THE SEASON */}
            <motion.div 
              className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-pink-100 rounded-lg overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center opacity-90"></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight">
                  IT'S THE SEASON
                </h3>
                <Link href="/categories/seasonal" className="text-white text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider hover:underline">
                  Shop Now
                </Link>
              </div>
            </motion.div>
            
            {/* SUMMER'S MOST WANTED */}
            <motion.div 
              className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-red-100 rounded-lg overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-rose-200"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-90"></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight">
                  SUMMER'S MOST WANTED
                </h3>
                <Link href="/categories/summer" className="text-white text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider hover:underline">
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </div>
          
          
        </div>
      </section>


      {/* Featured Collections Section */}
      <FeaturedCollectionsSection />

      {/* Why Women Love Aura Section - Mobile Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-soft-pink-50 via-lavender-50 to-blush-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-soft-pink-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 sm:w-40 h-32 sm:h-40 bg-lavender-200 rounded-full opacity-40 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-20 sm:w-24 h-20 sm:h-24 bg-blush-200 rounded-full opacity-25 blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-soft-pink-600 to-lavender-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              💖 Why Women Love Aura
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-charcoal-600 max-w-2xl mx-auto font-light px-4">
              Join thousands of confident women who've found their signature style with us
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              className="text-center p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-soft-pink-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-soft-pink-100 to-blush-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Star className="h-8 sm:h-10 w-8 sm:w-10 text-soft-pink-500 fill-soft-pink-500" />
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-charcoal-900 mb-3 sm:mb-4">
                ✨ Premium Quality
              </h3>
              <p className="font-body text-sm sm:text-base text-charcoal-600 leading-relaxed">
                Every piece is crafted with love and attention to detail. From luxurious fabrics to perfect fits, we ensure you look and feel amazing.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-lavender-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-lavender-100 to-soft-pink-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Heart className="h-8 sm:h-10 w-8 sm:w-10 text-lavender-500 fill-lavender-500" />
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-charcoal-900 mb-3 sm:mb-4">
                💗 Curated with Care
              </h3>
              <p className="font-body text-sm sm:text-base text-charcoal-600 leading-relaxed">
                Our female-led styling team carefully selects pieces that celebrate femininity, confidence, and individual expression.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blush-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-blush-100 to-sage-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Flower className="h-8 sm:h-10 w-8 sm:w-10 text-blush-500" />
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-charcoal-900 mb-3 sm:mb-4">
                🌸 Ethically Beautiful
              </h3>
              <p className="font-body text-sm sm:text-base text-charcoal-600 leading-relaxed">
                We believe beauty shouldn't cost the earth. Our sustainable practices and ethical sourcing make fashion that's good for you and the planet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
