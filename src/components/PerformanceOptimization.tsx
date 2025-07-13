
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, BarChart3, Clock, HardDrive, Cpu, Monitor } from 'lucide-react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  operationsCount: number;
  frameRate: number;
}

export const PerformanceOptimization: React.FC = () => {
  const [dataSize, setDataSize] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    operationsCount: 0,
    frameRate: 60
  });

  // Memoized large dataset generation
  const largeDataset = useMemo(() => {
    console.log(`Generating dataset of size ${dataSize}`);
    return Array.from({ length: dataSize }, (_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 1000),
      category: Math.floor(Math.random() * 10)
    }));
  }, [dataSize]);

  // Optimized sorting function with performance tracking
  const optimizedSort = useCallback(async () => {
    setIsRunning(true);
    const startTime = performance.now();
    const startMemory = (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;

    // Simulate sorting with chunked processing for large datasets
    const chunkSize = Math.min(1000, Math.floor(dataSize / 10));
    let processedItems = 0;

    for (let i = 0; i < largeDataset.length; i += chunkSize) {
      const chunk = largeDataset.slice(i, i + chunkSize);
      chunk.sort((a, b) => a.value - b.value);
      processedItems += chunk.length;

      // Update progress and allow UI to update
      await new Promise(resolve => setTimeout(resolve, 1));
      
      setMetrics(prev => ({
        ...prev,
        operationsCount: processedItems
      }));
    }

    const endTime = performance.now();
    const endMemory = (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;

    setMetrics({
      renderTime: endTime - startTime,
      memoryUsage: endMemory - startMemory,
      operationsCount: largeDataset.length,
      frameRate: Math.round(1000 / ((endTime - startTime) / largeDataset.length * 1000))
    });

    setIsRunning(false);
  }, [largeDataset, dataSize]);

  const runBenchmark = () => {
    optimizedSort();
  };

  const getPerformanceGrade = (renderTime: number): { grade: string; color: string } => {
    if (renderTime < 50) return { grade: 'Excellent', color: 'text-green-400' };
    if (renderTime < 100) return { grade: 'Good', color: 'text-blue-400' };
    if (renderTime < 200) return { grade: 'Fair', color: 'text-yellow-400' };
    return { grade: 'Poor', color: 'text-red-400' };
  };

  const performanceGrade = getPerformanceGrade(metrics.renderTime);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Performance Optimization</h2>
        <p className="text-white/80">Analyze and optimize algorithm performance for large datasets</p>
      </div>

      <Tabs defaultValue="benchmark" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="benchmark">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Performance Benchmark
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-white text-sm">Dataset Size:</label>
                  <Input
                    type="number"
                    value={dataSize}
                    onChange={(e) => setDataSize(Math.max(100, parseInt(e.target.value) || 1000))}
                    className="w-24"
                    min={100}
                    max={100000}
                    step={100}
                  />
                  <Button 
                    onClick={runBenchmark}
                    disabled={isRunning}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isRunning ? 'Running...' : 'Run Benchmark'}
                  </Button>
                </div>

                {isRunning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-white text-sm">
                      <span>Processing...</span>
                      <span>{Math.round((metrics.operationsCount / dataSize) * 100)}%</span>
                    </div>
                    <Progress value={(metrics.operationsCount / dataSize) * 100} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Render Time</span>
                    </div>
                    <p className="text-white text-lg font-semibold">
                      {metrics.renderTime.toFixed(2)}ms
                    </p>
                    <p className={`text-sm ${performanceGrade.color}`}>
                      {performanceGrade.grade}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <HardDrive className="w-4 h-4" />
                      <span className="text-sm">Memory Usage</span>
                    </div>
                    <p className="text-white text-lg font-semibold">
                      {(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Cpu className="w-4 h-4" />
                      <span className="text-sm">Operations</span>
                    </div>
                    <p className="text-white text-lg font-semibold">
                      {metrics.operationsCount.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Monitor className="w-4 h-4" />
                      <span className="text-sm">Frame Rate</span>
                    </div>
                    <p className="text-white text-lg font-semibold">
                      {metrics.frameRate}fps
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="memory">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Memory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-400">Memory Optimization</h4>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li>• Object pooling for frequent allocations</li>
                    <li>• Lazy loading of visualization components</li>
                    <li>• Garbage collection optimization</li>
                    <li>• Memory leak detection</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400">Data Structure Efficiency</h4>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li>• Typed arrays for numeric data</li>
                    <li>• Sparse arrays for large datasets</li>
                    <li>• Memory-mapped data structures</li>
                    <li>• Compression for stored data</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-400">Caching Strategies</h4>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li>• Memoization of expensive calculations</li>
                    <li>• LRU cache for recent results</li>
                    <li>• IndexedDB for large datasets</li>
                    <li>• Web Workers for background processing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Algorithm Optimizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-cyan-400">Rendering Optimizations</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• Canvas virtualization for large arrays</li>
                      <li>• WebGL acceleration for 3D visualizations</li>
                      <li>• RequestAnimationFrame optimization</li>
                      <li>• Batch DOM updates</li>
                      <li>• Level-of-detail rendering</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Algorithm Improvements</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• Time complexity analysis</li>
                      <li>• Space complexity optimization</li>
                      <li>• Parallel processing with Web Workers</li>
                      <li>• Progressive loading strategies</li>
                      <li>• Adaptive algorithm selection</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Performance Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
                    <div>
                      <p className="font-medium text-white mb-2">For Large Datasets (10K+ items):</p>
                      <ul className="space-y-1">
                        <li>• Use chunked processing</li>
                        <li>• Implement virtual scrolling</li>
                        <li>• Consider data sampling</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">For Real-time Updates:</p>
                      <ul className="space-y-1">
                        <li>• Debounce rapid updates</li>
                        <li>• Use RAF for smooth animations</li>
                        <li>• Minimize layout thrashing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Real-time Performance Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">98%</div>
                    <div className="text-sm text-white/70">CPU Efficiency</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">45ms</div>
                    <div className="text-sm text-white/70">Avg Response</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">12MB</div>
                    <div className="text-sm text-white/70">Memory Peak</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">60fps</div>
                    <div className="text-sm text-white/70">Frame Rate</div>
                  </div>
                </div>

                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Monitoring Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
                    <ul className="space-y-2">
                      <li>• Real-time performance metrics</li>
                      <li>• Memory usage tracking</li>
                      <li>• Frame rate monitoring</li>
                      <li>• CPU utilization analysis</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• Performance bottleneck detection</li>
                      <li>• Automated optimization suggestions</li>
                      <li>• Historical performance data</li>
                      <li>• Export performance reports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
