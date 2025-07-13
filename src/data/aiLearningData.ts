
import { 
  UserBehaviorEvent, 
  LearningRecommendation, 
  AdaptiveDifficultyModel, 
  IntelligentHint, 
  NaturalLanguageExplanation, 
  PerformancePrediction,
  AIInsight,
  LearningPathRecommendation
} from '@/types/ai-learning';

export const mockBehaviorEvents: UserBehaviorEvent[] = [
  {
    id: 'event-1',
    userId: 'user-1',
    eventType: 'algorithm_complete',
    algorithmId: 'bubble-sort',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    metadata: {
      timeSpent: 480,
      accuracy: 85,
      hintsUsed: 2,
      attempts: 3,
      difficulty: 'beginner'
    }
  },
  {
    id: 'event-2',
    userId: 'user-1',
    eventType: 'hint_requested',
    algorithmId: 'quick-sort',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    metadata: {
      stepNumber: 3,
      difficulty: 'intermediate'
    }
  },
  {
    id: 'event-3',
    userId: 'user-1',
    eventType: 'error_made',
    algorithmId: 'binary-search',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    metadata: {
      errorType: 'boundary-condition',
      stepNumber: 2,
      attempts: 1
    }
  }
];

export const mockRecommendations: LearningRecommendation[] = [
  {
    id: 'rec-1',
    userId: 'user-1',
    type: 'next_algorithm',
    title: 'Try Merge Sort',
    description: 'Based on your success with Bubble Sort, you\'re ready for divide-and-conquer algorithms',
    algorithmId: 'merge-sort',
    confidence: 0.87,
    reasoning: 'User shows strong understanding of basic sorting concepts and is ready for more advanced techniques',
    priority: 'high',
    estimatedTime: 25,
    createdAt: new Date(),
    isCompleted: false
  },
  {
    id: 'rec-2',
    userId: 'user-1',
    type: 'review_topic',
    title: 'Review Binary Search Boundaries',
    description: 'Strengthen your understanding of edge cases in binary search',
    topicId: 'binary-search-boundaries',
    confidence: 0.92,
    reasoning: 'Recent errors indicate confusion with boundary conditions in binary search',
    priority: 'urgent',
    estimatedTime: 15,
    createdAt: new Date(),
    isCompleted: false
  },
  {
    id: 'rec-3',
    userId: 'user-1',
    type: 'learning_path',
    title: 'Advanced Sorting Algorithms Path',
    description: 'Ready to explore heap sort, radix sort, and counting sort',
    confidence: 0.78,
    reasoning: 'Consistent performance in basic sorting suggests readiness for advanced algorithms',
    priority: 'medium',
    estimatedTime: 120,
    createdAt: new Date(),
    isCompleted: false
  }
];

export const mockAdaptiveDifficulty: AdaptiveDifficultyModel = {
  id: 'adaptive-1',
  userId: 'user-1',
  currentLevel: 6.2,
  successRate: 78,
  averageTime: 245,
  conceptMastery: {
    'sorting': 0.85,
    'searching': 0.72,
    'trees': 0.45,
    'graphs': 0.23,
    'dynamic-programming': 0.12
  },
  adjustmentHistory: [
    {
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      previousLevel: 5.8,
      newLevel: 6.2,
      reason: 'Consistent success rate above 75% for 5 consecutive algorithms'
    },
    {
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      previousLevel: 6.1,
      newLevel: 5.8,
      reason: 'Struggled with tree traversal algorithms, temporary difficulty reduction'
    }
  ],
  lastUpdated: new Date()
};

export const mockIntelligentHints: IntelligentHint[] = [
  {
    id: 'hint-1',
    algorithmId: 'binary-search',
    stepNumber: 2,
    hintLevel: 'subtle',
    content: 'Think about what happens when your target is at the very beginning or end of the array',
    explanation: 'This hint guides users to consider boundary conditions without giving away the solution',
    prerequisiteKnowledge: ['array-indexing', 'comparison-operators'],
    triggeredBy: ['boundary-error', 'infinite-loop'],
    effectivenessScore: 0.84
  },
  {
    id: 'hint-2',
    algorithmId: 'quick-sort',
    stepNumber: 1,
    hintLevel: 'moderate',
    content: 'Choose a pivot element and think about how to partition the array around it',
    explanation: 'Provides clearer direction for the partitioning step in quicksort',
    prerequisiteKnowledge: ['array-manipulation', 'partitioning-concept'],
    triggeredBy: ['confusion-about-pivot', 'incorrect-partitioning'],
    effectivenessScore: 0.91
  }
];

export const mockNLExplanations: NaturalLanguageExplanation[] = [
  {
    id: 'explain-1',
    algorithmId: 'binary-search',
    explanationType: 'intuition',
    content: 'Think of binary search like looking up a word in a dictionary. You don\'t start from page 1 - you open to the middle and decide if you need to go left or right based on alphabetical order.',
    difficultyLevel: 'beginner',
    examples: ['Dictionary lookup', 'Guessing number game', 'Library book search'],
    analogies: ['Telephone book search', 'Finding a song in a playlist'],
    visualCues: ['Split the array in half visually', 'Highlight the middle element']
  },
  {
    id: 'explain-2',
    algorithmId: 'merge-sort',
    explanationType: 'concept',
    content: 'Merge sort uses the divide-and-conquer strategy: break the problem into smaller pieces, solve each piece, then combine the solutions. It\'s like organizing a deck of cards by splitting it in half, sorting each half separately, then merging them back together in order.',
    difficultyLevel: 'intermediate',
    examples: ['Sorting playing cards', 'Organizing books by height', 'Merging two sorted lists'],
    analogies: ['Assembly line production', 'Tournament bracket'],
    visualCues: ['Tree structure showing divisions', 'Animation of merge process']
  }
];

export const mockPerformancePredictions: PerformancePrediction[] = [
  {
    id: 'pred-1',
    userId: 'user-1',
    algorithmId: 'heap-sort',
    predictedSuccessRate: 0.68,
    predictedCompletionTime: 35,
    confidenceInterval: { lower: 0.58, upper: 0.78 },
    weakAreas: [
      {
        concept: 'heap-property',
        severity: 'high',
        recommendation: 'Review heap data structure fundamentals before attempting heap sort'
      },
      {
        concept: 'tree-visualization',
        severity: 'medium',
        recommendation: 'Practice visualizing binary trees to better understand heap operations'
      }
    ],
    strengthAreas: ['array-manipulation', 'comparison-operations', 'algorithm-analysis'],
    recommendedPreparation: [
      'Complete binary heap tutorial',
      'Practice heap insert/delete operations',
      'Review time complexity analysis'
    ],
    modelVersion: 'v2.1',
    generatedAt: new Date()
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-1',
    type: 'learning_pattern',
    title: 'Peak Learning Hours Identified',
    description: 'You perform 23% better when learning between 9-11 AM',
    actionable: true,
    priority: 'medium',
    confidence: 0.89,
    data: { peakHours: [9, 10, 11], performanceIncrease: 0.23 },
    createdAt: new Date()
  },
  {
    id: 'insight-2',
    type: 'weak_area',
    title: 'Tree Algorithms Need Attention',
    description: 'Your success rate drops to 45% with tree-based algorithms compared to 78% overall',
    actionable: true,
    priority: 'high',
    confidence: 0.94,
    data: { overallSuccessRate: 0.78, treeSuccessRate: 0.45, gap: 0.33 },
    createdAt: new Date()
  },
  {
    id: 'insight-3',
    type: 'strength',
    title: 'Exceptional at Iterative Solutions',
    description: 'You excel at iterative approaches with 92% success rate',
    actionable: false,
    priority: 'low',
    confidence: 0.96,
    data: { iterativeSuccessRate: 0.92, recursiveSuccessRate: 0.65 },
    createdAt: new Date()
  }
];

export const mockLearningPathRecommendations: LearningPathRecommendation[] = [
  {
    id: 'path-1',
    name: 'Tree Mastery Path',
    description: 'Personalized path to strengthen your tree algorithm skills',
    algorithms: ['binary-tree-basics', 'tree-traversals', 'binary-search-tree', 'avl-tree', 'red-black-tree'],
    estimatedDuration: 240,
    difficulty: 'intermediate',
    personalizedReason: 'AI detected significant improvement opportunity in tree algorithms based on your current performance gap',
    prerequisites: ['recursion-fundamentals', 'pointer-concepts'],
    learningObjectives: [
      'Master tree traversal techniques',
      'Understand self-balancing trees',
      'Apply tree algorithms to real problems'
    ],
    confidenceScore: 0.91
  },
  {
    id: 'path-2',
    name: 'Advanced Sorting Specialist',
    description: 'Build on your sorting strengths to become an expert',
    algorithms: ['heap-sort', 'radix-sort', 'counting-sort', 'bucket-sort', 'external-sorting'],
    estimatedDuration: 180,
    difficulty: 'advanced',
    personalizedReason: 'Your strong performance in basic sorting (85% success rate) indicates readiness for advanced techniques',
    prerequisites: ['basic-sorting-mastery', 'heap-data-structure'],
    learningObjectives: [
      'Master non-comparison based sorting',
      'Understand when to use each algorithm',
      'Optimize for specific data characteristics'
    ],
    confidenceScore: 0.87
  }
];
