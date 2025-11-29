import React from 'react';
import ModernBubbleSortVisualization from '@/components/modern/ModernBubbleSortVisualization';
import ModernSelectionSortVisualization from '@/components/modern/ModernSelectionSortVisualization';
import ModernQuickSortVisualization from '@/components/modern/ModernQuickSortVisualization';
import ModernMergeSortVisualization from '@/components/modern/ModernMergeSortVisualization';
import ModernBinarySearchVisualization from '@/components/modern/ModernBinarySearchVisualization';
import ModernLinkedListVisualization from '@/components/modern/ModernLinkedListVisualization';
import ModernStackVisualization from '@/components/modern/ModernStackVisualization';
import ModernQueueVisualization from '@/components/modern/ModernQueueVisualization';
import ModernBinaryTreeVisualization from '@/components/modern/ModernBinaryTreeVisualization';
import ModernHashTableVisualization from '@/components/modern/ModernHashTableVisualization';
import ModernGraphTraversalVisualization from '@/components/modern/ModernGraphTraversalVisualization';
import ModernAVLTreeVisualization from '@/components/modern/ModernAVLTreeVisualization';
import ModernRedBlackTreeVisualization from '@/components/modern/ModernRedBlackTreeVisualization';
import ModernHeapVisualization from '@/components/modern/ModernHeapVisualization';
import ModernHeapSortVisualization from '@/components/modern/ModernHeapSortVisualization';
import ModernRadixSortVisualization from '@/components/modern/ModernRadixSortVisualization';
import ModernAdvancedGraphAlgorithms from '@/components/modern/ModernAdvancedGraphAlgorithms';
import ModernTrieVisualization from '@/components/modern/ModernTrieVisualization';
import ModernDynamicProgrammingVisualization from '@/components/modern/ModernDynamicProgrammingVisualization';
import ModernStringMatchingVisualization from '@/components/modern/ModernStringMatchingVisualization';
import ModernDijkstraVisualization from '@/components/modern/ModernDijkstraVisualization';
import ModernComputationalGeometry from '@/components/modern/ModernComputationalGeometry';
import ModernAdvancedDynamicProgramming from '@/components/modern/ModernAdvancedDynamicProgramming';

import ModernBacktrackingVisualization from '@/components/modern/ModernBacktrackingVisualization';
import ModernNumberTheoryVisualization from '@/components/modern/ModernNumberTheoryVisualization';
import { ThreeDVisualization } from '@/components/ThreeDVisualization';
import { SpatialDataStructures } from '@/components/SpatialDataStructures';
import { VRClassroom } from '@/components/VRClassroom';
import ModernSegmentTreeVisualization from '@/components/modern/ModernSegmentTreeVisualization';
import ModernUnionFindVisualization from '@/components/modern/ModernUnionFindVisualization';
import ModernBloomFilterVisualization from '@/components/modern/ModernBloomFilterVisualization';

export const getDemoConfiguration = (demo: string) => {
  if (demo === 'bubble') {
    return {
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      component: <ModernBubbleSortVisualization />,
      complexity: {
        time: 'O(n^2)',
        space: 'O(1)'
      }
    };
  }

  if (demo === 'selection') {
    return {
      title: 'Selection Sort',
      description: 'An in-place comparison sorting algorithm. It is noted for its simplicity and performance advantages over more complicated algorithms in certain situations.',
      component: <ModernSelectionSortVisualization />,
      complexity: {
        time: 'O(n^2)',
        space: 'O(1)'
      }
    };
  }

  if (demo === 'quick') {
    return {
      title: 'Quick Sort',
      description: 'A divide and conquer algorithm. It works by selecting a \'pivot\' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
      component: <ModernQuickSortVisualization />,
      complexity: {
        time: 'O(n log n)',
        space: 'O(log n)'
      }
    };
  }

  if (demo === 'merge') {
    return {
      title: 'Merge Sort',
      description: 'A divide and conquer algorithm that divides the input array into two halves, recursively sorts each half, and then merges the sorted halves.',
      component: <ModernMergeSortVisualization />,
      complexity: {
        time: 'O(n log n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'binary-search') {
    return {
      title: 'Binary Search',
      description: 'A search algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array.',
      component: <ModernBinarySearchVisualization />,
      complexity: {
        time: 'O(log n)',
        space: 'O(1)'
      }
    };
  }

  if (demo === 'linkedlist') {
    return {
      title: 'Linked List',
      description: 'A linear collection of data elements whose order is not determined by their physical placement in memory. Instead, each element points to the next.',
      component: <ModernLinkedListVisualization />,
      complexity: {
        time: 'O(n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'stack') {
    return {
      title: 'Stack',
      description: 'A collection of elements with LIFO (last-in-first-out) behavior. Elements are added and removed from the top of the stack.',
      component: <ModernStackVisualization />,
      complexity: {
        time: 'O(1)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'queue') {
    return {
      title: 'Queue',
      description: 'A collection of elements with FIFO (first-in-first-out) behavior. Elements are added to the rear and removed from the front.',
      component: <ModernQueueVisualization />,
      complexity: {
        time: 'O(1)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'binarytree') {
    return {
      title: 'Binary Tree',
      description: 'A tree data structure in which each node has at most two children, which are referred to as the left child and the right child.',
      component: <ModernBinaryTreeVisualization />,
      complexity: {
        time: 'O(log n) to O(n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'hashtable') {
    return {
      title: 'Hash Table',
      description: 'A data structure that implements an associative array abstract data type, a structure that can map keys to values.',
      component: <ModernHashTableVisualization />,
      complexity: {
        time: 'O(1) average, O(n) worst',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'graph') {
    return {
      title: 'Graph Traversal',
      description: 'Visualizes Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms on a graph.',
      component: <ModernGraphTraversalVisualization />,
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    };
  }

  if (demo === 'avl') {
    return {
      title: 'AVL Tree',
      description: 'A self-balancing binary search tree. In an AVL tree, the heights of the two child subtrees of any node differ by at most one.',
      component: <ModernAVLTreeVisualization />,
      complexity: {
        time: 'O(log n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'redblack') {
    return {
      title: 'Red-Black Tree',
      description: 'Another self-balancing binary search tree where each node is colored either red or black. Red-black trees offer predictable performance.',
      component: <ModernRedBlackTreeVisualization />,
      complexity: {
        time: 'O(log n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'heap') {
    return {
      title: 'Heap',
      description: 'A specialized tree-based data structure that satisfies the heap property: in a min-heap, for any given node C, if P is a parent node of C, then the key (the value) of P is less than or equal to the key of C.',
      component: <ModernHeapVisualization />,
      complexity: {
        time: 'O(log n)',
        space: 'O(1)'
      }
    };
  }

  if (demo === 'dijkstra') {
    return {
      title: 'Dijkstra & Prim',
      description: "Visualizes Dijkstra's shortest path and Prim's Minimum Spanning Tree algorithms.",
      component: <ModernDijkstraVisualization />,
      complexity: {
        time: 'O(E log V)',
        space: 'O(V + E)'
      }
    };
  }

  if (demo === 'trie') {
    return {
      title: 'Trie Data Structure',
      description: 'Interactive Trie visualization with custom word input and pre-loaded English dictionary for efficient string operations and prefix matching.',
      component: <ModernTrieVisualization />,
      complexity: {
        time: 'O(k) for operations',
        space: 'O(alphabet_size × N × M)'
      }
    };
  }

  if (demo === 'dp') {
    return {
      title: 'Dynamic Programming',
      description: 'Illustrates basic dynamic programming concepts with examples like Fibonacci sequence and knapsack problem.',
      component: <ModernDynamicProgrammingVisualization />,
      complexity: {
        time: 'O(n) to O(n^2)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'string-matching') {
    return {
      title: 'String Matching',
      description: 'Demonstrates various string matching algorithms like Knuth-Morris-Pratt (KMP) and Boyer-Moore.',
      component: <ModernStringMatchingVisualization />,
      complexity: {
        time: 'O(n + m)',
        space: 'O(m)'
      }
    };
  }

  if (demo === 'advanced-graph-algorithms') {
    return {
      title: 'Max Flow & SCC',
      description: 'Visualizes maximum flow algorithms (Ford-Fulkerson) and Strongly Connected Components (Kosaraju, Tarjan).',
      component: <ModernAdvancedGraphAlgorithms />,
      complexity: {
        time: 'O(V^2E) to O(V+E)',
        space: 'O(V)'
      }
    };
  }

  if (demo === 'computational-geometry') {
    return {
      title: 'Computational Geometry',
      description: 'Demonstrates algorithms for geometric problems like convex hull and line intersection.',
      component: <ModernComputationalGeometry />,
      complexity: {
        time: 'O(n log n)',
        space: 'O(n)'
      }
    };
  }

   if (demo === 'advanced-dp') {
    return {
      title: 'Advanced Dynamic Programming',
      description: 'Advanced DP techniques like bitmasking and DP on trees.',
      component: <ModernAdvancedDynamicProgramming />,
      complexity: {
        time: 'O(n*2^n)',
        space: 'O(2^n)'
      }
    };
  }

  if (demo === 'backtracking') {
    return {
      title: 'Backtracking Algorithms',
      description: 'Explore backtracking through N-Queens, Sudoku, and more.',
      component: <ModernBacktrackingVisualization />,
      complexity: {
        time: 'O(n!)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'number-theory') {
    return {
      title: 'Number Theory',
      description: 'Interactive visualizations for fundamental number theory algorithms like GCD and Prime Factorization.',
      component: <ModernNumberTheoryVisualization />,
      complexity: {
        time: 'GCD: O(log(min(a,b)))',
        space: 'Factorization: O(sqrt(n))'
      }
    };
  }

  if (demo === 'threed-structures') {
    return {
      title: 'Three.js 3D Data Structures',
      description: 'Interactive 3D visualization of data structures using Three.js with VR support',
      component: <div className="text-white p-8 text-center">3D Visualization temporarily disabled due to compatibility issues. Please select another algorithm.</div>,
      complexity: {
        time: 'O(n) to O(log n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'spatial-structures') {
    return {
      title: 'Spatial Data Structures',
      description: 'Quad-trees and K-d trees for efficient spatial queries and indexing',
      component: <div className="text-white p-8 text-center">Spatial structures temporarily disabled due to compatibility issues. Please select another algorithm.</div>,
      complexity: {
        time: 'O(log n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'vr-classroom') {
    return {
      title: 'VR Collaborative Classroom',
      description: 'Virtual reality learning environment with hand tracking and collaborative features',
      component: <div className="text-white p-8 text-center">VR Classroom temporarily disabled due to compatibility issues. Please select another algorithm.</div>,
      complexity: {
        time: 'Real-time',
        space: 'O(n) participants'
      }
    };
  }

  if (demo === 'segment-trees') {
    return {
      title: 'Segment Trees',
      description: 'Range query data structures with efficient updates and queries in O(log n) time.',
      component: <ModernSegmentTreeVisualization />,
      complexity: {
        time: 'O(log n)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'union-find') {
    return {
      title: 'Disjoint Set (Union-Find)',
      description: 'Union-Find data structure with path compression and union by rank optimizations.',
      component: <ModernUnionFindVisualization />,
      complexity: {
        time: 'O(α(n))',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'bloom-filter') {
    return {
      title: 'Bloom Filter',
      description: 'Probabilistic data structure for set membership testing with hash function demonstrations.',
      component: <ModernBloomFilterVisualization />,
      complexity: {
        time: 'O(k)',
        space: 'O(m)'
      }
    };
  }

  return {
    title: 'Algorithm Visualizations',
    description: 'Interactive visualizations for various algorithms and data structures.',
    component: <div>Select an algorithm from the menu.</div>,
    complexity: {
      time: 'N/A',
      space: 'N/A'
    }
  };
};
