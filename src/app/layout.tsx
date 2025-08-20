import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { RewardsProvider } from "@/contexts/RewardsContext";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Store - Timeless Fashion & Contemporary Style",
  description: "Discover our curated collection of timeless fashion pieces. From elegant dresses to contemporary accessories, find your perfect style at Aura.",
  keywords: "fashion, clothing, style, women's fashion, men's fashion, accessories, sustainable fashion",
  authors: [{ name: "Aura Store" }],
  creator: "Aura Store",
  publisher: "Aura Store",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aura-store.com",
    siteName: "Aura Store",
    title: "Aura Store - Timeless Fashion & Contemporary Style",
    description: "Discover our curated collection of timeless fashion pieces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Store - Timeless Fashion & Contemporary Style",
    description: "Discover our curated collection of timeless fashion pieces.",
    creator: "@aurastore",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <RewardsProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <CartSidebar />
            </RewardsProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
