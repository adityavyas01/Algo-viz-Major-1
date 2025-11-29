import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Zap, FileText, Image, Code, Archive } from 'lucide-react';
import { MotionWrapper, MicroInteraction } from './motion/MotionWrapper';

interface BundleAsset {
  name: string;
  size: number;
  gzipSize?: number;
  type: 'js' | 'css' | 'font' | 'image' | 'other';
  chunks: string[];
  modules?: string[];
}

interface BundleAnalysis {
  totalSize: number;
  gzipSize: number;
  assets: BundleAsset[];
  largestAssets: BundleAsset[];
  recommendations: string[];
  loadTime: {
    fast3g: number;
    slow3g: number;
    cable: number;
  };
}

// Simulate bundle analysis (in real app, this would come from webpack-bundle-analyzer)
const simulateBundleAnalysis = (): BundleAnalysis => {
  const assets: BundleAsset[] = [
    {
      name: 'vendor.js',
      size: 450000,
      gzipSize: 120000,
      type: 'js',
      chunks: ['vendor'],
      modules: ['react', 'react-dom', 'framer-motion', 'react-router-dom']
    },
    {
      name: 'main.js', 
      size: 180000,
      gzipSize: 55000,
      type: 'js',
      chunks: ['main'],
      modules: ['App.tsx', 'Hero.tsx', 'Dashboard.tsx']
    },
    {
      name: 'components.js',
      size: 95000,
      gzipSize: 28000,
      type: 'js',
      chunks: ['components'],
      modules: ['MotionWrapper.tsx', 'PerformanceDashboard.tsx']
    },
    {
      name: 'styles.css',
      size: 45000,
      gzipSize: 8000,
      type: 'css',
      chunks: ['main'],
    },
    {
      name: 'fonts.woff2',
      size: 32000,
      type: 'font',
      chunks: []
    },
    {
      name: 'icons.svg',
      size: 15000,
      type: 'image',
      chunks: []
    }
  ];

  const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
  const gzipSize = assets.reduce((sum, asset) => sum + (asset.gzipSize || asset.size * 0.3), 0);

  return {
    totalSize,
    gzipSize,
    assets,
    largestAssets: assets.sort((a, b) => b.size - a.size).slice(0, 5),
    recommendations: [
      'Consider lazy loading non-critical components',
      'Enable tree shaking for unused code elimination',
      'Use dynamic imports for route-based code splitting',
      'Optimize images with WebP format and responsive loading',
      'Bundle vendor libraries separately for better caching'
    ],
    loadTime: {
      fast3g: gzipSize / (1.6 * 1024 * 1024 / 8), // 1.6 Mbps
      slow3g: gzipSize / (0.4 * 1024 * 1024 / 8), // 400 Kbps  
      cable: gzipSize / (5 * 1024 * 1024 / 8) // 5 Mbps
    }
  };
};

export const BundleAnalyzer: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ 
  isVisible, 
  onClose 
}) => {
  const [analysis, setAnalysis] = useState<BundleAnalysis | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<BundleAsset | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Simulate loading analysis
      const timer = setTimeout(() => {
        setAnalysis(simulateBundleAnalysis());
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / 1048576 * 10) / 10 + ' MB';
  };

  const formatTime = (seconds: number) => {
    if (seconds < 1) return Math.round(seconds * 1000) + 'ms';
    return Math.round(seconds * 10) / 10 + 's';
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'js': return <Code className="w-4 h-4" />;
      case 'css': return <FileText className="w-4 h-4" />;
      case 'font': return <Archive className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getAssetColor = (type: string) => {
    switch (type) {
      case 'js': return 'text-yellow-400 bg-yellow-400/10';
      case 'css': return 'text-blue-400 bg-blue-400/10';
      case 'font': return 'text-purple-400 bg-purple-400/10';
      case 'image': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getSizePercentage = (size: number) => {
    return analysis ? Math.round((size / analysis.totalSize) * 100) : 0;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gradient-to-br from-slate-900/95 to-purple-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Bundle Analysis</h3>
            <p className="text-white/60 text-sm">JavaScript bundle optimization insights</p>
          </div>
        </div>
      </div>

      {!analysis ? (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white/60">Analyzing bundle...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">
                {formatSize(analysis.totalSize)}
              </div>
              <div className="text-white/60 text-sm">Total Bundle Size</div>
              <div className="text-cyan-400 text-xs mt-1">
                {formatSize(analysis.gzipSize)} gzipped
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">
                {analysis.assets.length}
              </div>
              <div className="text-white/60 text-sm">Assets</div>
              <div className="text-green-400 text-xs mt-1">
                {analysis.largestAssets.length} need optimization
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">
                {formatTime(analysis.loadTime.fast3g)}
              </div>
              <div className="text-white/60 text-sm">Load Time (Fast 3G)</div>
              <div className="text-yellow-400 text-xs mt-1">
                {formatTime(analysis.loadTime.slow3g)} on Slow 3G
              </div>
            </div>
          </div>

          {/* Asset List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-4">Largest Assets</h4>
              <div className="space-y-3">
                {analysis.largestAssets.map((asset, index) => (
                  <MotionWrapper key={asset.name} variant="slideInFromLeft" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div 
                        className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 cursor-pointer"
                        onClick={() => setSelectedAsset(asset)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${getAssetColor(asset.type)}`}>
                              {getAssetIcon(asset.type)}
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">{asset.name}</div>
                              <div className="text-white/60 text-xs">{asset.type.toUpperCase()}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{formatSize(asset.size)}</div>
                            <div className="text-white/60 text-xs">{getSizePercentage(asset.size)}%</div>
                          </div>
                        </div>
                        
                        {/* Size bar */}
                        <div className="mt-3 bg-white/10 rounded-full h-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getSizePercentage(asset.size)}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full ${asset.type === 'js' ? 'bg-yellow-400' : 
                                               asset.type === 'css' ? 'bg-blue-400' :
                                               asset.type === 'font' ? 'bg-purple-400' : 'bg-green-400'}`}
                          />
                        </div>
                      </div>
                    </MicroInteraction>
                  </MotionWrapper>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="text-white font-semibold mb-4">Optimization Recommendations</h4>
              <div className="space-y-3">
                {analysis.recommendations.map((recommendation, index) => (
                  <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
                    <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl border border-cyan-500/20">
                      <div className="flex items-start space-x-3">
                        <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white/90 text-sm leading-relaxed">{recommendation}</p>
                      </div>
                    </div>
                  </MotionWrapper>
                ))}
              </div>
            </div>
          </div>

          {/* Asset Detail Modal */}
          {selectedAsset && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAsset(null)}
            >
              <div 
                className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-xl ${getAssetColor(selectedAsset.type)}`}>
                    {getAssetIcon(selectedAsset.type)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{selectedAsset.name}</h4>
                    <p className="text-white/60 text-sm">{selectedAsset.type.toUpperCase()} Asset</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Original Size:</span>
                    <span className="text-white font-medium">{formatSize(selectedAsset.size)}</span>
                  </div>
                  {selectedAsset.gzipSize && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Gzipped Size:</span>
                      <span className="text-cyan-400 font-medium">{formatSize(selectedAsset.gzipSize)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/60">Bundle Share:</span>
                    <span className="text-white font-medium">{getSizePercentage(selectedAsset.size)}%</span>
                  </div>
                </div>
                
                {selectedAsset.modules && (
                  <div>
                    <h5 className="text-white font-semibold mb-2">Contains Modules:</h5>
                    <div className="space-y-1">
                      {selectedAsset.modules.map((module, index) => (
                        <div key={index} className="text-white/70 text-sm bg-white/5 px-3 py-1 rounded">
                          {module}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default BundleAnalyzer;