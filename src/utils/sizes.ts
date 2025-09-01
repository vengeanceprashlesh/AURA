// Size configurations for different product categories

export interface SizeOption {
  label: string;
  value: string;
}

// Clothing sizes (general apparel)
export const CLOTHING_SIZES: SizeOption[] = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
  { label: 'XXL', value: 'xxl' },
];

// Shoe sizes (US Women's sizing)
export const SHOE_SIZES: SizeOption[] = [
  { label: '5', value: '5' },
  { label: '5.5', value: '5.5' },
  { label: '6', value: '6' },
  { label: '6.5', value: '6.5' },
  { label: '7', value: '7' },
  { label: '7.5', value: '7.5' },
  { label: '8', value: '8' },
  { label: '8.5', value: '8.5' },
  { label: '9', value: '9' },
  { label: '9.5', value: '9.5' },
  { label: '10', value: '10' },
  { label: '10.5', value: '10.5' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
];

// Ring sizes
export const RING_SIZES: SizeOption[] = [
  { label: '4', value: '4' },
  { label: '4.5', value: '4.5' },
  { label: '5', value: '5' },
  { label: '5.5', value: '5.5' },
  { label: '6', value: '6' },
  { label: '6.5', value: '6.5' },
  { label: '7', value: '7' },
  { label: '7.5', value: '7.5' },
  { label: '8', value: '8' },
  { label: '8.5', value: '8.5' },
  { label: '9', value: '9' },
  { label: '9.5', value: '9.5' },
  { label: '10', value: '10' },
];

// Accessory sizes (bags, hats, etc.)
export const ACCESSORY_SIZES: SizeOption[] = [
  { label: 'One Size', value: 'one-size' },
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

// Bra sizes
export const BRA_SIZES: SizeOption[] = [
  { label: '32A', value: '32a' },
  { label: '32B', value: '32b' },
  { label: '32C', value: '32c' },
  { label: '32D', value: '32d' },
  { label: '34A', value: '34a' },
  { label: '34B', value: '34b' },
  { label: '34C', value: '34c' },
  { label: '34D', value: '34d' },
  { label: '36A', value: '36a' },
  { label: '36B', value: '36b' },
  { label: '36C', value: '36c' },
  { label: '36D', value: '36d' },
  { label: '38A', value: '38a' },
  { label: '38B', value: '38b' },
  { label: '38C', value: '38c' },
  { label: '38D', value: '38d' },
];

// Get sizes for a specific category
export function getSizesForCategory(category: string): SizeOption[] {
  const normalizedCategory = category.toLowerCase();
  
  // Shoes and footwear
  if (normalizedCategory.includes('shoe') || 
      normalizedCategory.includes('boot') || 
      normalizedCategory.includes('sandal') || 
      normalizedCategory.includes('sneaker') ||
      normalizedCategory.includes('heel')) {
    return SHOE_SIZES;
  }
  
  // Jewelry - rings
  if (normalizedCategory.includes('ring')) {
    return RING_SIZES;
  }
  
  // Intimates - bras
  if (normalizedCategory.includes('bra') || 
      normalizedCategory.includes('intimate')) {
    return BRA_SIZES;
  }
  
  // Accessories - bags, hats, etc.
  if (normalizedCategory.includes('bag') || 
      normalizedCategory.includes('hat') || 
      normalizedCategory.includes('accessori') ||
      normalizedCategory.includes('scarf') ||
      normalizedCategory.includes('belt')) {
    return ACCESSORY_SIZES;
  }
  
  // Default to clothing sizes for everything else
  return CLOTHING_SIZES;
}

// Common color options for products
export interface ColorOption {
  name: string;
  value: string; // hex color code
  className?: string; // Tailwind class for display
}

export const COMMON_COLORS: ColorOption[] = [
  { name: 'Black', value: '#000000', className: 'bg-black' },
  { name: 'White', value: '#FFFFFF', className: 'bg-white border border-gray-300' },
  { name: 'Gray', value: '#6B7280', className: 'bg-gray-500' },
  { name: 'Red', value: '#EF4444', className: 'bg-red-500' },
  { name: 'Blue', value: '#3B82F6', className: 'bg-blue-500' },
  { name: 'Navy', value: '#1E3A8A', className: 'bg-blue-900' },
  { name: 'Green', value: '#10B981', className: 'bg-emerald-500' },
  { name: 'Pink', value: '#EC4899', className: 'bg-pink-500' },
  { name: 'Purple', value: '#8B5CF6', className: 'bg-purple-500' },
  { name: 'Yellow', value: '#F59E0B', className: 'bg-amber-500' },
  { name: 'Orange', value: '#F97316', className: 'bg-orange-500' },
  { name: 'Brown', value: '#92400E', className: 'bg-amber-800' },
  { name: 'Beige', value: '#F5F5DC', className: 'bg-amber-100' },
  { name: 'Cream', value: '#FFFDD0', className: 'bg-yellow-50' },
];
