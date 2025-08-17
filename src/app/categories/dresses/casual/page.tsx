import { CategoryPageBase } from '@/components/layout';

export default function CasualDressesPage() {
  return (
    <CategoryPageBase
      title="Casual Dresses"
      description="Effortless style for every day - comfortable dresses for any casual occasion"
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Dresses', href: '/categories/dresses' },
        { name: 'Casual', href: '/categories/dresses/casual' },
      ]}
      subcategories={[
        {
          name: 'Day Dresses',
          href: '/categories/dresses/casual/day',
          description: 'Comfortable and chic dresses for everyday wear'
        },
        {
          name: 'Sundresses',
          href: '/categories/dresses/casual/sundresses',
          description: 'Light and breezy dresses perfect for sunny days'
        }
      ]}
      featuredProducts={[]}
    />
  );
}
