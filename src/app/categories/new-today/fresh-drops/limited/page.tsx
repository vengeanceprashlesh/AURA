'use client';

import { CategoryPageBase } from '@/components';

const LimitedEditionPage = () => {
  return (
    <CategoryPageBase
      title="Limited Edition"
      description="One-of-a-kind pieces in limited quantities. When they're gone, they're gone forever."
      categoryType="new-today"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=300&fit=crop"
      isNew={true}
    />
  );
};

export default LimitedEditionPage;
