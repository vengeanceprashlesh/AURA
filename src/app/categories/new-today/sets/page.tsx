'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const NewTodaySetsPage = () => {
  const categories = [
    { id: 'matching-sets', name: 'Matching Sets', href: '/categories/new-today/sets/matching', count: 12 },
    { id: 'co-ord-sets', name: 'Co-ord Sets', href: '/categories/new-today/sets/coord', count: 8 },
    { id: 'two-piece', name: 'Two Piece', href: '/categories/new-today/sets/two-piece', count: 15 },
    { id: 'lounge-sets', name: 'Lounge Sets', href: '/categories/new-today/sets/lounge', count: 6 },
  ];

  const products = [
    {
      id: '1',
      name: 'Linen Co-ord Set - New',
      price: 189.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=500',
      brand: 'New Arrival',
      sale: true,
      isNew: true,
      badge: 'NEW TODAY'
    },
    {
      id: '2',
      name: 'Silk Matching Set',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=500',
      brand: 'Fresh Drop',
      sale: false,
      isNew: true,
      badge: 'JUST IN'
    },
  ];

  return (
    <CategoryPageBase
      title="New Sets Today"
      description="Fresh matching sets and co-ords that just arrived. Perfect for effortless styling."
      backgroundImage="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&h=600"
      products={products}
      categories={categories}
      filters={[
        {
          id: 'style',
          name: 'Style',
          options: [
            { id: 'casual', name: 'Casual', count: 18 },
            { id: 'formal', name: 'Formal', count: 8 },
            { id: 'lounge', name: 'Lounge', count: 12 },
            { id: 'active', name: 'Active', count: 6 },
          ]
        },
        {
          id: 'pieces',
          name: 'Number of Pieces',
          options: [
            { id: 'two-piece', name: '2 Pieces', count: 28 },
            { id: 'three-piece', name: '3 Pieces', count: 12 },
            { id: 'four-piece', name: '4+ Pieces', count: 4 },
          ]
        }
      ]}
    />
  );
};

export default NewTodaySetsPage;

