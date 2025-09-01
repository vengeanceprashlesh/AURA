'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const NewClothingPage = () => {
  return (
    <CategoryPageBase
      title="All New Clothing"
      description="Complete collection of new clothing arrivals. Discover the latest trends across all categories."
      backgroundImage="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[
        { id: 'tops', name: 'New Tops', href: '/categories/new-today/tops', count: 45 },
        { id: 'bottoms', name: 'New Bottoms', href: '/categories/clothing/bottoms', count: 38 },
        { id: 'dresses', name: 'New Dresses', href: '/categories/new-today/dresses', count: 28 },
        { id: 'outerwear', name: 'New Outerwear', href: '/categories/clothing/outerwear', count: 22 },
        { id: 'sets', name: 'New Sets', href: '/categories/new-today/sets', count: 18 },
      ]}
      filters={[
        {
          id: 'category',
          name: 'Category',
          options: [
            { id: 'tops', name: 'Tops', count: 45 },
            { id: 'bottoms', name: 'Bottoms', count: 38 },
            { id: 'dresses', name: 'Dresses', count: 28 },
            { id: 'outerwear', name: 'Outerwear', count: 22 },
            { id: 'sets', name: 'Sets', count: 18 },
          ]
        },
        {
          id: 'occasion',
          name: 'Occasion',
          options: [
            { id: 'casual', name: 'Casual', count: 68 },
            { id: 'work', name: 'Work', count: 32 },
            { id: 'party', name: 'Party', count: 28 },
            { id: 'vacation', name: 'Vacation', count: 22 },
          ]
        }
      ]}
    />
  );
};

export default NewClothingPage;

