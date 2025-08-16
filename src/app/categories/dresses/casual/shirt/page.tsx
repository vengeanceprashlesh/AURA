import React from 'react';

export default function ShirtDressesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-700 hover:text-pink-600">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <a href="/categories" className="text-gray-700 hover:text-pink-600">
                  Categories
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <a href="/categories/dresses" className="text-gray-700 hover:text-pink-600">
                  Dresses
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <a href="/categories/dresses/casual" className="text-gray-700 hover:text-pink-600">
                  Casual
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-pink-600 font-medium">Shirt Dresses</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shirt Dresses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Effortlessly chic shirt dresses that combine comfort and style. Perfect for work, casual outings, or dressing up for special occasions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Sellers</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">View:</label>
            <div className="flex space-x-1">
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 bg-gray-100">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {/* Sample Product 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="absolute top-2 right-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Classic Cotton Shirt Dress</h3>
              <p className="text-sm text-gray-600 mb-2">Timeless button-down style in crisp cotton</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-pink-600">$89.99</span>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Sample Product 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                SALE
              </div>
              <div className="absolute top-2 right-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Striped Linen Shirt Dress</h3>
              <p className="text-sm text-gray-600 mb-2">Breezy linen in classic navy stripes</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-pink-600">$69.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$99.99</span>
                </div>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Sample Product 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
                NEW
              </div>
              <div className="absolute top-2 right-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Denim Shirt Dress</h3>
              <p className="text-sm text-gray-600 mb-2">Casual denim with belt tie waist</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-pink-600">$79.99</span>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Sample Product 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="absolute top-2 right-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Oversized Boyfriend Shirt Dress</h3>
              <p className="text-sm text-gray-600 mb-2">Relaxed fit in soft jersey fabric</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-pink-600">$65.99</span>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="px-8 py-3 bg-white border-2 border-pink-600 text-pink-600 font-medium rounded-md hover:bg-pink-600 hover:text-white transition-colors duration-300">
            Load More Products
          </button>
        </div>

        {/* Category Description */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Shirt Dresses</h2>
          <div className="prose prose-pink max-w-none">
            <p className="text-gray-600 mb-4">
              Shirt dresses are the ultimate versatile piece in any woman's wardrobe. These effortlessly chic garments 
              combine the comfort of a shirt with the elegance of a dress, making them perfect for any occasion.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you're heading to the office, meeting friends for brunch, or attending a casual event, 
              shirt dresses offer the perfect balance of style and comfort. Pair them with sneakers for a casual look, 
              or dress them up with heels and accessories for a more formal appearance.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Style Tips:</h3>
            <ul className="text-gray-600 list-disc list-inside space-y-1">
              <li>Belt at the waist for a more fitted silhouette</li>
              <li>Layer with cardigans or blazers for versatility</li>
              <li>Choose breathable fabrics like cotton or linen for all-day comfort</li>
              <li>Experiment with different lengths to find your perfect fit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
