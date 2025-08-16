'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';
import { motion } from 'framer-motion';
import { Flower, Waves, Moon, Sun } from 'lucide-react';

const KimonosPage = () => {
  const categories = [
    { id: 'floral-kimonos', name: 'Floral Kimonos', href: '/categories/clothing/outerwear/kimonos/floral', count: 28 },
    { id: 'silk-kimonos', name: 'Silk Kimonos', href: '/categories/clothing/outerwear/kimonos/silk', count: 15 },
    { id: 'beach-cover', name: 'Beach Cover-Ups', href: '/categories/clothing/outerwear/kimonos/beach', count: 22 },
    { id: 'vintage-inspired', name: 'Vintage Inspired', href: '/categories/clothing/outerwear/kimonos/vintage', count: 18 },
    { id: 'festival-kimonos', name: 'Festival Style', href: '/categories/clothing/outerwear/kimonos/festival', count: 25 },
  ];

  const products = [
    {
      id: '1',
      name: 'Silk Floral Kimono',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'Eastern Elegance',
      sale: true,
      isNew: false,
      colors: ['cherry-blossom', 'midnight-floral', 'sage-botanical']
    },
    {
      id: '2',
      name: 'Bohemian Festival Kimono',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=500',
      brand: 'Free Spirit',
      sale: false,
      isNew: true,
      colors: ['sunset-ombre', 'tribal-print', 'rainbow-tie-dye']
    },
    {
      id: '3',
      name: 'Vintage Satin Kimono',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=500',
      brand: 'Vintage Luxe',
      sale: false,
      isNew: false,
      colors: ['champagne', 'deep-emerald', 'royal-blue']
    },
    {
      id: '4',
      name: 'Beach Cover Kimono',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=400&h=500',
      brand: 'Coastal Vibes',
      sale: true,
      isNew: true,
      colors: ['ocean-waves', 'coral-reef', 'sunset-beach']
    },
  ];

  return (
    <div>
      {/* Cultural Appreciation Header */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white py-4 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-medium flex items-center justify-center gap-2"
        >
          <Flower className="h-5 w-5" />
          Celebrating the timeless elegance of kimono-inspired fashion
          <Flower className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Cultural & Style Section */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal-900">
              The Modern Kimono
            </h2>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
              Inspired by traditional Japanese elegance, our kimono collection brings 
              contemporary style to this timeless silhouette. Perfect for layering 
              and creating effortlessly chic looks.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-pink-100"
            >
              <Sun className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h3 className="font-heading font-bold text-xl mb-4">Day Elegant</h3>
              <p className="text-charcoal-600 mb-4">Light, flowy fabrics perfect for daytime sophistication</p>
              <div className="bg-yellow-50 rounded-full px-4 py-2 text-sm font-medium text-yellow-800">
                Office to Brunch
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-purple-100"
            >
              <Moon className="h-16 w-16 text-purple-500 mx-auto mb-6" />
              <h3 className="font-heading font-bold text-xl mb-4">Evening Glam</h3>
              <p className="text-charcoal-600 mb-4">Luxurious silk and satin for special occasions</p>
              <div className="bg-purple-50 rounded-full px-4 py-2 text-sm font-medium text-purple-800">
                Date Night Ready
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-blue-100"
            >
              <Waves className="h-16 w-16 text-blue-500 mx-auto mb-6" />
              <h3 className="font-heading font-bold text-xl mb-4">Beach Vibes</h3>
              <p className="text-charcoal-600 mb-4">Lightweight cover-ups for seaside elegance</p>
              <div className="bg-blue-50 rounded-full px-4 py-2 text-sm font-medium text-blue-800">
                Vacation Perfect
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-pink-100"
            >
              <Flower className="h-16 w-16 text-pink-500 mx-auto mb-6" />
              <h3 className="font-heading font-bold text-xl mb-4">Festival Fun</h3>
              <p className="text-charcoal-600 mb-4">Bohemian prints for music festivals and events</p>
              <div className="bg-pink-50 rounded-full px-4 py-2 text-sm font-medium text-pink-800">
                Boho Chic
              </div>
            </motion.div>
          </div>

          {/* Styling Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white rounded-3xl p-10 shadow-2xl"
          >
            <h3 className="text-3xl font-heading font-bold text-center mb-8">How to Style Your Kimono</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 mb-4">
                  <h4 className="font-bold text-lg mb-2">Layer Over Basics</h4>
                  <p className="text-sm text-charcoal-600">Perfect over simple tees, tanks, and jeans</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-6 mb-4">
                  <h4 className="font-bold text-lg mb-2">Belt for Shape</h4>
                  <p className="text-sm text-charcoal-600">Add a belt to cinch the waist and create definition</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 mb-4">
                  <h4 className="font-bold text-lg mb-2">Mix Patterns</h4>
                  <p className="text-sm text-charcoal-600">Pair printed kimonos with solid colors</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CategoryPageBase
        title="Kimonos & Cover-Ups"
        description="Embrace the art of layering with our collection of kimono-inspired pieces. From silk elegance to bohemian charm."
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=600"
        products={products}
        categories={categories}
        filters={[
          {
            id: 'style',
            name: 'Style',
            options: [
              { id: 'traditional', name: 'Traditional Inspired', count: 18 },
              { id: 'modern', name: 'Modern Cut', count: 32 },
              { id: 'bohemian', name: 'Bohemian', count: 25 },
              { id: 'minimalist', name: 'Minimalist', count: 15 },
            ]
          },
          {
            id: 'length',
            name: 'Length',
            options: [
              { id: 'long', name: 'Long (Floor Length)', count: 35 },
              { id: 'midi', name: 'Midi Length', count: 28 },
              { id: 'short', name: 'Short/Cropped', count: 22 },
            ]
          },
          {
            id: 'fabric',
            name: 'Fabric',
            options: [
              { id: 'silk', name: 'Silk', count: 20 },
              { id: 'satin', name: 'Satin', count: 18 },
              { id: 'chiffon', name: 'Chiffon', count: 25 },
              { id: 'cotton', name: 'Cotton', count: 22 },
              { id: 'viscose', name: 'Viscose', count: 15 },
            ]
          },
          {
            id: 'print',
            name: 'Print/Pattern',
            options: [
              { id: 'floral', name: 'Floral', count: 35 },
              { id: 'geometric', name: 'Geometric', count: 18 },
              { id: 'solid', name: 'Solid Colors', count: 22 },
              { id: 'abstract', name: 'Abstract', count: 15 },
              { id: 'vintage', name: 'Vintage Print', count: 12 },
            ]
          }
        ]}
      />
    </div>
  );
};

export default KimonosPage;
