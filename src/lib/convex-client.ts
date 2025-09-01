import { ConvexHttpClient } from 'convex/browser';

let convexClient: ConvexHttpClient | null = null;

// Mock client for build time
const mockConvexClient = {
  query: async () => ({}),
  mutation: async () => ({}),
  action: async () => ({}),
} as unknown as ConvexHttpClient;

function isBuildTime(): boolean {
  // Multiple checks to detect build time
  return (
    typeof window === 'undefined' && (
      process.env.npm_lifecycle_event === 'build' ||
      process.env.NODE_ENV === 'production' && !process.env.RUNTIME ||
      process.argv.includes('build') ||
      process.env.VERCEL_ENV === undefined // During build, runtime env vars aren't available
    )
  );
}

export function getConvexClient(): ConvexHttpClient {
  // If we're in build time, return mock client immediately
  if (isBuildTime()) {
    console.warn('[BUILD TIME] Using mock Convex client');
    return mockConvexClient;
  }

  // If client already exists, return it
  if (convexClient) {
    return convexClient;
  }

  // Get the URL from environment variables
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  
  if (!url) {
    console.error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('CONVEX')));
    
    // Final fallback for build time
    if (typeof window === 'undefined') {
      console.warn('[FALLBACK] Using mock Convex client due to missing env var');
      return mockConvexClient;
    }
    
    throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
  }

  console.log('[RUNTIME] Creating real Convex client with URL:', url);
  
  // Create and cache the client
  convexClient = new ConvexHttpClient(url);
  return convexClient;
}

export function resetConvexClient(): void {
  convexClient = null;
}
