'use client';

import { motion } from 'framer-motion';
import { Heart, Leaf, Users, Award } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Crafted with Love',
      description: 'Every piece in our collection is carefully selected and crafted with attention to detail and passion for timeless design.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Fashion',
      description: 'We believe in responsible fashion that respects our planet, using eco-friendly materials and ethical production practices.',
    },
    {
      icon: Users,
      title: 'Empowering Women',
      description: 'Our mission is to help every woman feel confident and beautiful, celebrating individuality and personal style.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality, ensuring every garment meets our high standards for durability and style.',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Aura was founded with a vision to create timeless, elegant fashion for the modern woman.',
    },
    {
      year: '2021',
      title: 'Sustainable Commitment',
      description: 'We launched our sustainability initiative, partnering with eco-friendly suppliers worldwide.',
    },
    {
      year: '2022',
      title: 'Community Growth',
      description: 'Reached 50,000 happy customers and launched our customer loyalty program.',
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded internationally while maintaining our commitment to quality and sustainability.',
    },
    {
      year: '2024',
      title: 'Innovation Forward',
      description: 'Embracing new technologies and sustainable materials to create the fashion of tomorrow.',
    },
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-dusty-rose-100 to-beige-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="font-heading text-4xl md:text-6xl font-bold text-charcoal-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="font-body text-lg text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            At Aura, we believe that fashion is more than clothing—it's about expressing your unique essence, 
            celebrating your individuality, and feeling confident in every moment. Our journey began with a 
            simple yet powerful vision: to create timeless, elegant pieces that empower women to embrace their authentic selves.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                Our Mission
              </h2>
              <p className="font-body text-charcoal-700 text-lg mb-6 leading-relaxed">
                We're on a mission to redefine what it means to dress well in the modern world. 
                By combining timeless elegance with contemporary design, we create pieces that 
                transcend trends and seasons.
              </p>
              <p className="font-body text-charcoal-700 text-lg leading-relaxed">
                Every woman deserves to feel beautiful, confident, and authentically herself. 
                That's why we craft each piece with meticulous attention to detail, using only 
                the finest materials and sustainable practices.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"
                alt="Our Mission"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
              Our Values
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              These core values guide everything we do, from design to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-dusty-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-dusty-rose-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-charcoal-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        className="py-20 bg-beige-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
              Our Journey
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              From a small startup to a global fashion brand, here's how we've grown
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="relative flex items-start mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-20 h-20 bg-dusty-rose-500 rounded-full flex items-center justify-center mr-6">
                  <span className="font-heading text-white font-bold text-sm">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="font-body text-charcoal-700 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-dusty-rose-500"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Story
          </h2>
          <p className="font-body text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            Be part of our journey towards sustainable, beautiful fashion. 
            Discover pieces that celebrate your unique style and values.
          </p>
          <motion.a
            href="/categories/new-today"
            className="inline-block bg-white text-dusty-rose-500 px-8 py-4 rounded-full font-medium hover:bg-beige-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Our Collection
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
