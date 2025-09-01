// Skincare-specific types and interfaces

export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal' | 'mature';

export type SkinConcern = 'acne' | 'aging' | 'dark_spots' | 'hydration' | 'sensitivity' | 'pores' | 'dullness' | 'redness';

export type AgeGroup = 'teens' | 'twenties' | 'thirties' | 'forties' | 'fifties_plus';

export type SkincareCategory = 'cleansers' | 'serums' | 'moisturizers' | 'sunscreen' | 'masks' | 'eyes' | 'toners' | 'exfoliants' | 'oils';

export type ApplicationTime = 'morning' | 'evening' | 'both' | 'weekly' | 'as_needed';

export interface Ingredient {
  name: string;
  concentration?: string;
  purpose: string;
  benefits: string[];
  suitableFor: SkinType[];
  concerns: SkinConcern[];
  icon?: string;
}

export interface SkincareProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: SkincareCategory;
  subCategory?: string;
  
  // Skincare-specific fields
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  ageGroups: AgeGroup[];
  keyIngredients: Ingredient[];
  applicationTime: ApplicationTime[];
  productType: 'treatment' | 'maintenance' | 'protection' | 'cleansing';
  
  // Usage & Application
  howToUse: string[];
  routineStep: number; // 1-10, order in skincare routine
  frequency: string; // "Daily", "2-3 times per week", etc.
  volume: string; // "30ml", "50ml", etc.
  
  // Product attributes
  isVegan: boolean;
  isCrueltyFree: boolean;
  isFragranceFree: boolean;
  isHypoallergenic: boolean;
  spfValue?: number;
  
  // Personalization
  matchScore?: number; // 0-100 based on user's skin profile
  isRecommended?: boolean;
  personalizedMessage?: string;
  
  // Standard product fields
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SkinProfile {
  skinType: SkinType;
  primaryConcern: SkinConcern;
  secondaryConcerns: SkinConcern[];
  ageGroup: AgeGroup;
  skinSensitivity: 'low' | 'medium' | 'high';
  currentRoutineComplexity: 'minimal' | 'moderate' | 'extensive';
  preferredTexture: 'light' | 'medium' | 'rich';
  budgetRange: 'budget' | 'mid_range' | 'luxury';
  specificNeeds: string[];
  allergies: string[];
}

export interface SkincareRoutine {
  id: string;
  name: string;
  description: string;
  skinProfile: SkinProfile;
  morning: SkincareProduct[];
  evening: SkincareProduct[];
  weekly: SkincareProduct[];
  totalCost: number;
  routineComplexity: 'beginner' | 'intermediate' | 'advanced';
  expectedResults: string[];
  timeline: string; // "Results in 2-4 weeks"
}

export interface SkincareReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAge?: AgeGroup;
  userSkinType?: SkinType;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  photos: string[];
  beforeAfter?: {
    before: string;
    after: string;
    timeframe: string;
  };
  createdAt: string;
}

export interface SkincareFilter {
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  categories: SkincareCategory[];
  priceRange: {
    min: number;
    max: number;
  };
  ingredients: string[];
  brands: string[];
  features: {
    vegan?: boolean;
    crueltyFree?: boolean;
    fragranceFree?: boolean;
    spf?: boolean;
  };
  rating: {
    min: number;
  };
}

export interface SkinQuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale' | 'image';
  options: {
    value: string;
    label: string;
    description?: string;
    image?: string;
  }[];
  category: 'skin_type' | 'concerns' | 'lifestyle' | 'preferences';
}

export interface SkinQuizResult {
  skinProfile: SkinProfile;
  confidence: number; // 0-100
  recommendations: {
    products: SkincareProduct[];
    routine: SkincareRoutine;
    tips: string[];
  };
  explanation: string;
}

// Admin-specific types for skincare management
export interface SkincareProductFormData {
  name: string;
  brand: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  images: File[] | string[];
  category: SkincareCategory;
  subCategory?: string;
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  ageGroups: AgeGroup[];
  keyIngredients: {
    name: string;
    concentration?: string;
    purpose: string;
  }[];
  applicationTime: ApplicationTime[];
  productType: 'treatment' | 'maintenance' | 'protection' | 'cleansing';
  howToUse: string[];
  routineStep: number;
  frequency: string;
  volume: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  isFragranceFree: boolean;
  isHypoallergenic: boolean;
  spfValue?: number;
  stockQuantity: number;
  featured: boolean;
  tags: string[];
}

export interface SkincareAnalytics {
  topConcerns: {
    concern: SkinConcern;
    percentage: number;
  }[];
  popularSkinTypes: {
    type: SkinType;
    percentage: number;
  }[];
  bestSellingProducts: SkincareProduct[];
  averageOrderValue: number;
  customerSatisfaction: number;
  quizCompletions: number;
  routineAdoption: number;
}

// Utility types
export type SkincareProductSort = 
  | 'popularity' 
  | 'rating' 
  | 'price_low' 
  | 'price_high' 
  | 'newest' 
  | 'name' 
  | 'match_score';

export interface SkincareSearchParams {
  query?: string;
  category?: SkincareCategory;
  skinType?: SkinType;
  concern?: SkinConcern;
  priceRange?: {
    min: number;
    max: number;
  };
  sort?: SkincareProductSort;
  page?: number;
  limit?: number;
}
