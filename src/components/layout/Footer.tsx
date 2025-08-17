'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const shopLinks = [
    { href: '/shop/women', label: 'Women' },
    { href: '/shop/men', label: 'Men' },
    { href: '/shop/accessories', label: 'Accessories' },
    { href: '/shop/sale', label: 'Sale' },
  ];

  const aboutLinks = [
    { href: '/about', label: 'Our Story' },
    { href: '/careers', label: 'Careers' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/press', label: 'Press' },
  ];

  const helpLinks = [
    { href: '/help/contact', label: 'Contact Us' },
    { href: '/help/shipping', label: 'Shipping & Returns' },
    { href: '/help/size-guide', label: 'Size Guide' },
    { href: '/help/faq', label: 'FAQ' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ];

  const socialLinks = [
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  ];

  return (
    <footer className="bg-charcoal-900 text-beige-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link href="/" className="font-heading text-3xl font-bold text-beige-100 hover:text-dusty-rose-300 transition-colors">
                Aura
              </Link>
              <p className="mt-4 text-beige-300 font-body text-sm leading-relaxed">
                Discover timeless elegance and contemporary style. Our curated collection brings you the finest in fashion, crafted with attention to detail and sustainable practices.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-beige-100 mb-4">
                Stay Updated
              </h3>
              <p className="text-beige-300 text-sm mb-4 font-body">
                Subscribe to get special offers, free giveaways, and exclusive deals.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-beige-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-md text-beige-100 placeholder-beige-400 focus:outline-none focus:ring-2 focus:ring-dusty-rose-500 focus:border-dusty-rose-500 font-body"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-dusty-rose-500 text-white font-medium rounded-md hover:bg-dusty-rose-600 focus:outline-none focus:ring-2 focus:ring-dusty-rose-500 focus:ring-offset-2 focus:ring-offset-charcoal-900 transition-colors font-body"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-beige-100 mb-6">Shop</h3>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-beige-300 hover:text-dusty-rose-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-beige-100 mb-6">About</h3>
            <ul className="space-y-4">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-beige-300 hover:text-dusty-rose-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-beige-100 mb-6">Help</h3>
            <ul className="space-y-4">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-beige-300 hover:text-dusty-rose-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-charcoal-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright & Legal Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-beige-400 text-sm font-body">
                © 2024 Aura. All rights reserved.
              </p>
              <div className="flex space-x-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-body text-beige-400 hover:text-dusty-rose-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-beige-400 hover:text-dusty-rose-300 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
