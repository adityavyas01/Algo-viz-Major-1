// Core Web Vitals Performance Monitoring System
import React from 'react';
import { onCLS, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

interface PerformanceMetrics {
  cls: number | null;
  fid: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
  timestamp: number;
  url: string;
  userAgent: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    cls: null,
    fid: null,
    fcp: null,
    lcp: null,
    ttfb: null,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor(private config: {
    reportingEndpoint?: string;
    enableConsoleLogging?: boolean;
    sampleRate?: number;
    enableResourceTiming?: boolean;
    enableLongTasks?: boolean;
  } = {}) {
    this.config = {
      enableConsoleLogging: true,
      sampleRate: 0.1, // 10% sampling rate
      enableResourceTiming: true,
      enableLongTasks: true,
      ...config
    };
  }

  public initialize(): void {
    if (this.isInitialized) return;

    // Initialize Core Web Vitals
    this.initializeCoreWebVitals();
    
    // Initialize additional performance monitoring
    if (this.config.enableResourceTiming) {
      this.initializeResourceTiming();
    }
    
    if (this.config.enableLongTasks) {
      this.initializeLongTaskMonitoring();
    }

    // Initialize memory monitoring
    this.initializeMemoryMonitoring();
    
    // Initialize navigation timing
    this.initializeNavigationTiming();

    this.isInitialized = true;

    if (this.config.enableConsoleLogging) {
      console.log('[Performance] Monitoring initialized');
    }
  }

  private initializeCoreWebVitals(): void {
    // Cumulative Layout Shift
    onCLS((metric: Metric) => {
      this.metrics.cls = metric.value;
      this.handleMetric('CLS', metric);
    });

    // First Input Delay (using custom implementation as FID is deprecated)
    this.initializeFIDFallback();

    // First Contentful Paint
    onFCP((metric: Metric) => {
      this.metrics.fcp = metric.value;
      this.handleMetric('FCP', metric);
    });

    // Largest Contentful Paint
    onLCP((metric: Metric) => {
      this.metrics.lcp = metric.value;
      this.handleMetric('LCP', metric);
    });

    // Time to First Byte
    onTTFB((metric: Metric) => {
      this.metrics.ttfb = metric.value;
      this.handleMetric('TTFB', metric);
    });
  }

  private initializeFIDFallback(): void {
    // Custom FID measurement using event listeners
    let firstInputDelay: number | null = null;
    
    const measureFirstInput = (event: Event) => {
      const now = performance.now();
      const eventTime = event.timeStamp;
      firstInputDelay = now - eventTime;
      
      if (firstInputDelay >= 0) {
        this.metrics.fid = firstInputDelay;
        this.handleMetric('FID', {
          value: firstInputDelay,
          entries: [],
          id: 'custom-fid',
          name: 'FID',
          rating: 'good',
          delta: firstInputDelay,
          navigationType: 'navigate'
        } as unknown as Metric);
      }
      
      // Remove listeners after first input
      window.removeEventListener('pointerdown', measureFirstInput, true);
      window.removeEventListener('keydown', measureFirstInput, true);
    };
    
    // Listen for first input
    window.addEventListener('pointerdown', measureFirstInput, true);
    window.addEventListener('keydown', measureFirstInput, true);
  }

  private initializeResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'resource') {
            this.analyzeResourceTiming(entry as PerformanceResourceTiming);
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('[Performance] Resource timing not supported:', error);
    }
  }

  private initializeLongTaskMonitoring(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'longtask') {
            this.handleLongTask(entry);
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('[Performance] Long task monitoring not supported:', error);
    }
  }

  private initializeMemoryMonitoring(): void {
    // Monitor memory usage if available
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.handleMemoryMetrics({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        });
      }, 30000); // Check every 30 seconds
    }
  }

  private initializeNavigationTiming(): void {
    if ('getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0] as PerformanceNavigationTiming;
        this.handleNavigationTiming(entry);
      }
    }
  }

  private handleMetric(name: string, metric: Metric): void {
    const rating = this.getMetricRating(name, metric.value);
    
    if (this.config.enableConsoleLogging) {
      console.log(`[Performance] ${name}:`, {
        value: metric.value,
        rating,
        entries: metric.entries
      });
    }

    // Report to analytics
    this.reportMetric(name, metric.value, rating);

    // Trigger performance warnings
    if (rating === 'poor') {
      this.triggerPerformanceWarning(name, metric.value);
    }
  }

  private analyzeResourceTiming(entry: PerformanceResourceTiming): void {
    const resourceType = this.getResourceType(entry.name);
    const loadTime = entry.responseEnd - entry.startTime;
    
    // Flag slow resources
    if (loadTime > 1000) { // Resources taking more than 1s
      if (this.config.enableConsoleLogging) {
        console.warn(`[Performance] Slow ${resourceType}:`, {
          url: entry.name,
          loadTime: Math.round(loadTime),
          size: entry.transferSize || 'unknown'
        });
      }
      
      this.reportSlowResource(entry, resourceType, loadTime);
    }

    // Flag large resources
    if (entry.transferSize && entry.transferSize > 1000000) { // > 1MB
      if (this.config.enableConsoleLogging) {
        console.warn(`[Performance] Large ${resourceType}:`, {
          url: entry.name,
          size: Math.round(entry.transferSize / 1024) + 'KB'
        });
      }
    }
  }

  private handleLongTask(entry: PerformanceEntry): void {
    const duration = entry.duration;
    
    if (this.config.enableConsoleLogging) {
      console.warn(`[Performance] Long task detected:`, {
        duration: Math.round(duration),
        startTime: Math.round(entry.startTime)
      });
    }

    this.reportLongTask(duration);
  }

  private handleMemoryMetrics(memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  }): void {
    const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    
    if (usagePercentage > 90) {
      console.warn('[Performance] High memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
        total: Math.round(memory.totalJSHeapSize / 1048576) + 'MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB',
        percentage: Math.round(usagePercentage) + '%'
      });
    }
  }

  private handleNavigationTiming(entry: PerformanceNavigationTiming): void {
    const timing = {
      dnsLookup: entry.domainLookupEnd - entry.domainLookupStart,
      tcpConnect: entry.connectEnd - entry.connectStart,
      request: entry.responseStart - entry.requestStart,
      response: entry.responseEnd - entry.responseStart,
      domProcessing: entry.domContentLoadedEventStart - entry.responseEnd,
      domComplete: entry.domComplete - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart
    };

    if (this.config.enableConsoleLogging) {
      console.log('[Performance] Navigation timing:', timing);
    }
  }

  private getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, [number, number]> = {
      'CLS': [0.1, 0.25],
      'FID': [100, 300],
      'FCP': [1800, 3000],
      'LCP': [2500, 4000],
      'TTFB': [800, 1800]
    };

    const [good, poor] = thresholds[name] || [0, 0];
    
    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|eot)/)) return 'font';
    if (url.includes('api/') || url.includes('supabase')) return 'api';
    return 'other';
  }

  private reportMetric(name: string, value: number, rating: string): void {
    // Sample based on sample rate
    if (Math.random() > (this.config.sampleRate || 0.1)) return;

    const data = {
      metric: name,
      value: Math.round(value * 100) / 100,
      rating,
      ...this.metrics,
      timestamp: Date.now()
    };

    // Send to analytics endpoint
    if (this.config.reportingEndpoint) {
      this.sendToEndpoint(data);
    }

    // Store in localStorage for debugging
    this.storeLocalMetric(data);
  }

  private reportSlowResource(entry: PerformanceResourceTiming, type: string, loadTime: number): void {
    const data = {
      type: 'slow-resource',
      resourceType: type,
      url: entry.name,
      loadTime: Math.round(loadTime),
      size: entry.transferSize || 0,
      timestamp: Date.now()
    };

    if (this.config.reportingEndpoint) {
      this.sendToEndpoint(data);
    }
  }

  private reportLongTask(duration: number): void {
    const data = {
      type: 'long-task',
      duration: Math.round(duration),
      timestamp: Date.now()
    };

    if (this.config.reportingEndpoint) {
      this.sendToEndpoint(data);
    }
  }

  private triggerPerformanceWarning(metric: string, value: number): void {
    // Dispatch custom event for UI warnings
    window.dispatchEvent(new CustomEvent('performance-warning', {
      detail: { metric, value }
    }));
  }

  private async sendToEndpoint(data: any): Promise<void> {
    try {
      await fetch(this.config.reportingEndpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      });
    } catch (error) {
      console.warn('[Performance] Failed to send metrics:', error);
    }
  }

  private storeLocalMetric(data: any): void {
    try {
      const stored = localStorage.getItem('algoviz-performance');
      const metrics = stored ? JSON.parse(stored) : [];
      
      metrics.push(data);
      
      // Keep only last 100 entries
      if (metrics.length > 100) {
        metrics.splice(0, metrics.length - 100);
      }
      
      localStorage.setItem('algoviz-performance', JSON.stringify(metrics));
    } catch (error) {
      console.warn('[Performance] Failed to store metrics locally:', error);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getStoredMetrics(): any[] {
    try {
      const stored = localStorage.getItem('algoviz-performance');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public clearStoredMetrics(): void {
    localStorage.removeItem('algoviz-performance');
  }

  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.isInitialized = false;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor({
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  reportingEndpoint: undefined, // Disabled - no backend endpoint available
  sampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1
});

// React Hook for Performance Monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);
  const [warnings, setWarnings] = React.useState<Array<{ metric: string; value: number }>>([]);

  React.useEffect(() => {
    performanceMonitor.initialize();

    const handleWarning = (event: CustomEvent) => {
      setWarnings(prev => [...prev, event.detail].slice(-5)); // Keep last 5 warnings
    };

    window.addEventListener('performance-warning', handleWarning as EventListener);

    // Update metrics periodically
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
    }, 5000);

    return () => {
      window.removeEventListener('performance-warning', handleWarning as EventListener);
      clearInterval(interval);
    };
  }, []);

  const clearWarnings = () => setWarnings([]);

  return { metrics, warnings, clearWarnings };
};

export default performanceMonitor;