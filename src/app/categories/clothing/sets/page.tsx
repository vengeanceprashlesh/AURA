import Link from 'next/link';
import { ChevronRight, Sparkles, Heart, Star } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';

const SetsPage = () => {

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-dusty-rose-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-2">
              Sets & Co-ords
            </h1>
            <p className="text-lg text-charcoal-700">
              Effortlessly chic matching pieces for every occasion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories/clothing" className="hover:text-dusty-rose-500">Clothing</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Sets</span>
        </nav>

        {/* Special Features Section */}
        <div className="bg-gradient-to-r from-dusty-rose-100 to-beige-100 py-8 rounded-lg mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Sparkles className="h-8 w-8 text-dusty-rose-500 mb-3" />
                <h3 className="font-heading font-bold text-lg mb-2">Perfect Match</h3>
                <p className="text-charcoal-600">Every set is perfectly coordinated for effortless style</p>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="h-8 w-8 text-dusty-rose-500 mb-3" />
                <h3 className="font-heading font-bold text-lg mb-2">Mix & Match</h3>
                <p className="text-charcoal-600">Pieces can be worn together or separately</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="h-8 w-8 text-dusty-rose-500 mb-3" />
                <h3 className="font-heading font-bold text-lg mb-2">Premium Quality</h3>
                <p className="text-charcoal-600">Luxurious fabrics and impeccable construction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sets Products */}
        <ProductGrid 
          category="sets" 
          title="Sets & Co-ords"
          emptyMessage="No sets available. Add some sets in the admin panel!"
          className=""
        />
      </div>
    </div>
  );
};

export default SetsPage;
