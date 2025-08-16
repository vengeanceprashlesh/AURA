'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const NewSwimPage = () => {
  return (
    <CategoryPageBase
      title="New Swim & Cover-Ups"
      description="Latest swimwear and cover-ups for your beach vacation. Make a splash in style."
      backgroundImage="https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[
        { id: 'bikinis', name: 'New Bikinis', href: '/categories/swim/bikinis', count: 28 },
        { id: 'one-piece', name: 'One-Piece Suits', href: '/categories/swim/one-piece', count: 18 },
        { id: 'cover-ups', name: 'Cover-Ups', href: '/categories/swim/cover-ups', count: 22 },
        { id: 'kimonos', name: 'Beach Kimonos', href: '/categories/clothing/outerwear/kimonos', count: 15 },
      ]}
      filters={[
        {
          id: 'style',
          name: 'Style',
          options: [
            { id: 'bikini', name: 'Bikini', count: 28 },
            { id: 'one-piece', name: 'One-Piece', count: 18 },
            { id: 'tankini', name: 'Tankini', count: 12 },
          ]
        },
        {
          id: 'coverage',
          name: 'Coverage',
          options: [
            { id: 'minimal', name: 'Minimal', count: 18 },
            { id: 'moderate', name: 'Moderate', count: 25 },
            { id: 'full', name: 'Full Coverage', count: 22 },
          ]
        }
      ]}
    />
  );
};

export default NewSwimPage;
