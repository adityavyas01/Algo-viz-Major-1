import React from 'react';
import { BubbleSortVisualization } from '@/components/BubbleSortVisualization';
import { SelectionSortVisualization } from '@/components/SelectionSortVisualization';
import { QuickSortVisualization } from '@/components/QuickSortVisualization';
import { MergeSortVisualization } from '@/components/MergeSortVisualization';
import { BinarySearchVisualization } from '@/components/BinarySearchVisualization';
import { LinkedListDemo } from '@/components/LinkedListDemo';
import { StackVisualization } from '@/components/StackVisualization';
import { QueueVisualization } from '@/components/QueueVisualization';
import { BinaryTreeVisualization } from '@/components/BinaryTreeVisualization';
import { HashTableVisualization } from '@/components/HashTableVisualization';
import { GraphTraversalVisualization } from '@/components/GraphTraversalVisualization';
import { AVLTreeVisualization } from '@/components/AVLTreeVisualization';
import { RedBlackTreeVisualization } from '@/components/RedBlackTreeVisualization';
import { HeapVisualization } from '@/components/HeapVisualization';
import { AdvancedGraphAlgorithms } from '@/components/AdvancedGraphAlgorithms';
import { TrieVisualization } from '@/components/TrieVisualization';
import { DynamicProgrammingVisualization } from '@/components/DynamicProgrammingVisualization';
import { StringMatchingVisualization } from '@/components/StringMatchingVisualization';
import { AdvancedGraphVisualization } from '@/components/AdvancedGraphVisualization';
import { ComputationalGeometry } from '@/components/ComputationalGeometry';
import { AdvancedDynamicProgramming } from '@/components/AdvancedDynamicProgramming';
import { BacktrackingVisualization } from '@/components/BacktrackingVisualization';
import { NumberTheoryVisualization } from '@/components/NumberTheoryVisualization';
import { ThreeDVisualization } from '@/components/ThreeDVisualization';
import { SpatialDataStructures } from '@/components/SpatialDataStructures';
import { VRClassroom } from '@/components/VRClassroom';
import { SegmentTreeVisualization } from '@/components/SegmentTreeVisualization';
import { UnionFindVisualization } from '@/components/UnionFindVisualization';
import { BloomFilterVisualization } from '@/components/BloomFilterVisualization';

export const getDemoConfiguration = (demo: string) => {
  if (demo === 'bubble') {
    return {
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      component: <BubbleSortVisualization />,
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
      component: <SelectionSortVisualization />,
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
      component: <QuickSortVisualization />,
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
      component: <MergeSortVisualization />,
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
      component: <BinarySearchVisualization />,
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
      component: <LinkedListDemo />,
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
      component: <StackVisualization />,
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
      component: <QueueVisualization />,
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
      component: <BinaryTreeVisualization />,
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
      component: <HashTableVisualization />,
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
      component: <GraphTraversalVisualization />,
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
      component: <AVLTreeVisualization />,
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
      component: <RedBlackTreeVisualization />,
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
      component: <HeapVisualization />,
      complexity: {
        time: 'O(log n)',
        space: 'O(1)'
      }
    };
  }

  if (demo === 'advanced-graph') {
    return {
      title: 'Advanced Graph Algorithms',
      description: 'Visualizes shortest path algorithms (Dijkstra, Bellman-Ford) and Minimum Spanning Tree algorithms (Prim, Kruskal).',
      component: <AdvancedGraphVisualization />,
      complexity: {
        time: 'O(E log V) to O(VE)',
        space: 'O(V)'
      }
    };
  }

  if (demo === 'trie') {
    return {
      title: 'Trie',
      description: 'A tree-like data structure used for storing a dynamic set or associative array where the keys are usually strings.',
      component: <TrieVisualization />,
      complexity: {
        time: 'O(k)',
        space: 'O(kn)'
      }
    };
  }

  if (demo === 'dp') {
    return {
      title: 'Dynamic Programming',
      description: 'Illustrates basic dynamic programming concepts with examples like Fibonacci sequence and knapsack problem.',
      component: <DynamicProgrammingVisualization />,
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
      component: <StringMatchingVisualization />,
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
      component: <AdvancedGraphAlgorithms />,
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
      component: <ComputationalGeometry />,
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
      component: <AdvancedDynamicProgramming />,
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
      component: <BacktrackingVisualization />,
      complexity: {
        time: 'O(n!)',
        space: 'O(n)'
      }
    };
  }

  if (demo === 'number-theory') {
    return {
      title: 'Number Theory Algorithms',
      description: 'Explore fundamental number theory algorithms.',
      component: <NumberTheoryVisualization />,
      complexity: {
        time: 'Varies',
        space: 'Varies'
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
      title: 'Segment Trees & Fenwick Trees',
      description: 'Range query data structures with efficient updates and queries in O(log n) time.',
      component: <SegmentTreeVisualization />,
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
      component: <UnionFindVisualization />,
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
      component: <BloomFilterVisualization />,
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
