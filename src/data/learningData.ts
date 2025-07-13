
import { 
  LearningStreak, 
  DifficultySettings, 
  LearningReport, 
  MotivationReminder, 
  CommunityChallenge,
  Certification,
  LearningHabit,
  ProgressInsight
} from '@/types/learning';

export const mockLearningStreak: LearningStreak = {
  id: 'streak-1',
  userId: 'user-1',
  currentStreak: 7,
  longestStreak: 23,
  lastActivityDate: new Date(),
  streakGoal: 30,
  streakType: 'daily',
  isActive: true
};

export const mockDifficultySettings: DifficultySettings = {
  id: 'difficulty-1',
  userId: 'user-1',
  currentLevel: 'intermediate',
  adaptiveEnabled: true,
  successRate: 78,
  averageCompletionTime: 245,
  preferredTopics: ['sorting', 'searching', 'trees'],
  avoidedTopics: ['dynamic-programming'],
  lastAdjustment: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
};

export const mockLearningReports: LearningReport[] = [
  {
    id: 'report-weekly-1',
    userId: 'user-1',
    period: 'weekly',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
    totalStudyTime: 12,
    algorithmsCompleted: 8,
    averageAccuracy: 85,
    improvementAreas: ['Dynamic Programming', 'Graph Algorithms'],
    strongAreas: ['Sorting', 'Binary Search'],
    goals: ['Complete 10 algorithms this week', 'Improve DP understanding'],
    nextRecommendations: ['Try Fibonacci DP problem', 'Practice BFS/DFS variations']
  },
  {
    id: 'report-monthly-1',
    userId: 'user-1',
    period: 'monthly',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
    totalStudyTime: 45,
    algorithmsCompleted: 32,
    averageAccuracy: 82,
    improvementAreas: ['Advanced Graph Theory', 'Complex DP'],
    strongAreas: ['Basic Algorithms', 'Data Structures'],
    goals: ['Master 50 algorithms', 'Maintain 80%+ accuracy'],
    nextRecommendations: ['Focus on advanced topics', 'Join study groups']
  }
];

export const mockMotivationReminders: MotivationReminder[] = [
  {
    id: 'reminder-1',
    userId: 'user-1',
    type: 'daily_practice',
    title: 'Daily Practice Time!',
    message: 'Ready to tackle today\'s algorithm? Your 7-day streak is counting on you! 🔥',
    scheduledTime: '09:00',
    isEnabled: true,
    frequency: 'daily'
  },
  {
    id: 'reminder-2',
    userId: 'user-1',
    type: 'streak_maintenance',
    title: 'Streak Reminder',
    message: 'Don\'t break your amazing streak! You\'re doing great! 🎯',
    scheduledTime: '20:00',
    isEnabled: true,
    frequency: 'daily'
  }
];

export const mockCommunityMobileChallenges: CommunityChallenge[] = [
  {
    id: 'challenge-1',
    title: 'Algorithm Speed Run',
    description: 'Complete 10 sorting algorithms in the fastest time possible!',
    type: 'algorithm_sprint',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'active',
    participants: 156,
    maxParticipants: 200,
    rewards: ['500 bonus points', 'Speed Demon badge', 'Leaderboard recognition'],
    requirements: ['Complete 10 different sorting algorithms', 'Maintain 90%+ accuracy'],
    rules: ['Time starts when you begin first algorithm', 'Must complete in sequence'],
    tags: ['sorting', 'speed', 'competition'],
    difficulty: 'intermediate',
    bannerImage: '🏃‍♂️'
  },
  {
    id: 'challenge-2',
    title: 'Data Structure Hackathon',
    description: 'Build creative solutions using advanced data structures',
    type: 'hackathon',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    participants: 89,
    rewards: ['1000 points', 'Innovation badge', 'Feature on community page'],
    requirements: ['Use at least 3 different data structures', 'Submit working solution'],
    rules: ['Team size: 1-4 people', '7-day time limit', 'Original work only'],
    tags: ['data-structures', 'creativity', 'team'],
    difficulty: 'advanced',
    bannerImage: '🚀'
  }
];

export const mockCertifications: Certification[] = [
  {
    id: 'cert-sorting',
    name: 'Sorting Algorithms Master',
    description: 'Complete mastery of all fundamental sorting algorithms',
    category: 'Algorithms',
    requirements: [
      {
        id: 'req-1',
        description: 'Complete all 8 sorting algorithms',
        type: 'algorithm_completion',
        target: 8,
        current: 6,
        isCompleted: false
      },
      {
        id: 'req-2',
        description: 'Maintain 90%+ accuracy',
        type: 'accuracy_threshold',
        target: 90,
        current: 85,
        isCompleted: false
      }
    ],
    badge: '🏆',
    isCompleted: false,
    progress: 75,
    estimatedCompletionTime: '2 weeks'
  },
  {
    id: 'cert-consistency',
    name: 'Consistent Learner',
    description: 'Demonstrate consistent learning habits',
    category: 'Habits',
    requirements: [
      {
        id: 'req-3',
        description: 'Maintain 30-day streak',
        type: 'streak_maintenance',
        target: 30,
        current: 7,
        isCompleted: false
      },
      {
        id: 'req-4',
        description: 'Study 50 hours total',
        type: 'time_requirement',
        target: 50,
        current: 24,
        isCompleted: false
      }
    ],
    badge: '🔥',
    isCompleted: false,
    progress: 40,
    estimatedCompletionTime: '3 weeks'
  }
];

export const mockLearningHabits: LearningHabit[] = [
  {
    id: 'habit-1',
    userId: 'user-1',
    habitType: 'daily_practice',
    targetValue: 1,
    currentValue: 1,
    streakCount: 7,
    isActive: true,
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lastCompletedDate: new Date()
  },
  {
    id: 'habit-2',
    userId: 'user-1',
    habitType: 'study_time',
    targetValue: 60, // 60 minutes
    currentValue: 45,
    streakCount: 3,
    isActive: true,
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastCompletedDate: new Date()
  }
];

export const mockProgressInsights: ProgressInsight[] = [
  {
    id: 'insight-1',
    type: 'improvement',
    title: 'Great Progress in Sorting!',
    description: 'You\'ve improved your sorting algorithm accuracy by 15% this week',
    data: { previousAccuracy: 70, currentAccuracy: 85, improvement: 15 },
    actionable: false,
    priority: 'medium',
    category: 'performance'
  },
  {
    id: 'insight-2',
    type: 'recommendation',
    title: 'Try Dynamic Programming',
    description: 'Based on your progress, you\'re ready for DP challenges',
    data: { readinessScore: 78, recommendedTopics: ['fibonacci', 'knapsack'] },
    actionable: true,
    priority: 'high',
    category: 'learning-path'
  }
];
