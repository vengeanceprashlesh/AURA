'use client';

import { CategoryPageBase } from '@/components';

const VacationReadyPage = () => {
  return (
    <CategoryPageBase
      title="Vacation Ready"
      description="Pack-and-go pieces perfect for any destination. From beach days to city breaks, we've got you covered."
      categoryType="new-today"
      products={[]}
      categories={[]}
      filters={[]}
      bannerImage="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=300&fit=crop"
      isNew={true}
    />
  );
};

export default VacationReadyPage;
