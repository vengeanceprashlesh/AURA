// Dynamic product data generator for consistent mock products
import { APP_CONFIG, getRandomRating, getRandomReviewCount, formatCurrency } from '@/config/constants';

export interface MockProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
}

// Base product templates with increased prices (1.5x multiplier)
const PRODUCT_TEMPLATES = {
  cotton: [
    {
      name: "Organic Cotton Basic Tee",
      basePrice: 4499, // ₹4499 (was ₹2999)
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    },
    {
      name: "Cotton Loungewear Set", 
      basePrice: 11249, // ₹11249 (was ₹7499)
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    },
    {
      name: "Breathable Cotton Dress",
      basePrice: 10499, // ₹10499 (was ₹6999)
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    },
    {
      name: "Cotton Canvas Pants",
      basePrice: 8999, // ₹8999 (was ₹5999)
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    },
    {
      name: "Soft Cotton Cardigan",
      basePrice: 13499, // ₹13499 (was ₹8999)
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    },
    {
      name: "Cotton Sleep Set",
      basePrice: 7499, // ₹7499 (was ₹4999)
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    },
    {
      name: "Oversized Cotton Shirt",
      basePrice: 6899, // ₹6899 (was ₹4599)
      image: "https://images.unsplash.com/photo-1566479179817-b83216806cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    },
    {
      name: "Cotton Blend Joggers",
      basePrice: 5999, // ₹5999 (was ₹3999)
      image: "https://images.unsplash.com/photo-1506629905138-48ac2a2b2d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Cotton"
    }
  ],
  newArrivals: [
    {
      name: "Floral Maxi Dress",
      basePrice: 13499, // ₹13499 (was ₹8999)
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300",
      category: "New Arrivals"
    },
    {
      name: "Silk Blouse",
      basePrice: 10499, // ₹10499 (was ₹6999)
      image: "https://images.unsplash.com/photo-1591369867040-6bafcf5e2cb9?w=300",
      category: "New Arrivals"
    },
    {
      name: "High-waisted Trousers",
      basePrice: 11999, // ₹11999 (was ₹7999)
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300",
      category: "New Arrivals"
    },
    {
      name: "Chiffon Top",
      basePrice: 7499, // ₹7499 (was ₹4999)
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      category: "New Arrivals"
    },
    {
      name: "Midi Skirt",
      basePrice: 8999, // ₹8999 (was ₹5999)
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=300",
      category: "New Arrivals"
    },
    {
      name: "Wrap Dress",
      basePrice: 14999, // ₹14999 (was ₹9999)
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300",
      category: "New Arrivals"
    }
  ],
  bestSellers: [
    {
      name: "Classic White Shirt",
      basePrice: 7499, // ₹7499 (was ₹4999)
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=300",
      category: "Best Sellers"
    },
    {
      name: "Black Midi Dress",
      basePrice: 11999, // ₹11999 (was ₹7999)
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300",
      category: "Best Sellers"
    },
    {
      name: "Denim Jacket",
      basePrice: 10499, // ₹10499 (was ₹6999)
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300",
      category: "Best Sellers"
    },
    {
      name: "Pleated Skirt",
      basePrice: 8999, // ₹8999 (was ₹5999)
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=300",
      category: "Best Sellers"
    },
    {
      name: "Knit Sweater",
      basePrice: 13499, // ₹13499 (was ₹8999)
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=300",
      category: "Best Sellers"
    },
    {
      name: "Wide-leg Pants",
      basePrice: 11249, // ₹11249 (was ₹7499)
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
      category: "Best Sellers"
    }
  ]
};

// Generate dynamic product data
export const generateProducts = (category: keyof typeof PRODUCT_TEMPLATES, count?: number): MockProduct[] => {
  const templates = PRODUCT_TEMPLATES[category];
  const productsToGenerate = count || templates.length;
  
  return Array.from({ length: productsToGenerate }, (_, index) => {
    const template = templates[index % templates.length];
    const hasDiscount = Math.random() > 0.6; // 40% chance of discount
    
    const originalPrice = hasDiscount ? 
      Math.round(template.basePrice * (1 + Math.random() * 0.5)) : // Up to 50% original markup
      undefined;
    
    return {
      id: index + 1,
      name: template.name,
      price: template.basePrice,
      originalPrice,
      image: template.image,
      rating: getRandomRating(),
      reviews: getRandomReviewCount(),
      category: template.category,
      description: `Premium ${template.category.toLowerCase()} piece crafted with attention to detail and comfort.`
    };
  });
};

// Helper function to format prices consistently
export const formatProductPrice = (price: number, originalPrice?: number) => {
  return {
    current: formatCurrency(price),
    original: originalPrice ? formatCurrency(originalPrice) : null,
    discount: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  };
};

// Get products by category
export const getCottonProducts = () => generateProducts('cotton');
export const getNewArrivalProducts = () => generateProducts('newArrivals'); 
export const getBestSellerProducts = () => generateProducts('bestSellers');

// Generate mixed products for general pages
export const getMixedProducts = (count: number = 12): MockProduct[] => {
  const allCategories = Object.keys(PRODUCT_TEMPLATES) as (keyof typeof PRODUCT_TEMPLATES)[];
  const products: MockProduct[] = [];
  
  for (let i = 0; i < count; i++) {
    const categoryIndex = i % allCategories.length;
    const category = allCategories[categoryIndex];
    const categoryProducts = generateProducts(category, 1);
    products.push({
      ...categoryProducts[0],
      id: i + 1
    });
  }
  
  return products;
};
