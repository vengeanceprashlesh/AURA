'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';
import { motion } from 'framer-motion';
import { Sun, Waves, Flower, Star } from 'lucide-react';

const SeasonalPage = () => {
  const categories = [
    { id: 'summer-essentials', name: 'Summer Essentials', href: '/categories/new-today/seasonal/summer', count: 32 },
    { id: 'vacation-ready', name: 'Vacation Ready', href: '/categories/new-today/seasonal/vacation', count: 28 },
    { id: 'festival-looks', name: 'Festival Looks', href: '/categories/new-today/seasonal/festival', count: 18 },
    { id: 'resort-wear', name: 'Resort Wear', href: '/categories/new-today/seasonal/resort', count: 22 },
  ];

  const products = [
    {
      id: '1',
      name: 'Summer Maxi Dress',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'Summer Collection',
      sale: true,
      isNew: true,
      badge: 'SEASONAL'
    },
    {
      id: '2',
      name: 'Beach Cover-Up',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=400&h=500',
      brand: 'Resort Wear',
      sale: false,
      isNew: true,
      badge: 'VACATION'
    },
  ];

  return (
    <div>
      {/* Seasonal Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-4 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-medium flex items-center justify-center gap-2"
        >
          <Sun className="h-5 w-5" />
          Seasonal Fresh: Perfect pieces for the current season!
          <Sun className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Season Highlights */}
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-heading font-bold text-center mb-12 text-charcoal-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            This Season's Must-Haves
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg mb-3">Summer Vibes</h3>
              <p className="text-charcoal-600 text-sm">Breezy fabrics and bright colors</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Waves className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg mb-3">Beach Ready</h3>
              <p className="text-charcoal-600 text-sm">Perfect for seaside getaways</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Flower className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg mb-3">Festival Style</h3>
              <p className="text-charcoal-600 text-sm">Boho chic for music festivals</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg mb-3">Resort Luxe</h3>
              <p className="text-charcoal-600 text-sm">Elevated vacation looks</p>
            </motion.div>
          </div>
        </div>
      </div>

      <CategoryPageBase
        title="Seasonal Fresh"
        description="Discover the perfect pieces for this season. From summer essentials to vacation must-haves."
        backgroundImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&h=600"
        products={products}
        categories={categories}
        filters={[
          {
            id: 'season',
            name: 'Season',
            options: [
              { id: 'summer', name: 'Summer', count: 45 },
              { id: 'vacation', name: 'Vacation', count: 32 },
              { id: 'festival', name: 'Festival', count: 18 },
              { id: 'resort', name: 'Resort', count: 22 },
            ]
          },
          {
            id: 'weather',
            name: 'Weather',
            options: [
              { id: 'hot', name: 'Hot Weather', count: 38 },
              { id: 'warm', name: 'Warm Weather', count: 42 },
              { id: 'mild', name: 'Mild Weather', count: 28 },
            ]
          }
        ]}
      />
    </div>
  );
};

export default SeasonalPage;

