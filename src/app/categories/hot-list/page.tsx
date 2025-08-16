import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Flame, TrendingUp } from 'lucide-react';

export default function HotListPage() {
  const hotProducts = [
    {
      id: 1,
      name: 'Viral Satin Slip Dress',
      brand: 'Reformation',
      price: '$158',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
      badge: 'VIRAL',
      isHot: true,
      href: '/products/1'
    },
    {
      id: 2,
      name: 'It-Girl Blazer',
      brand: 'Ganni',
      price: '$345',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600',
      badge: 'TRENDING',
      isHot: true,
      href: '/products/2'
    },
    {
      id: 3,
      name: 'Celebrity Favorite Jeans',
      brand: 'AGOLDE',
      price: '$198',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=600',
      badge: 'CELEB LOVE',
      isHot: true,
      href: '/products/3'
    },
    {
      id: 4,
      name: 'Must-Have Mini Bag',
      brand: 'Jacquemus',
      price: '$525',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=600',
      badge: 'BESTSELLER',
      isHot: true,
      href: '/products/4'
    }
  ];

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotProducts.map((product) => (
              <Link key={product.id} href={product.href} className="group">
                <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] bg-beige-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {product.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Flame className="h-5 w-5 text-red-500 fill-current" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-charcoal-600 mb-1 font-medium uppercase tracking-wide">
                      {product.brand}
                    </div>
                    <h3 className="font-medium text-charcoal-900 mb-2 line-clamp-2 group-hover:text-dusty-rose-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-charcoal-900">
                        {product.price}
                      </span>
                      <span className="text-xs text-red-600 font-bold">
                        HOT
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
