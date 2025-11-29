# Aura Store

A modern e-commerce platform built with Next.js, featuring a beautiful skincare section with personalized product recommendations, real-time backend with Convex, and stunning animations.

## ✨ Features

- **🎨 Modern UI/UX** - Clean, responsive design with smooth animations using Framer Motion
- **💄 Skincare Section** - Personalized skin quiz and product recommendations
- **🛒 Shopping Cart** - Full-featured cart with Zustand state management
- **🔐 Authentication** - User registration and login system
- **💳 Payment Integration** - Stripe payment processing (configured)
- **🗄️ Real-time Backend** - Convex for serverless backend with real-time updates
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - Lightweight state management
- **TypeScript** - Type-safe development

### Backend
- **Convex** - Serverless backend and database
- **Stripe** - Payment processing integration

### UI Components
- **Lucide React** - Icon library
- **Custom Components** - Modals, cards, forms, and more

## 📋 Prerequisites

- Node.js 18+ and npm
- A Convex account (free tier available at [convex.dev](https://convex.dev))

## 🛠️ Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd aura-store
npm install
```

### 2. Set Up Convex Backend

```bash
# Start Convex dev server (in a separate terminal)
npx convex dev
```

Follow the prompts to:
- Create a Convex account or log in
- Create a new project or link to an existing one

### 3. Seed Sample Data

After Convex is running, seed the database with sample products:

```bash
npx convex run sampleData:seedSampleProducts
```

This will add 13 sample products across various categories.

### 4. Start Development Server

```bash
# In your main terminal
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
aura-store/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── categories/        # Category pages (skincare, etc.)
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer, etc.
│   │   ├── ui/               # Reusable UI components
│   │   └── *.tsx             # Feature components
│   ├── contexts/             # React Context providers
│   ├── lib/                  # Utilities and helpers
│   ├── store/                # Zustand stores
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── convex/                   # Convex backend
│   ├── products.ts          # Product queries and mutations
│   ├── users.ts             # User management
│   ├── orders.ts            # Order processing
│   ├── schema.ts            # Database schema
│   └── sampleData.ts        # Sample data seeder
└── public/                   # Static assets
```

## 🎯 Key Features

### Skincare Quiz
Interactive skin type assessment that recommends personalized products based on:
- Skin type (oily, dry, combination, sensitive)
- Primary concerns (acne, aging, hydration, etc.)
- Age group

### Product Catalog
- Real-time product data from Convex
- Category filtering
- Product detail modals
- Add to cart functionality
- Wishlist support

### Shopping Experience
- Persistent cart (localStorage)
- Real-time inventory tracking
- Product recommendations
- Smooth animations and transitions

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Convex (automatically set by `npx convex dev`)
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>

# Stripe (optional, for payment features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-key>
STRIPE_SECRET_KEY=<your-stripe-secret>
```

## 🗄️ Database Schema

The Convex backend includes schemas for:
- **Products** - Product catalog with skincare-specific data
- **Users** - User accounts and profiles
- **Orders** - Order history and tracking
- **Cart** - Shopping cart items
- **Wishlist** - Saved products
- **Reviews** - Product reviews and ratings

## 🎨 Customization

### Adding Products
Use the Convex dashboard or run mutations to add products:

```bash
npx convex run products:addProduct '{"name": "Product Name", ...}'
```

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `src/config/constants.ts` for app-wide settings
- Edit component styles in individual `.tsx` files

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🐛 Troubleshooting

### Convex Functions Not Found
Make sure the Convex dev server is running:
```bash
npx convex dev --typecheck=disable
```

### Build Errors
If you encounter build errors, try:
```bash
rm -rf .next
npm run build
```

### Hydration Errors
These are usually caused by browser extensions. The app includes `suppressHydrationWarning` on affected elements.

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a private project. For any questions or issues, please contact the repository owner.

---

**Built with ❤️ using Next.js and Convex**
