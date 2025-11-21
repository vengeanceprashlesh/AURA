# Backend Architecture Guide

## Overview

This guide explains the production-ready MVC (Model-View-Controller) backend architecture implemented for the Aura e-commerce platform.

## Architecture Layers

### 1. Model Layer (Convex Functions)

Located in: `convex/`

Convex functions serve as the data model layer, providing:
- Database schema definitions
- CRUD operations
- Query optimization with indexes
- Data validation

**Key Files:**
- `schema.ts` - Database schema definitions
- `users.ts` - User management and authentication
- `products.ts` - Product catalog management
- `cart.ts` - Shopping cart operations
- `orders.ts` - Order processing
- `wishlist.ts` - Wishlist functionality
- `addresses.ts` - Address management
- `categories.ts` - Category management
- `reviews.ts` - Product reviews

### 2. Controller Layer (API Routes)

Located in: `src/app/api/v2/`

Next.js API routes act as controllers, handling:
- HTTP requests/responses
- Request validation
- Authentication checks
- Error handling

**Structure:**
```
api/v2/
├── auth/
│   ├── login/route.ts
│   └── signup/route.ts
├── cart/
│   └── route.ts
├── orders/
│   └── route.ts
└── ...
```

### 3. Service Layer

Located in: `src/lib/services/`

Business logic layer that:
- Orchestrates complex operations
- Integrates external services (Stripe)
- Handles transaction logic

**Key Services:**
- `user.service.ts` - User business logic
- `payment.service.ts` - Stripe integration and payment processing

### 4. Middleware Layer

Located in: `src/lib/middleware/`

Cross-cutting concerns:
- Authentication (`auth.middleware.ts`)
- Error handling (`error.middleware.ts`)
- Request validation

### 5. Utilities Layer

Located in: `src/lib/utils/`

Reusable utilities:
- `errors.ts` - Custom error classes
- `response.ts` - Standardized API responses
- `validators.ts` - Zod validation schemas
- `logger.ts` - Logging utility

## Data Flow

1. **Request** → API Route (Controller)
2. **Validation** → Middleware validates request
3. **Authentication** → Middleware verifies user
4. **Business Logic** → Service layer processes request
5. **Data Access** → Convex functions interact with database
6. **Response** → Standardized response sent to client

## Authentication Flow

1. User submits credentials to `/api/v2/auth/login`
2. Credentials validated using Zod schema
3. User service verifies password hash
4. JWT token created and set as HTTP-only cookie
5. Subsequent requests include cookie automatically
6. Middleware verifies token on protected routes

## Database Schema

### Users Table
```typescript
{
  email: string,
  passwordHash: string,
  passwordSalt: string,
  name: string,
  phone?: string,
  avatar?: string,
  address?: object,
  preferences?: object,
  stripeCustomerId?: string,
  verified: boolean,
  role: 'user' | 'admin',
  createdAt: number,
  updatedAt: number
}
```

### Cart Table
```typescript
{
  userId: Id<"users">,
  productId: Id<"products">,
  quantity: number,
  selectedSize?: string,
  selectedColor?: string,
  price: number,
  addedAt: number,
  updatedAt: number
}
```

### Orders Table
```typescript
{
  userId: Id<"users">,
  items: Array<OrderItem>,
  totalAmount: number,
  status: OrderStatus,
  shippingAddressId: Id<"addresses">,
  billingAddressId: Id<"addresses">,
  paymentMethod: PaymentMethod,
  createdAt: number,
  estimatedDelivery: number
}
```

## Error Handling Strategy

### Custom Error Classes
- `AppError` - Base error class
- `ValidationError` - Input validation failures
- `UnauthorizedError` - Authentication failures
- `ForbiddenError` - Authorization failures
- `NotFoundError` - Resource not found
- `ConflictError` - Resource conflicts
- `BadRequestError` - Invalid requests

### Error Response Format
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": {
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

## Validation Strategy

All inputs validated using Zod schemas:
```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

Benefits:
- Type-safe validation
- Automatic error messages
- Runtime type checking

## Security Best Practices

1. **Password Security**
   - Hashed with scrypt
   - Random salt per user
   - No plaintext storage

2. **Authentication**
   - JWT tokens with expiration
   - HTTP-only cookies
   - Secure flag in production

3. **Authorization**
   - Role-based access control
   - Middleware protection

4. **Input Validation**
   - All inputs validated with Zod
   - Sanitization where needed

5. **Error Handling**
   - No sensitive data in error messages
   - Different messages for dev/prod

## Payment Processing

Stripe integration for secure payments:

1. **Payment Intent Creation**
   - Calculate order total
   - Create Stripe payment intent
   - Return client secret to frontend

2. **Payment Confirmation**
   - Verify payment status
   - Create order in database
   - Update product stock
   - Clear shopping cart

3. **Refunds**
   - Admin can issue refunds
   - Updates order status
   - Restores product stock

## Migration from Old Backend

### Steps to Complete Migration

1. **Update Import Paths**
   - Replace `@/lib/userRepo` with `@/lib/services/user.service`
   - Update auth imports from `@/lib/auth` to `@/lib/middleware/auth.middleware`

2. **Replace API Calls**
   - Frontend: Update `/api/*` to `/api/v2/*`
   - Update error handling for new response format

3. **Environment Variables**
   - Add `JWT_SECRET` to .env
   - Remove legacy auth variables

4. **Testing**
   - Test all endpoints with new architecture
   - Verify authentication flows
   - Test error scenarios

5. **Deployment**
   - Update Convex schema (run `npx convex dev`)
   - Deploy new API routes
   - Monitor for issues

## Development Workflow

### Running Locally
```bash
# Install dependencies
npm install

# Start Convex dev server
npx convex dev

# Start Next.js dev server
npm run dev
```

### Adding New Endpoints

1. Create Convex function in `convex/`
2. Create API route in `src/app/api/v2/`
3. Add validation schema in `validators.ts`
4. Add service logic if needed
5. Update API documentation

### Testing

```bash
# Run tests
npm test

# Run specific test
npm test path/to/test.ts

# Watch mode
npm test -- --watch
```

## Performance Considerations

1. **Database Queries**
   - Use Convex indexes
   - Limit query results
   - Avoid N+1 queries

2. **Caching**
   - Cache frequently accessed data
   - Use Next.js caching strategies

3. **API Response Size**
   - Paginate large datasets
   - Only return necessary fields

## Monitoring & Logging

Logging utility provides:
- Request/response logging
- Error tracking
- Performance monitoring

```typescript
logger.info('User login', { userId });
logger.error('Payment failed', error);
```

## Future Enhancements

1. **Rate Limiting** - Prevent abuse
2. **Redis Cache** - Improve performance
3. **Email Service** - Order confirmations
4. **Webhooks** - Stripe event handling
5. **Admin Dashboard** - Order management
6. **Analytics** - Track metrics

## Support & Troubleshooting

### Common Issues

**Issue**: Authentication not working
**Solution**: Check JWT_SECRET in .env file

**Issue**: Convex functions not updating
**Solution**: Restart `npx convex dev`

**Issue**: Type errors in API routes
**Solution**: Run `npx convex codegen`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Zod Documentation](https://zod.dev)
