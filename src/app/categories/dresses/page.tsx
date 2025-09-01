import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/DynamicProductGrid';

export default function DressesPage() {

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-dusty-rose-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-2">
              DRESSES
            </h1>
            <p className="text-lg text-charcoal-700">
              Find the perfect dress for every occasion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Dresses</span>
        </nav>

        {/* Dresses Products */}
        <ProductGrid 
          category="dresses" 
          title="Dresses"
          emptyMessage="No dresses available. Add some dresses in the admin panel!"
          className=""
        />
      </div>
    </div>
  );
}

