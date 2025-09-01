// Centralized configuration for all dynamic values
export const APP_CONFIG = {
  // Store Information
  STORE_NAME: 'Aura',
  STORE_TAGLINE: 'Your style journey continues here',
  STORE_SUBTITLE: 'MARKETPLACE',
  
  // Currency & Pricing
  CURRENCY: {
    SYMBOL: '₹',
    CODE: 'INR',
    LOCALE: 'en-IN'
  },
  
  // Shipping & Delivery
  SHIPPING: {
    FREE_SHIPPING_THRESHOLD: 8000,
    FREE_SHIPPING_TEXT: 'Free shipping on orders over ₹8000',
    STANDARD_DELIVERY_DAYS: '5-7',
    EXPRESS_DELIVERY_DAYS: '2-3',
    PROMOTIONAL_TEXT: 'FREE SHIPPING ON ORDERS OVER ₹8000 | FREE RETURNS | SHOP NOW, PAY LATER'
  },
  
  // Policies
  POLICIES: {
    RETURN_POLICY_DAYS: 30,
    RETURN_POLICY_TEXT: '30-day return policy',
    WARRANTY_TEXT: 'Quality guarantee',
    EXCHANGE_POLICY_DAYS: 15
  },
  
  // Default Product Values
  PRODUCTS: {
    DEFAULT_RATING: 4.8,
    DEFAULT_REVIEW_COUNT: 24,
    MIN_RATING: 3.5,
    MAX_RATING: 5.0,
    DEFAULT_STOCK_THRESHOLD: 10,
    DEFAULT_DISCOUNT_PERCENTAGE: 15,
    NEW_PRODUCT_DAYS: 7
  },
  
  // Social Proof
  SOCIAL_PROOF: {
    CUSTOMER_COUNT: '50K+',
    CUSTOMER_COUNT_TEXT: 'Happy Customers',
    AVERAGE_RATING: '4.9★',
    AVERAGE_RATING_TEXT: 'Average Rating',
    NEW_STYLES: '1000+',
    NEW_STYLES_TEXT: 'New Styles Monthly'
  },
  
  // Features & Benefits
  FEATURES: {
    PREMIUM_MATERIALS: '100% Premium Materials',
    SECURE_PAYMENT: 'SSL encrypted checkout',
    FAST_DELIVERY: 'Express delivery available',
    CUSTOMER_SUPPORT: '24/7 Customer Support'
  },
  
  // Contact Information
  CONTACT: {
    EMAIL: 'hello@aura-store.com',
    PHONE: '+91-XXX-XXX-XXXX',
    SUPPORT_EMAIL: 'support@aura-store.com',
    ADDRESS: 'Fashion District, Style City, India'
  },
  
  // Sizing
  SIZES: {
    CLOTHING: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    SHOES: ['5', '6', '7', '8', '9', '10', '11'],
    ACCESSORIES: ['One Size']
  },
  
  // Categories
  CATEGORIES: {
    MAIN: [
      'New Today',
      'Clothing',
      'Accessories', 
      'Beauty',
      'Shoes'
    ],
    TRENDING: [
      'Summer Collection',
      'New Arrivals',
      'Best Sellers',
      'Sale'
    ]
  },
  
  // Navigation & Menu Items
  NAVIGATION: {
    MOBILE_MENU_LINKS: [
      { href: '/categories/new-today', label: 'New Today', featured: true },
      { href: '/categories/skincare', label: 'Skincare ✨', featured: true },
      { href: '/categories/dresses', label: 'Dresses' },
      { href: '/categories/clothing', label: 'Clothing' },
      { href: '/categories/shoes', label: 'Shoes' },
      { href: '/categories/accessories', label: 'Accessories' },
      { href: '/bestsellers', label: 'Bestsellers' }
    ]
  },

  // Hero Section Content
  HERO: {
    MAIN_HEADING: 'NEW ARRIVALS',
    MAIN_DESCRIPTION: 'Shop the latest trends and must-have styles',
    CTA_TEXT: 'Shop Women',
    CTA_HREF: '/womens',
    CATEGORIES: {
      WOMEN: {
        TITLE: 'WOMEN',
        DESCRIPTION: 'Shop the latest trends',
        HREF: '/womens'
      },
      MEN: {
        TITLE: 'MEN', 
        DESCRIPTION: 'Discover men\'s essentials',
        HREF: '/mens'
      },
      NEW_TODAY: {
        TITLE: 'NEW TODAY',
        DESCRIPTION: 'Fresh drops daily',
        HREF: '/new-today'
      }
    }
  },

  // Footer Configuration
  FOOTER: {
    BRAND_DESCRIPTION: 'Discover timeless elegance and contemporary style. Our curated collection brings you the finest in fashion, crafted with attention to detail and sustainable practices.',
    NEWSLETTER: {
      TITLE: 'Stay Updated',
      DESCRIPTION: 'Subscribe to get special offers, free giveaways, and exclusive deals.',
      PLACEHOLDER: 'Enter your email',
      CTA_TEXT: 'Subscribe'
    },
    SHOP_LINKS: [
      { href: '/categories/new-today', label: 'New Arrivals' },
      { href: '/categories/skincare', label: 'Skincare' },
      { href: '/categories/dresses', label: 'Dresses' },
      { href: '/categories/accessories', label: 'Accessories' }
    ],
    ABOUT_LINKS: [
      { href: '/about', label: 'Our Story' },
      { href: '/careers', label: 'Careers' },
      { href: '/sustainability', label: 'Sustainability' },
      { href: '/press', label: 'Press' }
    ],
    HELP_LINKS: [
      { href: 'mailto:iamprashlesh@gmail.com', label: 'Contact Us' },
      { href: '/help/size-guide', label: 'Size Guide' },
      { href: '/help/faq', label: 'FAQ' }
    ],
    LEGAL_LINKS: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' }
    ],
    SOCIAL_LINKS: [
      { href: 'https://instagram.com', platform: 'instagram', label: 'Instagram' },
      { href: 'https://twitter.com', platform: 'twitter', label: 'Twitter' },
      { href: 'https://facebook.com', platform: 'facebook', label: 'Facebook' }
    ],
    COPYRIGHT: '© 2024 Aura. All rights reserved.'
  },
  
  // UI Text & Labels
  UI_TEXT: {
    COMMON: {
      LOADING: 'Loading...',
      SEARCH: 'Search',
      SEARCH_PLACEHOLDER: 'Search for products, brands, or styles...',
      SEARCH_RESULTS: 'Search Results',
      NO_RESULTS: 'No results found',
      VIEW_ALL: 'View All',
      SHOW_MORE: 'Show More',
      SHOW_LESS: 'Show Less',
      FILTER: 'Filter',
      SORT: 'Sort',
      CLEAR: 'Clear',
      APPLY: 'Apply',
      SAVE: 'Save',
      CANCEL: 'Cancel',
      EDIT: 'Edit',
      DELETE: 'Delete',
      CONFIRM: 'Confirm',
      CLOSE: 'Close',
      BACK: 'Back',
      NEXT: 'Next',
      PREVIOUS: 'Previous'
    },
    PRODUCT: {
      ADD_TO_CART: 'Add to Cart',
      BUY_NOW: 'Buy Now',
      ADDING: 'Adding...',
      ADDED_TO_CART: 'Added to Cart!',
      OUT_OF_STOCK: 'Out of Stock',
      SOLD_OUT: 'SOLD OUT',
      IN_STOCK: 'In Stock',
      QUICK_VIEW: 'Quick View',
      SIZE_GUIDE: 'Size Guide',
      SHARE: 'Share',
      REVIEWS: 'Reviews',
      DESCRIPTION: 'Description',
      DETAILS: 'Details',
      SPECIFICATIONS: 'Specifications'
    },
    CART: {
      TITLE: 'Shopping Bag',
      EMPTY_MESSAGE: 'Your cart is empty',
      CONTINUE_SHOPPING: 'Continue Shopping',
      CHECKOUT: 'Checkout',
      SUBTOTAL: 'Subtotal',
      TOTAL: 'Total',
      QUANTITY: 'Quantity',
      REMOVE: 'Remove',
      UPDATE: 'Update'
    },
    WISHLIST: {
      TITLE: 'Wishlist',
      EMPTY_MESSAGE: 'Your wishlist is empty',
      ADD_TO_WISHLIST: 'Add to Wishlist',
      REMOVE_FROM_WISHLIST: 'Remove from Wishlist',
      MOVE_TO_CART: 'Move to Cart'
    },
    AUTH: {
      SIGN_IN: 'Sign In',
      SIGN_UP: 'Sign Up',
      SIGN_OUT: 'Sign Out',
      EMAIL: 'Email',
      PASSWORD: 'Password',
      CONFIRM_PASSWORD: 'Confirm Password',
      FORGOT_PASSWORD: 'Forgot Password?',
      REMEMBER_ME: 'Remember Me',
      CREATE_ACCOUNT: 'Create Account',
      HAVE_ACCOUNT: 'Already have an account?',
      NO_ACCOUNT: 'Don\'t have an account?',
      FIRST_NAME: 'First Name',
      LAST_NAME: 'Last Name',
      PHONE: 'Phone Number'
    },
    CHECKOUT: {
      TITLE: 'Checkout',
      SHIPPING_ADDRESS: 'Shipping Address',
      BILLING_ADDRESS: 'Billing Address',
      PAYMENT_METHOD: 'Payment Method',
      ORDER_SUMMARY: 'Order Summary',
      PLACE_ORDER: 'Place Order',
      PROCESSING: 'Processing...',
      ORDER_CONFIRMED: 'Order Confirmed!',
      DELIVERY_INFO: 'Delivery Information',
      CONTACT_INFO: 'Contact Information'
    },
    PROFILE: {
      TITLE: 'My Profile',
      ACCOUNT_INFO: 'Account Information',
      ORDER_HISTORY: 'Order History',
      ADDRESSES: 'Addresses',
      PAYMENT_METHODS: 'Payment Methods',
      PREFERENCES: 'Preferences',
      NOTIFICATIONS: 'Notifications'
    }
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    GENERAL: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    NOT_FOUND: 'Page not found.',
    UNAUTHORIZED: 'Please sign in to continue.',
    VALIDATION: {
      REQUIRED: 'This field is required.',
      INVALID_EMAIL: 'Please enter a valid email address.',
      PASSWORD_MIN: 'Password must be at least 8 characters.',
      PASSWORD_MISMATCH: 'Passwords do not match.'
    }
  },
  
  // Success Messages
  SUCCESS_MESSAGES: {
    PRODUCT_ADDED: 'Product added to cart!',
    WISHLIST_ADDED: 'Added to wishlist!',
    WISHLIST_REMOVED: 'Removed from wishlist!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    ORDER_PLACED: 'Order placed successfully!',
    NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to newsletter!'
  },
  
  // Promotional
  PROMOTIONS: {
    FIRST_ORDER_DISCOUNT: 10,
    LOYALTY_PROGRAM_NAME: 'Aura Rewards',
    MEMBER_BENEFITS: [
      'Early access to sales',
      'Free shipping on all orders',
      'Birthday discounts',
      'Exclusive member pricing'
    ]
  },
  
  // Animation & UI
  UI: {
    ANIMATION_DURATION: 300,
    LOADING_DELAY: 1000,
    TOAST_DURATION: 3000,
    HERO_SLIDES_DURATION: 5000
  },
  
  // SEO & Meta
  SEO: {
    SITE_DESCRIPTION: 'Discover your signature style with Aura - premium fashion for confident women',
    KEYWORDS: ['fashion', 'women', 'clothing', 'style', 'premium', 'India'],
    AUTHOR: 'Aura Fashion'
  },

  // Skincare Section - Women-Focused
  SKINCARE: {
    HERO: {
      TITLE: 'Your Radiant Journey Starts Here',
      SUBTITLE: 'Discover skincare crafted for every beautiful stage of your life',
      DESCRIPTION: 'Embrace your natural glow with our curated collection of premium skincare essentials, thoughtfully selected for the modern woman who deserves nothing but the best.',
      CTA: 'Explore Your Glow',
      BACKGROUND_TEXT: 'Self-care isn\'t selfish—it\'s essential'
    },
    CATEGORIES: {
      CLEANSERS: {
        name: 'Gentle Cleansers',
        description: 'Start your ritual with loving care',
        icon: '🧴',
        benefits: ['Deep cleansing', 'Maintains pH balance', 'Removes makeup gently']
      },
      SERUMS: {
        name: 'Targeted Serums',
        description: 'Concentrated care for your concerns',
        icon: '💧',
        benefits: ['Anti-aging power', 'Hydration boost', 'Brightening effect']
      },
      MOISTURIZERS: {
        name: 'Nourishing Moisturizers',
        description: 'Lock in your radiance',
        icon: '🌸',
        benefits: ['24h hydration', 'Skin barrier repair', 'Silky smooth finish']
      },
      SUNSCREEN: {
        name: 'Daily Protection',
        description: 'Shield your beauty from within',
        icon: '☀️',
        benefits: ['Broad spectrum SPF', 'Anti-aging protection', 'Invisible finish']
      },
      MASKS: {
        name: 'Luxe Treatments',
        description: 'Weekly indulgence for your skin',
        icon: '✨',
        benefits: ['Deep nourishment', 'Instant glow', 'Spa-like experience']
      },
      EYES: {
        name: 'Eye Essentials',
        description: 'Gentle care for delicate beauty',
        icon: '👁️',
        benefits: ['Reduces puffiness', 'Minimizes fine lines', 'Brightens dark circles']
      }
    },
    SKIN_TYPES: {
      OILY: {
        name: 'Oily Skin',
        description: 'Balance and control shine while maintaining natural beauty',
        icon: '🌟',
        color: '#E8F5E8',
        needs: ['Oil control', 'Pore refinement', 'Mattifying care'],
        routine_focus: 'Balance without stripping your skin\'s natural protective barrier'
      },
      DRY: {
        name: 'Dry Skin',
        description: 'Intensive hydration for soft, supple radiance',
        icon: '💎',
        color: '#F0F8FF',
        needs: ['Deep hydration', 'Barrier repair', 'Gentle nourishment'],
        routine_focus: 'Rich, nourishing formulas that restore your natural glow'
      },
      COMBINATION: {
        name: 'Combination Skin',
        description: 'Harmonize different zones for overall balance',
        icon: '🌈',
        color: '#FFF8E7',
        needs: ['Zone-specific care', 'Balanced hydration', 'Gentle regulation'],
        routine_focus: 'Targeted solutions for your unique skin patterns'
      },
      SENSITIVE: {
        name: 'Sensitive Skin',
        description: 'Gentle, soothing care for reactive beauty',
        icon: '🌺',
        color: '#FFE4E1',
        needs: ['Calming formulas', 'Fragrance-free', 'Minimal ingredients'],
        routine_focus: 'Pure, gentle ingredients that respect your skin\'s sensitivity'
      },
      MATURE: {
        name: 'Mature Skin',
        description: 'Age-gracefully with targeted anti-aging care',
        icon: '👑',
        color: '#F5F0FF',
        needs: ['Collagen support', 'Firmness', 'Deep nourishment'],
        routine_focus: 'Sophisticated formulas that celebrate your skin\'s wisdom'
      }
    },
    CONCERNS: {
      ACNE: {
        name: 'Breakout Care',
        description: 'Clear, confident skin is within reach',
        treatments: ['Salicylic acid', 'Gentle exfoliation', 'Anti-inflammatory'],
        message: 'Your skin\'s journey to clarity deserves patience and gentle care'
      },
      AGING: {
        name: 'Age-Defying',
        description: 'Embrace every stage of your beautiful life',
        treatments: ['Retinoids', 'Peptides', 'Antioxidants'],
        message: 'Aging gracefully means caring for yourself with intention'
      },
      DARK_SPOTS: {
        name: 'Brightening',
        description: 'Even tone, radiant confidence',
        treatments: ['Vitamin C', 'Niacinamide', 'Alpha arbutin'],
        message: 'Your natural radiance deserves to shine through'
      },
      HYDRATION: {
        name: 'Moisture Balance',
        description: 'Quench your skin\'s thirst for lasting comfort',
        treatments: ['Hyaluronic acid', 'Ceramides', 'Glycerin'],
        message: 'Hydrated skin is happy skin—and happy skin glows'
      }
    },
    INGREDIENTS: {
      FEATURED: {
        'Hyaluronic Acid': {
          benefit: 'Intense hydration & plumping',
          description: 'Nature\'s moisture magnet for bouncy, dewy skin',
          suitable_for: ['All skin types', 'Dehydrated skin'],
          icon: '💧'
        },
        'Vitamin C': {
          benefit: 'Brightening & antioxidant protection',
          description: 'Your daily dose of radiance and environmental defense',
          suitable_for: ['Dull skin', 'Uneven tone'],
          icon: '🍊'
        },
        'Retinol': {
          benefit: 'Anti-aging & skin renewal',
          description: 'The gold standard for youthful, refined skin texture',
          suitable_for: ['Mature skin', 'Fine lines'],
          icon: '✨'
        },
        'Niacinamide': {
          benefit: 'Pore refinement & oil control',
          description: 'The gentle multitasker for balanced, smooth skin',
          suitable_for: ['Oily skin', 'Large pores'],
          icon: '🌟'
        },
        'Ceramides': {
          benefit: 'Barrier repair & long-lasting moisture',
          description: 'Strengthen your skin\'s natural protective shield',
          suitable_for: ['Dry skin', 'Sensitive skin'],
          icon: '🛡️'
        }
      }
    },
    ROUTINES: {
      MORNING: {
        name: 'Morning Glow Ritual',
        description: 'Start your day with intention and radiance',
        steps: [
          { order: 1, step: 'Gentle Cleanser', purpose: 'Fresh start for your skin' },
          { order: 2, step: 'Vitamin C Serum', purpose: 'Antioxidant protection & glow' },
          { order: 3, step: 'Moisturizer', purpose: 'Hydration & comfort' },
          { order: 4, step: 'SPF Protection', purpose: 'Shield your investment' }
        ],
        motto: 'Every morning is a chance to nurture the skin you\'re in'
      },
      EVENING: {
        name: 'Nighttime Restoration',
        description: 'Wind down with luxurious self-care',
        steps: [
          { order: 1, step: 'Double Cleanse', purpose: 'Remove the day with care' },
          { order: 2, step: 'Treatment Serum', purpose: 'Targeted overnight repair' },
          { order: 3, step: 'Face Oil or Night Cream', purpose: 'Deep nourishment while you rest' },
          { order: 4, step: 'Eye Treatment', purpose: 'Special care for delicate areas' }
        ],
        motto: 'Your skin repairs best when you rest—make it count'
      }
    },
    PERSONALIZATION: {
      QUIZ_INTRO: 'Let\'s discover your perfect skincare match—because every woman\'s skin is beautifully unique',
      QUESTIONS: [
        {
          id: 'skin_type',
          question: 'How would you describe your skin throughout most of the day?',
          options: [
            { value: 'oily', label: 'Oily - Shiny, especially in T-zone' },
            { value: 'dry', label: 'Dry - Tight, flaky, or rough patches' },
            { value: 'combination', label: 'Combination - Oily T-zone, normal/dry cheeks' },
            { value: 'sensitive', label: 'Sensitive - Easily irritated or reactive' },
            { value: 'normal', label: 'Normal - Balanced and comfortable' }
          ]
        },
        {
          id: 'main_concern',
          question: 'What\'s your primary skin concern right now?',
          options: [
            { value: 'acne', label: 'Breakouts and blemishes' },
            { value: 'aging', label: 'Fine lines and aging prevention' },
            { value: 'dark_spots', label: 'Dark spots and uneven tone' },
            { value: 'hydration', label: 'Dryness and dehydration' },
            { value: 'sensitivity', label: 'Redness and irritation' }
          ]
        },
        {
          id: 'age_group',
          question: 'Which age range best describes you?',
          options: [
            { value: 'teens', label: 'Teens (13-19)' },
            { value: 'twenties', label: '20s - Building healthy habits' },
            { value: 'thirties', label: '30s - Prevention and maintenance' },
            { value: 'forties', label: '40s - Targeted anti-aging' },
            { value: 'fifties_plus', label: '50+ - Mature skin care' }
          ]
        }
      ]
    },
    UI_TEXT: {
      SHOP_ALL: 'Shop All Skincare',
      FILTER_BY: 'Filter by',
      SKIN_TYPE: 'Skin Type',
      CONCERN: 'Skin Concern',
      PRICE_RANGE: 'Price Range',
      INGREDIENTS: 'Key Ingredients',
      PERFECT_MATCH: 'Perfect Match for You',
      RECOMMENDED: 'Recommended for Your Skin',
      ROUTINE_BUILDER: 'Build Your Routine',
      SKIN_QUIZ: 'Take Skin Quiz',
      EXPERT_TIPS: 'Expert Beauty Tips',
      INGREDIENT_FOCUS: 'Ingredient Spotlight',
      REVIEWS_FROM_WOMEN: 'Real Reviews from Real Women',
      SKIN_GOALS: 'Achieve Your Skin Goals',
      SELF_CARE_MOMENT: 'Your Self-Care Moment',
      GLOW_UP: 'Ready to Glow Up?',
      SKIN_JOURNEY: 'Your Skin Journey',
      BEAUTY_RITUAL: 'Daily Beauty Ritual'
    },
    MESSAGING: {
      EMPOWERING: [
        'Your skin, your rules—we\'re just here to support your journey',
        'Beautiful skin isn\'t about perfection, it\'s about feeling confident in your own skin',
        'Every woman deserves to feel radiant—let\'s make it happen together',
        'Your skincare routine is your daily act of self-love'
      ],
      EDUCATIONAL: [
        'Understanding your skin is the first step to loving it',
        'Great skin doesn\'t happen overnight—it\'s built with consistent care',
        'The best skincare routine is the one you\'ll actually stick to',
        'Quality ingredients make all the difference in your skin\'s health'
      ]
    }
  }
};

// Helper functions for dynamic values
export const getRandomRating = () => {
  const min = APP_CONFIG.PRODUCTS.MIN_RATING;
  const max = APP_CONFIG.PRODUCTS.MAX_RATING;
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
};

export const getRandomReviewCount = () => {
  return Math.floor(Math.random() * 100) + 10; // 10-110 reviews
};

export const isProductNew = (createdAt: Date | number) => {
  const productDate = typeof createdAt === 'number' ? createdAt : createdAt.getTime();
  return Date.now() - productDate < APP_CONFIG.PRODUCTS.NEW_PRODUCT_DAYS * 24 * 60 * 60 * 1000;
};

export const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
    style: 'currency',
    currency: APP_CONFIG.CURRENCY.CODE,
  }).format(amount);
};
