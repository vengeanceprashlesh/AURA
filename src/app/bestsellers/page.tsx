'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, TrendingUp, Crown, Award, Users, Flame } from 'lucide-react';

export default function Bestsellers() {
  const bestsellers = [
    {
      id: 1,
      name: "The Perfect White Shirt",
      price: "$134", // $134 (was $89, increased by 1.5x)
      originalPrice: "$180", // $180 (was $120, increased by 1.5x)
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600",
      badge: "#1 BESTSELLER",
      rating: 4.9,
      reviews: 1247,
      soldCount: "2.3K sold this month",
      reason: "Perfect fit • Wrinkle-free • Versatile"
    },
    {
      id: 2,
      name: "Black Midi Slip Dress",
      price: "$218", // $218 (was $145, increased by 1.5x)
      originalPrice: "$293", // $293 (was $195, increased by 1.5x)
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&h=600",
      badge: "CUSTOMER FAVORITE",
      rating: 4.8,
      reviews: 892,
      soldCount: "1.8K sold this month",
      reason: "Flattering on all body types • Day to night"
    },
    {
      id: 3,
      name: "High-Waisted Straight Jeans",
      price: "$192", // $192 (was $128, increased by 1.5x)
      originalPrice: "$248", // $248 (was $165, increased by 1.5x)
      image: "https://images.unsplash.com/photo-1506629905136-b5f3fde5ee30?auto=format&fit=crop&w=400&h=600",
      badge: "MOST LOVED",
      rating: 4.9,
      reviews: 1456,
      soldCount: "3.1K sold this month",
      reason: "Perfect length • Comfortable • Premium denim"
    },
    {
      id: 4,
      name: "Gold Chain Necklace Set",
      price: "$117", // $117 (was $78, increased by 1.5x)
      originalPrice: "$165", // $165 (was $110, increased by 1.5x)
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&h=600",
      badge: "VIRAL",
      rating: 4.7,
      reviews: 2103,
      soldCount: "5.2K sold this month",
      reason: "Layerable • Hypoallergenic • Instant glam"
    },
    {
      id: 5,
      name: "Structured Blazer",
      price: "$284", // $284 (was $189, increased by 1.5x)
      originalPrice: "$368", // $368 (was $245, increased by 1.5x)
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=600",
      badge: "EDITOR'S PICK",
      rating: 4.8,
      reviews: 743,
      soldCount: "1.2K sold this month",
      reason: "Professional • Tailored fit • Quality fabric"
    },
    {
      id: 6,
      name: "Leather Ankle Boots",
      price: "$248", // $248 (was $165, increased by 1.5x)
      originalPrice: "$330", // $330 (was $220, increased by 1.5x)
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&h=600",
      badge: "TRENDING",
      rating: 4.9,
      reviews: 654,
      soldCount: "987 sold this month",
      reason: "All-season • Comfortable • Goes with everything"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-red-100/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Crown className="h-8 w-8 text-amber-500" />
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900">
                Bestsellers
              </h1>
              <Flame className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The most loved pieces by women everywhere. These are the items flying off our virtual shelves.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2 text-amber-600">
                <Award className="h-4 w-4" />
                <span className="font-semibold">50K+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2 text-red-600">
                <Users className="h-4 w-4" />
                <span className="font-semibold">15K+ 5-Star Reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-green-600">127 women</span> are viewing this page
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">23 items</span> sold in the last hour
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-rose-500" />
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-rose-600">89% repurchase</span> rate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellers.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-amber-100 hover:border-amber-200">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500">
                        {item.badge}
                      </span>
                    </div>
                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg">
                      <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500" />
                    </button>
                    {/* Social Proof Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{item.soldCount}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">
                        {item.rating} ({item.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                    
                    {/* Product Name */}
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </h3>
                    
                    {/* Why it's loved */}
                    <p className="text-sm text-gray-600 mb-4 italic">
                      "Why women love it: {item.reason}"
                    </p>
                    
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-amber-600">{item.price}</span>
                        <span className="text-lg text-gray-500 line-through">{item.originalPrice}</span>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        SAVE {Math.round(((parseFloat(item.originalPrice.slice(1)) - parseFloat(item.price.slice(1))) / parseFloat(item.originalPrice.slice(1))) * 100)}%
                      </span>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Items Are Bestsellers */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              What Makes These Items So Special?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These aren't just popular items. They're life-changing pieces that women can't stop raving about.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
              <p className="text-gray-600 leading-relaxed">
                Every bestseller has been tested by thousands of women. If it's here, it means it passed the ultimate test: real life.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Obsessed</h3>
              <p className="text-gray-600 leading-relaxed">
                These items have the highest repurchase rates and most 5-star reviews. Women don't just buy them once—they buy them again and again.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Versatility</h3>
              <p className="text-gray-600 leading-relaxed">
                These pieces work for multiple occasions and body types. They're not just trendy—they're timeless staples you'll reach for again and again.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Urgency CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Join 50,000+ Happy Customers</h2>
            <p className="text-xl mb-8 opacity-90">
              Don't miss out on these customer favorites. Limited quantities available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/categories/new-today" className="bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Shop All Bestsellers
              </Link>
              <Link href="/categories/sale" className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                View Sale Items
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
