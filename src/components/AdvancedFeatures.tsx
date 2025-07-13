
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import { AlgorithmComparison } from '@/components/AlgorithmComparison';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { AccessibilityFeatures } from '@/components/AccessibilityFeatures';
import { PerformanceOptimization } from '@/components/PerformanceOptimization';
import { MobileGestures } from '@/components/MobileGestures';
import { 
  Palette, 
  GitCompare, 
  Search, 
  Accessibility, 
  Zap, 
  Smartphone 
} from 'lucide-react';

export const AdvancedFeatures: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');

  const handleAlgorithmSelect = (algorithmId: string) => {
    setSelectedAlgorithm(algorithmId);
    // Could navigate to specific algorithm or update visualization
    console.log('Selected algorithm:', algorithmId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Advanced Features</h1>
          <p className="text-xl text-white/80">Enhanced customization, accessibility, and performance tools</p>
        </div>

        <Tabs defaultValue="customization" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="customization" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Themes</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <GitCompare className="w-4 h-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Accessibility className="w-4 h-4" />
              <span className="hidden sm:inline">Accessibility</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customization">
            <ThemeCustomizer />
          </TabsContent>

          <TabsContent value="comparison">
            <AlgorithmComparison />
          </TabsContent>

          <TabsContent value="search">
            <SearchAndFilter onAlgorithmSelect={handleAlgorithmSelect} />
          </TabsContent>

          <TabsContent value="accessibility">
            <AccessibilityFeatures />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceOptimization />
          </TabsContent>

          <TabsContent value="mobile">
            <MobileGestures />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
