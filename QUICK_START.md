# Quick Start Guide - Aura E-commerce Backend

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Stripe account (for payments)
- Convex account (database)

### 1. Environment Setup

Create `.env.local` file in the project root:

```env
# Convex (get from https://dashboard.convex.dev)
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Stripe (get from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Authentication Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this
ADMIN_SECRET=your-admin-secret-change-this

# Environment
NODE_ENV=development
```

### 2. Install & Run

```bash
# Install dependencies
npm install

# Terminal 1: Start Convex
npx convex dev

# Terminal 2: Start Next.js
npm run dev
```

Your app is now running at `http://localhost:3000`!

## 📁 Project Structure

```
aura-store/
├── convex/                 # Database (Models)
│   ├── schema.ts          # Database schema
│   ├── users.ts           # User operations
│   ├── cart.ts            # Cart operations
│   ├── orders.ts          # Order operations
│   └── ...
├── src/
│   ├── app/api/
│   │   └── v2/            # API Routes (Controllers)
│   │       ├── auth/      # Login, signup
│   │       ├── cart/      # Cart management
│   │       └── ...
│   └── lib/
│       ├── middleware/    # Auth, error handling
│       ├── services/      # Business logic
│       └── utils/         # Helpers
└── docs/                  # Documentation
    ├── IMPLEMENTATION_SUMMARY.md
    ├── BACKEND_GUIDE.md
    └── API_DOCUMENTATION.md
```

## 🎯 Quick API Test

### Test Signup

```bash
curl -X POST http://localhost:3000/api/v2/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:3000/api/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Cart (after login)

```bash
# Get cart
curl http://localhost:3000/api/v2/cart \
  -H "Cookie: user_session=YOUR_SESSION_TOKEN"

# Add to cart
curl -X POST http://localhost:3000/api/v2/cart \
  -H "Content-Type: application/json" \
  -H "Cookie: user_session=YOUR_SESSION_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 1
  }'
```

## 🔑 Key Features Implemented

✅ **Authentication** - Secure JWT-based login/signup  
✅ **User Management** - Profile, preferences, addresses  
✅ **Shopping Cart** - Add, update, remove items  
✅ **Orders** - Create, track, cancel orders  
✅ **Products** - Full catalog with search & filters  
✅ **Payments** - Stripe integration  
✅ **Reviews** - Product reviews & ratings  
✅ **Wishlist** - Save favorite products  

## 📚 Learn More

For detailed information, check these docs:

1. **IMPLEMENTATION_SUMMARY.md** - What's been built
2. **BACKEND_GUIDE.md** - Architecture deep dive
3. **API_DOCUMENTATION.md** - Complete API reference

## 🐛 Troubleshooting

**Error: Convex deployment not found**
→ Run `npx convex dev` and follow the setup wizard

**Error: Module not found**
→ Run `npm install`

**Error: Authentication not working**
→ Check JWT_SECRET in .env.local file

**Error: Type errors**
→ Run `npx convex codegen` to regenerate types

## 🎨 Creating New API Endpoints

Follow this pattern:

```typescript
// 1. Create Convex function (convex/resource.ts)
export const getResource = query({
  args: { id: v.id("resources") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// 2. Create API route (src/app/api/v2/resource/route.ts)
import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse } from '@/lib/utils/response';

export const GET = withAuth(async (request, userId) => {
  // Your logic here
  return successResponse(data);
}, requireUserAuth);

// 3. Add validation schema (src/lib/utils/validators.ts)
export const resourceSchema = z.object({
  name: z.string(),
  // ...
});
```

## 🚢 Deploy to Production

```bash
# 1. Build
npm run build

# 2. Deploy Convex
npx convex deploy --prod

# 3. Deploy to Vercel/your platform
vercel deploy --prod
```

## 💬 Need Help?

- Check the `docs/` folder for detailed guides
- Review existing code for patterns
- Refer to external docs:
  - [Convex](https://docs.convex.dev)
  - [Next.js](https://nextjs.org/docs)
  - [Stripe](https://stripe.com/docs)

---

**You're all set!** Start building amazing features on this solid foundation. 🎉
