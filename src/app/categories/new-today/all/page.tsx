import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/DynamicProductGrid';

export default function NewTodayAllPage() {

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
        {/* New Today Products - Shows all products ordered by newest */}
        <ProductGrid 
          title="All New Items"
          emptyMessage="No new items available. Add some products in the admin panel!"
          className=""
          maxItems={50}
        />
      </div>
    </div>
  );
}

