
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'speed' | 'mastery' | 'social';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserStats {
  totalPoints: number;
  experience: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  algorithmsCompleted: number;
  challengesCompleted: number;
  totalStudyTime: number;
  rank: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  algorithmId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit: number;
  completed: boolean;
  expiresAt: Date;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  points: number;
  level: number;
  rank: number;
  badge?: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  algorithmId: string;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  bestTime?: number;
  attempts: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'theme' | 'avatar' | 'title';
  cost: number;
  unlocked: boolean;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
