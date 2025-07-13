
export interface UserBehaviorEvent {
  id: string;
  userId: string;
  eventType: 'algorithm_start' | 'algorithm_complete' | 'hint_requested' | 'step_completed' | 'error_made' | 'page_view' | 'time_spent';
  algorithmId?: string;
  timestamp: Date;
  metadata: {
    timeSpent?: number;
    accuracy?: number;
    hintsUsed?: number;
    attempts?: number;
    errorType?: string;
    stepNumber?: number;
    difficulty?: string;
    pageUrl?: string;
  };
}

export interface LearningRecommendation {
  id: string;
  userId: string;
  type: 'next_algorithm' | 'review_topic' | 'difficulty_adjustment' | 'learning_path' | 'practice_problem';
  title: string;
  description: string;
  algorithmId?: string;
  topicId?: string;
  confidence: number;
  reasoning: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedTime: number;
  createdAt: Date;
  isCompleted: boolean;
}

export interface AdaptiveDifficultyModel {
  id: string;
  userId: string;
  currentLevel: number; // 1-10 scale
  successRate: number;
  averageTime: number;
  conceptMastery: { [concept: string]: number };
  adjustmentHistory: {
    timestamp: Date;
    previousLevel: number;
    newLevel: number;
    reason: string;
  }[];
  lastUpdated: Date;
}

export interface IntelligentHint {
  id: string;
  algorithmId: string;
  stepNumber: number;
  hintLevel: 'subtle' | 'moderate' | 'direct' | 'solution';
  content: string;
  explanation: string;
  prerequisiteKnowledge: string[];
  triggeredBy: string[];
  effectivenessScore: number;
}

export interface NaturalLanguageExplanation {
  id: string;
  algorithmId: string;
  explanationType: 'concept' | 'step-by-step' | 'intuition' | 'real-world-application' | 'complexity-analysis';
  content: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  examples: string[];
  analogies: string[];
  visualCues: string[];
}

export interface PerformancePrediction {
  id: string;
  userId: string;
  algorithmId: string;
  predictedSuccessRate: number;
  predictedCompletionTime: number;
  confidenceInterval: { lower: number; upper: number };
  weakAreas: {
    concept: string;
    severity: 'low' | 'medium' | 'high';
    recommendation: string;
  }[];
  strengthAreas: string[];
  recommendedPreparation: string[];
  modelVersion: string;
  generatedAt: Date;
}

export interface AIInsight {
  id: string;
  type: 'performance_trend' | 'learning_pattern' | 'weak_area' | 'strength' | 'recommendation';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  data: any;
  createdAt: Date;
}

export interface LearningPathRecommendation {
  id: string;
  name: string;
  description: string;
  algorithms: string[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  personalizedReason: string;
  prerequisites: string[];
  learningObjectives: string[];
  confidenceScore: number;
}
