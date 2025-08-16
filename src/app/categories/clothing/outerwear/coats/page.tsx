'use client';

import { CategoryPageBase } from '@/components';

const CoatsPage = () => {
  return (
    <CategoryPageBase
      title="Coats"
      description="Elegant and warm coats for every season. From wool winter coats to lightweight spring jackets."
      categoryType="clothing"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=300&fit=crop"
    />
  );
};

export default CoatsPage;
