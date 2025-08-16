import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Tag, Percent } from 'lucide-react';

export default function SalePage() {
  const featuredItem = {
    id: 'flash-sale',
    name: 'Flash Sale',
    href: '/collections/flash-sale',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&h=400',
    description: 'Limited time offers',
  };

  const categories = [
    {
      name: 'Clearance',
      href: '/categories/sale/clearance',
      items: [
        { name: 'Up to 70% Off', badge: '70% OFF' },
        { name: 'Up to 50% Off', badge: '50% OFF' },
        { name: 'Final Sale', badge: 'FINAL' }
      ]
    },
    {
      name: 'Seasonal Sale',
      href: '/categories/sale/seasonal',
      items: [
        { name: 'End of Season', badge: null },
        { name: 'Winter Clearance', badge: null },
        { name: 'Holiday Deals', badge: null }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      <div className="relative h-96 bg-gradient-to-r from-red-100 to-orange-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Tag className="h-8 w-8 text-red-500" />
              <Percent className="h-6 w-6 text-red-500" />
            </div>
            <h1 className="font-heading text-5xl font-bold text-charcoal-900 mb-4">
              SALE
            </h1>
            <p className="text-xl text-charcoal-700 max-w-2xl mx-auto">
              Don't miss out on incredible savings across our entire collection
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Sale</span>
        </nav>

        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">Featured Sale</h2>
          <div className="max-w-2xl">
            <Link href={featuredItem.href} className="group block">
              <div className="relative overflow-hidden rounded-lg h-96 bg-gray-100">
                <Image
                  src={featuredItem.image}
                  alt={featuredItem.name}
                  fill
                  sizes="50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                    FLASH SALE
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-white text-xl font-semibold mb-2 leading-tight drop-shadow-lg">
                    {featuredItem.name}
                  </h3>
                  <p className="text-white text-sm opacity-90 leading-tight drop-shadow-md">
                    {featuredItem.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">Sale Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="bg-white rounded-lg shadow-sm border border-beige-200 p-8">
                <Link href={category.href} className="block mb-6">
                  <h3 className="font-heading text-2xl font-semibold text-charcoal-900 hover:text-dusty-rose-500 transition-colors">
                    {category.name}
                  </h3>
                </Link>
                <ul className="space-y-4">
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`${category.href}/${item.name.toLowerCase().replace(/\s+/g, '-').replace(/%/g, 'percent')}`}
                        className="flex items-center justify-between text-charcoal-700 hover:text-dusty-rose-500 transition-colors py-2 group"
                      >
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
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

        <section className="mt-16 text-center bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Tag className="h-8 w-8 text-red-500" />
            <h2 className="font-heading text-3xl font-bold text-charcoal-900">
              Limited Time Only
            </h2>
          </div>
          <p className="text-charcoal-700 mb-8 max-w-2xl mx-auto">
            Save big on designer pieces and wardrobe essentials. Sale items are going fast – shop now before they're gone!
          </p>
          <Link
            href="/categories/sale/all"
            className="inline-flex items-center px-8 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            Shop All Sale Items
            <Tag className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
