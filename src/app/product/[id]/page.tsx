'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Plus, Minus, Truck, RotateCcw, Shield, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

// Mock product data - in a real app, this would be fetched based on the ID
const mockProduct = {
  id: 1,
  name: "Silk Wrap Dress",
  brand: "Designer Brand",
  price: 198,
  originalPrice: 298,
  images: [
    "/api/placeholder/600/800",
    "/api/placeholder/600/800", 
    "/api/placeholder/600/800",
    "/api/placeholder/600/800"
  ],
  colors: [
    { name: "Black", value: "#000000", image: "/api/placeholder/600/800" },
    { name: "Navy", value: "#1e3a8a", image: "/api/placeholder/600/800" },
    { name: "Burgundy", value: "#7c2d12", image: "/api/placeholder/600/800" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  description: "Effortlessly elegant wrap dress crafted from luxurious silk. Features a flattering V-neckline, adjustable tie waist, and midi length. Perfect for both day and evening occasions.",
  details: [
    "100% Silk",
    "Dry clean only", 
    "Imported",
    "Model is 5'9\" and wearing size S",
    "Fits true to size"
  ],
  rating: 4.5,
  reviews: 124,
  inStock: true,
  category: "Dresses",
  sku: "DB-SWD-001"
};

const relatedProducts = [
  {
    id: 2,
    name: "Cropped Blazer",
    brand: "Fashion House",
    price: 159,
    image: "/api/placeholder/300/400",
    rating: 4.8
  },
  {
    id: 3, 
    name: "High Waisted Jeans",
    brand: "Denim Co",
    price: 128,
    image: "/api/placeholder/300/400",
    rating: 4.6
  },
  {
    id: 4,
    name: "Bodysuit",
    brand: "Basics", 
    price: 45,
    image: "/api/placeholder/300/400",
    rating: 4.3
  },
  {
    id: 5,
    name: "Maxi Skirt",
    brand: "Flowing",
    price: 89,
    image: "/api/placeholder/300/400", 
    rating: 4.4
  }
];

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');

  const { addItem } = useCartStore();

  const formatPrice = (price: number) => `$${price}`;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addItem({
      product: mockProduct,
      selectedColor,
      selectedSize,
      quantity
    });
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/womens" className="hover:text-black">Women</Link>
          <span className="mx-2">/</span>
          <Link href={`/womens/${mockProduct.category.toLowerCase()}`} className="hover:text-black">{mockProduct.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{mockProduct.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
              <Image
                src={selectedColor.image || mockProduct.images[selectedImageIndex]}
                alt={mockProduct.name}
                width={600}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-[3/4] bg-gray-100 overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-black' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.name} view ${index + 1}`}
                    width={150}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {mockProduct.brand}
              </div>
              <h1 className="text-2xl md:text-3xl font-light text-black">
                {mockProduct.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(mockProduct.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {mockProduct.rating} ({mockProduct.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-medium text-black">
                {formatPrice(mockProduct.price)}
              </span>
              {mockProduct.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(mockProduct.originalPrice)}
                </span>
              )}
              {mockProduct.originalPrice && (
                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 font-medium">
                  SAVE {Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <div className="text-sm font-medium text-black mb-3">
                Color: {selectedColor.name}
              </div>
              <div className="flex items-center space-x-3">
                {mockProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-black border-4'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-black">
                  Size: {selectedSize || 'Select Size'}
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-gray-500 hover:text-black underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {mockProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="text-sm font-medium text-black mb-3">Quantity</div>
              <div className="flex items-center border border-gray-300 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-3 text-center min-w-[3rem]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!mockProduct.inStock}
              >
                {mockProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-full border py-4 text-sm font-medium uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 ${
                  isWishlisted 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t pt-6 space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Truck className="h-4 w-4 text-gray-500" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-4 w-4 text-gray-500" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-gray-500" />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="border-t pt-6 space-y-4">
              {/* Description */}
              <div className="border-b">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-medium text-black">DESCRIPTION</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'description' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === 'description' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                        {mockProduct.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Details */}
              <div className="border-b">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-medium text-black">DETAILS & CARE</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === 'details' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          {mockProduct.details.map((detail, index) => (
                            <li key={index}>• {detail}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-light text-black mb-8">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group">
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {product.brand}
                  </div>
                  <h3 className="text-sm font-medium text-black mb-2 group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
