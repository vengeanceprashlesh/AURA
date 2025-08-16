'use client';

import { CategoryPageBase } from '@/components';

const PreOrderPage = () => {
  return (
    <CategoryPageBase
      title="Pre-Order Now"
      description="Be the first to get your hands on our upcoming collections. Pre-order the hottest pieces before they drop."
      categoryType="new-today"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=300&fit=crop"
      isNew={true}
    />
  );
};

export default PreOrderPage;
