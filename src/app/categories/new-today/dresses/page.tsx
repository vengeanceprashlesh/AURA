import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function NewTodayDressesPage() {
  const newDresses = [
    {
      id: 1,
      name: 'Floral Summer Dress',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces',
      brand: 'Summer Breeze',
      isNew: true,
    },
    {
      id: 2,
      name: 'Elegant Midi Dress',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?w=400&h=600&fit=crop&crop=faces',
      brand: 'Classic Elegance',
      isNew: true,
    },
    {
      id: 3,
      name: 'Casual Day Dress',
      price: 69.99,
      originalPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=faces',
      brand: 'Everyday Chic',
      isNew: true,
    },
    {
      id: 4,
      name: 'Bohemian Maxi Dress',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
      brand: 'Boho Dreams',
      isNew: true,
    },
    {
      id: 5,
      name: 'Little Black Dress',
      price: 169.99,
      image: 'https://images.unsplash.com/photo-1591369867040-6bafcf5e2cb9?w=400&h=600&fit=crop&crop=faces',
      brand: 'Timeless Style',
      isNew: true,
    },
    {
      id: 6,
      name: 'Silk Slip Dress',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=faces',
      brand: 'Luxury Lane',
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Header */}
      <div className="bg-white border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
            <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories/new-today" className="hover:text-dusty-rose-500">New Today</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-charcoal-900 font-medium">New Dresses</span>
          </nav>

          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-4">
              New Dresses
            </h1>
            <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
              Discover the latest dress arrivals that define modern femininity and style
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-charcoal-700">{newDresses.length} items</span>
          </div>
          <div className="flex items-center gap-4">
            <select className="border border-charcoal-200 rounded-lg px-4 py-2 text-charcoal-700">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newDresses.map((dress) => (
            <Link key={dress.id} href={`/products/${dress.id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {dress.isNew && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-dusty-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        NEW
                      </span>
                    </div>
                  )}
                  {dress.originalPrice && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        SALE
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-charcoal-500 mb-1">{dress.brand}</div>
                  <h3 className="font-medium text-charcoal-900 mb-2 group-hover:text-dusty-rose-500 transition-colors">
                    {dress.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-charcoal-900">
                      ${dress.price}
                    </span>
                    {dress.originalPrice && (
                      <span className="text-sm text-charcoal-500 line-through">
                        ${dress.originalPrice}
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
          <button className="bg-dusty-rose-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-dusty-rose-600 transition-colors">
            Load More Dresses
          </button>
        </div>
      </div>
    </div>
  );
}

