'use client';

import { CategoryPageBase } from '@/components';

const SummerEssentialsPage = () => {
  return (
    <CategoryPageBase
      title="Summer Essentials"
      description="Essential pieces for the perfect summer wardrobe. Light, breezy, and effortlessly chic."
      categoryType="new-today"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=300&fit=crop"
      isNew={true}
    />
  );
};

export default SummerEssentialsPage;
