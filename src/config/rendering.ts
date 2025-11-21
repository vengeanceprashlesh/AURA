/**
 * Global Next.js configuration for dynamic rendering in production e-commerce
 * 
 * This file forces specific routes to use dynamic rendering for real-time data.
 * Apply this to pages that need up-to-date information from the database.
 */

// Import this in category and product pages
export const productPageConfig = {
    dynamic: 'force-dynamic' as const,
    revalidate: 0, // Always fetch fresh data
};

// For pages that can use ISR (Incremental Static Regeneration)
export const isrConfig = {
    revalidate: 60, // Revalidate every 60 seconds
};

// For static pages (about, legal, etc.)
export const staticConfig = {
    dynamic: 'force-static' as const,
};
