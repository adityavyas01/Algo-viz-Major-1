/**
 * Error Logging Service
 * Centralized error handling and logging with Sentry integration
 */

import * as Sentry from '@sentry/react';
import { Replay } from '@sentry/replay';
import { env, isSentryEnabled, isProduction } from './env';

// Error severity levels
export enum ErrorSeverity {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  FATAL = 'fatal',
}

// Error categories for better organization
export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  DATABASE = 'database',
  NETWORK = 'network',
  UI = 'ui',
  BUSINESS_LOGIC = 'business_logic',
  PERFORMANCE = 'performance',
  SECURITY = 'security',
}

interface ErrorContext {
  userId?: string;
  sessionId?: string;
  feature?: string;
  action?: string;
  metadata?: Record<string, any>;
}

interface LoggedError {
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  error?: Error;
  context?: ErrorContext;
  timestamp: Date;
}

class ErrorLoggingService {
  private initialized = false;

  /**
   * Initialize Sentry error logging
   */
  init(): void {
    if (this.initialized) return;

    if (isSentryEnabled()) {
      Sentry.init({
        dsn: env.SENTRY_DSN,
        environment: env.SENTRY_ENVIRONMENT,
        debug: !isProduction(),
        tracesSampleRate: isProduction() ? 0.1 : 1.0, // Lower sampling in production
        integrations: [
          new Replay({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        // Performance monitoring
        profilesSampleRate: isProduction() ? 0.1 : 1.0,
        // Session replay for better debugging
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        // Filter out noise
        beforeSend: (event, hint) => {
          // Don't send certain errors to reduce noise
          const error = hint.originalException;
          if (error && typeof error === 'object' && 'message' in error) {
            const message = error.message as string;
            // Filter out common browser errors that aren't actionable
            if (
              message.includes('ResizeObserver loop limit exceeded') ||
              message.includes('Script error') ||
              message.includes('Network Error')
            ) {
              return null;
            }
          }
          return event;
        },
      });

      console.log('Sentry error logging initialized');
    } else if (!isProduction()) {
      console.log('Sentry disabled - using console logging for development');
    }

    this.initialized = true;
  }

  /**
   * Log an error with context
   */
  logError(params: {
    message: string;
    category: ErrorCategory;
    severity?: ErrorSeverity;
    error?: Error;
    context?: ErrorContext;
  }): void {
    const {
      message,
      category,
      severity = ErrorSeverity.ERROR,
      error,
      context,
    } = params;

    const loggedError: LoggedError = {
      message,
      category,
      severity,
      error,
      context,
      timestamp: new Date(),
    };

    // Always log to console in development
    if (!isProduction()) {
      this.logToConsole(loggedError);
    }

    // Send to Sentry if enabled
    if (isSentryEnabled()) {
      this.logToSentry(loggedError);
    }
  }

  /**
   * Log authentication errors
   */
  logAuthError(message: string, error?: Error, context?: ErrorContext): void {
    this.logError({
      message,
      category: ErrorCategory.AUTHENTICATION,
      severity: ErrorSeverity.WARNING,
      error,
      context,
    });
  }

  /**
   * Log database errors
   */
  logDatabaseError(message: string, error?: Error, context?: ErrorContext): void {
    this.logError({
      message,
      category: ErrorCategory.DATABASE,
      severity: ErrorSeverity.ERROR,
      error,
      context,
    });
  }

  /**
   * Log network errors
   */
  logNetworkError(message: string, error?: Error, context?: ErrorContext): void {
    this.logError({
      message,
      category: ErrorCategory.NETWORK,
      severity: ErrorSeverity.WARNING,
      error,
      context,
    });
  }

  /**
   * Log UI errors
   */
  logUIError(message: string, error?: Error, context?: ErrorContext): void {
    this.logError({
      message,
      category: ErrorCategory.UI,
      severity: ErrorSeverity.ERROR,
      error,
      context,
    });
  }

  /**
   * Log performance issues
   */
  logPerformanceIssue(message: string, context?: ErrorContext): void {
    this.logError({
      message,
      category: ErrorCategory.PERFORMANCE,
      severity: ErrorSeverity.WARNING,
      context,
    });
  }

  /**
   * Log security issues
   */
  logSecurityIssue(message: string, error?: Error, context?: ErrorContext): void {
    this.logError({
      message,
      category: ErrorCategory.SECURITY,
      severity: ErrorSeverity.ERROR,
      error,
      context,
    });
  }

  /**
   * Set user context for error tracking
   */
  setUserContext(userId: string, email?: string, role?: string): void {
    if (isSentryEnabled()) {
      Sentry.setUser({
        id: userId,
        email,
        role,
      });
    }
  }

  /**
   * Clear user context (on logout)
   */
  clearUserContext(): void {
    if (isSentryEnabled()) {
      Sentry.setUser(null);
    }
  }

  /**
   * Add breadcrumb for debugging
   */
  addBreadcrumb(message: string, category: string, data?: Record<string, any>): void {
    if (isSentryEnabled()) {
      Sentry.addBreadcrumb({
        message,
        category,
        data,
        timestamp: Date.now() / 1000,
      });
    }
  }

  private logToConsole(loggedError: LoggedError): void {
    const { message, category, severity, error, context } = loggedError;
    
    const logMessage = `[${severity.toUpperCase()}] [${category}] ${message}`;
    
    switch (severity) {
      case ErrorSeverity.DEBUG:
        console.debug(logMessage, { error, context });
        break;
      case ErrorSeverity.INFO:
        console.info(logMessage, { error, context });
        break;
      case ErrorSeverity.WARNING:
        console.warn(logMessage, { error, context });
        break;
      case ErrorSeverity.ERROR:
      case ErrorSeverity.FATAL:
        console.error(logMessage, { error, context });
        break;
    }
  }

  private logToSentry(loggedError: LoggedError): void {
    const { message, category, severity, error, context } = loggedError;

    Sentry.withScope((scope) => {
      // Set context
      scope.setTag('category', category);
      scope.setLevel(severity as Sentry.SeverityLevel);
      
      if (context) {
        if (context.feature) scope.setTag('feature', context.feature);
        if (context.action) scope.setTag('action', context.action);
        if (context.userId) scope.setUser({ id: context.userId });
        if (context.sessionId) scope.setTag('sessionId', context.sessionId);
        if (context.metadata) {
          Object.entries(context.metadata).forEach(([key, value]) => {
            scope.setExtra(key, value);
          });
        }
      }

      // Send to Sentry
      if (error) {
        Sentry.captureException(error);
      } else {
        Sentry.captureMessage(message);
      }
    });
  }
}

// Create singleton instance
export const errorLogger = new ErrorLoggingService();

// Initialize on import
errorLogger.init();

// Convenience functions
export const logError = errorLogger.logError.bind(errorLogger);
export const logAuthError = errorLogger.logAuthError.bind(errorLogger);
export const logDatabaseError = errorLogger.logDatabaseError.bind(errorLogger);
export const logNetworkError = errorLogger.logNetworkError.bind(errorLogger);
export const logUIError = errorLogger.logUIError.bind(errorLogger);
export const logPerformanceIssue = errorLogger.logPerformanceIssue.bind(errorLogger);
export const logSecurityIssue = errorLogger.logSecurityIssue.bind(errorLogger);
export const setUserContext = errorLogger.setUserContext.bind(errorLogger);
export const clearUserContext = errorLogger.clearUserContext.bind(errorLogger);
export const addBreadcrumb = errorLogger.addBreadcrumb.bind(errorLogger);
