'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';
import { motion } from 'framer-motion';
import { Wind, Sparkles, Crown } from 'lucide-react';

const WideLegPantsPage = () => {
  const categories = [
    { id: 'palazzo', name: 'Palazzo Pants', href: '/categories/clothing/bottoms/wide-leg/palazzo', count: 18 },
    { id: 'flowy-trousers', name: 'Flowy Trousers', href: '/categories/clothing/bottoms/wide-leg/flowy', count: 25 },
    { id: 'high-waisted', name: 'High Waisted', href: '/categories/clothing/bottoms/wide-leg/high-waisted', count: 32 },
    { id: 'cropped-wide', name: 'Cropped Wide Leg', href: '/categories/clothing/bottoms/wide-leg/cropped', count: 22 },
    { id: 'printed-wide', name: 'Printed Wide Leg', href: '/categories/clothing/bottoms/wide-leg/printed', count: 15 },
  ];

  const products = [
    {
      id: '1',
      name: 'High-Waisted Palazzo Pants',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500',
      brand: 'Effortless Elegance',
      sale: true,
      isNew: false,
      colors: ['black', 'navy', 'camel', 'white']
    },
    {
      id: '2',
      name: 'Linen Wide-Leg Trousers',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=500',
      brand: 'Natural Luxe',
      sale: false,
      isNew: true,
      colors: ['natural', 'sage', 'terracotta']
    },
    {
      id: '3',
      name: 'Silk Palazzo Pants',
      price: 279.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'Silk Stories',
      sale: false,
      isNew: false,
      colors: ['champagne', 'midnight', 'emerald']
    },
    {
      id: '4',
      name: 'Printed Wide-Leg Pants',
      price: 129.99,
      originalPrice: 169.99,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=500',
      brand: 'Pattern Play',
      sale: true,
      isNew: true,
      colors: ['floral-multi', 'geometric-black', 'abstract-blue']
    },
  ];

  return (
    <div>
      {/* Sophistication Alert */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white py-3 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-medium flex items-center justify-center gap-2"
        >
          <Crown className="h-5 w-5" />
          Sophisticated Style: Wide-leg pants for every elegant occasion
          <Crown className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Style Guide Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-heading font-bold text-center mb-12 text-charcoal-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The Art of Wide-Leg Elegance
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Wind className="h-8 w-8 text-blue-500 mt-2" />
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Effortless Movement</h3>
                    <p className="text-charcoal-600">Wide-leg pants flow beautifully with every step, creating an elegant silhouette that's both comfortable and chic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Sparkles className="h-8 w-8 text-purple-500 mt-2" />
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Versatile Styling</h3>
                    <p className="text-charcoal-600">From professional meetings to weekend brunches, wide-leg pants adapt to any occasion with the right top and accessories.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Crown className="h-8 w-8 text-pink-500 mt-2" />
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Timeless Appeal</h3>
                    <p className="text-charcoal-600">This classic silhouette never goes out of style, making it a worthy investment for your wardrobe.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="font-heading font-bold text-2xl mb-6 text-center">Styling Tips</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <span className="font-medium text-blue-800">Office Ready:</span>
                  <span className="text-blue-700 ml-2">Tuck in a crisp blouse and add pointed-toe heels</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <span className="font-medium text-purple-800">Casual Chic:</span>
                  <span className="text-purple-700 ml-2">Pair with a fitted crop top and statement sneakers</span>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <span className="font-medium text-pink-800">Evening Glam:</span>
                  <span className="text-pink-700 ml-2">Choose silk styles with a fitted camisole and heels</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <CategoryPageBase
        title="Wide-Leg Pants"
        description="Embrace sophisticated comfort with our collection of wide-leg pants. Flow with confidence in every step."
        backgroundImage="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&h=600"
        products={products}
        categories={categories}
        filters={[
          {
            id: 'rise',
            name: 'Rise',
            options: [
              { id: 'high-rise', name: 'High Rise', count: 45 },
              { id: 'mid-rise', name: 'Mid Rise', count: 32 },
              { id: 'low-rise', name: 'Low Rise', count: 8 },
            ]
          },
          {
            id: 'length',
            name: 'Length',
            options: [
              { id: 'full-length', name: 'Full Length', count: 52 },
              { id: 'cropped', name: 'Cropped', count: 28 },
              { id: 'ankle-length', name: 'Ankle Length', count: 35 },
            ]
          },
          {
            id: 'fabric',
            name: 'Fabric',
            options: [
              { id: 'cotton', name: 'Cotton', count: 35 },
              { id: 'linen', name: 'Linen', count: 28 },
              { id: 'silk', name: 'Silk', count: 15 },
              { id: 'polyester', name: 'Polyester', count: 22 },
              { id: 'blend', name: 'Blend', count: 18 },
            ]
          },
          {
            id: 'occasion',
            name: 'Occasion',
            options: [
              { id: 'work', name: 'Work', count: 35 },
              { id: 'casual', name: 'Casual', count: 42 },
              { id: 'evening', name: 'Evening', count: 18 },
              { id: 'vacation', name: 'Vacation', count: 25 },
            ]
          }
        ]}
      />
    </div>
  );
};

export default WideLegPantsPage;
