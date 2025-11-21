# Aura E-commerce API Documentation

## Overview
This is a production-ready REST API for an e-commerce platform built with Next.js, Convex, and Stripe.

## Architecture

### Tech Stack
- **Frontend/Backend**: Next.js 15+ (App Router)
- **Database**: Convex (serverless)
- **Payments**: Stripe
- **Authentication**: JWT-based sessions with HTTP-only cookies
- **Validation**: Zod schemas

### Project Structure
```
src/
├── app/api/
│   ├── v2/              # New API routes (production-ready)
│   │   ├── auth/        # Authentication endpoints
│   │   ├── cart/        # Cart management
│   │   ├── orders/      # Order management
│   │   ├── products/    # Product CRUD
│   │   ├── wishlist/    # Wishlist management
│   │   └── ...
│   └── (old routes)     # Legacy routes (to be migrated)
├── lib/
│   ├── middleware/      # Authentication, validation, error handling
│   ├── services/        # Business logic layer
│   ├── utils/           # Utilities (errors, validators, logger, response)
│   ├── convex-client.ts # Convex client setup
│   └── stripe.ts        # Stripe client setup
convex/
├── schema.ts            # Database schema
├── users.ts             # User functions
├── cart.ts              # Cart functions
├── orders.ts            # Order functions
├── products.ts          # Product functions
├── reviews.ts           # Review functions
└── ...
```

## API Endpoints

### Base URL
- Development: `http://localhost:3000/api/v2`
- Production: `https://your-domain.com/api/v2`

### Authentication

#### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "phone": "+1234567890",
  "address": {
    "line1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "john@example.com",
      "name": "John Doe"
    }
  },
  "message": "User created successfully"
}
```

#### POST /auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": null
    }
  },
  "message": "Login successful"
}
```

### Cart Management

#### GET /cart
Get user's cart items. **Requires authentication.**

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "cart_item_123",
      "productId": "product_456",
      "quantity": 2,
      "price": 29.99,
      "selectedSize": "M",
      "product": {
        "_id": "product_456",
        "name": "T-Shirt",
        "images": ["https://..."],
        "price": 29.99
      }
    }
  ]
}
```

#### POST /cart
Add item to cart. **Requires authentication.**

**Request Body:**
```json
{
  "productId": "product_456",
  "quantity": 1,
  "selectedSize": "M",
  "selectedColor": "Blue"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "cart_item_123"
  },
  "message": "Item added to cart"
}
```

#### DELETE /cart
Clear entire cart. **Requires authentication.**

**Response (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Cart cleared"
}
```

### Products

#### GET /products
Get all products with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search term
- `featured` (optional): true/false
- `limit` (optional): Limit results
- `page` (optional): Page number

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "product_123",
      "name": "Product Name",
      "price": 29.99,
      "images": ["https://..."],
      "inStock": true,
      "rating": 4.5
    }
  ]
}
```

### Orders

#### GET /orders
Get user's order history. **Requires authentication.**

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "order_123",
      "status": "shipped",
      "totalAmount": 89.97,
      "createdAt": 1234567890,
      "items": [...]
    }
  ]
}
```

#### POST /orders
Create a new order. **Requires authentication.**

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_123",
      "quantity": 2,
      "price": 29.99,
      "selectedSize": "M"
    }
  ],
  "shippingAddressId": "addr_123",
  "billingAddressId": "addr_123",
  "paymentMethod": {
    "type": "card",
    "last4": "4242",
    "brand": "visa"
  }
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Authentication

The API uses JWT-based authentication with HTTP-only cookies.

**Cookie Name:** `user_session`

When authenticated, all requests automatically include the session cookie.

## Rate Limiting

Currently not implemented but recommended for production.

## Development

### Running Locally
```bash
npm install
npm run dev
```

### Environment Variables
```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Auth
JWT_SECRET=your-secret-key
ADMIN_SECRET=admin-secret

# Optional
NODE_ENV=development
```

## Testing

Testing framework structure is in place. Run tests with:
```bash
npm test
```

## Migration Guide

To migrate from old API (`/api/*`) to new API (`/api/v2/*`):

1. Update frontend API calls to use `/api/v2/` prefix
2. Update authentication to use new cookie-based sessions
3. Update error handling to expect new error format
4. Test all endpoints before deploying

## Security Considerations

1. **Authentication**: All sensitive endpoints require authentication
2. **Password Hashing**: Passwords hashed with scrypt
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure appropriately for your domain
5. **Rate Limiting**: Implement before production launch
6. **Input Validation**: All inputs validated with Zod

## Support

For issues or questions, contact the development team.
