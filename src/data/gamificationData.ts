
import { Achievement, UserStats, DailyChallenge, LeaderboardEntry, Challenge, Reward } from '@/types/gamification';

export const mockUserStats: UserStats = {
  totalPoints: 2450,
  experience: 15600,
  level: 12,
  currentStreak: 7,
  longestStreak: 23,
  algorithmsCompleted: 34,
  challengesCompleted: 18,
  totalStudyTime: 145,
  rank: 234
};

export const mockAchievements: Achievement[] = [
  {
    id: 'first-algorithm',
    name: 'First Steps',
    description: 'Complete your first algorithm',
    icon: '🎯',
    category: 'learning',
    points: 50,
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    progress: 1,
    maxProgress: 1,
    rarity: 'common'
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'streak',
    points: 200,
    unlocked: true,
    unlockedAt: new Date('2024-02-01'),
    progress: 7,
    maxProgress: 7,
    rarity: 'rare'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete 5 algorithms in under 2 minutes each',
    icon: '⚡',
    category: 'speed',
    points: 300,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rarity: 'epic'
  },
  {
    id: 'algorithm-master',
    name: 'Algorithm Master',
    description: 'Master 50 different algorithms',
    icon: '👑',
    category: 'mastery',
    points: 1000,
    unlocked: false,
    progress: 34,
    maxProgress: 50,
    rarity: 'legendary'
  }
];

export const mockDailyChallenges: DailyChallenge[] = [
  {
    id: 'daily-1',
    title: 'Quick Sort Challenge',
    description: 'Implement Quick Sort in under 5 minutes',
    algorithmId: 'quick-sort',
    difficulty: 'medium',
    points: 150,
    timeLimit: 300,
    completed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: 'daily-2',
    title: 'Binary Search Speed Run',
    description: 'Complete Binary Search visualization perfectly',
    algorithmId: 'binary-search',
    difficulty: 'easy',
    points: 100,
    timeLimit: 180,
    completed: true,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: 'daily-3',
    title: 'Tree Traversal Master',
    description: 'Complete all three tree traversal methods',
    algorithmId: 'tree-traversal',
    difficulty: 'hard',
    points: 250,
    timeLimit: 600,
    completed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'CodeMaster2024',
    avatar: '👨‍💻',
    points: 15680,
    level: 25,
    rank: 1,
    badge: '👑'
  },
  {
    id: '2',
    username: 'AlgoQueen',
    avatar: '👩‍💻',
    points: 12450,
    level: 22,
    rank: 2,
    badge: '🥈'
  },
  {
    id: '3',
    username: 'SortingNinja',
    avatar: '🥷',
    points: 9870,
    level: 19,
    rank: 3,
    badge: '🥉'
  },
  {
    id: '4',
    username: 'DataStructurePro',
    avatar: '🤖',
    points: 8450,
    level: 17,
    rank: 4
  },
  {
    id: '5',
    username: 'RecursionRookie',
    avatar: '🔄',
    points: 6230,
    level: 14,
    rank: 5
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: 'bubble-speed',
    name: 'Bubble Sort Speed Challenge',
    description: 'Sort an array using Bubble Sort in under 3 minutes',
    algorithmId: 'bubble-sort',
    timeLimit: 180,
    difficulty: 'easy',
    points: 100,
    completed: true,
    bestTime: 145,
    attempts: 3
  },
  {
    id: 'binary-precision',
    name: 'Binary Search Precision',
    description: 'Find the target with perfect accuracy in minimal steps',
    algorithmId: 'binary-search',
    timeLimit: 120,
    difficulty: 'medium',
    points: 200,
    completed: false,
    attempts: 1
  },
  {
    id: 'tree-master',
    name: 'Tree Traversal Master',
    description: 'Complete all traversal methods without errors',
    algorithmId: 'tree-traversal',
    timeLimit: 300,
    difficulty: 'hard',
    points: 350,
    completed: false,
    attempts: 0
  }
];

export const mockRewards: Reward[] = [
  {
    id: 'bronze-badge',
    name: 'Bronze Achiever',
    description: 'A shiny bronze badge for your profile',
    type: 'badge',
    cost: 500,
    unlocked: true,
    icon: '🥉',
    rarity: 'common'
  },
  {
    id: 'dark-theme',
    name: 'Dark Mode Theme',
    description: 'Sleek dark theme for the interface',
    type: 'theme',
    cost: 1000,
    unlocked: false,
    icon: '🌙',
    rarity: 'rare'
  },
  {
    id: 'robot-avatar',
    name: 'Robot Avatar',
    description: 'Cool robot avatar for your profile',
    type: 'avatar',
    cost: 750,
    unlocked: false,
    icon: '🤖',
    rarity: 'rare'
  },
  {
    id: 'algorithm-master-title',
    name: 'Algorithm Master Title',
    description: 'Prestigious title showing your expertise',
    type: 'title',
    cost: 2000,
    unlocked: false,
    icon: '👑',
    rarity: 'legendary'
  }
];
