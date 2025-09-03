import { useState } from 'react';

// Educational tooltip types and data
export interface EducationalTooltip {
  id: string;
  trigger: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const EDUCATIONAL_TOOLTIPS: EducationalTooltip[] = [
  {
    id: 'sorting-intro',
    trigger: 'sorting-start',
    title: 'Sorting Algorithms',
    content: 'Sorting algorithms arrange elements in a specific order. Understanding their time complexity helps choose the right algorithm for your needs.',
    level: 'beginner',
    position: 'top'
  },
  {
    id: 'time-complexity',
    trigger: 'complexity-analysis',
    title: 'Time Complexity',
    content: 'Big O notation describes how algorithm performance scales with input size. O(n²) means time increases quadratically with input.',
    level: 'intermediate',
    position: 'right'
  },
  {
    id: 'space-complexity',
    trigger: 'memory-usage',
    title: 'Space Complexity',
    content: 'Space complexity measures memory usage. In-place algorithms use O(1) extra space, while others may need O(n) additional memory.',
    level: 'intermediate',
    position: 'left'
  }
];

// Hook for managing educational tooltips
export function useEducationalTooltips() {
  const [activeTooltip, setActiveTooltip] = useState<EducationalTooltip | null>(null);
  const [shownTooltips, setShownTooltips] = useState<Set<string>>(new Set());

  const showTooltip = (context: string) => {
    const tooltip = EDUCATIONAL_TOOLTIPS.find(t => t.trigger === context);
    if (tooltip && !shownTooltips.has(tooltip.id)) {
      setActiveTooltip(tooltip);
      setShownTooltips(prev => new Set([...prev, tooltip.id]));
    }
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const resetTooltips = () => {
    setShownTooltips(new Set());
    setActiveTooltip(null);
  };

  return {
    activeTooltip,
    showTooltip,
    hideTooltip,
    resetTooltips,
    hasShownTooltip: (id: string) => shownTooltips.has(id)
  };
}
