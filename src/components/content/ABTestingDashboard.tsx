import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TestMetrics } from './abtest/TestMetrics';
import { CreateTestForm } from './abtest/CreateTestForm';
import { TestCard } from './abtest/TestCard';

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'Running' | 'Paused' | 'Completed' | 'Draft';
  variants: {
    name: string;
    traffic: number;
    conversions: number;
    conversionRate: number;
  }[];
  startDate: string;
  endDate?: string;
  confidence: number;
  significance: boolean;
}

interface ConversionMetric {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

export const ABTestingDashboard: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const activeTests: ABTest[] = [
    {
      id: 'AB-001',
      name: 'Algorithm Card Layout',
      description: 'Testing new card design vs current layout for algorithm selection',
      status: 'Running',
      variants: [
        { name: 'Control (Current)', traffic: 2847, conversions: 428, conversionRate: 15.0 },
        { name: 'Variant A (New Design)', traffic: 2756, conversions: 496, conversionRate: 18.0 }
      ],
      startDate: '2024-01-10',
      confidence: 95.2,
      significance: true
    },
    {
      id: 'AB-002',
      name: 'Tutorial Flow',
      description: 'Interactive vs video-based tutorial introduction',
      status: 'Running',
      variants: [
        { name: 'Control (Video)', traffic: 1567, conversions: 187, conversionRate: 11.9 },
        { name: 'Variant A (Interactive)', traffic: 1634, conversions: 261, conversionRate: 16.0 }
      ],
      startDate: '2024-01-12',
      confidence: 87.4,
      significance: false
    },
    {
      id: 'AB-003',
      name: 'Pricing Page CTA',
      description: 'Different call-to-action button designs and copy',
      status: 'Completed',
      variants: [
        { name: 'Control', traffic: 4521, conversions: 136, conversionRate: 3.0 },
        { name: 'Variant A', traffic: 4398, conversions: 198, conversionRate: 4.5 }
      ],
      startDate: '2024-01-05',
      endDate: '2024-01-15',
      confidence: 99.1,
      significance: true
    }
  ];

  const conversionMetrics: ConversionMetric[] = [
    { name: 'Overall Conversion Rate', value: '14.2%', change: '+2.1%', trend: 'up' },
    { name: 'Sign-up Rate', value: '8.7%', change: '+1.3%', trend: 'up' },
    { name: 'Feature Engagement', value: '67%', change: '+5.2%', trend: 'up' },
    { name: 'Retention (7-day)', value: '45%', change: '-0.8%', trend: 'down' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">A/B Testing Dashboard</h1>
            <p className="text-white/70 text-lg">Optimize conversion rates through data-driven experiments</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Test
          </Button>
        </div>

        <TestMetrics metrics={conversionMetrics} />

        {showCreateForm && <CreateTestForm onClose={() => setShowCreateForm(false)} />}

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Active Tests</h2>
          {activeTests.map(test => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>

        {/* Performance Summary */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-xl">Testing Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">23</div>
                <div className="text-white/70">Total Tests Run</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">78%</div>
                <div className="text-white/70">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">+12.4%</div>
                <div className="text-white/70">Avg. Conversion Lift</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
