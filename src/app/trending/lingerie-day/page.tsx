import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart } from 'lucide-react';

export default function LingerieDayPage() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Silk Camisole with Lace Trim',
      brand: 'La Perla',
      price: '$245',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=600',
      isHot: true,
      href: '/products/1'
    },
    {
      id: 2,
      name: 'Satin Slip Dress',
      brand: 'Olivia von Halle',
      price: '$395',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
      isHot: false,
      href: '/products/2'
    },
    {
      id: 3,
      name: 'Lace Bodysuit',
      brand: 'Fleur du Mal',
      price: '$168',
      originalPrice: '$220',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=600',
      isHot: true,
      href: '/products/3'
    },
    {
      id: 4,
      name: 'Silk Teddy',
      brand: 'Agent Provocateur',
      price: '$325',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=600',
      isHot: false,
      href: '/products/4'
    }
  ];

  const stylingTips = [
    {
      title: 'Layer with Blazers',
      description: 'Pair a silk camisole with a structured blazer for an elevated business look.',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&h=200'
    },
    {
      title: 'Slip Dress Styling',
      description: 'Wear over a fitted tee or under a cardigan for a modern, layered approach.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&h=200'
    },
    {
      title: 'Bodysuit Basics',
      description: 'Style with high-waisted trousers or a midi skirt for a sophisticated silhouette.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&h=200'
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-dusty-rose-100 to-beige-100 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=1200&h=400"
            alt="Lingerie for Day"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-5xl font-bold text-charcoal-900 mb-4">
              Lingerie for Day
            </h1>
            <p className="text-xl text-charcoal-700 max-w-2xl mx-auto">
              Redefining intimates as outerwear with pieces that transition seamlessly from bedroom to boardroom
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/trending" className="hover:text-dusty-rose-500">Trending</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Lingerie for Day</span>
        </nav>

        {/* Trend Description */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-8">
            <div className="flex items-start space-x-2 mb-4">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                HOT TREND
              </span>
              <Heart className="h-5 w-5 text-dusty-rose-500 fill-current" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-charcoal-900 mb-4">
              The Art of Elevated Intimates
            </h2>
            <p className="text-charcoal-700 leading-relaxed mb-6">
              This season, lingerie steps out of the bedroom and into the spotlight. From silk camisoles worn as statement tops 
              to delicate lace bodysuits styled under blazers, intimate apparel is being reimagined as sophisticated daywear. 
              This trend celebrates femininity while maintaining a polished, professional aesthetic that's perfect for the modern woman.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-dusty-rose-100 text-dusty-rose-700 rounded-full text-sm font-medium">
                Silk Camisoles
              </span>
              <span className="px-3 py-1 bg-dusty-rose-100 text-dusty-rose-700 rounded-full text-sm font-medium">
                Lace Bodysuits
              </span>
              <span className="px-3 py-1 bg-dusty-rose-100 text-dusty-rose-700 rounded-full text-sm font-medium">
                Slip Dresses
              </span>
              <span className="px-3 py-1 bg-dusty-rose-100 text-dusty-rose-700 rounded-full text-sm font-medium">
                Delicate Fabrics
              </span>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">
            Shop the Trend
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={product.href} className="group">
                <div className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] bg-beige-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isHot && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          HOT
                        </span>
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-charcoal-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-charcoal-600 mb-1 font-medium uppercase tracking-wide">
                      {product.brand}
                    </div>
                    <h3 className="font-medium text-charcoal-900 mb-2 line-clamp-2 group-hover:text-dusty-rose-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-charcoal-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-charcoal-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Styling Tips */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">
            How to Style It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stylingTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-beige-200 overflow-hidden">
                <div className="relative h-48 bg-beige-100">
                  <Image
                    src={tip.image}
                    alt={tip.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-charcoal-700 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-dusty-rose-50 rounded-lg p-12">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-4">
            Embrace Your Feminine Power
          </h2>
          <p className="text-charcoal-700 mb-8 max-w-2xl mx-auto">
            Step into confidence with pieces that celebrate your femininity while maintaining sophistication. 
            Shop our curated selection of lingerie-inspired daywear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories/clothing/tops"
              className="inline-flex items-center px-8 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors"
            >
              Shop Camisoles & Bodysuits
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/categories/dresses"
              className="inline-flex items-center px-8 py-3 border border-charcoal-900 text-charcoal-900 font-medium rounded-lg hover:bg-charcoal-900 hover:text-white transition-colors"
            >
              Shop Slip Dresses
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
