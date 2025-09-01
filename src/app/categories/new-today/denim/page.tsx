'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const NewDenimPage = () => {
  return (
    <CategoryPageBase
      title="New Denim"
      description="Fresh denim arrivals in the latest washes and cuts. Find your perfect fit."
      backgroundImage="https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[
        { id: 'jeans', name: 'New Jeans', href: '/categories/clothing/bottoms/jeans', count: 42 },
        { id: 'denim-jackets', name: 'Denim Jackets', href: '/categories/clothing/outerwear/denim', count: 18 },
        { id: 'denim-skirts', name: 'Denim Skirts', href: '/categories/clothing/bottoms/skirts', count: 12 },
      ]}
      filters={[
        {
          id: 'wash',
          name: 'Wash',
          options: [
            { id: 'light', name: 'Light Wash', count: 22 },
            { id: 'medium', name: 'Medium Wash', count: 28 },
            { id: 'dark', name: 'Dark Wash', count: 35 },
            { id: 'black', name: 'Black', count: 18 },
          ]
        },
        {
          id: 'fit',
          name: 'Fit',
          options: [
            { id: 'skinny', name: 'Skinny', count: 35 },
            { id: 'straight', name: 'Straight', count: 25 },
            { id: 'wide-leg', name: 'Wide Leg', count: 18 },
            { id: 'bootcut', name: 'Bootcut', count: 15 },
          ]
        }
      ]}
    />
  );
};

export default NewDenimPage;

