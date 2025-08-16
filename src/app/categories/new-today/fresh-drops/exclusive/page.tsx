'use client';

import { CategoryPageBase } from '@/components';

const ExclusiveReleasesPage = () => {
  return (
    <CategoryPageBase
      title="Exclusive Releases"
      description="Limited-time exclusive pieces you won't find anywhere else. Get them before they're gone."
      categoryType="new-today"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop"
      isNew={true}
    />
  );
};

export default ExclusiveReleasesPage;
