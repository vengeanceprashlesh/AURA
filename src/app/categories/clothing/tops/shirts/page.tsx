'use client';

import { CategoryPageBase } from '@/components';

const ShirtsPage = () => {
  return (
    <CategoryPageBase
      title="Shirts"
      description="Classic and contemporary shirts for the modern wardrobe. Button-ups, casual styles, and statement pieces."
      categoryType="clothing"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=1200&h=300&fit=crop"
    />
  );
};

export default ShirtsPage;
