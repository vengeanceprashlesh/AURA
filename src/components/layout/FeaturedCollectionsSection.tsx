'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for featured collections
const collections = [
  {
    id: 'elegant-essentials',
    name: 'Elegant Essentials',
    description: 'Timeless pieces for the modern wardrobe',
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&crop=faces',
    href: '/collections/elegant-essentials',
    featured: true,
  },
  {
    id: 'spring-collection',
    name: 'Spring Collection',
    description: 'Fresh styles for the new season',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop&crop=faces',
    href: '/collections/spring-collection',
    featured: false,
  },
  {
    id: 'sustainable-luxury',
    name: 'Sustainable Luxury',
    description: 'Eco-conscious fashion that doesn\'t compromise on style',
    itemCount: 16,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=faces',
    href: '/collections/sustainable-luxury',
    featured: false,
  },
  {
    id: 'accessories',
    name: 'Statement Accessories',
    description: 'Complete your look with curated accessories',
    itemCount: 32,
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=400&fit=crop&crop=faces',
    href: '/collections/accessories',
    featured: false,
  },
];

interface CollectionCardProps {
  collection: typeof collections[0];
  className?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={collection.href}
        className="group relative overflow-hidden rounded-lg bg-beige-100 block hover:shadow-xl transition-shadow duration-300"
      >
        {/* Background Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 0.9 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <motion.div 
              className="transform"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.span 
                className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {collection.itemCount} Items
              </motion.span>
              
              <motion.h3 
                className="font-heading text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {collection.name}
              </motion.h3>
              
              <motion.p 
                className="font-body text-sm text-white/90 mb-4 line-clamp-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {collection.description}
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-2 text-sm font-medium"
                initial={{ opacity: 0, x: -20 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Shop Collection
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Hover Effect */}
          <motion.div 
            className="absolute inset-0 bg-dusty-rose-500/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedCollectionsSection = () => {
  const [featuredCollection, ...otherCollections] = collections;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const statsData = [
    { number: "500+", label: "Curated Pieces" },
    { number: "12", label: "Collections" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Style Support" },
  ];

  return (
    <motion.section 
      className="py-20 bg-beige-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h2 
            className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Featured Collections
          </motion.h2>
          <motion.p 
            className="font-body text-charcoal-600 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Curated collections that tell a story. Each collection is thoughtfully designed 
            to bring you pieces that work beautifully together.
          </motion.p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={itemVariants}
        >
          {/* Featured Collection - Takes 2 columns on large screens */}
          <CollectionCard 
            collection={featuredCollection} 
            className="lg:col-span-2 lg:row-span-2"
          />
          
          {/* Other Collections */}
          <div className="space-y-6">
            {otherCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <CollectionCard 
                  collection={collection} 
                  className="aspect-[4/3] lg:aspect-[2/1]"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-white rounded-lg p-8 shadow-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h3 
            className="font-heading text-2xl font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Can't Find What You're Looking For?
          </motion.h3>
          <motion.p 
            className="font-body text-charcoal-600 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Browse our complete catalog of collections, or get in touch with our styling team 
            for personalized recommendations.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/collections"
                className="bg-dusty-rose-500 text-white px-6 py-3 rounded-full font-medium hover:bg-dusty-rose-600 transition-colors inline-block"
              >
                View All Collections
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="text-charcoal-700 px-6 py-3 rounded-full font-medium border border-charcoal-300 hover:border-dusty-rose-500 hover:text-dusty-rose-500 transition-colors inline-block"
              >
                Contact Styling Team
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-charcoal-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {statsData.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="font-heading text-3xl font-bold text-dusty-rose-500 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  delay: 0.2 + index * 0.1, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 10 
                }}
              >
                {stat.number}
              </motion.div>
              <div className="font-body text-charcoal-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedCollectionsSection;
