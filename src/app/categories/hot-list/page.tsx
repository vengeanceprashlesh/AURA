import Link from 'next/link';
import { ChevronRight, Flame, TrendingUp } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';

export default function HotListPage() {
  const categories = [
    {
      name: 'Bestsellers',
      href: '/categories/hot-list/bestsellers',
      description: 'Our most-loved pieces',
      items: [
        { name: 'Top Rated', badge: 'HOT' },
        { name: 'Most Loved', badge: null },
        { name: 'Trending Up', badge: '↗' }
      ]
    },
    {
      name: 'Celebrity Approved',
      href: '/categories/hot-list/celebrity',
      description: 'Spotted on your favorites',
      items: [
        { name: 'Red Carpet Looks', badge: null },
        { name: 'Street Style', badge: null },
        { name: 'Get The Look', badge: null }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      <div className="relative h-96 bg-gradient-to-r from-red-100 to-orange-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Flame className="h-8 w-8 text-red-500" />
              <TrendingUp className="h-6 w-6 text-red-500" />
            </div>
            <h1 className="font-heading text-5xl font-bold text-charcoal-900 mb-4">
              HOT LIST
            </h1>
            <p className="text-xl text-charcoal-700 max-w-2xl mx-auto">
              The most coveted pieces everyone's talking about
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Hot List</span>
        </nav>

        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Flame className="h-6 w-6 text-red-500" />
            <h2 className="font-heading text-3xl font-bold text-charcoal-900">Trending Now</h2>
          </div>
          
          {/* Featured/Popular Products */}
          <ProductGrid 
            featured={true}
            title=""
            emptyMessage="No trending items available. Mark some products as featured in the admin panel!"
            className=""
            maxItems={12}
          />
        </section>

        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">Hot Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="bg-white rounded-lg shadow-sm border border-beige-200 p-8">
                <Link href={category.href} className="block mb-4">
                  <h3 className="font-heading text-2xl font-semibold text-charcoal-900 hover:text-dusty-rose-500 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-charcoal-600">{category.description}</p>
                </Link>
                <ul className="space-y-4">
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`${category.href}/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between text-charcoal-700 hover:text-dusty-rose-500 transition-colors py-2 group"
                      >
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flame className="h-8 w-8 text-red-500" />
            <h2 className="font-heading text-3xl font-bold text-charcoal-900">
              Don't Miss Out
            </h2>
          </div>
          <p className="text-charcoal-700 mb-8 max-w-2xl mx-auto">
            These pieces are flying off the shelves. Shop the hottest trends before they sell out.
          </p>
          <Link
            href="/categories/hot-list/all"
            className="inline-flex items-center px-8 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            Shop All Hot Items
            <Flame className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
