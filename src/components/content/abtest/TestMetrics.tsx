
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface ConversionMetric {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

interface TestMetricsProps {
  metrics: ConversionMetric[];
}

export const TestMetrics: React.FC<TestMetricsProps> = ({ metrics }) => {
  const getTrendColor = (trend: ConversionMetric['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable': return 'text-yellow-500';
    }
  };

  const getTrendIcon = (trend: ConversionMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-2">{metric.name}</p>
                <p className="text-3xl font-bold text-white">{metric.value}</p>
              </div>
              <div className="text-right">
                {getTrendIcon(metric.trend)}
                <p className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.change}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
