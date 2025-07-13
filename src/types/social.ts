
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  level: number;
  totalPoints: number;
  joinedDate: Date;
  isOnline: boolean;
  badges: string[];
  achievements: number;
  followers: number;
  following: number;
  studyStreak: number;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

export interface SharedVisualization {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
  algorithmId: string;
  algorithmName: string;
  code: string;
  complexity: { time: string; space: string };
  createdAt: Date;
  likes: number;
  views: number;
  isLiked: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export interface Rating {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'visualization' | 'solution' | 'user';
  rating: number;
  review?: string;
  createdAt: Date;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  avatar: string;
  creatorId: string;
  members: UserProfile[];
  isPrivate: boolean;
  focusAreas: string[];
  createdAt: Date;
  lastActivity: Date;
  memberCount: number;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  type: 'achievement' | 'share' | 'join_group' | 'complete_challenge' | 'level_up' | 'streak';
  content: string;
  targetId?: string;
  targetName?: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'friend_request' | 'group_invite' | 'comment' | 'like' | 'achievement' | 'tournament';
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  maxParticipants: number;
  prize: string;
  rules: string[];
  challenges: string[];
  leaderboard: TournamentEntry[];
}

export interface TournamentEntry {
  userId: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  completedChallenges: number;
  lastSubmission: Date;
}
