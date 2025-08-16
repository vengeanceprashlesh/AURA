import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function NewTodayAllPage() {
  const newItems = [
    {
      id: 1,
      name: 'Silk Blouse',
      price: 129.99,
      category: 'Tops',
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop&crop=faces',
      brand: 'Elegant Co',
      isNew: true,
    },
    {
      id: 2,
      name: 'High-Waist Jeans',
      price: 89.99,
      category: 'Bottoms',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=600&fit=crop&crop=faces',
      brand: 'Denim Dreams',
      isNew: true,
    },
    {
      id: 3,
      name: 'Summer Dress',
      price: 149.99,
      category: 'Dresses',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces',
      brand: 'Summer Breeze',
      isNew: true,
    },
    {
      id: 4,
      name: 'Leather Sneakers',
      price: 179.99,
      category: 'Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=faces',
      brand: 'Urban Step',
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
            <span className="text-charcoal-900 font-medium">All New Items</span>
          </nav>

          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-4">
              All New Items
            </h1>
            <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
              Explore all the latest arrivals across every category
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newItems.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-dusty-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-charcoal-500 mb-1">{item.brand} • {item.category}</div>
                  <h3 className="font-medium text-charcoal-900 mb-2 group-hover:text-dusty-rose-500 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-charcoal-900">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
