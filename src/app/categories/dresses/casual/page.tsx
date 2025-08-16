'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Heart, Sun, Coffee, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function CasualDressesPage() {
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [selectedLength, setSelectedLength] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Floral Midi Wrap Dress',
      brand: 'Zimmermann',
      price: '₹24,650.32',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
      occasions: ['brunch', 'vacation', 'date'],
      length: 'midi',
      sleeve: 'short',
      neckline: 'v-neck',
      fabric: 'Cotton Blend',
      care: 'Hand Wash',
      colors: ['floral', 'pink', 'blue'],
      href: '/products/1'
    },
    {
      id: 2,
      name: 'Linen Shirt Dress',
      brand: 'Everlane',
      price: '₹8,945.67',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=600',
      occasions: ['casual', 'work', 'weekend'],
      length: 'midi',
      sleeve: 'long',
      neckline: 'collar',
      fabric: 'Linen',
      care: 'Machine Wash',
      colors: ['white', 'navy', 'khaki'],
      href: '/products/2'
    },
    {
      id: 3,
      name: 'Sundress with Smocking',
      brand: 'Free People',
      price: '₹12,456.89',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=600',
      occasions: ['vacation', 'brunch', 'casual'],
      length: 'mini',
      sleeve: 'sleeveless',
      neckline: 'off-shoulder',
      fabric: 'Cotton',
      care: 'Machine Wash',
      colors: ['yellow', 'pink', 'white'],
      href: '/products/3'
    },
    {
      id: 4,
      name: 'Sweater Dress',
      brand: 'Ganni',
      price: '₹18,765.43',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=600',
      occasions: ['casual', 'weekend', 'date'],
      length: 'mini',
      sleeve: 'long',
      neckline: 'crew',
      fabric: 'Wool Blend',
      care: 'Dry Clean',
      colors: ['cream', 'brown', 'black'],
      href: '/products/4'
    }
  ];

  const occasions = [
    { id: 'all', name: 'All Occasions', icon: Sparkles, count: 1245 },
    { id: 'casual', name: 'Everyday Casual', icon: Sun, count: 456 },
    { id: 'brunch', name: 'Brunch & Coffee', icon: Coffee, count: 234 },
    { id: 'date', name: 'Date Night', icon: Calendar, count: 189 },
    { id: 'vacation', name: 'Vacation', icon: MapPin, count: 298 },
    { id: 'weekend', name: 'Weekend Vibes', icon: Sun, count: 345 }
  ];

  const lengths = [
    { id: 'all', name: 'All Lengths' },
    { id: 'mini', name: 'Mini' },
    { id: 'midi', name: 'Midi' },
    { id: 'maxi', name: 'Maxi' }
  ];

  const filteredProducts = products.filter(product => {
    const occasionMatch = selectedOccasion === 'all' || product.occasions.includes(selectedOccasion);
    const lengthMatch = selectedLength === 'all' || product.length === selectedLength;
    return occasionMatch && lengthMatch;
  });

  const outfitInspirations = [
    {
      title: 'Brunch Ready',
      description: 'Pair a floral midi with white sneakers and a denim jacket',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&h=200',
      items: ['Floral Midi Dress', 'Denim Jacket', 'White Sneakers', 'Crossbody Bag']
    },
    {
      title: 'Weekend Wanderer',
      description: 'Layer a sweater dress with boots and a statement bag',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=300&h=200',
      items: ['Knit Sweater Dress', 'Ankle Boots', 'Belt Bag', 'Layered Necklaces']
    },
    {
      title: 'Vacation Vibes',
      description: 'Style a sundress with sandals and a sun hat',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=300&h=200',
      items: ['Sundress', 'Strappy Sandals', 'Sun Hat', 'Beach Tote']
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-dusty-rose-100 to-beige-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal-900 mb-2">
              Casual Dresses
            </h1>
            <p className="text-lg text-charcoal-700">
              Effortless style for every day and every moment
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-6">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories/dresses" className="hover:text-dusty-rose-500">Dresses</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Casual</span>
        </nav>

        {/* Occasion Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-beige-200 p-6">
          <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">Shop by Occasion</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((occasion) => {
              const IconComponent = occasion.icon;
              return (
                <button
                  key={occasion.id}
                  onClick={() => setSelectedOccasion(occasion.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    selectedOccasion === occasion.id
                      ? 'border-dusty-rose-500 bg-dusty-rose-50 text-dusty-rose-700'
                      : 'border-beige-200 hover:border-dusty-rose-300 hover:bg-beige-50'
                  }`}
                >
                  <IconComponent className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium text-sm">{occasion.name}</div>
                  <div className="text-xs text-charcoal-500 mt-1">({occasion.count})</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-6 sticky top-4">
              <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">Filters</h3>
              
              {/* Length Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Length</h4>
                <div className="space-y-2">
                  {lengths.map((length) => (
                    <label key={length.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="length"
                        value={length.id}
                        checked={selectedLength === length.id}
                        onChange={(e) => setSelectedLength(e.target.value)}
                        className="w-4 h-4 text-dusty-rose-500 border-charcoal-300 focus:ring-dusty-rose-500"
                      />
                      <span className="ml-2 text-sm text-charcoal-700">{length.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Size</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-2 text-sm border border-charcoal-300 rounded hover:border-dusty-rose-500 hover:bg-dusty-rose-50 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-charcoal-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {['Under ₹10,000', '₹10,000 - ₹20,000', 'Over ₹20,000'].map((range) => (
                    <label key={range} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-dusty-rose-500 border-charcoal-300 rounded focus:ring-dusty-rose-500"
                      />
                      <span className="ml-2 text-sm text-charcoal-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className="font-medium text-charcoal-900 mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {['pink', 'blue', 'yellow', 'white', 'black', 'navy', 'cream'].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-charcoal-200 hover:border-charcoal-400"
                      style={{ backgroundColor: color === 'navy' ? '#1e3a8a' : color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-charcoal-900">
                  Casual Dresses
                </h2>
                <p className="text-charcoal-600 mt-1">
                  {filteredProducts.length} dresses found
                </p>
              </div>
              
              <select className="px-4 py-2 bg-white border border-beige-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-dusty-rose-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Most Popular</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={product.href} className="group">
                  <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] bg-beige-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Wishlist Button */}
                      <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-charcoal-600" />
                      </button>

                      {/* Length Badge */}
                      <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-charcoal-700 capitalize">
                        {product.length}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="text-xs text-charcoal-600 mb-1 font-medium uppercase tracking-wide">
                        {product.brand}
                      </div>
                      <h3 className="font-medium text-charcoal-900 mb-2 line-clamp-2 group-hover:text-dusty-rose-500 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Dress Details */}
                      <div className="mb-3 text-xs text-charcoal-600 space-y-1">
                        <div>Fabric: {product.fabric}</div>
                        <div>Neckline: {product.neckline}</div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-semibold text-charcoal-900">
                          {product.price}
                        </span>
                      </div>

                      {/* Color Options */}
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                          {product.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-charcoal-200"
                              style={{ backgroundColor: color === 'floral' ? '#ffb3ba' : color }}
                              title={color}
                            />
                          ))}
                        </div>
                        
                        {/* Occasion Tags */}
                        <div className="flex flex-wrap gap-1">
                          {product.occasions.slice(0, 2).map((occasion) => (
                            <span
                              key={occasion}
                              className="px-2 py-1 text-xs bg-beige-100 text-charcoal-600 rounded-full capitalize"
                            >
                              {occasion}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Outfit Inspiration */}
            <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-8">
              <h3 className="font-heading text-2xl font-bold text-charcoal-900 mb-6">Styling Inspiration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {outfitInspirations.map((inspiration, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={inspiration.image}
                        alt={inspiration.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-semibold text-lg mb-1">{inspiration.title}</h4>
                        <p className="text-sm opacity-90">{inspiration.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-charcoal-900">Complete the Look:</h4>
                      <ul className="text-sm text-charcoal-600 space-y-1">
                        {inspiration.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center">
                            <span className="w-2 h-2 bg-dusty-rose-500 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="inline-flex items-center px-8 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors">
                Load More Dresses
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
