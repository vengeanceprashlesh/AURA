import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header, Footer, CartSidePanel } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CartSidePanel />
      </body>
    </html>
  );
}
