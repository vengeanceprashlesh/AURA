'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const TShirtsPage = () => {
  return (
    <CategoryPageBase
      title="T-Shirts"
      description="Comfortable and stylish t-shirts. Perfect for casual everyday wear."
      backgroundImage="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[]}
      filters={[
        {
          id: 'fit',
          name: 'Fit',
          options: [
            { id: 'regular', name: 'Regular Fit', count: 32 },
            { id: 'slim', name: 'Slim Fit', count: 28 },
            { id: 'oversized', name: 'Oversized', count: 18 },
          ]
        },
        {
          id: 'style',
          name: 'Style',
          options: [
            { id: 'basic', name: 'Basic', count: 45 },
            { id: 'graphic', name: 'Graphic', count: 24 },
            { id: 'striped', name: 'Striped', count: 15 },
          ]
        }
      ]}
    />
  );
};

export default TShirtsPage;
