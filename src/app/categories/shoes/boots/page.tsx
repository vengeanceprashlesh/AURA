import { CategoryPageBase } from '@/components/layout';

export default function BootsPage() {
  return (
    <CategoryPageBase
      title="Boots"
      description="Statement boots for every season and occasion - from casual ankle boots to elegant tall boots"
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Shoes', href: '/categories/shoes' },
        { name: 'Boots', href: '/categories/shoes/boots' },
      ]}
      subcategories={[
        {
          name: 'Ankle Boots',
          href: '/categories/shoes/boots/ankle',
          description: 'Versatile ankle boots perfect for everyday wear'
        },
        {
          name: 'Tall Boots',
          href: '/categories/shoes/boots/tall',
          description: 'Knee-high and over-the-knee boots for bold style'
        }
      ]}
      featuredProducts={[]}
    />
  );
}

