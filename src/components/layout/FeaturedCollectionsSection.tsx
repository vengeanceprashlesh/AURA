'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

// Dynamic collections based on real categories with products
const categoryConfigs = [
  {
    id: 'new-today',
    name: 'New Arrivals',
    description: 'Fresh pieces added today - discover the latest trends',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=720&q=80',
    href: '/categories/new-today',
    featured: true,
  },
  {
    id: 'dresses',
    name: 'Dresses',
    description: 'From casual day dresses to elegant evening wear',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=720&q=80',
    href: '/categories/dresses',
    featured: false,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Perfect finishing touches for every outfit',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=720&q=80',
    href: '/categories/accessories',
    featured: false,
  },
];

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  image: string;
  href: string;
  featured: boolean;
}

interface CollectionCardProps {
  collection: Collection;
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
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover"
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch real product counts from database
  const newTodayProducts = useQuery(api.products.getProducts, { category: 'new-today' });
  const dressesProducts = useQuery(api.products.getProducts, { category: 'dresses' });
  const accessoriesProducts = useQuery(api.products.getProducts, { category: 'accessories' });

  // Create collections with real item counts
  const collections: Collection[] = categoryConfigs.map(config => ({
    ...config,
    itemCount: !mounted ? 0 :
      config.id === 'new-today' ? (newTodayProducts?.length || 0) :
      config.id === 'dresses' ? (dressesProducts?.length || 0) :
      config.id === 'accessories' ? (accessoriesProducts?.length || 0) :
      0
  }));

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          variants={itemVariants}
        >
          {/* Featured Collection - Takes full width on large screens */}
          <CollectionCard 
            collection={featuredCollection} 
            className="lg:col-span-2"
          />
          
          {/* Other Collections */}
          {otherCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <CollectionCard 
                collection={collection} 
                className="aspect-[4/3]"
              />
            </motion.div>
          ))}
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
