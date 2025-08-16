import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin, Sun } from 'lucide-react';

export default function PositanoPrettyPage() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Lemon Print Midi Dress',
      brand: 'Dolce & Gabbana',
      price: '$1,245',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600',
      category: 'Dresses',
      href: '/products/1'
    },
    {
      id: 2,
      name: 'Silk Scarf with Citrus Print',
      brand: 'Hermès',
      price: '$395',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&h=600',
      category: 'Accessories',
      href: '/products/2'
    },
    {
      id: 3,
      name: 'Limoncello Yellow Blouse',
      brand: 'Zimmermann',
      price: '$445',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1566479179817-b0ae5e6f3c40?auto=format&fit=crop&w=400&h=600',
      category: 'Tops',
      href: '/products/3'
    },
    {
      id: 4,
      name: 'Ceramic Print Pants',
      brand: 'La DoubleJ',
      price: '$325',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=600',
      category: 'Bottoms',
      href: '/products/4'
    },
    {
      id: 5,
      name: 'Straw Fedora Hat',
      brand: 'Maison Michel',
      price: '$285',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&h=600',
      category: 'Accessories',
      href: '/products/5'
    },
    {
      id: 6,
      name: 'Espadrille Wedges',
      brand: 'Castañer',
      price: '$195',
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=600',
      category: 'Shoes',
      href: '/products/6'
    }
  ];

  const inspirationImages = [
    {
      src: 'https://images.unsplash.com/photo-1569163139394-de44aa8adb8d?auto=format&fit=crop&w=600&h=400',
      alt: 'Positano coastline with colorful houses'
    },
    {
      src: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&h=400',
      alt: 'Fresh lemons at Italian market'
    },
    {
      src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&h=400',
      alt: 'Mediterranean breakfast spread'
    }
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-yellow-100 to-orange-100 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1569163139394-de44aa8adb8d?auto=format&fit=crop&w=1200&h=400"
            alt="Positano Pretty Collection"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MapPin className="h-6 w-6 text-orange-600" />
              <span className="text-sm font-medium text-orange-600 uppercase tracking-wider">
                Inspired by the Amalfi Coast
              </span>
              <Sun className="h-6 w-6 text-orange-600" />
            </div>
            <h1 className="font-heading text-5xl font-bold text-charcoal-900 mb-4">
              Positano Pretty
            </h1>
            <p className="text-xl text-charcoal-700 max-w-2xl mx-auto">
              Fruit prints and fresh pasta vibes meet Mediterranean elegance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
          <Link href="/" className="hover:text-dusty-rose-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/collections" className="hover:text-dusty-rose-500">Collections</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-900 font-medium">Positano Pretty</span>
        </nav>

        {/* Collection Story */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-8">
            <div className="flex items-start space-x-2 mb-4">
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                LIMITED COLLECTION
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-charcoal-900 mb-4">
              La Dolce Vita Meets Modern Style
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-charcoal-700 leading-relaxed mb-6">
                  Inspired by the sun-drenched terraces of Positano and the vibrant energy of Italian summers, 
                  this collection captures the essence of Mediterranean living. Think citrus prints that mirror 
                  the famous lemon groves, flowing silhouettes that dance in the coastal breeze, and colors 
                  that reflect the stunning Amalfi coastline.
                </p>
                <p className="text-charcoal-700 leading-relaxed mb-6">
                  From leisurely lunches overlooking the sea to evening strolls through cobblestone streets, 
                  each piece embodies the effortless elegance and joie de vivre that makes Positano a timeless 
                  destination for style inspiration.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    Citrus Prints
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    Mediterranean Colors
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Coastal Vibes
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Italian Summer
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {inspirationImages.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">
            Shop the Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 text-charcoal-700 text-xs font-medium px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-charcoal-600 mb-1 font-medium uppercase tracking-wide">
                      {product.brand}
                    </div>
                    <h3 className="font-medium text-charcoal-900 mb-3 line-clamp-2 group-hover:text-dusty-rose-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-charcoal-900">
                        {product.price}
                      </span>
                      <span className="text-sm text-charcoal-600 bg-orange-50 px-2 py-1 rounded-full">
                        Positano
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Styling Guide */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-8">
            How to Style Positano Pretty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-8">
              <h3 className="font-heading text-xl font-semibold text-charcoal-900 mb-4">
                Daytime Elegance
              </h3>
              <p className="text-charcoal-700 mb-4 leading-relaxed">
                Pair a citrus print blouse with crisp white pants and espadrilles for the perfect lunch outfit. 
                Add a straw hat and delicate jewelry for that effortless Mediterranean charm.
              </p>
              <ul className="space-y-2 text-sm text-charcoal-600">
                <li>• Lemon print silk blouse</li>
                <li>• High-waisted white trousers</li>
                <li>• Woven espadrille sandals</li>
                <li>• Straw fedora</li>
                <li>• Gold coin necklace</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-beige-200 p-8">
              <h3 className="font-heading text-xl font-semibold text-charcoal-900 mb-4">
                Evening Romance
              </h3>
              <p className="text-charcoal-700 mb-4 leading-relaxed">
                Transform the look for evening with a printed midi dress, statement earrings, and heeled sandals. 
                Perfect for sunset aperitivos overlooking the coast.
              </p>
              <ul className="space-y-2 text-sm text-charcoal-600">
                <li>• Ceramic print midi dress</li>
                <li>• Strappy heeled sandals</li>
                <li>• Statement drop earrings</li>
                <li>• Silk scarf as hair accessory</li>
                <li>• Structured mini bag</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-12">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-4">
            Escape to the Amalfi Coast
          </h2>
          <p className="text-charcoal-700 mb-8 max-w-2xl mx-auto">
            Bring the magic of Positano to your wardrobe with pieces that capture the essence of Italian summer. 
            Limited quantities available – shop now to secure your piece of la dolce vita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories/dresses"
              className="inline-flex items-center px-8 py-3 bg-charcoal-900 text-white font-medium rounded-lg hover:bg-charcoal-800 transition-colors"
            >
              Shop Dresses
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/categories/accessories"
              className="inline-flex items-center px-8 py-3 border border-charcoal-900 text-charcoal-900 font-medium rounded-lg hover:bg-charcoal-900 hover:text-white transition-colors"
            >
              Shop Accessories
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
