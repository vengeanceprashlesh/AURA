'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationCategory, NavigationSubcategory, NavigationItem, NavigationFeaturedItem, TrendingSection, VisualCollection } from '@/types';
import { ChevronRight } from 'lucide-react';

interface MegaMenuDropdownProps {
  category: NavigationCategory;
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenuDropdown = ({ category, isOpen, onClose }: MegaMenuDropdownProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderSimpleLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Subcategories */}
      <div className="space-y-6">
        {category.subcategories?.map((subcategory) => (
          <div key={subcategory.id}>
            <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-3">
              <Link 
                href={subcategory.href}
                className="hover:text-dusty-rose-500 transition-colors"
                onClick={onClose}
              >
                {subcategory.name}
              </Link>
            </h3>
            {subcategory.items && (
              <ul className="space-y-2">
                {subcategory.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-charcoal-700 hover:text-dusty-rose-500 transition-colors"
                      onClick={onClose}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-dusty-rose-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded-full">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Featured Items */}
      {category.featuredItems && category.featuredItems.length > 0 && (
        <div>
          <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">Featured</h3>
          <div className="space-y-4">
            {category.featuredItems.map((item) => (
              <Link key={item.id} href={item.href} onClick={onClose} className="block group">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="font-heading text-lg font-semibold mb-1">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm opacity-90">{item.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderColumnsLayout = () => {
    const hasMoreThanThreeSubcategories = category.subcategories && category.subcategories.length > 3;
    const gridCols = hasMoreThanThreeSubcategories ? 'md:grid-cols-6' : 'md:grid-cols-4';
    
    return (
      <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
        {/* Subcategories in columns */}
        {category.subcategories?.map((subcategory) => (
          <div key={subcategory.id} className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-charcoal-900 border-b border-beige-200 pb-2">
              <Link 
                href={subcategory.href}
                className="hover:text-dusty-rose-500 transition-colors"
                onClick={onClose}
              >
                {subcategory.name}
              </Link>
            </h3>
            {subcategory.items && (
              <ul className="space-y-2">
                {subcategory.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-charcoal-700 hover:text-dusty-rose-500 transition-colors"
                      onClick={onClose}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-dusty-rose-500 text-white rounded">
                          {item.badge}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-500 text-white rounded">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
  
        {/* Trending Section */}
        {category.trendingSection && (
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-charcoal-900 border-b border-beige-200 pb-2">
              {category.trendingSection.title}
            </h3>
            <ul className="space-y-2">
              {category.trendingSection.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-sm text-charcoal-700 hover:text-dusty-rose-500 transition-colors"
                    onClick={onClose}
                  >
                    <span>{item.name}</span>
                    <span className="ml-2 text-xs text-red-500 font-medium">🔥</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {/* Featured Items */}
        {category.featuredItems && category.featuredItems.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-charcoal-900 border-b border-beige-200 pb-2">
              Featured
            </h3>
            <div className="space-y-4">
              {category.featuredItems.slice(0, 2).map((item) => (
                <Link key={item.id} href={item.href} onClick={onClose} className="block group">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={250}
                      height={150}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h4 className="font-heading text-sm font-semibold mb-1">{item.name}</h4>
                      {item.description && (
                        <p className="text-xs opacity-90">{item.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderGridLayout = () => (
    <div className="space-y-8">
      {/* Featured Items Grid */}
      {category.featuredItems && category.featuredItems.length > 0 && (
        <div>
          <h3 className="font-heading text-xl font-semibold text-charcoal-900 mb-6">Featured Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {category.featuredItems.map((item) => (
              <Link key={item.id} href={item.href} onClick={onClose} className="block group">
                <div className="relative overflow-hidden rounded-lg h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="font-heading text-xl font-semibold mb-2">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm opacity-90">{item.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {category.subcategories?.map((subcategory) => (
          <div key={subcategory.id} className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-charcoal-900 border-b border-beige-200 pb-2">
              <Link 
                href={subcategory.href}
                className="hover:text-dusty-rose-500 transition-colors"
                onClick={onClose}
              >
                {subcategory.name}
              </Link>
            </h3>
            {subcategory.items && (
              <ul className="space-y-2">
                {subcategory.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-charcoal-700 hover:text-dusty-rose-500 transition-colors"
                      onClick={onClose}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-dusty-rose-500 text-white rounded">
                          {item.badge}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-500 text-white rounded">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRevolveLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 min-h-[500px]">
      {/* Left Sidebar - Categories */}
      <div className="lg:col-span-3">
        {category.subcategories?.map((subcategory) => (
          <div key={subcategory.id}>
            <h3 className="font-serif text-lg lg:text-xl font-bold text-stone-900 mb-4 lg:mb-6">
              <Link 
                href={subcategory.href}
                className="hover:text-dusty-rose-500 transition-colors"
                onClick={onClose}
              >
                {subcategory.name}
              </Link>
            </h3>
            {subcategory.items && (
              <ul className="space-y-2 lg:space-y-4">
                {subcategory.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-stone-600 hover:text-dusty-rose-500 transition-colors block text-sm font-sans leading-relaxed"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Center - Trending Section */}
      {category.trendingSection && (
        <div className="lg:col-span-3">
          <div>
            <h3 className="font-serif text-lg lg:text-xl font-bold text-stone-900 mb-4 lg:mb-6">
              {category.trendingSection.title}
            </h3>
            <ul className="space-y-2 lg:space-y-4">
              {category.trendingSection.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-stone-600 hover:text-dusty-rose-500 transition-colors block text-sm font-sans leading-relaxed"
                    onClick={onClose}
                  >
                    {item.name}
                    {item.isHot && (
                      <span className="ml-2 text-xs text-red-500 font-medium">HOT</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Right - Visual Collections */}
      {category.visualCollections && category.visualCollections.length > 0 && (
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.visualCollections.map((collection) => (
            <Link 
              key={collection.id} 
              href={collection.href} 
              onClick={onClose} 
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg h-64 lg:h-96 bg-gray-100">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                  <h4 className="font-heading text-white text-sm lg:text-base font-semibold mb-1 leading-tight drop-shadow-lg">{collection.name}</h4>
                  <p className="text-white text-xs opacity-90 leading-tight line-clamp-2 drop-shadow-md">{collection.description}</p>
                  {collection.subtitle && (
                    <p className="text-white text-xs opacity-75 mt-0.5 lg:mt-1 leading-tight drop-shadow-md">{collection.subtitle}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (category.megaMenuLayout) {
      case 'revolve':
        return renderRevolveLayout();
      case 'columns':
        return renderColumnsLayout();
      case 'grid':
        return renderGridLayout();
      case 'simple':
      default:
        return renderSimpleLayout();
    }
  };

  const isRevolveLayout = category.megaMenuLayout === 'revolve';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-[120px] left-0 right-0 bg-stone-100 border-t border-stone-200 shadow-xl z-40"
        >
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRevolveLayout ? 'py-12' : 'py-8'}`}>
            {/* Category Header - Hidden for REVOLVE layout */}
            {!isRevolveLayout && (
              <div className="mb-6 pb-4 border-b border-beige-200">
                <Link 
                  href={category.href}
                  className="group flex items-center"
                  onClick={onClose}
                >
                  <h2 className="font-heading text-2xl font-bold text-charcoal-900 group-hover:text-dusty-rose-500 transition-colors">
                    {category.name}
                  </h2>
                  <ChevronRight className="ml-2 h-5 w-5 text-charcoal-400 group-hover:text-dusty-rose-500 transition-colors" />
                </Link>
              </div>
            )}

            {/* Menu Content */}
            {renderContent()}

            {/* View All Link - Hidden for REVOLVE layout */}
            {!isRevolveLayout && (
              <div className="mt-8 pt-6 border-t border-beige-200 text-center">
                <Link
                  href={category.href}
                  className="inline-flex items-center px-6 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors"
                  onClick={onClose}
                >
                  View All {category.name}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenuDropdown;
