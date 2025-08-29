/**
 * Rate Limiting Higher-Order Component and Hooks
 * Provides easy rate limiting for React components and operations
 */

import React, { useCallback, useRef } from 'react';
import { checkRateLimit, checkAuthRateLimit, checkAPIRateLimit, checkSearchRateLimit } from '@/lib/security';
import { useToast } from '@/hooks/use-toast';
import { logSecurityIssue } from '@/lib/errorLogging';

export type RateLimitType = 'default' | 'auth' | 'api' | 'search';

interface RateLimitOptions {
  type?: RateLimitType;
  identifier?: string;
  showToast?: boolean;
  onRateLimited?: () => void;
}

/**
 * Custom hook for rate limiting operations
 */
export const useRateLimit = (options: RateLimitOptions = {}) => {
  const { toast } = useToast();
  const { type = 'default', identifier, showToast = true, onRateLimited } = options;

  const checkLimit = useCallback((customIdentifier?: string) => {
    const id = customIdentifier || identifier || 'default';
    let allowed = false;

    switch (type) {
      case 'auth':
        allowed = checkAuthRateLimit(id).allowed;
        break;
      case 'api':
        allowed = checkAPIRateLimit(id).allowed;
        break;
      case 'search':
        allowed = checkSearchRateLimit(id).allowed;
        break;
      default:
        allowed = checkRateLimit(id);
        break;
    }

    if (!allowed) {
      if (showToast) {
        toast({
          title: "Too Many Requests",
          description: "Please wait a moment before trying again.",
          variant: "destructive",
        });
      }

      if (onRateLimited) {
        onRateLimited();
      }

      logSecurityIssue('Rate limit exceeded', undefined, {
        feature: 'rate_limiting',
        metadata: {
          type,
          identifier: id,
        },
      });
    }

    return allowed;
  }, [type, identifier, showToast, onRateLimited, toast]);

  return { checkLimit };
};

/**
 * Higher-order component that adds rate limiting to any component
 */
export const withRateLimit = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: RateLimitOptions = {}
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { checkLimit } = useRateLimit(options);
    
    const rateLimitedProps = {
      ...props,
      checkRateLimit: checkLimit,
    } as P & { checkRateLimit: (identifier?: string) => boolean };

    return <WrappedComponent {...rateLimitedProps} ref={ref} />;
  });
};

/**
 * Rate limited button component
 */
interface RateLimitedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rateLimitType?: RateLimitType;
  rateLimitIdentifier?: string;
  children: React.ReactNode;
}

export const RateLimitedButton: React.FC<RateLimitedButtonProps> = ({
  rateLimitType = 'default',
  rateLimitIdentifier,
  onClick,
  disabled,
  children,
  ...props
}) => {
  const { checkLimit } = useRateLimit({
    type: rateLimitType,
    identifier: rateLimitIdentifier,
  });

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!checkLimit()) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  }, [checkLimit, onClick]);

  return (
    <button {...props} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

/**
 * Debounced rate limited function hook
 */
export const useDebouncedRateLimit = (
  callback: (...args: any[]) => void,
  delay: number = 300,
  options: RateLimitOptions = {}
) => {
  const { checkLimit } = useRateLimit(options);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (checkLimit()) {
        callback(...args);
      }
    }, delay);
  }, [callback, delay, checkLimit]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

/**
 * Rate limited API call hook
 */
export const useRateLimitedAPI = () => {
  const { checkLimit } = useRateLimit({ type: 'api' });

  const callAPI = useCallback(async (
    apiCall: () => Promise<any>,
    identifier?: string
  ): Promise<any> => {
    if (!checkLimit(identifier)) {
      return null;
    }

    try {
      return await apiCall();
    } catch (error) {
      logSecurityIssue('API call failed after rate limit check', error as Error, {
        feature: 'api_rate_limiting',
        metadata: { identifier: identifier || 'unknown' },
      });
      throw error;
    }
  }, [checkLimit]);

  return { callAPI };
};
