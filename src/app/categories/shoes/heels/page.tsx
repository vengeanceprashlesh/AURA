'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const HeelsPage = () => {
  const categories = [
    { id: 'pumps', name: 'Pumps', href: '/categories/shoes/heels/pumps', count: 32 },
    { id: 'stilettos', name: 'Stilettos', href: '/categories/shoes/heels/stilettos', count: 18 },
    { id: 'block-heels', name: 'Block Heels', href: '/categories/shoes/heels/block', count: 28 },
    { id: 'wedges', name: 'Wedges', href: '/categories/shoes/heels/wedges', count: 22 },
  ];

  return (
    <CategoryPageBase
      title="Heels"
      description="Step up your style with our stunning collection of heels. From classic pumps to trendy block heels."
      backgroundImage="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={categories}
      filters={[
        {
          id: 'heel-height',
          name: 'Heel Height',
          options: [
            { id: 'low', name: 'Low (1-2")', count: 35 },
            { id: 'medium', name: 'Medium (2-3")', count: 42 },
            { id: 'high', name: 'High (3-4")', count: 28 },
            { id: 'ultra-high', name: 'Ultra High (4"+)', count: 15 },
          ]
        },
        {
          id: 'occasion',
          name: 'Occasion',
          options: [
            { id: 'work', name: 'Work', count: 38 },
            { id: 'party', name: 'Party', count: 32 },
            { id: 'formal', name: 'Formal', count: 22 },
            { id: 'casual', name: 'Casual', count: 28 },
          ]
        }
      ]}
    />
  );
};

export default HeelsPage;
