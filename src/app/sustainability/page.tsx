'use client';

import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Globe, Droplets, Wind, Sun, Users } from 'lucide-react';

const SustainabilityPage = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: 'Organic Materials',
      description: 'We use certified organic cotton, linen, and sustainable fabrics that are better for both you and the environment.',
      stat: '85%',
      statLabel: 'Organic Materials Used',
    },
    {
      icon: Recycle,
      title: 'Circular Fashion',
      description: 'Our take-back program allows customers to return worn items for recycling into new garments.',
      stat: '10,000+',
      statLabel: 'Garments Recycled',
    },
    {
      icon: Droplets,
      title: 'Water Conservation',
      description: 'We partner with suppliers who use water-efficient dyeing processes and closed-loop water systems.',
      stat: '40%',
      statLabel: 'Water Usage Reduction',
    },
    {
      icon: Wind,
      title: 'Carbon Neutral',
      description: 'We offset 100% of our carbon emissions through renewable energy and verified offset programs.',
      stat: 'Net Zero',
      statLabel: 'Carbon Footprint',
    },
  ];

  const goals = [
    {
      icon: Sun,
      title: '2025 Goal',
      description: '100% renewable energy across all operations and facilities',
      progress: 75,
    },
    {
      icon: Recycle,
      title: '2026 Goal',
      description: 'Zero waste to landfill from production processes',
      progress: 60,
    },
    {
      icon: Leaf,
      title: '2027 Goal',
      description: '100% sustainable packaging materials',
      progress: 85,
    },
    {
      icon: Users,
      title: 'Ongoing',
      description: 'Fair trade partnerships with all suppliers',
      progress: 90,
    },
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-green-100 to-beige-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Leaf className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h1 
            className="font-heading text-4xl md:text-6xl font-bold text-charcoal-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Sustainable Fashion
          </motion.h1>
          <motion.p 
            className="font-body text-lg text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            At Aura, sustainability isn't just a buzzword—it's at the heart of everything we do. 
            We believe that beautiful fashion should never come at the expense of our planet or 
            the people who make it possible.
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
                Our Commitment
              </h2>
              <p className="font-body text-charcoal-700 text-lg mb-6 leading-relaxed">
                We're committed to creating fashion that's as beautiful for the planet as it is for you. 
                Every decision we make—from material sourcing to packaging—is guided by our 
                commitment to environmental responsibility.
              </p>
              <p className="font-body text-charcoal-700 text-lg leading-relaxed">
                Our goal is simple: prove that sustainable fashion doesn't mean compromising on 
                style, quality, or affordability. We're building a better future, one beautiful 
                garment at a time.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                alt="Sustainable Fashion"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Initiatives Section */}
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
              Our Impact
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              Real actions, measurable results. Here's how we're making a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <motion.div
                  key={initiative.title}
                  className="bg-beige-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-2">
                        {initiative.title}
                      </h3>
                      <p className="font-body text-charcoal-700 text-sm leading-relaxed">
                        {initiative.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-center">
                      <div className="font-heading text-2xl font-bold text-green-600 mb-1">
                        {initiative.stat}
                      </div>
                      <div className="font-body text-charcoal-600 text-sm">
                        {initiative.statLabel}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Goals Section */}
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
              Future Goals
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              We're constantly pushing forward. Here's what we're working towards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.div
                  key={goal.title}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-charcoal-900 text-center mb-3">
                    {goal.title}
                  </h3>
                  <p className="font-body text-charcoal-700 text-sm text-center leading-relaxed mb-4">
                    {goal.description}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <motion.div 
                      className="bg-green-600 h-2 rounded-full" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                  <div className="text-center text-sm font-medium text-charcoal-600">
                    {goal.progress}% Complete
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Transparency Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-8">
              Supply Chain Transparency
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-2">Fair Trade</h3>
                <p className="font-body text-charcoal-700 text-sm">
                  All our suppliers meet strict fair trade standards, ensuring fair wages and safe working conditions.
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-2">Ethical Sourcing</h3>
                <p className="font-body text-charcoal-700 text-sm">
                  We personally visit and audit every facility in our supply chain to ensure ethical practices.
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-2">Community Impact</h3>
                <p className="font-body text-charcoal-700 text-sm">
                  We invest 5% of profits back into the communities where our products are made.
                </p>
              </div>
            </div>
            <motion.a
              href="/sustainability-report.pdf"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full font-medium hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Our Sustainability Report
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-green-600"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Shop Sustainably
          </h2>
          <p className="font-body text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            Every purchase you make supports sustainable fashion and helps build a better future. 
            Discover our eco-friendly collection today.
          </p>
          <motion.a
            href="/categories/new-today"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-medium hover:bg-beige-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Sustainable Fashion
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default SustainabilityPage;
