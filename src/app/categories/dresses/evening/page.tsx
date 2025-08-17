import { CategoryPageBase } from '@/components/layout';

export default function EveningDressesPage() {
  return (
    <CategoryPageBase
      title="Evening Dresses"
      description="Elegant dresses for special occasions - from intimate cocktail parties to grand galas"
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Dresses', href: '/categories/dresses' },
        { name: 'Evening', href: '/categories/dresses/evening' },
      ]}
      subcategories={[
        {
          name: 'Cocktail Dresses',
          href: '/categories/dresses/evening/cocktail',
          description: 'Sophisticated cocktail dresses for elegant evenings'
        },
        {
          name: 'Evening Gowns',
          href: '/categories/dresses/evening/gowns',
          description: 'Glamorous gowns for formal events and special occasions'
        }
      ]}
      featuredProducts={[]}
    />
  );
}
