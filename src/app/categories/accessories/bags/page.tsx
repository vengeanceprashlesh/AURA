'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const BagsPage = () => {
  const categories = [
    { id: 'handbags', name: 'Handbags', href: '/categories/accessories/bags/handbags', count: 48 },
    { id: 'shoulder-bags', name: 'Shoulder Bags', href: '/categories/accessories/bags/shoulder', count: 32 },
    { id: 'crossbody', name: 'Crossbody Bags', href: '/categories/accessories/bags/crossbody', count: 38 },
    { id: 'totes', name: 'Tote Bags', href: '/categories/accessories/bags/totes', count: 28 },
    { id: 'clutches', name: 'Clutches', href: '/categories/accessories/bags/clutches', count: 22 },
    { id: 'backpacks', name: 'Backpacks', href: '/categories/accessories/bags/backpacks', count: 18 },
  ];

  return (
    <CategoryPageBase
      title="Bags"
      description="Complete your look with our stunning collection of bags. From everyday totes to evening clutches."
      backgroundImage="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={categories}
      filters={[
        {
          id: 'size',
          name: 'Size',
          options: [
            { id: 'mini', name: 'Mini', count: 22 },
            { id: 'small', name: 'Small', count: 38 },
            { id: 'medium', name: 'Medium', count: 54 },
            { id: 'large', name: 'Large', count: 32 },
          ]
        },
        {
          id: 'material',
          name: 'Material',
          options: [
            { id: 'leather', name: 'Leather', count: 68 },
            { id: 'canvas', name: 'Canvas', count: 32 },
            { id: 'synthetic', name: 'Synthetic', count: 28 },
            { id: 'fabric', name: 'Fabric', count: 18 },
          ]
        }
      ]}
    />
  );
};

export default BagsPage;
