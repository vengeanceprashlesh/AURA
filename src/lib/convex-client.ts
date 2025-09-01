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
      process.env.NEXT_PHASE === 'phase-production-build' ||
      process.env.VERCEL_ENV === undefined || // During build, runtime env vars aren't available
      !process.env.NEXT_PUBLIC_CONVEX_URL // If the env var is missing, assume build time
    )
  );
}

export function getConvexClient(): ConvexHttpClient {
  // Get the URL from environment variables first
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  
  // If we're in build time or missing URL, return mock client
  if (isBuildTime() || !url) {
    if (!url) {
      console.warn('[BUILD TIME] NEXT_PUBLIC_CONVEX_URL not available, using mock client');
      console.warn('Available env vars:', Object.keys(process.env).filter(key => key.includes('CONVEX')));
    } else {
      console.warn('[BUILD TIME] Using mock Convex client');
    }
    return mockConvexClient;
  }

  // If client already exists, return it
  if (convexClient) {
    return convexClient;
  }

  console.log('[RUNTIME] Creating real Convex client with URL:', url);
  
  // Create and cache the client
  convexClient = new ConvexHttpClient(url);
  return convexClient;
}

export function resetConvexClient(): void {
  convexClient = null;
}
