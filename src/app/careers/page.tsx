'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Globe, Award, Mail, MapPin, Clock } from 'lucide-react';

const CareersPage = () => {
  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs for all employees.',
    },
    {
      icon: Globe,
      title: 'Remote Flexibility',
      description: 'Work from anywhere with flexible hours and full support for remote collaboration.',
    },
    {
      icon: Users,
      title: 'Career Growth',
      description: 'Continuous learning opportunities, mentorship programs, and clear career progression paths.',
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Performance bonuses, equity options, and regular recognition for outstanding contributions.',
    },
  ];

  const openRoles = [
    {
      title: 'Fashion Designer',
      department: 'Design',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      description: 'Join our creative team to design beautiful, sustainable fashion pieces that inspire confidence.',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Los Angeles, CA / Remote',
      type: 'Full-time',
      description: 'Lead our brand marketing efforts and help us connect with fashion-forward women worldwide.',
    },
    {
      title: 'Sustainability Coordinator',
      department: 'Operations',
      location: 'Portland, OR / Remote',
      type: 'Full-time',
      description: 'Drive our sustainability initiatives and help us become an even more eco-friendly brand.',
    },
    {
      title: 'Customer Experience Specialist',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Provide exceptional support to our customers and help them find their perfect style.',
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
            Join Our Team
          </motion.h1>
          <motion.p 
            className="font-body text-lg text-charcoal-700 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Be part of a passionate team that's shaping the future of sustainable fashion. 
            At Aura, we're not just creating beautiful clothes—we're building a community 
            of empowered individuals who believe in making a positive impact.
          </motion.p>
          <motion.a
            href="#open-positions"
            className="inline-block bg-dusty-rose-500 text-white px-8 py-4 rounded-full font-medium hover:bg-dusty-rose-600 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Open Positions
          </motion.a>
        </div>
      </motion.section>

      {/* Culture Section */}
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
              Our Culture
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              We're a diverse, inclusive team united by our passion for fashion, sustainability, and empowering women
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-heading text-2xl font-bold text-charcoal-900 mb-6">
                Why Work at Aura?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-dusty-rose-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="font-body text-charcoal-700">
                    <strong>Innovation First:</strong> We encourage creative thinking and embrace new ideas that push the fashion industry forward.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-dusty-rose-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="font-body text-charcoal-700">
                    <strong>Collaborative Environment:</strong> Work with talented, passionate individuals who support each other's growth and success.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-dusty-rose-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="font-body text-charcoal-700">
                    <strong>Purpose-Driven Work:</strong> Every role contributes to our mission of creating sustainable, beautiful fashion.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-dusty-rose-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="font-body text-charcoal-700">
                    <strong>Work-Life Balance:</strong> We believe in supporting our team's well-being and personal growth.
                  </p>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Team Collaboration"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
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
              Benefits & Perks
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              We invest in our team's success and well-being with comprehensive benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
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
                    {benefit.title}
                  </h3>
                  <p className="font-body text-charcoal-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Open Positions Section */}
      <motion.section 
        id="open-positions"
        className="py-20 bg-beige-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
              Open Positions
            </h2>
            <p className="font-body text-charcoal-700 text-lg max-w-3xl mx-auto">
              Find your next career opportunity with us
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {openRoles.map((role, index) => (
              <motion.div
                key={role.title}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-charcoal-900 mb-2">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-charcoal-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {role.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {role.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {role.type}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    className="mt-4 md:mt-0 bg-dusty-rose-500 text-white px-6 py-2 rounded-full font-medium hover:bg-dusty-rose-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply Now
                  </motion.button>
                </div>
                <p className="font-body text-charcoal-700 leading-relaxed">
                  {role.description}
                </p>
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
            Don't See the Right Role?
          </h2>
          <p className="font-body text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            We're always looking for talented individuals who share our passion. 
            Send us your resume and let us know how you'd like to contribute to our mission.
          </p>
          <motion.a
            href="mailto:careers@aura.com"
            className="inline-flex items-center bg-white text-dusty-rose-500 px-8 py-4 rounded-full font-medium hover:bg-beige-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-5 w-5 mr-2" />
            Send Us Your Resume
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default CareersPage;
