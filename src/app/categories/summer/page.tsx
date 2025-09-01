import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from '@/components/DynamicProductGrid';

export default function SummerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Summer Collection
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Summer's most wanted vacation essentials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-64 sm:h-80 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Summer's Most Wanted
            </h2>
            <p className="text-lg sm:text-xl mb-6 max-w-2xl">
              Embrace the Mediterranean vibes with our Amalfi-inspired summer collection
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">Vacation Ready</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Beach Essentials</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Summer Vibes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Summer Products */}
        <ProductGrid 
          category="summer" 
          title="Summer Collection"
          emptyMessage="No summer items available. Add some summer products in the admin panel!"
          className=""
        />
      </div>
    </div>
  );
}

