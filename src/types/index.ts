// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Cart related types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Product variants (size, color, etc.)
export interface ProductVariant {
  id: string;
  type: 'size' | 'color' | 'material';
  name: string;
  value: string;
  priceModifier: number; // Can be positive or negative
  inStock: boolean;
}

// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: Product[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Order related types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  estimatedDelivery: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

// Navigation Category types
export interface NavigationCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  featured?: boolean;
  hot?: boolean;
  sale?: boolean;
  subcategories?: NavigationSubcategory[];
  featuredItems?: NavigationFeaturedItem[];
  trendingSection?: TrendingSection;
  visualCollections?: VisualCollection[];
  megaMenuLayout?: 'columns' | 'grid' | 'simple' | 'revolve';
}

export interface NavigationSubcategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  items?: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

export interface NavigationFeaturedItem {
  id: string;
  name: string;
  href: string;
  image: string;
  description?: string;
}

// Trending section for mega menus
export interface TrendingSection {
  id: string;
  title: string;
  items: TrendingItem[];
}

export interface TrendingItem {
  id: string;
  name: string;
  href: string;
  description?: string;
  isHot?: boolean;
}

// Visual collections for mega menus
export interface VisualCollection {
  id: string;
  name: string;
  href: string;
  image: string;
  description: string;
  subtitle?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

// Review types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: Date;
}

// Filter types for product search
export interface ProductFilters {
  category?: string[];
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  tags?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'featured';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
