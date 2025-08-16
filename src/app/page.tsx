'use client';

import { HeroSection, NewArrivalsSection, FeaturedCollectionsSection } from '@/components/layout';
import Link from "next/link";
import { ArrowRight, Star, Sparkles, Flame, Wind, Crown, Heart, Flower, Gem, Wand2, Palette, Scissors, ShoppingBag, Truck, RefreshCw, Shield, Award } from "lucide-react";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Stunning Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Where Style Meets
                <span className="text-transparent bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text block">
                  Sophistication
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Curated fashion for the modern woman who demands quality, elegance, and individuality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/categories/new-today" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  Shop New Arrivals
                </Link>
                <Link href="/categories/sale" className="border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                  Explore Sale
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Aura - Compelling Reasons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Why Women Choose Aura
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another fashion store. We're your style destination.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece is handpicked by our styling experts. We partner with top designers to bring you exclusive pieces you won't find anywhere else.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Same-day delivery in major cities, next-day everywhere else. Your perfect outfit is just hours away, not days.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Risk-Free Shopping</h3>
              <p className="text-gray-600 leading-relaxed">
                30-day free returns, no questions asked. Free styling consultations. We guarantee you'll love every purchase.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Women's Style Categories Showcase */}
      <section className="py-24 bg-gradient-to-br from-soft-pink-50 via-lavender-50 to-blush-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-soft-pink-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-lavender-200 rounded-full opacity-40 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blush-200 rounded-full opacity-25 blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center items-center space-x-3 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Sparkles className="h-8 w-8 text-soft-pink-500" />
              <h2 className="text-4xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-soft-pink-600 via-blush-500 to-lavender-600 bg-clip-text text-transparent">
                ✨ Trending for Her ✨
              </h2>
              <Heart className="h-8 w-8 text-soft-pink-500 fill-soft-pink-500" />
            </motion.div>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto font-light">
              Discover the latest must-haves in women's fashion, beauty, and accessories that are capturing hearts everywhere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <Link href="/dresses">
                <div className="group relative overflow-hidden rounded-3xl p-8 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-soft-pink-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-soft-pink-400 via-blush-400 to-lavender-400 opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-soft-pink-500 to-blush-500 text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Flower className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-playfair font-bold mb-3 text-charcoal-900 group-hover:text-soft-pink-600 transition-colors">
                      ✨ Dresses
                    </h3>
                    
                    <p className="text-charcoal-600 leading-relaxed font-light">
                      From sundresses to evening gowns, find your perfect fit
                    </p>
                    
                    <div className="mt-4 text-soft-pink-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.4 }}
            >
              <Link href="/beauty">
                <div className="group relative overflow-hidden rounded-3xl p-8 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-lavender-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-lavender-400 via-soft-pink-400 to-blush-400 opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-lavender-500 to-soft-pink-500 text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Palette className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-playfair font-bold mb-3 text-charcoal-900 group-hover:text-lavender-600 transition-colors">
                      💄 Beauty
                    </h3>
                    
                    <p className="text-charcoal-600 leading-relaxed font-light">
                      Makeup, skincare & beauty essentials for every look
                    </p>
                    
                    <div className="mt-4 text-lavender-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore Beauty →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <Link href="/accessories">
                <div className="group relative overflow-hidden rounded-3xl p-8 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-blush-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-blush-400 via-sage-400 to-lavender-400 opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blush-500 to-sage-500 text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Gem className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-playfair font-bold mb-3 text-charcoal-900 group-hover:text-blush-600 transition-colors">
                      💎 Accessories
                    </h3>
                    
                    <p className="text-charcoal-600 leading-relaxed font-light">
                      Jewelry, bags & accessories to complete your style
                    </p>
                    
                    <div className="mt-4 text-blush-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Accessories →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
            >
              <Link href="/shoes">
                <div className="group relative overflow-hidden rounded-3xl p-8 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-sage-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-400 via-soft-pink-400 to-lavender-400 opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-sage-500 to-lavender-500 text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Scissors className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-playfair font-bold mb-3 text-charcoal-900 group-hover:text-sage-600 transition-colors">
                      👠 Shoes
                    </h3>
                    
                    <p className="text-charcoal-600 leading-relaxed font-light">
                      Heels, flats & boots for every occasion and mood
                    </p>
                    
                    <div className="mt-4 text-sage-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Step Into Style →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
          
          {/* Special Women's Features */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-soft-pink-100 to-blush-100 rounded-2xl p-6 text-center border border-soft-pink-200">
              <Wand2 className="h-10 w-10 text-soft-pink-500 mx-auto mb-4" />
              <h3 className="font-playfair font-bold text-lg text-charcoal-800 mb-2">✨ Style Quiz</h3>
              <p className="text-charcoal-600 text-sm">Discover your personal style with our fun quiz!</p>
            </div>
            
            <div className="bg-gradient-to-br from-lavender-100 to-soft-pink-100 rounded-2xl p-6 text-center border border-lavender-200">
              <Heart className="h-10 w-10 text-lavender-500 mx-auto mb-4 fill-lavender-500" />
              <h3 className="font-playfair font-bold text-lg text-charcoal-800 mb-2">💝 Size Inclusive</h3>
              <p className="text-charcoal-600 text-sm">Beautiful styles for every body type & size</p>
            </div>
            
            <div className="bg-gradient-to-br from-blush-100 to-sage-100 rounded-2xl p-6 text-center border border-blush-200">
              <Star className="h-10 w-10 text-blush-500 mx-auto mb-4 fill-blush-500" />
              <h3 className="font-playfair font-bold text-lg text-charcoal-800 mb-2">⭐ Style Rewards</h3>
              <p className="text-charcoal-600 text-sm">Earn points with every purchase & review</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <FeaturedCollectionsSection />

      {/* Why Women Love Aura Section */}
      <section className="py-24 bg-gradient-to-br from-white to-soft-pink-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-soft-pink-600 to-lavender-600 bg-clip-text text-transparent mb-6">
              💖 Why Women Love Aura
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto font-light">
              Join thousands of confident women who've found their signature style with us
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-soft-pink-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-soft-pink-100 to-blush-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-soft-pink-500 fill-soft-pink-500" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">
                ✨ Premium Quality
              </h3>
              <p className="font-body text-charcoal-600 leading-relaxed">
                Every piece is crafted with love and attention to detail. From luxurious fabrics to perfect fits, we ensure you look and feel amazing.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-lavender-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-lavender-100 to-soft-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-lavender-500 fill-lavender-500" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">
                💗 Curated with Care
              </h3>
              <p className="font-body text-charcoal-600 leading-relaxed">
                Our female-led styling team carefully selects pieces that celebrate femininity, confidence, and individual expression.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blush-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-blush-100 to-sage-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flower className="h-10 w-10 text-blush-500" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">
                🌸 Ethically Beautiful
              </h3>
              <p className="font-body text-charcoal-600 leading-relaxed">
                We believe beauty shouldn't cost the earth. Our sustainable practices and ethical sourcing make fashion that's good for you and the planet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beautiful CTA Section for Women */}
      <section className="bg-gradient-to-br from-soft-pink-600 via-blush-500 to-lavender-600 text-white py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center space-x-3 mb-8">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
              <h2 className="font-playfair text-4xl md:text-6xl font-bold">
                ✨ Ready to Shine? ✨
              </h2>
              <Heart className="h-8 w-8 text-yellow-300 fill-yellow-300 animate-pulse" />
            </div>
            
            <p className="font-body text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light">
              Join over 50,000 confident women who've discovered their signature style with Aura.
              <br className="hidden md:block" />
              <span className="text-yellow-200">Your perfect look is waiting! 💫</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/new-arrivals"
                  className="group inline-flex items-center gap-3 bg-white text-soft-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="h-5 w-5" />
                  Explore New Arrivals
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/beauty"
                  className="group inline-flex items-center gap-3 bg-transparent text-white border-2 border-white/80 px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-soft-pink-600 transition-all duration-300"
                >
                  <Star className="h-5 w-5" />
                  Shop Beauty
                  <Heart className="h-4 w-4 group-hover:fill-current transition-all" />
                </Link>
              </motion.div>
            </div>
            
            {/* Social proof */}
            <motion.div
              className="mt-12 flex justify-center items-center space-x-8 text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-200">50K+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-200">4.9★</div>
                <div className="text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-200">1000+</div>
                <div className="text-sm">New Styles Monthly</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
