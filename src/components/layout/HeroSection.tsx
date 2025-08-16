'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const decorativeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: [0.15, 0.25, 0.2],
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Main Hero Banner - REVOLVE Style */}
      <section className="relative h-[70vh] md:h-screen overflow-hidden bg-white">
        <div className="relative w-full h-full">
          {/* Hero Image Placeholder */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-pink-50 via-white to-purple-50"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* You can replace this with an actual hero image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gray-100 rounded-full opacity-20"></div>
            </div>
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-center px-4 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-4 tracking-tight"
                variants={itemVariants}
              >
                NEW ARRIVALS
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-8 font-light"
                variants={itemVariants}
              >
                Shop the latest trends and must-have styles
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <Link
                  href="/womens"
                  className="inline-block bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Shop Women
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Banner Grid - REVOLVE Style */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Women's Banner */}
            <motion.div 
              className="relative h-96 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/womens">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 group-hover:from-pink-200 group-hover:to-purple-200 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-light text-black mb-2">WOMEN</h3>
                      <p className="text-sm text-gray-600">Shop the latest trends</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Men's Banner */}
            <motion.div 
              className="relative h-96 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/mens">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-gray-100 group-hover:from-blue-200 group-hover:to-gray-200 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-light text-black mb-2">MEN</h3>
                      <p className="text-sm text-gray-600">Discover men's essentials</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* New Today Banner */}
            <motion.div 
              className="relative h-96 group cursor-pointer md:col-span-2 lg:col-span-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/new-today">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 group-hover:from-yellow-200 group-hover:to-orange-200 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-light text-black mb-2">NEW TODAY</h3>
                      <p className="text-sm text-gray-600">Fresh drops daily</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-black text-white text-center py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm font-medium">
            FREE SHIPPING ON ORDERS OVER $100 | FREE RETURNS | SHOP NOW, PAY LATER
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
