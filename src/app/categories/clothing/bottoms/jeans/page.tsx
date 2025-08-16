'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';

const JeansPage = () => {
  return (
    <CategoryPageBase
      title="Jeans"
      description="Find your perfect fit in our comprehensive denim collection. From skinny to wide-leg, we have every style."
      backgroundImage="https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=1200&h=600"
      products={[]}
      categories={[]}
      filters={[
        {
          id: 'fit',
          name: 'Fit',
          options: [
            { id: 'skinny', name: 'Skinny', count: 42 },
            { id: 'straight', name: 'Straight', count: 35 },
            { id: 'wide-leg', name: 'Wide-Leg', count: 28 },
            { id: 'bootcut', name: 'Bootcut', count: 18 },
          ]
        },
        {
          id: 'wash',
          name: 'Wash',
          options: [
            { id: 'light', name: 'Light Wash', count: 24 },
            { id: 'medium', name: 'Medium Wash', count: 38 },
            { id: 'dark', name: 'Dark Wash', count: 45 },
            { id: 'black', name: 'Black', count: 22 },
          ]
        },
        {
          id: 'rise',
          name: 'Rise',
          options: [
            { id: 'low', name: 'Low Rise', count: 15 },
            { id: 'mid', name: 'Mid Rise', count: 48 },
            { id: 'high', name: 'High Rise', count: 62 },
          ]
        }
      ]}
    />
  );
};

export default JeansPage;
