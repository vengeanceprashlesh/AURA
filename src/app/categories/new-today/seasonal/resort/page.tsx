'use client';

import { CategoryPageBase } from '@/components';

const ResortWearPage = () => {
  return (
    <CategoryPageBase
      title="Resort Wear"
      description="Luxury resort pieces for your next getaway. Elegant, comfortable, and effortlessly sophisticated."
      categoryType="new-today"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop"
      isNew={true}
    />
  );
};

export default ResortWearPage;
