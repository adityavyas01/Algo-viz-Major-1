/**
 * Environment Configuration
 * Centralized environment variable management with validation
 */

interface EnvConfig {
  // App Configuration
  NODE_ENV: string;
  DEV: boolean;
  PROD: boolean;
  
  // Supabase Configuration
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  
  // Analytics Configuration (optional)
  VERCEL_ANALYTICS: boolean;
  
  // Error Logging Configuration (optional)
  SENTRY_DSN?: string;
  SENTRY_ENVIRONMENT?: string;
  
  // Rate Limiting Configuration
  RATE_LIMIT_ENABLED: boolean;
  RATE_LIMIT_MAX_REQUESTS: number;
  RATE_LIMIT_WINDOW_MS: number;
}

// Environment variable validation schema
const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const;
const optionalEnvVars = ['VITE_VERCEL_ANALYTICS', 'VITE_SENTRY_DSN', 'VITE_SENTRY_ENVIRONMENT'] as const;

// Validate required environment variables
function validateEnvironment(): void {
  const missing: string[] = [];
  
  // Only validate in production
  if (import.meta.env.PROD) {
    for (const envVar of requiredEnvVars) {
      if (!import.meta.env[envVar]) {
        missing.push(envVar);
      }
    }
    
    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your deployment configuration and ensure all required environment variables are set.'
      );
    }
  }
}

// Initialize and validate environment
validateEnvironment();

// Export environment configuration
export const env: EnvConfig = {
  // App Configuration
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  
  // Supabase Configuration
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "https://lctytebgxakcztdijbxu.supabase.co",
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdHl0ZWJneGFrY3p0ZGlqYnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjQ0NDgsImV4cCI6MjA2NjUwMDQ0OH0.I3cf-X6MUw4E7t6NMI-p7QiiLcvLjjNm72sePZGuUU8",
  
  // Analytics Configuration
  VERCEL_ANALYTICS: import.meta.env.VITE_VERCEL_ANALYTICS === 'true',
  
  // Error Logging Configuration
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  SENTRY_ENVIRONMENT: import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.NODE_ENV,
  
  // Rate Limiting Configuration
  RATE_LIMIT_ENABLED: import.meta.env.VITE_RATE_LIMIT_ENABLED !== 'false', // Default to true
  RATE_LIMIT_MAX_REQUESTS: parseInt(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS || '10'),
  RATE_LIMIT_WINDOW_MS: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
};

// Export helper functions
export const isProduction = () => env.PROD;
export const isDevelopment = () => env.DEV;
export const isAnalyticsEnabled = () => env.VERCEL_ANALYTICS;
export const isSentryEnabled = () => !!env.SENTRY_DSN;
export const isRateLimitEnabled = () => env.RATE_LIMIT_ENABLED;

// Environment info for debugging (development only)
if (isDevelopment()) {
  console.log('Environment Configuration:', {
    NODE_ENV: env.NODE_ENV,
    SUPABASE_URL: env.SUPABASE_URL,
    ANALYTICS_ENABLED: env.VERCEL_ANALYTICS,
    SENTRY_ENABLED: isSentryEnabled(),
    RATE_LIMIT_ENABLED: env.RATE_LIMIT_ENABLED,
  });
}
