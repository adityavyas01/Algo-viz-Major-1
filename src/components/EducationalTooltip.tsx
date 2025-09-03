import React from 'react';
import { X, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EducationalTooltip as EducationalTooltipType } from '@/hooks/useEducationalTooltips';

interface EducationalTooltipProps {
  tooltip: EducationalTooltipType;
  isVisible: boolean;
  onClose: () => void;
}

export function EducationalTooltip({ tooltip, isVisible, onClose }: EducationalTooltipProps) {
  if (!isVisible) return null;

  const levelColors = {
    beginner: 'bg-green-500/20 border-green-500/30 text-green-300',
    intermediate: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
    advanced: 'bg-red-500/20 border-red-500/30 text-red-300'
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-right">
      <Card className="bg-black/80 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm text-white">{tooltip.title}</CardTitle>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-6 w-6 p-0 text-white/70 hover:text-white"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-white/80 text-xs leading-relaxed">
            {tooltip.content}
          </CardDescription>
          <div className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${levelColors[tooltip.level]}`}>
            {tooltip.level}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
