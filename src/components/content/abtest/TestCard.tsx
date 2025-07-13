
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Pause, Square, Eye } from 'lucide-react';

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

interface TestCardProps {
  test: ABTest;
}

export const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const getStatusColor = (status: ABTest['status']) => {
    switch (status) {
      case 'Running': return 'bg-green-500';
      case 'Paused': return 'bg-yellow-500';
      case 'Completed': return 'bg-blue-500';
      case 'Draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-white font-semibold text-lg">{test.name}</h4>
              <Badge className={getStatusColor(test.status)}>
                {test.status}
              </Badge>
              {test.significance && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  Significant
                </Badge>
              )}
            </div>
            
            <p className="text-white/70 text-sm mb-4">{test.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-white/70">Started:</span>
                <span className="text-white ml-2">{test.startDate}</span>
              </div>
              {test.endDate && (
                <div>
                  <span className="text-white/70">Ended:</span>
                  <span className="text-white ml-2">{test.endDate}</span>
                </div>
              )}
              <div>
                <span className="text-white/70">Confidence:</span>
                <span className="text-white ml-2">{test.confidence}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {test.status === 'Running' && (
              <>
                <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20">
                  <Pause className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                  <Square className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Variant Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {test.variants.map((variant, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <h5 className="text-white font-medium mb-3">{variant.name}</h5>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Traffic:</span>
                  <span className="text-white">{variant.traffic.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Conversions:</span>
                  <span className="text-white">{variant.conversions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Conversion Rate:</span>
                  <span className="text-white font-semibold">{variant.conversionRate}%</span>
                </div>
                <Progress value={variant.conversionRate} className="h-2 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
