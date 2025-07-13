
export interface LearningStreak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  streakGoal: number;
  streakType: 'daily' | 'weekly';
  isActive: boolean;
}

export interface DifficultySettings {
  id: string;
  userId: string;
  currentLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  adaptiveEnabled: boolean;
  successRate: number;
  averageCompletionTime: number;
  preferredTopics: string[];
  avoidedTopics: string[];
  lastAdjustment: Date;
}

export interface LearningReport {
  id: string;
  userId: string;
  period: 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  totalStudyTime: number;
  algorithmsCompleted: number;
  averageAccuracy: number;
  improvementAreas: string[];
  strongAreas: string[];
  goals: string[];
  nextRecommendations: string[];
}

export interface MotivationReminder {
  id: string;
  userId: string;
  type: 'daily_practice' | 'streak_maintenance' | 'goal_reminder' | 'achievement_celebration';
  title: string;
  message: string;
  scheduledTime: string; // HH:MM format
  isEnabled: boolean;
  frequency: 'daily' | 'weekly' | 'on_streak_break';
  lastSent?: Date;
}

export interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  type: 'hackathon' | 'algorithm_sprint' | 'team_challenge' | 'learning_marathon';
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  maxParticipants?: number;
  rewards: string[];
  requirements: string[];
  rules: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  bannerImage: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements: CertificationRequirement[];
  badge: string;
  issueDate?: Date;
  expiryDate?: Date;
  isCompleted: boolean;
  progress: number;
  estimatedCompletionTime: string;
}

export interface CertificationRequirement {
  id: string;
  description: string;
  type: 'algorithm_completion' | 'time_requirement' | 'accuracy_threshold' | 'streak_maintenance' | 'challenge_completion';
  target: number;
  current: number;
  isCompleted: boolean;
}

export interface LearningHabit {
  id: string;
  userId: string;
  habitType: 'daily_practice' | 'algorithm_per_day' | 'study_time' | 'challenge_completion';
  targetValue: number;
  currentValue: number;
  streakCount: number;
  isActive: boolean;
  createdDate: Date;
  lastCompletedDate?: Date;
}

export interface ProgressInsight {
  id: string;
  type: 'improvement' | 'struggle' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  data: any;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}
