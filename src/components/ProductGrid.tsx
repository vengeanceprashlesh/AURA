'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import ProductCard, { type ProductCardData } from './ProductCard';
import ProductModal from './ProductModal';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductGridProps {
  category?: string;
  title?: string;
  emptyMessage?: string;
  className?: string;
  maxItems?: number;
  featured?: boolean;
}

export default function ProductGrid({ 
  category, 
  title = "Products", 
  emptyMessage = "No products found.",
  className = "",
  maxItems,
  featured
}: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductCardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products from Convex
  const products = useQuery(api.products.getProducts, {
    category: category || undefined,
    featured: featured,
    limit: maxItems,
  });

  const handleQuickView = (product: ProductCardData) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (products === undefined) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="flex items-center space-x-2 text-gray-600">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span>Loading {title.toLowerCase()}...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-600 mb-4">{emptyMessage}</p>
        <Link href="/admin" className="text-rose-600 hover:text-rose-800 underline">
          Add some products in the admin panel
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        {title && (
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {products.length} items
            </span>
          </motion.div>
        )}
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onQuickView={handleQuickView}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={{
            id: selectedProduct._id,
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: selectedProduct.price,
            originalPrice: selectedProduct.originalPrice,
            images: selectedProduct.images,
            category: selectedProduct.category,
            subcategory: selectedProduct.subcategory,
            tags: selectedProduct.tags,
            inStock: selectedProduct.inStock,
            stockQuantity: selectedProduct.stockQuantity,
            rating: selectedProduct.rating,
            reviewCount: selectedProduct.reviewCount,
            featured: selectedProduct.featured,
            createdAt: new Date(selectedProduct.createdAt),
            updatedAt: new Date(selectedProduct.updatedAt),
          }}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
