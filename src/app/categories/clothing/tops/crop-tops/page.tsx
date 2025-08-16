'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';
import { motion } from 'framer-motion';
import { Flame, Sun, Music } from 'lucide-react';

const CropTopsPage = () => {
  const categories = [
    { id: 'casual-crop', name: 'Casual Crop Tops', href: '/categories/clothing/tops/crop-tops/casual', count: 42 },
    { id: 'going-out', name: 'Going Out Tops', href: '/categories/clothing/tops/crop-tops/going-out', count: 28 },
    { id: 'sports-bra', name: 'Sports Bra Style', href: '/categories/clothing/tops/crop-tops/sports-bra', count: 18 },
    { id: 'long-sleeve', name: 'Long Sleeve Crop', href: '/categories/clothing/tops/crop-tops/long-sleeve', count: 22 },
    { id: 'tank-crop', name: 'Tank Crop Tops', href: '/categories/clothing/tops/crop-tops/tank', count: 35 },
  ];

  const products = [
    {
      id: '1',
      name: 'Ribbed Tank Crop Top',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&h=500',
      brand: 'Basic Luxe',
      sale: true,
      isNew: false,
      colors: ['black', 'white', 'sage', 'terracotta']
    },
    {
      id: '2',
      name: 'Mesh Party Crop Top',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'Night Out',
      sale: false,
      isNew: true,
      colors: ['black', 'silver', 'gold']
    },
    {
      id: '3',
      name: 'Off-Shoulder Crop Sweater',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=500',
      brand: 'Cozy Chic',
      sale: false,
      isNew: false,
      colors: ['cream', 'dusty-pink', 'lavender']
    },
    {
      id: '4',
      name: 'Graphic Crop Tee',
      price: 34.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&h=500',
      brand: 'Street Style',
      sale: true,
      isNew: true,
      colors: ['white', 'black', 'vintage-wash']
    },
  ];

  return (
    <div>
      {/* Trending Alert */}
      <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white py-3 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-medium flex items-center justify-center gap-2"
        >
          <Flame className="h-5 w-5" />
          Trending Now: Crop Tops are the must-have of the season!
          <Flame className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Style Inspiration Section */}
      <div className="bg-gradient-to-br from-pink-50 to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-heading font-bold text-center mb-8 text-charcoal-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Style Your Crop Top
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3">Summer Vibes</h3>
              <p className="text-charcoal-600 mb-4">High-waisted shorts + crop top = perfect summer combo</p>
              <div className="bg-yellow-100 rounded-lg p-3">
                <span className="text-sm font-medium text-yellow-800">☀️ Festival Ready</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Music className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3">Night Out</h3>
              <p className="text-charcoal-600 mb-4">Pair with high-waisted jeans and statement jewelry</p>
              <div className="bg-purple-100 rounded-lg p-3">
                <span className="text-sm font-medium text-purple-800">✨ Party Perfect</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Flame className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3">Street Style</h3>
              <p className="text-charcoal-600 mb-4">Layer over a long-sleeve tee for an edgy look</p>
              <div className="bg-red-100 rounded-lg p-3">
                <span className="text-sm font-medium text-red-800">🔥 Trend Alert</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <CategoryPageBase
        title="Crop Tops"
        description="Show off your style with our curated collection of crop tops. From casual to glam, find your perfect fit."
        backgroundImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&h=600"
        products={products}
        categories={categories}
        filters={[
          {
            id: 'length',
            name: 'Length',
            options: [
              { id: 'ultra-crop', name: 'Ultra Crop', count: 18 },
              { id: 'regular-crop', name: 'Regular Crop', count: 45 },
              { id: 'long-crop', name: 'Long Crop', count: 32 },
            ]
          },
          {
            id: 'neckline',
            name: 'Neckline',
            options: [
              { id: 'scoop', name: 'Scoop Neck', count: 28 },
              { id: 'v-neck', name: 'V-Neck', count: 22 },
              { id: 'high-neck', name: 'High Neck', count: 15 },
              { id: 'off-shoulder', name: 'Off Shoulder', count: 18 },
              { id: 'halter', name: 'Halter', count: 12 },
            ]
          },
          {
            id: 'sleeve',
            name: 'Sleeve Style',
            options: [
              { id: 'sleeveless', name: 'Sleeveless', count: 42 },
              { id: 'short-sleeve', name: 'Short Sleeve', count: 25 },
              { id: 'long-sleeve', name: 'Long Sleeve', count: 18 },
              { id: 'cap-sleeve', name: 'Cap Sleeve', count: 10 },
            ]
          },
          {
            id: 'occasion',
            name: 'Occasion',
            options: [
              { id: 'casual', name: 'Casual', count: 35 },
              { id: 'going-out', name: 'Going Out', count: 28 },
              { id: 'workout', name: 'Workout', count: 18 },
              { id: 'beach', name: 'Beach', count: 14 },
            ]
          }
        ]}
      />
    </div>
  );
};

export default CropTopsPage;
