'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const NewArrivalsPage = () => {
  return (
    <CategoryPageBase
      title="All New Arrivals"
      description="Complete collection of our newest pieces. Discover the latest in fashion-forward designs."
      backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[
        { id: 'clothing', name: 'New Clothing', href: '/categories/new-today/clothing', count: 89 },
        { id: 'dresses', name: 'New Dresses', href: '/categories/new-today/dresses', count: 34 },
        { id: 'accessories', name: 'New Accessories', href: '/categories/new-today/accessories', count: 23 },
        { id: 'shoes', name: 'New Shoes', href: '/categories/new-today/shoes', count: 18 },
      ]}
      filters={[
        {
          id: 'category',
          name: 'Category',
          options: [
            { id: 'clothing', name: 'Clothing', count: 89 },
            { id: 'dresses', name: 'Dresses', count: 34 },
            { id: 'accessories', name: 'Accessories', count: 23 },
            { id: 'shoes', name: 'Shoes', count: 18 },
          ]
        }
      ]}
    />
  );
};

export default NewArrivalsPage;

