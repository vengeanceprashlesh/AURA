import { CategoryPageBase } from '@/components/layout';

export default function CasualShoesPage() {
  return (
    <CategoryPageBase
      title="Casual Shoes"
      description="Comfortable and stylish shoes for everyday wear"
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Shoes', href: '/categories/shoes' },
        { name: 'Casual', href: '/categories/shoes/casual' },
      ]}
      subcategories={[
        {
          name: 'Flats',
          href: '/categories/shoes/casual/flats',
          description: 'Comfortable flat shoes for all-day wear'
        },
        {
          name: 'Sneakers',
          href: '/categories/shoes/casual/sneakers',
          description: 'Stylish sneakers for active lifestyles'
        },
        {
          name: 'Loafers',
          href: '/categories/shoes/casual/loafers',
          description: 'Classic loafers for effortless style'
        }
      ]}
      featuredProducts={[]}
    />
  );
}
