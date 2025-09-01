'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const NewTopsPage = () => {
  return (
    <CategoryPageBase
      title="New Tops"
      description="Fresh tops and blouses that just landed. From casual tees to elegant blouses."
      backgroundImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[
        { id: 'blouses', name: 'New Blouses', href: '/categories/clothing/tops/blouses', count: 18 },
        { id: 'shirts', name: 'New Shirts', href: '/categories/clothing/tops/shirts', count: 24 },
        { id: 'crop-tops', name: 'New Crop Tops', href: '/categories/clothing/tops/crop-tops', count: 15 },
        { id: 'sweaters', name: 'New Sweaters', href: '/categories/clothing/tops/sweaters', count: 12 },
      ]}
      filters={[
        {
          id: 'style',
          name: 'Style',
          options: [
            { id: 'casual', name: 'Casual', count: 35 },
            { id: 'formal', name: 'Formal', count: 18 },
            { id: 'party', name: 'Party', count: 12 },
          ]
        }
      ]}
    />
  );
};

export default NewTopsPage;

