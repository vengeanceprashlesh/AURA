'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const TankTopsPage = () => {
  return (
    <CategoryPageBase
      title="Tank Tops"
      description="Sleeveless comfort for warmer days. Essential summer staples."
      backgroundImage="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[]}
      filters={[
        {
          id: 'neckline',
          name: 'Neckline',
          options: [
            { id: 'scoop', name: 'Scoop Neck', count: 24 },
            { id: 'v-neck', name: 'V-Neck', count: 18 },
            { id: 'high-neck', name: 'High Neck', count: 12 },
          ]
        },
        {
          id: 'fabric',
          name: 'Fabric',
          options: [
            { id: 'cotton', name: 'Cotton', count: 32 },
            { id: 'modal', name: 'Modal', count: 15 },
            { id: 'bamboo', name: 'Bamboo', count: 8 },
          ]
        }
      ]}
    />
  );
};

export default TankTopsPage;
