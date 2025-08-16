import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ShoesPage() {
  const featuredItem = {
    id: 'designer-heels',
    name: 'Designer Heels',
    href: '/collections/designer-heels',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&h=400',
    description: 'Step up your style',
  };

  const categories = [
    {
      name: 'Heels',
      href: '/categories/shoes/heels',
      items: ['Pumps', 'Stilettos', 'Block Heels', 'Wedges']
    },
    {
      name: 'Flats',
      href: '/categories/shoes/flats',
      items: ['Ballet Flats', 'Loafers', 'Moccasins', 'Oxfords']
    },
    {
      name: 'Boots',
      href: '/categories/shoes/boots',
      items: ['Ankle Boots', 'Knee High', 'Over The Knee', 'Combat Boots']
    },
    {
      name: 'Sneakers',
      href: '/categories/shoes/sneakers',
      items: ['White Sneakers', 'Platform', 'Slip-On']
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      <div className="relative h-96 bg-gradient-to-r from-charcoal-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-5xl font-bold text-charcoal-900 mb-4">
              SHOES
            </h1>
            <p className="text-xl text-charcoal-700 max-w-2xl mx-auto">
              Every step tells a story. Find yours in our curated collection of footwear
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Shoes</span>
        </nav>

        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">Featured Collection</h2>
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
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">Shop by Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="bg-white rounded-lg shadow-sm border border-beige-200 p-6">
                <Link href={category.href} className="block mb-4">
                  <h3 className="font-heading text-xl font-semibold text-charcoal-900 hover:text-dusty-rose-500 transition-colors">
                    {category.name}
                  </h3>
                </Link>
                <ul className="space-y-3">
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`${category.href}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-charcoal-700 hover:text-dusty-rose-500 transition-colors text-sm flex items-center justify-between group"
                      >
                        <span>{item}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 text-center bg-dusty-rose-50 rounded-lg p-12">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-4">
            Find Your Perfect Fit
          </h2>
          <p className="text-charcoal-700 mb-8 max-w-2xl mx-auto">
            From everyday comfort to statement-making styles, discover shoes that complement your unique sense of style.
          </p>
          <Link
            href="/categories/shoes/all"
            className="inline-flex items-center px-8 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors"
          >
            Shop All Shoes
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
