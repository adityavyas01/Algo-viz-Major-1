import DOMPurify from 'isomorphic-dompurify';

// HTML sanitization for user-generated content
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'code', 'pre'],
    ALLOWED_ATTR: []
  });
};

// Input sanitization for text content
export const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

import { env, isRateLimitEnabled } from './env';
import { logSecurityIssue } from './errorLogging';

// Rate limiting with multiple strategies
interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (identifier: string) => string;
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
  firstRequest: number;
  violations: number;
}

class RateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Clean up old records every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Check if request should be rate limited
   */
  checkLimit(
    identifier: string,
    config: RateLimitConfig = {
      maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
      windowMs: env.RATE_LIMIT_WINDOW_MS,
    }
  ): { allowed: boolean; remainingRequests: number; resetTime: number } {
    if (!isRateLimitEnabled()) {
      return { allowed: true, remainingRequests: Infinity, resetTime: 0 };
    }

    const key = config.keyGenerator ? config.keyGenerator(identifier) : identifier;
    const now = Date.now();
    const record = this.records.get(key);

    // No previous record or window has expired
    if (!record || now > record.resetTime) {
      const newRecord: RateLimitRecord = {
        count: 1,
        resetTime: now + config.windowMs,
        firstRequest: now,
        violations: record?.violations || 0,
      };
      this.records.set(key, newRecord);
      return {
        allowed: true,
        remainingRequests: config.maxRequests - 1,
        resetTime: newRecord.resetTime,
      };
    }

    // Check if limit exceeded
    if (record.count >= config.maxRequests) {
      record.violations++;
      
      // Log security issue for excessive violations
      if (record.violations > 5) {
        logSecurityIssue(`Rate limit violations detected`, undefined, {
          feature: 'rate_limiting',
          metadata: {
            identifier: key,
            violations: record.violations,
            window: config.windowMs,
            maxRequests: config.maxRequests,
          },
        });
      }

      return {
        allowed: false,
        remainingRequests: 0,
        resetTime: record.resetTime,
      };
    }

    // Increment counter
    record.count++;
    return {
      allowed: true,
      remainingRequests: config.maxRequests - record.count,
      resetTime: record.resetTime,
    };
  }

  /**
   * Get current rate limit status without incrementing
   */
  getStatus(identifier: string): { remainingRequests: number; resetTime: number } | null {
    const record = this.records.get(identifier);
    if (!record || Date.now() > record.resetTime) {
      return null;
    }
    return {
      remainingRequests: Math.max(0, env.RATE_LIMIT_MAX_REQUESTS - record.count),
      resetTime: record.resetTime,
    };
  }

  /**
   * Reset rate limit for identifier
   */
  reset(identifier: string): void {
    this.records.delete(identifier);
  }

  /**
   * Clean up expired records
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      if (now > record.resetTime) {
        this.records.delete(key);
      }
    }
  }

  /**
   * Destroy the rate limiter and cleanup
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.records.clear();
  }
}

// Create singleton instance
const rateLimiter = new RateLimiter();

// Convenience functions
export const checkRateLimit = (
  identifier: string,
  maxRequests?: number,
  windowMs?: number
): boolean => {
  const config: RateLimitConfig = {
    maxRequests: maxRequests || env.RATE_LIMIT_MAX_REQUESTS,
    windowMs: windowMs || env.RATE_LIMIT_WINDOW_MS,
  };
  
  const result = rateLimiter.checkLimit(identifier, config);
  return result.allowed;
};

export const getRateLimitStatus = (identifier: string) => {
  return rateLimiter.getStatus(identifier);
};

export const resetRateLimit = (identifier: string) => {
  rateLimiter.reset(identifier);
};

// Enhanced rate limiting for different operations
export const rateLimitConfigs = {
  // Authentication operations (stricter)
  auth: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // API calls (moderate)
  api: {
    maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
    windowMs: env.RATE_LIMIT_WINDOW_MS,
  },
  // Search operations (more lenient)
  search: {
    maxRequests: 20,
    windowMs: 60 * 1000, // 1 minute
  },
} as const;

export const checkAuthRateLimit = (identifier: string) => {
  return rateLimiter.checkLimit(identifier, rateLimitConfigs.auth);
};

export const checkAPIRateLimit = (identifier: string) => {
  return rateLimiter.checkLimit(identifier, rateLimitConfigs.api);
};

export const checkSearchRateLimit = (identifier: string) => {
  return rateLimiter.checkLimit(identifier, rateLimitConfigs.search);
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

// Secure session storage
export const setSecureSession = (key: string, value: any) => {
  const encrypted = btoa(JSON.stringify(value));
  sessionStorage.setItem(key, encrypted);
};

export const getSecureSession = (key: string) => {
  try {
    const encrypted = sessionStorage.getItem(key);
    if (!encrypted) return null;
    return JSON.parse(atob(encrypted));
  } catch {
    return null;
  }
};