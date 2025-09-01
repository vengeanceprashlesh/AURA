'use client';

import { motion } from 'framer-motion';
import { Calendar, Download, ExternalLink, Award, Newspaper } from 'lucide-react';

const PressPage = () => {
  const pressReleases = [
    {
      date: 'March 15, 2024',
      title: 'Aura Launches Revolutionary Sustainable Fashion Line',
      excerpt: 'New collection features 100% organic materials and carbon-neutral production process.',
      link: '#',
      featured: true,
    },
    {
      date: 'February 8, 2024',
      title: 'Aura Receives B Corp Certification for Sustainable Business Practices',
      excerpt: 'Recognition highlights our commitment to environmental and social responsibility.',
      link: '#',
      featured: false,
    },
    {
      date: 'January 22, 2024',
      title: 'Partnership with Global Fashion Sustainability Initiative',
      excerpt: 'Collaboration aims to set new industry standards for ethical fashion production.',
      link: '#',
      featured: false,
    },
    {
      date: 'December 10, 2023',
      title: 'Aura Named "Sustainable Fashion Brand of the Year"',
      excerpt: 'Fashion Forward Awards recognizes our innovative approach to eco-friendly design.',
      link: '#',
      featured: true,
    },
  ];

  const mediaKit = [
    {
      title: 'Brand Guidelines',
      description: 'Logo usage, brand colors, typography, and design principles',
      file: 'aura-brand-guidelines.pdf',
    },
    {
      title: 'High-Resolution Images',
      description: 'Product photos, lifestyle imagery, and brand photography',
      file: 'aura-media-images.zip',
    },
    {
      title: 'Executive Bios',
      description: 'Leadership team biographies and headshots',
      file: 'aura-executive-bios.pdf',
    },
    {
      title: 'Sustainability Report',
      description: 'Comprehensive sustainability metrics and initiatives',
      file: 'aura-sustainability-report.pdf',
    },
  ];

  const awards = [
    {
      year: '2024',
      award: 'Sustainable Fashion Brand of the Year',
      organization: 'Fashion Forward Awards',
      description: 'Recognized for innovative sustainable practices and eco-friendly product design.',
    },
    {
      year: '2023',
      award: 'Best E-commerce Experience',
      organization: 'Digital Fashion Awards',
      description: 'Honored for exceptional online shopping experience and customer service.',
    },
    {
      year: '2023',
      award: 'Women Entrepreneur of the Year',
      organization: 'Business Excellence Awards',
      description: 'Founder Sarah Chen recognized for leadership in sustainable fashion.',
    },
    {
      year: '2022',
      award: 'Innovation in Fashion Technology',
      organization: 'Tech Fashion Summit',
      description: 'Awarded for pioneering use of sustainable materials and production methods.',
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
          <motion.div
            className="w-20 h-20 bg-dusty-rose-500 rounded-full flex items-center justify-center mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Newspaper className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h1 
            className="font-heading text-4xl md:text-6xl font-bold text-charcoal-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Press & Media
          </motion.h1>
          <motion.p 
            className="font-body text-lg text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Stay up to date with Aura's latest news, press releases, and media coverage. 
            For press inquiries and interviews, please contact our media relations team.
          </motion.p>
        </div>
      </motion.section>

      {/* Press Releases */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
              Latest Press Releases
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              The latest news and announcements from Aura
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <motion.article
                key={release.title}
                className={`p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  release.featured ? 'bg-dusty-rose-50 border border-dusty-rose-200' : 'bg-white'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 text-charcoal-500 mr-2" />
                      <time className="font-body text-sm text-charcoal-600">{release.date}</time>
                      {release.featured && (
                        <span className="ml-3 px-2 py-1 bg-dusty-rose-500 text-white text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-3">
                      {release.title}
                    </h3>
                    <p className="font-body text-charcoal-700 leading-relaxed mb-4">
                      {release.excerpt}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
                    <motion.a
                      href={release.link}
                      className="inline-flex items-center text-dusty-rose-600 hover:text-dusty-rose-700 font-medium text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Media Kit */}
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
              Media Kit
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              Everything you need to know about Aura, including brand assets and company information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mediaKit.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-beige-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal-700 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <motion.a
                  href={`/media-kit/${item.file}`}
                  className="inline-flex items-center bg-dusty-rose-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-dusty-rose-600 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Awards */}
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
              Awards & Recognition
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              Industry recognition for our commitment to sustainable fashion and innovation
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {awards.map((award, index) => (
              <motion.div
                key={`${award.year}-${award.award}`}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-dusty-rose-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Award className="h-6 w-6 text-dusty-rose-600" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <span className="font-heading text-lg font-bold text-dusty-rose-600 mr-3">
                        {award.year}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-charcoal-900">
                        {award.award}
                      </h3>
                    </div>
                    <p className="font-body text-charcoal-600 text-sm font-medium mb-2">
                      {award.organization}
                    </p>
                    <p className="font-body text-charcoal-700 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-20 bg-dusty-rose-500"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Press Inquiries
          </h2>
          <p className="font-body text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            For press inquiries, interviews, or media partnerships, please contact our media relations team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:press@aura.com"
              className="inline-block bg-white text-dusty-rose-500 px-8 py-4 rounded-full font-medium hover:bg-beige-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Press Team
            </motion.a>
            <motion.a
              href="/media-kit/aura-complete-media-kit.zip"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-dusty-rose-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Media Kit
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PressPage;
