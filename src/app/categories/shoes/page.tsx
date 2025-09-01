'use client';

import ProductGrid from '@/components/ProductGrid';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function ShoesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shoes</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Step into style with our curated collection of premium footwear. 
              From casual sneakers to elegant heels, find your perfect pair.
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid 
          category="shoes"
          title="All Shoes"
          emptyMessage="No shoes found. Add some shoes to get started!"
          className=""
        />
      </div>
    </div>
  );
}
