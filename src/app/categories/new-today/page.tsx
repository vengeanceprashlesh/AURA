import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';

export default function NewTodayPage() {


  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-dusty-rose-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-5xl font-bold text-charcoal-900 mb-4">
              NEW TODAY
            </h1>
            <p className="text-xl text-charcoal-700 max-w-2xl mx-auto">
              Discover the latest arrivals and trending pieces that define modern style
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">New Today</span>
        </nav>

        {/* Dynamic Featured Products */}
        <section className="mb-16">
          <ProductGrid 
            featured={true}
            title="Featured Products"
            emptyMessage="No featured products yet. Mark some products as featured in the admin panel!"
            className=""
            maxItems={6}
          />
        </section>

        {/* New Today Products */}
        <section className="mb-16">
          <ProductGrid 
            category="new-today" 
            title="Latest Arrivals"
            emptyMessage="No new arrivals yet. Check back soon!"
            className=""
          />
        </section>


      </div>
    </div>
  );
}
