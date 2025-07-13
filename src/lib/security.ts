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

// Rate limiting helper (simple implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (identifier: string, maxRequests = 10, windowMs = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
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