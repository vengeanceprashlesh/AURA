import { z } from 'zod';

// User validation schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
  address: z.object({
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  dob: z.string().optional(),
  preferences: z.object({
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  address: z.object({
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  preferences: z.object({
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }).optional(),
});

// Product validation schemas
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive().optional(),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  tags: z.array(z.string()).default([]),
  inStock: z.boolean().default(true),
  stockQuantity: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  brand: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();

// Cart validation schemas
export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive('Quantity must be positive'),
  selectedSize: z.string().optional(),
  selectedColor: z.string().optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive('Quantity must be positive').optional(),
  selectedSize: z.string().optional(),
  selectedColor: z.string().optional(),
});

// Order validation schemas
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
    selectedSize: z.string().optional(),
  })).min(1, 'Order must have at least one item'),
  shippingAddressId: z.string(),
  billingAddressId: z.string(),
  paymentMethod: z.object({
    type: z.enum(['card', 'paypal', 'apple_pay', 'google_pay']),
    last4: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
});

// Address validation schemas
export const createAddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();

// Review validation schemas
export const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  title: z.string().min(1, 'Title is required'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

// Category validation schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().optional(),
  image: z.string().url().optional(),
  parentId: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const productFilterSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  inStock: z.coerce.boolean().optional(),
});

// Helper function to validate request body
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
