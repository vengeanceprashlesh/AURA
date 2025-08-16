import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Filter } from 'lucide-react';

export default function JustInPage() {
  const products = [
    {
      id: 1,
      name: 'Silk Floral Midi Dress',
      brand: 'Zimmermann',
      price: '$495',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
      isNew: true,
      href: '/products/1'
    },
    {
      id: 2,
      name: 'Cropped Blazer in Ivory',
      brand: 'Ganni',
      price: '$285',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600',
      isNew: true,
      href: '/products/2'
    },
    {
      id: 3,
      name: 'Wide Leg Trousers',
      brand: 'The Frankie Shop',
      price: '$225',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=600',
      isNew: true,
      href: '/products/3'
    },
    {
      id: 4,
      name: 'Cashmere Sweater',
      brand: 'Everlane',
      price: '$168',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=600',
      isNew: true,
      href: '/products/4'
    },
    {
      id: 5,
      name: 'Linen Button-Down Shirt',
      brand: 'Arket',
      price: '$89',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=600',
      isNew: true,
      href: '/products/5'
    },
    {
      id: 6,
      name: 'High-Waisted Jeans',
      brand: 'AGOLDE',
      price: '$188',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&h=600',
      isNew: true,
      href: '/products/6'
    }
  ];

  const categories = [
    { name: 'All New Items', count: 156, href: '/categories/new-today/just-in/all' },
    { name: 'Dresses', count: 42, href: '/categories/new-today/just-in/dresses' },
    { name: 'Tops', count: 38, href: '/categories/new-today/just-in/tops' },
    { name: 'Bottoms', count: 28, href: '/categories/new-today/just-in/bottoms' },
    { name: 'Outerwear', count: 15, href: '/categories/new-today/just-in/outerwear' },
    { name: 'Accessories', count: 33, href: '/categories/new-today/just-in/accessories' },
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-dusty-rose-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-2">
              Just In
            </h1>
            <p className="text-lg text-charcoal-700">
              The newest arrivals, fresh from our favorite designers
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories/new-today" className="hover:text-dusty-rose-500">New Today</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Just In</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">
                Categories
              </h2>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      className="flex items-center justify-between text-charcoal-700 hover:text-dusty-rose-500 transition-colors py-1 group"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs text-charcoal-500 bg-beige-100 px-2 py-1 rounded-full group-hover:bg-dusty-rose-100">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with Filter */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-charcoal-900">
                  Latest Arrivals
                </h2>
                <p className="text-charcoal-600 mt-1">
                  {products.length} new items added today
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-beige-200 rounded-lg hover:bg-beige-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter & Sort</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={product.href} className="group">
                  <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] bg-beige-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-dusty-rose-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                            NEW
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-charcoal-600 mb-1 font-medium uppercase tracking-wide">
                        {product.brand}
                      </div>
                      <h3 className="font-medium text-charcoal-900 mb-2 line-clamp-2 group-hover:text-dusty-rose-500 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-charcoal-900">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-charcoal-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="inline-flex items-center px-8 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors">
                Load More Items
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
