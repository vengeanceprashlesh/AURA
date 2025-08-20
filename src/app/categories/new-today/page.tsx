import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import TrendingSection from '@/components/TrendingSection';
import ProductGrid from '@/components/ProductGrid';

export default function NewTodayPage() {
  const featuredItems = [
    {
      id: 'positano-pretty',
      name: 'Positano Pretty',
      href: '/collections/positano-pretty',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&h=400',
      description: 'Fruit prints and fresh pasta...',
    },
    {
      id: 'fall-preview',
      name: 'Fall Preview',
      href: '/collections/fall-preview',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&h=400',
      description: 'Because smart girls start shopping now',
    },
    {
      id: 'stone-cold-fox',
      name: 'Only At REVOLVE',
      href: '/collections/stone-cold-fox',
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=600&h=400',
      description: 'The new Stone Cold Fox collection just dropped.',
      subtitle: 'Stone Cold Fox',
    },
  ];


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

        {/* Featured Collections */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Link key={item.id} href={item.href} className="group block">
                <div className="relative overflow-hidden rounded-lg h-96 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-white text-xl font-semibold mb-2 leading-tight drop-shadow-lg">
                      {item.name}
                    </h3>
                    <p className="text-white text-sm opacity-90 leading-tight drop-shadow-md">
                      {item.description}
                    </p>
                    {item.subtitle && (
                      <p className="text-white text-xs opacity-75 mt-1 leading-tight drop-shadow-md">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
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

        {/* Compact Trending Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TrendingSection compact={false} maxCategories={2} className="" />
            </div>
            <div>
              <TrendingSection compact={true} maxCategories={4} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
