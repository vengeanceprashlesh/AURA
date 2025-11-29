// Skincare utility functions

import type {
  SkinProfile,
  SkincareProduct,
  SkinType,
  SkinConcern,
  SkincareFilter,
  SkincareRoutine,
  SkinQuizResult
} from '@/types/skincare';
import { APP_CONFIG } from '@/config/constants';

/**
 * Calculate match score between a product and user's skin profile
 * Returns a score from 0-100
 */
export function calculateProductMatch(product: SkincareProduct, skinProfile: SkinProfile): number {
  let score = 0;
  let factors = 0;

  // Skin type match (40% weight)
  if (product.skinTypes.includes(skinProfile.skinType)) {
    score += 40;
  } else if (product.skinTypes.includes('normal') || skinProfile.skinType === 'normal') {
    score += 20; // Partial match for normal skin
  }
  factors += 40;

  // Primary concern match (30% weight)
  if (product.concerns.includes(skinProfile.primaryConcern)) {
    score += 30;
  }
  factors += 30;

  // Secondary concerns match (20% weight)
  const secondaryMatches = product.concerns.filter(concern =>
    skinProfile.secondaryConcerns.includes(concern)
  ).length;
  if (secondaryMatches > 0) {
    score += Math.min(20, (secondaryMatches / skinProfile.secondaryConcerns.length) * 20);
  }
  factors += 20;

  // Age group match (10% weight)
  if (product.ageGroups.includes(skinProfile.ageGroup)) {
    score += 10;
  }
  factors += 10;

  return Math.round((score / factors) * 100);
}

/**
 * Get personalized message for a product based on user's skin profile
 */
export function getPersonalizedMessage(product: SkincareProduct, skinProfile: SkinProfile): string {
  const skinTypeConfig = APP_CONFIG.SKINCARE.SKIN_TYPES[skinProfile.skinType.toUpperCase() as keyof typeof APP_CONFIG.SKINCARE.SKIN_TYPES];
  const concernConfig = APP_CONFIG.SKINCARE.CONCERNS[skinProfile.primaryConcern.toUpperCase() as keyof typeof APP_CONFIG.SKINCARE.CONCERNS];

  const messages = [
    `Perfect for your ${skinTypeConfig?.name.toLowerCase()} - ${product.name} provides exactly what you need`,
    `Ideal for addressing ${concernConfig?.name.toLowerCase()} - this formula targets your main skin goal`,
    `Recommended for ${skinProfile.ageGroup === 'twenties' ? 'building healthy habits in your 20s' :
      skinProfile.ageGroup === 'thirties' ? 'prevention and maintenance in your 30s' :
        skinProfile.ageGroup === 'forties' ? 'targeted care in your 40s' :
          skinProfile.ageGroup === 'fifties_plus' ? 'mature skin care' : 'your age group'}`,
    `Great match for your skin type - ${product.description}`
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Filter products based on skincare-specific criteria
 */
export function filterSkincareProducts(
  products: SkincareProduct[],
  filters: Partial<SkincareFilter>,
  skinProfile?: SkinProfile
): SkincareProduct[] {
  let filtered = [...products];

  // Filter by skin types
  if (filters.skinTypes && filters.skinTypes.length > 0) {
    filtered = filtered.filter(product =>
      product.skinTypes.some(type => filters.skinTypes!.includes(type))
    );
  }

  // Filter by concerns
  if (filters.concerns && filters.concerns.length > 0) {
    filtered = filtered.filter(product =>
      product.concerns.some(concern => filters.concerns!.includes(concern))
    );
  }

  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      filters.categories!.includes(product.category)
    );
  }

  // Filter by price range
  if (filters.priceRange) {
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max
    );
  }

  // Filter by ingredients
  if (filters.ingredients && filters.ingredients.length > 0) {
    filtered = filtered.filter(product =>
      product.keyIngredients.some(ingredient =>
        filters.ingredients!.some(filterIngredient =>
          ingredient.name.toLowerCase().includes(filterIngredient.toLowerCase())
        )
      )
    );
  }

  // Filter by brands
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(product =>
      filters.brands!.includes(product.brand)
    );
  }

  // Filter by features
  if (filters.features) {
    if (filters.features.vegan) {
      filtered = filtered.filter(product => product.isVegan);
    }
    if (filters.features.crueltyFree) {
      filtered = filtered.filter(product => product.isCrueltyFree);
    }
    if (filters.features.fragranceFree) {
      filtered = filtered.filter(product => product.isFragranceFree);
    }
    if (filters.features.spf) {
      filtered = filtered.filter(product => product.spfValue && product.spfValue > 0);
    }
  }

  // Filter by rating
  if (filters.rating) {
    filtered = filtered.filter(product => product.rating >= filters.rating!.min);
  }

  // Calculate match scores if skin profile is provided
  if (skinProfile) {
    filtered = filtered.map(product => ({
      ...product,
      matchScore: calculateProductMatch(product, skinProfile),
      personalizedMessage: getPersonalizedMessage(product, skinProfile)
    }));
  }

  return filtered;
}

/**
 * Sort skincare products based on various criteria
 */
export function sortSkincareProducts(
  products: SkincareProduct[],
  sortBy: string
): SkincareProduct[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'match_score':
      return sorted.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    case 'popularity':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price_low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

/**
 * Get recommended routine order for products
 */
export function getRoutineOrder(products: SkincareProduct[]): SkincareProduct[] {
  return products.sort((a, b) => a.routineStep - b.routineStep);
}

/**
 * Build a complete skincare routine based on skin profile
 */
export function buildSkincareRoutine(
  products: SkincareProduct[],
  skinProfile: SkinProfile
): SkincareRoutine {
  const filtered = filterSkincareProducts(products, {
    skinTypes: [skinProfile.skinType],
    concerns: [skinProfile.primaryConcern, ...skinProfile.secondaryConcerns]
  }, skinProfile);

  const essentialCategories = ['cleansers', 'moisturizers', 'sunscreen'];
  const treatmentCategories = ['serums'];
  const weeklyCategories = ['masks', 'exfoliants'];

  // Morning routine
  const morningProducts = filtered
    .filter(p => p.applicationTime.includes('morning') || p.applicationTime.includes('both'))
    .filter(p => essentialCategories.includes(p.category) ||
      (treatmentCategories.includes(p.category) && p.matchScore! > 80))
    .slice(0, 4);

  // Evening routine  
  const eveningProducts = filtered
    .filter(p => p.applicationTime.includes('evening') || p.applicationTime.includes('both'))
    .filter(p => essentialCategories.includes(p.category) ||
      treatmentCategories.includes(p.category))
    .slice(0, 5);

  // Weekly treatments
  const weeklyProducts = filtered
    .filter(p => weeklyCategories.includes(p.category) || p.applicationTime.includes('weekly'))
    .slice(0, 2);

  const allProducts = [...new Set([...morningProducts, ...eveningProducts, ...weeklyProducts])];
  const totalCost = allProducts.reduce((sum, product) => sum + product.price, 0);

  return {
    id: `routine_${Date.now()}`,
    name: `${skinProfile.skinType} Skin Routine`,
    description: `Personalized routine for ${skinProfile.skinType} skin with ${skinProfile.primaryConcern} concerns`,
    skinProfile,
    morning: getRoutineOrder(morningProducts),
    evening: getRoutineOrder(eveningProducts),
    weekly: weeklyProducts,
    totalCost,
    routineComplexity: allProducts.length <= 4 ? 'beginner' : allProducts.length <= 7 ? 'intermediate' : 'advanced',
    expectedResults: getExpectedResults(skinProfile),
    timeline: getTimeline(skinProfile)
  };
}

/**
 * Get expected results based on skin profile
 */
function getExpectedResults(skinProfile: SkinProfile): string[] {
  const results = [];
  const concernConfig = APP_CONFIG.SKINCARE.CONCERNS[skinProfile.primaryConcern.toUpperCase() as keyof typeof APP_CONFIG.SKINCARE.CONCERNS];

  results.push(`Improved ${concernConfig?.name.toLowerCase() || skinProfile.primaryConcern}`);
  results.push('Enhanced skin texture and radiance');
  results.push('Better hydration and comfort');

  if (skinProfile.ageGroup === 'thirties' || skinProfile.ageGroup === 'forties' || skinProfile.ageGroup === 'fifties_plus') {
    results.push('Reduced signs of aging');
  }

  return results;
}

/**
 * Get timeline based on skin profile
 */
function getTimeline(skinProfile: SkinProfile): string {
  switch (skinProfile.primaryConcern) {
    case 'hydration':
      return 'Results in 1-2 weeks';
    case 'acne':
      return 'Results in 4-6 weeks';
    case 'aging':
      return 'Results in 6-8 weeks';
    case 'dark_spots':
      return 'Results in 8-12 weeks';
    default:
      return 'Results in 2-4 weeks';
  }
}

/**
 * Analyze skin quiz answers to determine skin profile
 */
export function analyzeSkinQuiz(answers: Record<string, any>): SkinQuizResult {
  // This is a simplified version - in a real app, this would be more sophisticated
  const skinProfile: SkinProfile = {
    skinType: answers.skin_type || 'normal',
    primaryConcern: answers.main_concern || 'hydration',
    secondaryConcerns: answers.secondary_concerns || [],
    ageGroup: answers.age_group || 'twenties',
    skinSensitivity: answers.sensitivity || 'medium',
    currentRoutineComplexity: answers.routine_complexity || 'moderate',
    preferredTexture: answers.texture_preference || 'medium',
    budgetRange: answers.budget || 'mid_range',
    specificNeeds: answers.specific_needs || [],
    allergies: answers.allergies || []
  };

  return {
    skinProfile,
    confidence: 85, // This would be calculated based on answer consistency
    recommendations: {
      products: [], // Would be populated with actual product recommendations
      routine: {} as SkincareRoutine, // Would be built using buildSkincareRoutine
      tips: getSkincareTips(skinProfile)
    },
    explanation: `Based on your answers, you have ${skinProfile.skinType} skin with ${skinProfile.primaryConcern} as your main concern. We recommend a ${skinProfile.currentRoutineComplexity} routine focused on addressing your specific needs.`
  };
}

/**
 * Get personalized skincare tips
 */
function getSkincareTips(skinProfile: SkinProfile): string[] {
  const tips = [];
  const skinTypeConfig = APP_CONFIG.SKINCARE.SKIN_TYPES[skinProfile.skinType.toUpperCase() as keyof typeof APP_CONFIG.SKINCARE.SKIN_TYPES];

  tips.push(skinTypeConfig?.routine_focus || 'Follow a consistent daily routine');
  tips.push('Always wear SPF during the day');
  tips.push('Introduce new products gradually');
  tips.push('Listen to your skin and adjust as needed');

  return tips;
}

/**
 * Get personalized product recommendations based on skin profile
 */
export function getPersonalizedRecommendations(
  products: SkincareProduct[],
  skinProfile: SkinProfile
): SkincareProduct[] {
  // Filter products that match the skin profile
  const matchingProducts = filterSkincareProducts(products, {
    skinTypes: [skinProfile.skinType],
    concerns: [skinProfile.primaryConcern, ...skinProfile.secondaryConcerns]
  }, skinProfile);

  // Sort by match score and return top recommendations
  return sortSkincareProducts(matchingProducts, 'match_score').slice(0, 12);
}

/**
 * Get popular ingredients for a skin type
 */
export function getPopularIngredients(skinType: SkinType): string[] {
  const ingredientMap: Record<SkinType, string[]> = {
    oily: ['Salicylic Acid', 'Niacinamide', 'Clay', 'Tea Tree Oil'],
    dry: ['Hyaluronic Acid', 'Ceramides', 'Glycerin', 'Shea Butter'],
    combination: ['Niacinamide', 'Hyaluronic Acid', 'Salicylic Acid'],
    sensitive: ['Aloe Vera', 'Chamomile', 'Centella Asiatica', 'Oat Extract'],
    normal: ['Vitamin C', 'Hyaluronic Acid', 'Retinol', 'Peptides'],
    mature: ['Retinol', 'Peptides', 'Vitamin C', 'Coenzyme Q10']
  };

  return ingredientMap[skinType] || [];
}

/**
 * Check if an ingredient is suitable for a skin type
 */
export function isIngredientSuitable(ingredientName: string, skinType: SkinType): boolean {
  const suitableIngredients = getPopularIngredients(skinType);
  return suitableIngredients.some(ingredient =>
    ingredient.toLowerCase().includes(ingredientName.toLowerCase()) ||
    ingredientName.toLowerCase().includes(ingredient.toLowerCase())
  );
}

/**
 * Generate mock skincare products for testing
 */
export function generateMockSkincareProducts(): SkincareProduct[] {
  const brands = ['Aura Glow', 'Pure Radiance', 'Gentle Touch', 'Youth Elixir', 'Natural Beauty'];
  const mockProducts: SkincareProduct[] = [];

  // Generate cleansers
  mockProducts.push({
    id: 'cleanser-1',
    name: 'Gentle Foaming Cleanser',
    brand: brands[0],
    description: 'A gentle, pH-balanced cleanser that removes impurities without stripping your skin',
    fullDescription: 'Our gentle foaming cleanser is specially formulated for all skin types, featuring a creamy texture that transforms into a rich foam. Infused with chamomile and aloe vera, it cleanses deeply while maintaining your skin\'s natural moisture barrier.',
    price: 1875, // ₹1875 (was ₹1250)
    originalPrice: 2250, // ₹2250 (was ₹1500)
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'],
    category: 'cleansers',
    skinTypes: ['normal', 'sensitive', 'dry'],
    concerns: ['hydration', 'sensitivity'],
    ageGroups: ['teens', 'twenties', 'thirties'],
    keyIngredients: [
      { name: 'Chamomile Extract', purpose: 'Soothing', benefits: ['Calms irritation', 'Reduces redness'], suitableFor: ['sensitive'], concerns: ['sensitivity'] },
      { name: 'Aloe Vera', purpose: 'Hydrating', benefits: ['Moisturizes', 'Heals'], suitableFor: ['dry', 'sensitive'], concerns: ['hydration'] }
    ],
    applicationTime: ['morning', 'evening'],
    productType: 'cleansing',
    howToUse: ['Apply to damp skin', 'Massage gently in circular motions', 'Rinse thoroughly with lukewarm water'],
    routineStep: 1,
    frequency: 'Daily',
    volume: '150ml',
    isVegan: true,
    isCrueltyFree: true,
    isFragranceFree: true,
    isHypoallergenic: true,
    inStock: true,
    stockQuantity: 25,
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    isNew: false,
    tags: ['gentle', 'sensitive-skin', 'daily-use'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Generate vitamin C serum
  mockProducts.push({
    id: 'serum-1',
    name: 'Vitamin C Brightening Serum',
    brand: brands[1],
    description: 'Powerful antioxidant serum that brightens and protects your skin',
    fullDescription: 'This potent vitamin C serum contains 15% L-ascorbic acid to brighten dull skin, fade dark spots, and provide antioxidant protection. Enhanced with hyaluronic acid for hydration and vitamin E for stability.',
    price: 4200, // ₹4200 (was ₹2800)
    originalPrice: 4800, // ₹4800 (was ₹3200)
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop'],
    category: 'serums',
    skinTypes: ['normal', 'oily', 'combination'],
    concerns: ['dark_spots', 'dullness', 'aging'],
    ageGroups: ['twenties', 'thirties', 'forties'],
    keyIngredients: [
      { name: 'Vitamin C (L-Ascorbic Acid)', concentration: '15%', purpose: 'Brightening', benefits: ['Fades dark spots', 'Antioxidant protection', 'Boosts collagen'], suitableFor: ['normal', 'oily'], concerns: ['dark_spots', 'aging'] },
      { name: 'Hyaluronic Acid', purpose: 'Hydrating', benefits: ['Intense hydration', 'Plumping effect'], suitableFor: ['normal', 'oily', 'dry', 'combination', 'sensitive', 'mature'], concerns: ['hydration'] }
    ],
    applicationTime: ['morning'],
    productType: 'treatment',
    howToUse: ['Apply to clean skin', 'Use 2-3 drops on face and neck', 'Follow with moisturizer and SPF'],
    routineStep: 3,
    frequency: 'Daily (morning)',
    volume: '30ml',
    isVegan: true,
    isCrueltyFree: true,
    isFragranceFree: false,
    isHypoallergenic: false,
    inStock: true,
    stockQuantity: 18,
    rating: 4.8,
    reviewCount: 203,
    featured: true,
    isNew: true,
    tags: ['vitamin-c', 'brightening', 'anti-aging'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Generate moisturizer
  mockProducts.push({
    id: 'moisturizer-1',
    name: 'Hydrating Daily Moisturizer',
    brand: brands[2],
    description: 'Lightweight yet nourishing moisturizer for all-day hydration',
    fullDescription: 'A perfect balance of hydration and comfort, this daily moisturizer features ceramides and peptides to strengthen your skin barrier while providing long-lasting moisture without feeling heavy.',
    price: 2775, // ₹2775 (was ₹1850)
    images: ['https://images.unsplash.com/photo-1556228578-dd6e85c58981?w=400&h=400&fit=crop'],
    category: 'moisturizers',
    skinTypes: ['normal', 'dry', 'combination'],
    concerns: ['hydration', 'aging'],
    ageGroups: ['twenties', 'thirties', 'forties', 'fifties_plus'],
    keyIngredients: [
      { name: 'Ceramides', purpose: 'Barrier repair', benefits: ['Strengthens skin barrier', 'Locks in moisture'], suitableFor: ['dry', 'sensitive'], concerns: ['hydration'] },
      { name: 'Peptides', purpose: 'Anti-aging', benefits: ['Boosts collagen', 'Firms skin'], suitableFor: ['mature'], concerns: ['aging'] }
    ],
    applicationTime: ['morning', 'evening'],
    productType: 'maintenance',
    howToUse: ['Apply to clean skin', 'Massage gently until absorbed', 'Use morning and evening'],
    routineStep: 4,
    frequency: 'Daily',
    volume: '50ml',
    isVegan: false,
    isCrueltyFree: true,
    isFragranceFree: true,
    isHypoallergenic: true,
    inStock: true,
    stockQuantity: 32,
    rating: 4.6,
    reviewCount: 89,
    featured: false,
    isNew: false,
    tags: ['hydrating', 'daily-use', 'anti-aging'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Generate SPF
  mockProducts.push({
    id: 'sunscreen-1',
    name: 'Invisible Daily SPF 50',
    brand: brands[3],
    description: 'Lightweight, invisible sunscreen that protects without white cast',
    fullDescription: 'Our advanced mineral sunscreen provides broad-spectrum SPF 50 protection with a weightless, invisible finish. Perfect under makeup and suitable for all skin tones.',
    price: 3300, // ₹3300 (was ₹2200)
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'],
    category: 'sunscreen',
    skinTypes: ['normal', 'oily', 'combination', 'sensitive'],
    concerns: ['aging'],
    ageGroups: ['teens', 'twenties', 'thirties', 'forties', 'fifties_plus'],
    keyIngredients: [
      { name: 'Zinc Oxide', concentration: '20%', purpose: 'UV protection', benefits: ['Broad spectrum protection', 'Gentle on skin'], suitableFor: ['sensitive'], concerns: ['aging'] },
      { name: 'Niacinamide', purpose: 'Skin conditioning', benefits: ['Minimizes pores', 'Controls oil'], suitableFor: ['oily'], concerns: ['pores'] }
    ],
    applicationTime: ['morning'],
    productType: 'protection',
    howToUse: ['Apply as last step of morning routine', 'Use liberally on face and neck', 'Reapply every 2 hours'],
    routineStep: 5,
    frequency: 'Daily (morning)',
    volume: '50ml',
    spfValue: 50,
    isVegan: true,
    isCrueltyFree: true,
    isFragranceFree: true,
    isHypoallergenic: true,
    inStock: true,
    stockQuantity: 41,
    rating: 4.9,
    reviewCount: 267,
    featured: true,
    isNew: false,
    tags: ['spf-50', 'mineral', 'invisible-finish'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return mockProducts;
}
