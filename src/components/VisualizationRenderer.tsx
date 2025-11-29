import React from 'react';
import ModernBubbleSortVisualization from '@/components/modern/ModernBubbleSortVisualization';
import ModernSelectionSortVisualization from '@/components/modern/ModernSelectionSortVisualization';
import ModernInsertionSortVisualization from '@/components/modern/ModernInsertionSortVisualization';
import ModernMergeSortVisualization from '@/components/modern/ModernMergeSortVisualization';
import ModernQuickSortVisualization from '@/components/modern/ModernQuickSortVisualization';
import ModernHeapSortVisualization from '@/components/modern/ModernHeapSortVisualization';
import ModernBinarySearchVisualization from '@/components/modern/ModernBinarySearchVisualization';
import ModernStringMatchingVisualization from '@/components/modern/ModernStringMatchingVisualization';
import ModernBinaryTreeVisualization from '@/components/modern/ModernBinaryTreeVisualization';
import ModernAVLTreeVisualization from '@/components/modern/ModernAVLTreeVisualization';
import ModernRedBlackTreeVisualization from '@/components/modern/ModernRedBlackTreeVisualization';
import ModernTrieVisualization from '@/components/modern/ModernTrieVisualization';
import ModernHeapVisualization from '@/components/modern/ModernHeapVisualization';
import ModernGraphTraversalVisualization from '@/components/modern/ModernGraphTraversalVisualization';

// This mapping needs to be updated when new visualizations are created.
// The key should be the lowercase name of the algorithm as stored in the database.
const visualizationMap: { [key: string]: React.FC } = {
  'bubble sort': ModernBubbleSortVisualization,
  'selection sort': ModernSelectionSortVisualization,
  'insertion sort': ModernInsertionSortVisualization,
  'merge sort': ModernMergeSortVisualization,
  'quick sort': ModernQuickSortVisualization,
  'heap': ModernHeapVisualization,
  'heap sort': ModernHeapSortVisualization,
  'binary search': ModernBinarySearchVisualization,
  'kmp': ModernStringMatchingVisualization,
  'rabin-karp': ModernStringMatchingVisualization,
  'binary tree traversal': ModernBinaryTreeVisualization,
  'avl tree': ModernAVLTreeVisualization,
  'red-black tree': ModernRedBlackTreeVisualization,
  'trie': ModernTrieVisualization,
  'bfs': ModernGraphTraversalVisualization,
  'dfs': ModernGraphTraversalVisualization,
};

interface VisualizationRendererProps {
  algorithmName: string;
}

const VisualizationRenderer: React.FC<VisualizationRendererProps> = ({ algorithmName }) => {
  const slug = algorithmName.toLowerCase();
  const VisualizationComponent = visualizationMap[slug];

  if (!VisualizationComponent) {
    // Return null or a placeholder if no visualization is available for the given algorithm
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Interactive Visualization</h2>
      <VisualizationComponent />
    </div>
  );
};

export default VisualizationRenderer;
