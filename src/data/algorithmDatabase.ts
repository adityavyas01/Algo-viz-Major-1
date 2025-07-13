export interface AlgorithmExplanation {
  id: string;
  name: string;
  category: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  explanation: {
    overview: string;
    howItWorks: string[];
    advantages: string[];
    disadvantages: string[];
    realWorldApplications: string[];
  };
  pseudocode: string;
  implementations: {
    language: string;
    code: string;
  }[];
}

export interface PracticeProblem {
  id: string;
  algorithmId: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  solution: {
    approach: string;
    code: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  algorithms: string[];
  prerequisites: string[];
}

export const algorithmDatabase: AlgorithmExplanation[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'A simple sorting algorithm that repeatedly steps through the list',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    explanation: {
      overview: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.',
      howItWorks: [
        'Compare adjacent elements in the array',
        'If they are in the wrong order, swap them',
        'Continue this process for the entire array',
        'Repeat until no more swaps are needed'
      ],
      advantages: [
        'Simple implementation',
        'No additional memory space needed',
        'Stable sorting algorithm',
        'Can detect if the list is already sorted'
      ],
      disadvantages: [
        'Poor time complexity O(n²)',
        'Not suitable for large datasets',
        'More swaps compared to other algorithms'
      ],
      realWorldApplications: [
        'Educational purposes to understand sorting',
        'Small datasets where simplicity matters',
        'When memory is extremely limited'
      ]
    },
    pseudocode: `function bubbleSort(arr):
    n = length(arr)
    for i = 0 to n-1:
        for j = 0 to n-i-2:
            if arr[j] > arr[j+1]:
                swap(arr[j], arr[j+1])
    return arr`,
    implementations: [
      {
        language: 'JavaScript',
        code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`
      },
      {
        language: 'Python',
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`
      }
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    description: 'Efficient algorithm for finding an item from a sorted list',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    explanation: {
      overview: 'Binary Search is a search algorithm that finds the position of a target value within a sorted array.',
      howItWorks: [
        'Compare the target with the middle element',
        'If target equals middle, return the position',
        'If target is less than middle, search the left half',
        'If target is greater than middle, search the right half',
        'Repeat until target is found or search space is empty'
      ],
      advantages: [
        'Very efficient O(log n) time complexity',
        'Simple to implement',
        'Works well with large datasets'
      ],
      disadvantages: [
        'Requires sorted array',
        'Not suitable for linked lists',
        'Array must be static (no insertions during search)'
      ],
      realWorldApplications: [
        'Database indexing',
        'Search engines',
        'Finding elements in sorted collections',
        'Debugging and troubleshooting'
      ]
    },
    pseudocode: `function binarySearch(arr, target):
    left = 0
    right = length(arr) - 1
    
    while left <= right:
        mid = (left + right) / 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
    implementations: [
      {
        language: 'JavaScript',
        code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`
      }
    ]
  },
  {
    id: 'kmp-algorithm',
    name: 'KMP String Matching',
    category: 'String Algorithms',
    description: 'Efficient pattern matching algorithm using prefix function',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(m)',
    difficulty: 'Advanced',
    explanation: {
      overview: 'The Knuth-Morris-Pratt algorithm searches for occurrences of a pattern within a main text string by employing the observation that when a mismatch occurs, the pattern itself embodies sufficient information to skip characters.',
      howItWorks: [
        'Preprocess the pattern to create a prefix table',
        'Use the prefix table to avoid redundant character comparisons',
        'When a mismatch occurs, use the table to determine the next position',
        'Continue until the entire text is processed'
      ],
      advantages: [
        'Linear time complexity O(n + m)',
        'No backtracking in the text',
        'Optimal for large texts with repetitive patterns'
      ],
      disadvantages: [
        'Requires preprocessing of the pattern',
        'More complex than naive approaches',
        'Additional space needed for prefix table'
      ],
      realWorldApplications: [
        'Text editors and search functionality',
        'DNA sequence analysis in bioinformatics',
        'Compiler construction',
        'Network intrusion detection systems'
      ]
    },
    pseudocode: `function KMP(text, pattern):
    table = buildPrefixTable(pattern)
    i = 0, j = 0
    
    while i < length(text):
        if text[i] == pattern[j]:
            i++, j++
            if j == length(pattern):
                return i - j  // match found
        else if j > 0:
            j = table[j - 1]
        else:
            i++
    
    return -1  // no match`,
    implementations: [
      {
        language: 'JavaScript',
        code: `function kmpSearch(text, pattern) {
    const table = buildKMPTable(pattern);
    let i = 0, j = 0;
    
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
            if (j === pattern.length) {
                return i - j; // Match found
            }
        } else if (j > 0) {
            j = table[j - 1];
        } else {
            i++;
        }
    }
    
    return -1; // No match found
}`
      }
    ]
  },
  {
    id: 'ford-fulkerson',
    name: 'Ford-Fulkerson Maximum Flow',
    category: 'Graph Algorithms',
    description: 'Algorithm for computing maximum flow in a flow network',
    timeComplexity: 'O(E × max_flow)',
    spaceComplexity: 'O(V²)',
    difficulty: 'Advanced',
    explanation: {
      overview: 'The Ford-Fulkerson method computes the maximum flow in a flow network by finding augmenting paths from source to sink and updating residual capacities.',
      howItWorks: [
        'Initialize flow to 0 for all edges',
        'While there exists an augmenting path from source to sink',
        'Find the minimum capacity along the path',
        'Update residual capacities along the path',
        'Add the path flow to the total flow'
      ],
      advantages: [
        'Guarantees optimal solution',
        'Works with any augmenting path finding method',
        'Conceptually simple'
      ],
      disadvantages: [
        'Can be slow with poor path selection',
        'May not terminate with irrational capacities',
        'Performance depends on maximum flow value'
      ],
      realWorldApplications: [
        'Network routing and bandwidth allocation',
        'Bipartite matching problems',
        'Image segmentation in computer vision',
        'Supply chain optimization'
      ]
    },
    pseudocode: `function fordFulkerson(graph, source, sink):
    maxFlow = 0
    
    while path = findAugmentingPath(graph, source, sink):
        pathFlow = getMinCapacity(path)
        updateResidualCapacities(graph, path, pathFlow)
        maxFlow += pathFlow
    
    return maxFlow`,
    implementations: [
      {
        language: 'JavaScript',
        code: `function fordFulkerson(graph, source, sink) {
    let maxFlow = 0;
    const residualGraph = createResidualGraph(graph);
    
    while (true) {
        const path = findAugmentingPath(residualGraph, source, sink);
        if (!path) break;
        
        const pathFlow = getBottleneckCapacity(path);
        updateResidualCapacities(residualGraph, path, pathFlow);
        maxFlow += pathFlow;
    }
    
    return maxFlow;
}`
      }
    ]
  }
];

export const practiceProblems: PracticeProblem[] = [
  {
    id: 'bubble-sort-problem-1',
    algorithmId: 'bubble-sort',
    title: 'Sort Array of Integers',
    description: 'Given an array of integers, sort them in ascending order using bubble sort.',
    difficulty: 'Easy',
    examples: [
      {
        input: '[64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]',
        explanation: 'The array is sorted in ascending order using bubble sort algorithm.'
      }
    ],
    solution: {
      approach: 'Implement the basic bubble sort algorithm by comparing adjacent elements and swapping them if they are in wrong order.',
      code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)'
    }
  },
  {
    id: 'string-matching-problem-1',
    algorithmId: 'kmp-algorithm',
    title: 'Find Pattern in Text',
    description: 'Implement KMP algorithm to find all occurrences of a pattern in a given text.',
    difficulty: 'Hard',
    examples: [
      {
        input: 'text: "ABABDABACDABABCABCABCABCABC", pattern: "ABABCABCABCABC"',
        output: 'Pattern found at index 15',
        explanation: 'KMP algorithm efficiently finds the pattern without backtracking in the text.'
      }
    ],
    solution: {
      approach: 'Build a prefix table for the pattern and use it to skip characters efficiently during matching.',
      code: `function kmpSearch(text, pattern) {
    const table = buildKMPTable(pattern);
    let i = 0, j = 0;
    const matches = [];
    
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++; j++;
            if (j === pattern.length) {
                matches.push(i - j);
                j = table[j - 1];
            }
        } else if (j > 0) {
            j = table[j - 1];
        } else {
            i++;
        }
    }
    
    return matches;
}`,
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m)'
    }
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: 'beginner-sorting',
    name: 'Sorting Algorithms for Beginners',
    description: 'Master the fundamentals of sorting algorithms',
    difficulty: 'Beginner',
    estimatedHours: 8,
    algorithms: ['bubble-sort', 'selection-sort', 'insertion-sort'],
    prerequisites: []
  },
  {
    id: 'search-algorithms',
    name: 'Search Algorithm Mastery',
    description: 'Learn efficient searching techniques',
    difficulty: 'Beginner',
    estimatedHours: 6,
    algorithms: ['linear-search', 'binary-search', 'jump-search'],
    prerequisites: []
  },
  {
    id: 'advanced-algorithms',
    name: 'Advanced Algorithm Techniques',
    description: 'Master complex algorithmic paradigms and advanced data structures',
    difficulty: 'Advanced',
    estimatedHours: 40,
    algorithms: ['kmp-algorithm', 'ford-fulkerson', 'convex-hull', 'lcs', 'n-queens', 'euclidean-gcd'],
    prerequisites: ['beginner-sorting', 'search-algorithms']
  },
  {
    id: 'string-algorithms',
    name: 'String Processing Algorithms',
    description: 'Learn advanced string matching and processing techniques',
    difficulty: 'Advanced',
    estimatedHours: 15,
    algorithms: ['kmp-algorithm', 'rabin-karp', 'suffix-arrays', 'z-algorithm'],
    prerequisites: ['search-algorithms']
  },
  {
    id: 'graph-algorithms-advanced',
    name: 'Advanced Graph Algorithms',
    description: 'Master complex graph algorithms for real-world applications',
    difficulty: 'Advanced',
    estimatedHours: 25,
    algorithms: ['ford-fulkerson', 'tarjan-scc', 'network-flow', 'min-cut'],
    prerequisites: ['basic-graph-algorithms']
  }
];
