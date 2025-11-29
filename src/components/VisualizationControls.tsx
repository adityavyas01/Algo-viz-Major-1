import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

interface VisualizationControlsProps {
  onGenerateRandom: () => void;
}

export const VisualizationControls: React.FC<VisualizationControlsProps> = ({ onGenerateRandom }) => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg bg-gray-800">
      <Button onClick={onGenerateRandom} variant="outline" size="sm">
        <Shuffle className="w-4 h-4 mr-2" />
        New Random Array
      </Button>
    </div>
  );
};
