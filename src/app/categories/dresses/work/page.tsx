import { CategoryPageBase } from '@/components/layout';

export default function WorkDressesPage() {
  return (
    <CategoryPageBase
      title="Work Dresses"
      description="Professional dresses that blend style and sophistication for the modern workplace"
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Dresses', href: '/categories/dresses' },
        { name: 'Work', href: '/categories/dresses/work' },
      ]}
      subcategories={[
        {
          name: 'Midi Dresses',
          href: '/categories/dresses/work/midi',
          description: 'Perfect length midi dresses for professional settings'
        },
        {
          name: 'Blazer Dresses',
          href: '/categories/dresses/work/blazer',
          description: 'Sharp blazer dresses that command attention'
        }
      ]}
      featuredProducts={[]}
    />
  );
}
