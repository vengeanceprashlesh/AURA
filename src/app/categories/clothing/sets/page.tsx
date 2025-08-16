'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';

const SetsPage = () => {
  const categories = [
    { id: 'matching-sets', name: 'Matching Sets', href: '/categories/clothing/sets/matching', count: 24 },
    { id: 'co-ord-sets', name: 'Co-ord Sets', href: '/categories/clothing/sets/coord', count: 18 },
    { id: 'two-piece', name: 'Two Piece Sets', href: '/categories/clothing/sets/two-piece', count: 32 },
    { id: 'lounge-sets', name: 'Lounge Sets', href: '/categories/clothing/sets/lounge', count: 15 },
    { id: 'workout-sets', name: 'Workout Sets', href: '/categories/clothing/sets/workout', count: 12 },
  ];

  const products = [
    {
      id: '1',
      name: 'Linen Co-ord Set',
      price: 189.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'Effortless Co.',
      sale: true,
      isNew: false,
      colors: ['beige', 'white', 'sage'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: '2',
      name: 'Silk Matching Set',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=500',
      brand: 'Luxe Sets',
      sale: false,
      isNew: true,
      colors: ['black', 'champagne', 'navy'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '3',
      name: 'Knit Lounge Set',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=500',
      brand: 'Cozy Co.',
      sale: false,
      isNew: false,
      colors: ['grey', 'oatmeal', 'blush'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: '4',
      name: 'Active Workout Set',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=400&h=500',
      brand: 'Athletic Aura',
      sale: true,
      isNew: true,
      colors: ['black', 'burgundy', 'forest'],
      sizes: ['XS', 'S', 'M', 'L']
    },
  ];

  return (
    <div>
      {/* Special Features Section */}
      <div className="bg-gradient-to-r from-dusty-rose-100 to-beige-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <Sparkles className="h-8 w-8 text-dusty-rose-500 mb-3" />
              <h3 className="font-heading font-bold text-lg mb-2">Perfect Match</h3>
              <p className="text-charcoal-600">Every set is perfectly coordinated for effortless style</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <Heart className="h-8 w-8 text-dusty-rose-500 mb-3" />
              <h3 className="font-heading font-bold text-lg mb-2">Mix & Match</h3>
              <p className="text-charcoal-600">Pieces can be worn together or separately</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <Star className="h-8 w-8 text-dusty-rose-500 mb-3" />
              <h3 className="font-heading font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-charcoal-600">Luxurious fabrics and impeccable construction</p>
            </motion.div>
          </div>
        </div>
      </div>

      <CategoryPageBase
        title="Sets & Co-ords"
        description="Effortlessly chic matching pieces for every occasion. From casual co-ords to elegant sets."
        backgroundImage="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&h=600"
        products={products}
        categories={categories}
        filters={[
          {
            id: 'style',
            name: 'Style',
            options: [
              { id: 'casual', name: 'Casual', count: 28 },
              { id: 'formal', name: 'Formal', count: 15 },
              { id: 'lounge', name: 'Lounge', count: 22 },
              { id: 'active', name: 'Active', count: 18 },
              { id: 'evening', name: 'Evening', count: 12 },
            ]
          },
          {
            id: 'fabric',
            name: 'Fabric',
            options: [
              { id: 'cotton', name: 'Cotton', count: 35 },
              { id: 'linen', name: 'Linen', count: 24 },
              { id: 'silk', name: 'Silk', count: 18 },
              { id: 'knit', name: 'Knit', count: 22 },
              { id: 'performance', name: 'Performance', count: 12 },
            ]
          },
          {
            id: 'pieces',
            name: 'Number of Pieces',
            options: [
              { id: 'two-piece', name: '2 Pieces', count: 68 },
              { id: 'three-piece', name: '3 Pieces', count: 24 },
              { id: 'four-piece', name: '4+ Pieces', count: 8 },
            ]
          },
          {
            id: 'price',
            name: 'Price',
            options: [
              { id: 'under100', name: 'Under $100', count: 25 },
              { id: '100to200', name: '$100 - $200', count: 35 },
              { id: '200to300', name: '$200 - $300', count: 22 },
              { id: 'over300', name: 'Over $300', count: 18 },
            ]
          }
        ]}
      />
    </div>
  );
};

export default SetsPage;
