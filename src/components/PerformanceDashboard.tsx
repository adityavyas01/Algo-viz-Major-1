import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  X,
  BarChart3,
  Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicroInteraction, MotionWrapper } from './motion/MotionWrapper';
import { usePerformanceMonitor } from '@/lib/performance';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
  description: string;
  icon: React.ReactNode;
}

export const PerformanceDashboard: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ 
  isVisible, 
  onClose 
}) => {
  const { metrics, warnings, clearWarnings } = usePerformanceMonitor();
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'warnings' | 'insights'>('metrics');

  const performanceMetrics: PerformanceMetric[] = [
    {
      name: 'Largest Contentful Paint',
      value: metrics?.lcp || 0,
      unit: 'ms',
      rating: metrics?.lcp ? (metrics.lcp <= 2500 ? 'good' : metrics.lcp <= 4000 ? 'needs-improvement' : 'poor') : 'good',
      threshold: { good: 2500, poor: 4000 },
      description: 'Time until the largest content element is rendered',
      icon: <Gauge className="w-4 h-4" />
    },
    {
      name: 'First Contentful Paint',
      value: metrics?.fcp || 0,
      unit: 'ms', 
      rating: metrics?.fcp ? (metrics.fcp <= 1800 ? 'good' : metrics.fcp <= 3000 ? 'needs-improvement' : 'poor') : 'good',
      threshold: { good: 1800, poor: 3000 },
      description: 'Time until first text/image is painted',
      icon: <Zap className="w-4 h-4" />
    },
    {
      name: 'Cumulative Layout Shift',
      value: metrics?.cls || 0,
      unit: '',
      rating: metrics?.cls ? (metrics.cls <= 0.1 ? 'good' : metrics.cls <= 0.25 ? 'needs-improvement' : 'poor') : 'good',
      threshold: { good: 0.1, poor: 0.25 },
      description: 'Visual stability during page load',
      icon: <Activity className="w-4 h-4" />
    },
    {
      name: 'First Input Delay',
      value: metrics?.fid || 0,
      unit: 'ms',
      rating: metrics?.fid ? (metrics.fid <= 100 ? 'good' : metrics.fid <= 300 ? 'needs-improvement' : 'poor') : 'good',
      threshold: { good: 100, poor: 300 },
      description: 'Time from first user interaction to browser response',
      icon: <Clock className="w-4 h-4" />
    },
    {
      name: 'Time to First Byte',
      value: metrics?.ttfb || 0,
      unit: 'ms',
      rating: metrics?.ttfb ? (metrics.ttfb <= 800 ? 'good' : metrics.ttfb <= 1800 ? 'needs-improvement' : 'poor') : 'good',
      threshold: { good: 800, poor: 1800 },
      description: 'Time from request start to first byte received',
      icon: <TrendingUp className="w-4 h-4" />
    }
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'needs-improvement': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'poor': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'needs-improvement': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '') return value.toFixed(3);
    return Math.round(value) + unit;
  };

  const getPerformanceScore = () => {
    const scores = performanceMetrics.map(metric => {
      switch (metric.rating) {
        case 'good': return 100;
        case 'needs-improvement': return 75;
        case 'poor': return 25;
        default: return 100;
      }
    });
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Performance Dashboard</h2>
                <p className="text-white/60 text-sm">Core Web Vitals & Performance Metrics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{getPerformanceScore()}</div>
                <div className="text-xs text-white/60">Performance Score</div>
              </div>
              <MicroInteraction type="button">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </MicroInteraction>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {[
              { id: 'metrics', label: 'Core Vitals', count: performanceMetrics.length },
              { id: 'warnings', label: 'Warnings', count: warnings.length },
              { id: 'insights', label: 'Insights', count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`
                  flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors
                  ${selectedTab === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {selectedTab === 'metrics' && (
              <MotionWrapper variant="stagger">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {performanceMetrics.map((metric, index) => (
                    <MotionWrapper key={metric.name} variant="scaleIn" delay={index * 0.1}>
                      <MicroInteraction type="card">
                        <div className={`
                          p-4 rounded-xl border backdrop-blur-sm
                          ${getRatingColor(metric.rating)}
                        `}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {metric.icon}
                              <span className="font-medium text-sm">{metric.name}</span>
                            </div>
                            {getRatingIcon(metric.rating)}
                          </div>
                          
                          <div className="text-2xl font-bold mb-1">
                            {formatValue(metric.value, metric.unit)}
                          </div>
                          
                          <div className="text-xs opacity-80 mb-3">
                            {metric.description}
                          </div>
                          
                          <div className="flex justify-between text-xs opacity-60">
                            <span>Good: ≤{formatValue(metric.threshold.good, metric.unit)}</span>
                            <span>Poor: {'>'}{formatValue(metric.threshold.poor, metric.unit)}</span>
                          </div>
                        </div>
                      </MicroInteraction>
                    </MotionWrapper>
                  ))}
                </div>
              </MotionWrapper>
            )}

            {selectedTab === 'warnings' && (
              <div className="space-y-4">
                {warnings.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">No Performance Warnings</h3>
                    <p className="text-white/60 text-sm">Your application is performing well!</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-semibold">Performance Warnings</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearWarnings}
                        className="text-white/60 border-white/20 hover:bg-white/10"
                      >
                        Clear All
                      </Button>
                    </div>
                    
                    {warnings.map((warning, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <div>
                            <div className="text-red-400 font-medium">
                              Poor {warning.metric} Performance
                            </div>
                            <div className="text-red-300/80 text-sm">
                              Value: {warning.value.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            )}

            {selectedTab === 'insights' && (
              <div className="space-y-6">
                <h3 className="text-white font-semibold mb-4">Performance Insights</h3>
                
                <div className="grid gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <h4 className="text-blue-400 font-medium mb-2">Optimization Recommendations</h4>
                    <ul className="text-blue-300/80 text-sm space-y-1">
                      <li>• Enable image lazy loading for better LCP scores</li>
                      <li>• Minimize layout shifts with proper sizing</li>
                      <li>• Use service worker for faster subsequent loads</li>
                      <li>• Optimize JavaScript bundle size</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <h4 className="text-green-400 font-medium mb-2">Performance Strengths</h4>
                    <ul className="text-green-300/80 text-sm space-y-1">
                      <li>• Fast server response times (TTFB)</li>
                      <li>• Efficient caching strategy</li>
                      <li>• Modern framework optimizations</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <h4 className="text-purple-400 font-medium mb-2">Advanced Features</h4>
                    <ul className="text-purple-300/80 text-sm space-y-1">
                      <li>• Real-time performance monitoring</li>
                      <li>• Automatic optimization suggestions</li>
                      <li>• Progressive Web App capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceDashboard;