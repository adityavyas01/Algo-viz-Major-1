// Performance Optimization Utilities
import React, { lazy } from 'react';

// Image optimization utilities
export class ImageOptimizer {
  private static cache = new Map<string, string>();
  private static observer?: IntersectionObserver;

  // Get optimized image source with WebP support
  static async getOptimizedImageSrc(src: string): Promise<string> {
    const supportsWebP = await this.checkWebPSupport();
    return supportsWebP ? src.replace(/\.(jpg|jpeg|png)$/, '.webp') : src;
  }

  // Check WebP support
  static checkWebPSupport(): Promise<boolean> {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  // Initialize intersection observer for lazy loading
  static initializeLazyLoading() {
    if (this.observer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              this.observer?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );
  }

  // Preload critical images
  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.cache.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.cache.set(src, src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Generate responsive srcset
  static generateSrcSet(baseSrc: string, sizes: number[] = [320, 640, 960, 1280]) {
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    return sizes
      .map(size => `${baseName}-${size}w.${extension} ${size}w`)
      .join(', ');
  }
}

// Code splitting utilities
export class CodeSplitter {
  private static loadedChunks = new Set<string>();

  // Preload route component
  static preloadRoute(routeLoader: () => Promise<any>) {
    // Start loading the component but don't await it
    routeLoader().catch(() => {
      // Ignore errors during preload
    });
  }

  // Preload component with priority
  static preloadComponent(componentLoader: () => Promise<any>, priority: 'high' | 'medium' | 'low' = 'medium') {
    const delay = { high: 0, medium: 100, low: 500 }[priority];
    
    setTimeout(() => {
      componentLoader().catch(() => {
        // Ignore preload errors
      });
    }, delay);
  }

  // Dynamic import with retry logic
  static async dynamicImport<T>(
    importFn: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
      }
    }
    
    throw lastError!;
  }

  // Check if chunk is already loaded
  static isChunkLoaded(chunkName: string): boolean {
    return this.loadedChunks.has(chunkName);
  }

  // Mark chunk as loaded
  static markChunkLoaded(chunkName: string): void {
    this.loadedChunks.add(chunkName);
  }
}

// Memory optimization utilities
export class MemoryOptimizer {
  private static weakRefs = new WeakMap();
  private static cleanupTasks: (() => void)[] = [];

  // Create weak reference (fallback if not supported)
  static createWeakRef<T extends object>(obj: T, cleanup?: () => void): any {
    if (typeof (globalThis as any).WeakRef !== 'undefined') {
      const weakRef = new (globalThis as any).WeakRef(obj);
      
      if (cleanup) {
        this.cleanupTasks.push(cleanup);
      }
      
      return weakRef;
    }
    
    // Fallback for environments without WeakRef support
    return { current: obj };
  }

  // Throttle function execution
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Debounce function execution
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Cleanup unused resources
  static cleanup(): void {
    this.cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.warn('Cleanup task failed:', error);
      }
    });
    
    this.cleanupTasks.length = 0;
  }

  // Monitor memory usage
  static getMemoryUsage(): {
    used: number;
    total: number;
    limit: number;
    percentage: number;
  } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
      };
    }
    return null;
  }

  // Batch DOM updates
  static batchDOMUpdates(updates: (() => void)[]): void {
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  }
}

// Network optimization utilities
export class NetworkOptimizer {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private static requestQueue: Array<{ url: string; options: RequestInit; resolve: Function; reject: Function }> = [];
  private static isProcessingQueue = false;

  // Cache API responses with TTL
  static async cachedFetch(url: string, options: RequestInit = {}, ttl: number = 300000): Promise<Response> {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return new Response(JSON.stringify(cached.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(url, options);
    
    if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.clone().json();
      this.cache.set(cacheKey, { data, timestamp: Date.now(), ttl });
    }
    
    return response;
  }

  // Batch API requests
  static queueRequest(url: string, options: RequestInit = {}): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ url, options, resolve, reject });
      this.processQueue();
    });
  }

  private static async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.requestQueue.length === 0) return;
    
    this.isProcessingQueue = true;
    
    // Process requests in batches of 5
    while (this.requestQueue.length > 0) {
      const batch = this.requestQueue.splice(0, 5);
      
      const promises = batch.map(async ({ url, options, resolve, reject }) => {
        try {
          const response = await fetch(url, options);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
      
      await Promise.allSettled(promises);
      
      // Small delay between batches to prevent overwhelming the server
      if (this.requestQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    
    this.isProcessingQueue = false;
  }

  // Preload resources
  static preloadResource(url: string, as: 'script' | 'style' | 'image' | 'font' = 'script'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    
    if (as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  }

  // Clear expired cache entries
  static clearExpiredCache(): void {
    const now = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Resource loading priorities
export class ResourcePriority {
  // Critical resources (above the fold)
  static critical = {
    css: ['main.css', 'critical.css'],
    js: ['vendor.js', 'main.js'],
    images: ['hero-bg.webp', 'logo.svg']
  };

  // Important resources (visible soon)
  static important = {
    css: ['components.css'],
    js: ['components.js'],
    images: ['feature-icons.webp']
  };

  // Low priority resources (below the fold)
  static low = {
    css: ['animations.css'],
    js: ['analytics.js', 'chat.js'],
    images: ['footer-bg.webp']
  };

  static loadByPriority(): void {
    // Skip preloading in development - Vite handles this
    if (import.meta.env.DEV) {
      return;
    }

    // Load critical resources immediately
    this.critical.css.forEach(css => {
      NetworkOptimizer.preloadResource(`/css/${css}`, 'style');
    });
    
    this.critical.js.forEach(js => {
      NetworkOptimizer.preloadResource(`/js/${js}`, 'script');
    });

    // Disabled - Vite bundles CSS into JS, no separate CSS files exist
    // Load important resources after a short delay
    // setTimeout(() => {
    //   this.important.css.forEach(css => {
    //     NetworkOptimizer.preloadResource(`/css/${css}`, 'style');
    //   });
    //   
    //   this.important.js.forEach(js => {
    //     NetworkOptimizer.preloadResource(`/js/${js}`, 'script');
    //   });
    // }, 100);

    // Load low priority resources when idle
    // requestIdleCallback(() => {
    //   this.low.css.forEach(css => {
    //     NetworkOptimizer.preloadResource(`/css/${css}`, 'style');
    //   });
    //   
    //   this.low.js.forEach(js => {
    //     NetworkOptimizer.preloadResource(`/js/${js}`, 'script');
    //   });
    // });
  }
}

// Performance hooks
export function usePerformanceOptimization() {
  React.useEffect(() => {
    // Initialize optimizations
    ImageOptimizer.initializeLazyLoading();
    ResourcePriority.loadByPriority();
    
    // Cleanup expired cache periodically
    const cacheCleanup = setInterval(() => {
      NetworkOptimizer.clearExpiredCache();
    }, 300000); // 5 minutes

    // Cleanup on unmount
    return () => {
      clearInterval(cacheCleanup);
      MemoryOptimizer.cleanup();
    };
  }, []);

  // Memory monitoring
  React.useEffect(() => {
    const monitor = setInterval(() => {
      const usage = MemoryOptimizer.getMemoryUsage();
      
      if (usage && usage.percentage > 90) {
        console.warn('High memory usage detected:', usage);
        MemoryOptimizer.cleanup();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(monitor);
  }, []);
}

export default {
  ImageOptimizer,
  CodeSplitter,
  MemoryOptimizer,
  NetworkOptimizer,
  ResourcePriority,
  usePerformanceOptimization
};