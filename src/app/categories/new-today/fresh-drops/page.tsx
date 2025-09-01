'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';
import { motion } from 'framer-motion';

const FreshDropsPage = () => {
  const categories = [
    { id: 'daily-drops', name: 'Daily Drops', href: '/categories/new-today/fresh-drops/daily', count: 12 },
    { id: 'exclusive-releases', name: 'Exclusive Releases', href: '/categories/new-today/fresh-drops/exclusive', count: 8 },
    { id: 'limited-edition', name: 'Limited Edition', href: '/categories/new-today/fresh-drops/limited', count: 5 },
    { id: 'pre-order', name: 'Pre-Order Now', href: '/categories/new-today/fresh-drops/pre-order', count: 3 },
  ];

  const products = [
    {
      id: '1',
      name: 'Exclusive Designer Dress',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'Studio Exclusive',
      sale: true,
      isNew: true,
      badge: 'EXCLUSIVE'
    },
    {
      id: '2',
      name: 'Limited Edition Set',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=500',
      brand: 'Limited Co.',
      sale: false,
      isNew: true,
      badge: 'LIMITED'
    },
    {
      id: '3',
      name: 'Pre-Order Blazer',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500',
      brand: 'Future Fashion',
      sale: false,
      isNew: true,
      badge: 'PRE-ORDER'
    },
    {
      id: '4',
      name: 'Daily Drop Top',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=500',
      brand: 'Daily Drops',
      sale: true,
      isNew: true,
      badge: 'TODAY ONLY'
    },
  ];

  return (
    <div>
      {/* Special Header for Fresh Drops */}
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-2 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-medium"
        >
          âœ¨ Fresh Drops Updated Daily at 12 PM EST âœ¨
        </motion.div>
      </div>

      <CategoryPageBase
        title="Fresh Drops"
        description="The latest and most exclusive pieces, updated daily. Get them before they're gone!"
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=600"
        products={products}
        categories={categories}
        filters={[
          {
            id: 'availability',
            name: 'Availability',
            options: [
              { id: 'today-only', name: 'Today Only', count: 12 },
              { id: 'limited', name: 'Limited Quantity', count: 8 },
              { id: 'exclusive', name: 'Exclusive', count: 15 },
              { id: 'pre-order', name: 'Pre-Order', count: 5 },
            ]
          },
          {
            id: 'drop-time',
            name: 'Drop Time',
            options: [
              { id: 'today', name: 'Today', count: 12 },
              { id: 'yesterday', name: 'Yesterday', count: 18 },
              { id: 'this-week', name: 'This Week', count: 45 },
              { id: 'last-week', name: 'Last Week', count: 32 },
            ]
          },
          {
            id: 'price',
            name: 'Price',
            options: [
              { id: 'under100', name: 'Under $100', count: 25 },
              { id: '100to200', name: '$100 - $200', count: 18 },
              { id: '200to500', name: '$200 - $500', count: 12 },
              { id: 'over500', name: 'Over $500', count: 8 },
            ]
          }
        ]}
      />
    </div>
  );
};

export default FreshDropsPage;

