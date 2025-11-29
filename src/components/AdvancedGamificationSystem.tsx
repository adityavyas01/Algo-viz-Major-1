import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Medal, 
  Crown, 
  Zap, 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  Flame,
  Shield,
  Gem,
  Sword,
  Map,
  Gift,
  Heart,
  Sparkles,
  ChevronRight,
  Lock,
  Unlock,
  Timer,
  Calendar,
  BarChart3,
  User,
  UserPlus,
  MessageCircle,
  Share2,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'social' | 'challenge' | 'milestone' | 'special';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  icon: React.ComponentType<{ className?: string }>;
  requirements: string[];
  reward: {
    xp: number;
    coins: number;
    badges?: string[];
    unlocks?: string[];
  };
  progress: number;
  maxProgress: number;
  dateEarned?: Date;
  rarity: number; // percentage of users who have this achievement
}

interface LeaderboardEntry {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  xp: number;
  totalXP: number;
  streak: number;
  algorithmsCompleted: number;
  challengesWon: number;
  position: number;
  change: number; // position change from last period
  badges: string[];
  specialTitles: string[];
}

interface SkillNode {
  id: string;
  title: string;
  description: string;
  category: 'fundamentals' | 'sorting' | 'searching' | 'trees' | 'graphs' | 'dynamic' | 'advanced';
  prerequisites: string[];
  unlocks: string[];
  xpRequired: number;
  level: number;
  maxLevel: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  position: { x: number; y: number };
  connections: string[];
  rewards: {
    xp: number;
    coins: number;
    abilities?: string[];
  };
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special' | 'team';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  timeLimit?: number;
  participants: number;
  maxParticipants?: number;
  startDate: Date;
  endDate: Date;
  rewards: {
    winner: { xp: number; coins: number; badges: string[] };
    participant: { xp: number; coins: number };
  };
  algorithm: string;
  status: 'upcoming' | 'active' | 'completed';
  progress?: number;
}

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  xp: number;
  totalXP: number;
  coins: number;
  streak: number;
  joinDate: Date;
  achievements: string[];
  badges: string[];
  completedNodes: string[];
  favoriteAlgorithm: string;
  stats: {
    algorithmsLearned: number;
    challengesCompleted: number;
    collaborativeSessions: number;
    helpfulVotes: number;
    questionsAnswered: number;
  };
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first algorithm visualization',
    category: 'learning',
    difficulty: 'bronze',
    icon: Star,
    requirements: ['Complete 1 algorithm visualization'],
    reward: { xp: 100, coins: 50 },
    progress: 1,
    maxProgress: 1,
    dateEarned: new Date('2024-10-01'),
    rarity: 95
  },
  {
    id: '2',
    title: 'Sorting Master',
    description: 'Master all basic sorting algorithms',
    category: 'learning',
    difficulty: 'gold',
    icon: Trophy,
    requirements: ['Complete Bubble Sort', 'Complete Quick Sort', 'Complete Merge Sort', 'Complete Heap Sort'],
    reward: { xp: 500, coins: 250, badges: ['Sorting Expert'] },
    progress: 3,
    maxProgress: 4,
    rarity: 25
  },
  {
    id: '3',
    title: 'Social Butterfly',
    description: 'Participate in 10 collaborative sessions',
    category: 'social',
    difficulty: 'silver',
    icon: Users,
    requirements: ['Join 10 collaborative learning sessions'],
    reward: { xp: 300, coins: 150 },
    progress: 7,
    maxProgress: 10,
    rarity: 45
  },
  {
    id: '4',
    title: 'Speed Demon',
    description: 'Complete a challenge in under 5 minutes',
    category: 'challenge',
    difficulty: 'platinum',
    icon: Zap,
    requirements: ['Complete any challenge in under 5 minutes'],
    reward: { xp: 750, coins: 400, unlocks: ['Time Trial Mode'] },
    progress: 0,
    maxProgress: 1,
    rarity: 8
  },
  {
    id: '5',
    title: 'Helper Hero',
    description: 'Receive 100 helpful votes from other learners',
    category: 'social',
    difficulty: 'diamond',
    icon: Heart,
    requirements: ['Receive 100 helpful votes'],
    reward: { xp: 1000, coins: 500, badges: ['Community Champion'] },
    progress: 67,
    maxProgress: 100,
    rarity: 3
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'alexcode',
    displayName: 'Alex Chen',
    avatar: '/api/placeholder/40/40',
    level: 15,
    xp: 2850,
    totalXP: 15420,
    streak: 23,
    algorithmsCompleted: 45,
    challengesWon: 12,
    position: 1,
    change: 0,
    badges: ['Sorting Expert', 'Graph Master', 'Speed Demon'],
    specialTitles: ['Algorithm Virtuoso']
  },
  {
    id: '2',
    username: 'sarah_ds',
    displayName: 'Sarah Johnson',
    avatar: '/api/placeholder/40/40',
    level: 14,
    xp: 1980,
    totalXP: 14200,
    streak: 18,
    algorithmsCompleted: 38,
    challengesWon: 9,
    position: 2,
    change: 1,
    badges: ['Tree Specialist', 'Community Champion'],
    specialTitles: ['Data Structure Guru']
  },
  {
    id: '3',
    username: 'mike_algo',
    displayName: 'Michael Rodriguez',
    avatar: '/api/placeholder/40/40',
    level: 13,
    xp: 2340,
    totalXP: 13890,
    streak: 15,
    algorithmsCompleted: 42,
    challengesWon: 7,
    position: 3,
    change: -1,
    badges: ['DP Master', 'Challenge Champion'],
    specialTitles: []
  }
];

const mockSkillTree: SkillNode[] = [
  {
    id: 'fundamentals-1',
    title: 'Basic Concepts',
    description: 'Understanding time and space complexity',
    category: 'fundamentals',
    prerequisites: [],
    unlocks: ['sorting-1', 'searching-1'],
    xpRequired: 0,
    level: 3,
    maxLevel: 3,
    isUnlocked: true,
    isCompleted: true,
    position: { x: 200, y: 100 },
    connections: ['sorting-1', 'searching-1'],
    rewards: { xp: 200, coins: 100 }
  },
  {
    id: 'sorting-1',
    title: 'Basic Sorting',
    description: 'Bubble sort, Selection sort, Insertion sort',
    category: 'sorting',
    prerequisites: ['fundamentals-1'],
    unlocks: ['sorting-2'],
    xpRequired: 500,
    level: 2,
    maxLevel: 3,
    isUnlocked: true,
    isCompleted: false,
    position: { x: 100, y: 200 },
    connections: ['sorting-2'],
    rewards: { xp: 300, coins: 150 }
  },
  {
    id: 'searching-1',
    title: 'Linear Search',
    description: 'Sequential search algorithms',
    category: 'searching',
    prerequisites: ['fundamentals-1'],
    unlocks: ['searching-2'],
    xpRequired: 300,
    level: 3,
    maxLevel: 3,
    isUnlocked: true,
    isCompleted: true,
    position: { x: 300, y: 200 },
    connections: ['searching-2'],
    rewards: { xp: 250, coins: 125 }
  },
  {
    id: 'sorting-2',
    title: 'Advanced Sorting',
    description: 'Merge sort, Quick sort, Heap sort',
    category: 'sorting',
    prerequisites: ['sorting-1'],
    unlocks: ['trees-1'],
    xpRequired: 1000,
    level: 0,
    maxLevel: 3,
    isUnlocked: true,
    isCompleted: false,
    position: { x: 100, y: 300 },
    connections: ['trees-1'],
    rewards: { xp: 500, coins: 250, abilities: ['Sorting Master'] }
  },
  {
    id: 'searching-2',
    title: 'Binary Search',
    description: 'Divide and conquer search',
    category: 'searching',
    prerequisites: ['searching-1'],
    unlocks: ['trees-1'],
    xpRequired: 800,
    level: 1,
    maxLevel: 3,
    isUnlocked: true,
    isCompleted: false,
    position: { x: 300, y: 300 },
    connections: ['trees-1'],
    rewards: { xp: 400, coins: 200 }
  },
  {
    id: 'trees-1',
    title: 'Tree Structures',
    description: 'Binary trees, BST, AVL trees',
    category: 'trees',
    prerequisites: ['sorting-2', 'searching-2'],
    unlocks: ['graphs-1', 'dynamic-1'],
    xpRequired: 1500,
    level: 0,
    maxLevel: 4,
    isUnlocked: false,
    isCompleted: false,
    position: { x: 200, y: 400 },
    connections: ['graphs-1', 'dynamic-1'],
    rewards: { xp: 600, coins: 300, abilities: ['Tree Traversal'] }
  }
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Sort Challenge',
    description: 'Implement and optimize a sorting algorithm within time limit',
    type: 'daily',
    difficulty: 'medium',
    timeLimit: 15,
    participants: 234,
    startDate: new Date('2024-10-06T00:00:00'),
    endDate: new Date('2024-10-06T23:59:59'),
    rewards: {
      winner: { xp: 500, coins: 250, badges: ['Daily Champion'] },
      participant: { xp: 100, coins: 50 }
    },
    algorithm: 'merge-sort',
    status: 'active',
    progress: 75
  },
  {
    id: '2',
    title: 'Graph Traversal Tournament',
    description: 'Weekly competition for graph algorithm mastery',
    type: 'weekly',
    difficulty: 'hard',
    participants: 89,
    maxParticipants: 100,
    startDate: new Date('2024-10-01T00:00:00'),
    endDate: new Date('2024-10-07T23:59:59'),
    rewards: {
      winner: { xp: 1000, coins: 500, badges: ['Graph Master', 'Weekly Champion'] },
      participant: { xp: 200, coins: 100 }
    },
    algorithm: 'dijkstra',
    status: 'active',
    progress: 45
  },
  {
    id: '3',
    title: 'Team Dynamic Programming',
    description: 'Collaborate with teammates to solve DP problems',
    type: 'team',
    difficulty: 'expert',
    timeLimit: 60,
    participants: 24,
    maxParticipants: 30,
    startDate: new Date('2024-10-10T18:00:00'),
    endDate: new Date('2024-10-10T19:00:00'),
    rewards: {
      winner: { xp: 1500, coins: 750, badges: ['Team Player', 'DP Expert'] },
      participant: { xp: 300, coins: 150 }
    },
    algorithm: 'knapsack',
    status: 'upcoming'
  }
];

const mockUserProfile: UserProfile = {
  id: 'user1',
  username: 'learner_ace',
  displayName: 'Learning Ace',
  avatar: '/api/placeholder/80/80',
  level: 12,
  xp: 1850,
  totalXP: 12450,
  coins: 2340,
  streak: 12,
  joinDate: new Date('2024-08-15'),
  achievements: ['1', '3'],
  badges: ['First Timer', 'Social Butterfly'],
  completedNodes: ['fundamentals-1', 'searching-1'],
  favoriteAlgorithm: 'binary-search',
  stats: {
    algorithmsLearned: 15,
    challengesCompleted: 8,
    collaborativeSessions: 12,
    helpfulVotes: 67,
    questionsAnswered: 23
  }
};

export const AdvancedGamificationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('weekly');
  const [skillTreeZoom, setSkillTreeZoom] = useState(1);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    { id: 'skill-tree', label: 'Skill Tree', icon: Map },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'social', label: 'Social Hub', icon: Users },
    { id: 'rewards', label: 'Rewards', icon: Gift }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'from-amber-600 to-yellow-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-blue-400 to-indigo-600';
      case 'diamond': return 'from-purple-400 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getSkillNodeColor = (category: string, isCompleted: boolean, isUnlocked: boolean) => {
    if (!isUnlocked) return 'from-gray-300 to-gray-400';
    if (isCompleted) return 'from-green-400 to-emerald-500';
    
    switch (category) {
      case 'fundamentals': return 'from-blue-400 to-blue-500';
      case 'sorting': return 'from-purple-400 to-purple-500';
      case 'searching': return 'from-orange-400 to-orange-500';
      case 'trees': return 'from-green-400 to-green-500';
      case 'graphs': return 'from-red-400 to-red-500';
      case 'dynamic': return 'from-indigo-400 to-indigo-500';
      case 'advanced': return 'from-pink-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
    const Icon = achievement.icon;
    const isEarned = achievement.dateEarned !== undefined;
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

    return (
      <motion.div
        variants={itemVariants}
        className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${
          isEarned ? 'ring-2 ring-yellow-400' : ''
        }`}
        onClick={() => setSelectedAchievement(achievement)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getDifficultyColor(achievement.difficulty)} flex items-center justify-center relative`}>
            <Icon className="w-6 h-6 text-white" />
            {isEarned && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-white fill-current" />
              </div>
            )}
          </div>
          <div className="text-right">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isEarned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {isEarned ? 'Earned' : `${progressPercentage.toFixed(0)}%`}
            </span>
            <p className="text-xs text-gray-500 mt-1">{achievement.rarity}% have this</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{achievement.progress}/{achievement.maxProgress}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-blue-600">
              <Zap className="w-4 h-4 mr-1" />
              {achievement.reward.xp} XP
            </div>
            <div className="flex items-center text-yellow-600">
              <Gem className="w-4 h-4 mr-1" />
              {achievement.reward.coins}
            </div>
          </div>
          {isEarned && achievement.dateEarned && (
            <span className="text-gray-500 text-xs">
              {achievement.dateEarned.toLocaleDateString()}
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  const LeaderboardRow: React.FC<{ entry: LeaderboardEntry; index: number }> = ({ entry, index }) => (
    <motion.div
      variants={itemVariants}
      className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
        index === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200' :
        index === 1 ? 'bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200' :
        index === 2 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200' :
        'bg-gray-50 border border-gray-100'
      } hover:shadow-lg`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative">
          <div className={`text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center ${
            index === 0 ? 'bg-yellow-500 text-white' :
            index === 1 ? 'bg-gray-400 text-white' :
            index === 2 ? 'bg-amber-600 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {entry.position}
          </div>
          {entry.change !== 0 && (
            <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              entry.change > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {entry.change > 0 ? '+' : ''}{entry.change}
            </div>
          )}
        </div>

        <img
          src={entry.avatar}
          alt={entry.displayName}
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{entry.displayName}</h3>
            <span className="text-gray-500 text-sm">@{entry.username}</span>
            {entry.specialTitles.length > 0 && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                {entry.specialTitles[0]}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
            <span className="flex items-center">
              <Trophy className="w-3 h-3 mr-1" />
              Level {entry.level}
            </span>
            <span className="flex items-center">
              <Flame className="w-3 h-3 mr-1" />
              {entry.streak} day streak
            </span>
            <span className="flex items-center">
              <Target className="w-3 h-3 mr-1" />
              {entry.algorithmsCompleted} algorithms
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">{entry.xp.toLocaleString()} XP</p>
          <p className="text-sm text-gray-600">{entry.totalXP.toLocaleString()} total</p>
        </div>
      </div>
    </motion.div>
  );

  const SkillTreeNode: React.FC<{ node: SkillNode }> = ({ node }) => (
    <motion.div
      className={`absolute w-24 h-24 rounded-full shadow-lg border-4 border-white cursor-pointer transform transition-all duration-300 hover:scale-110 ${
        node.isUnlocked ? 'hover:shadow-xl' : 'cursor-not-allowed opacity-60'
      }`}
      style={{
        left: node.position.x * skillTreeZoom,
        top: node.position.y * skillTreeZoom,
        transform: `scale(${skillTreeZoom})`
      }}
      whileHover={node.isUnlocked ? { scale: 1.1 * skillTreeZoom } : {}}
      whileTap={node.isUnlocked ? { scale: 0.95 * skillTreeZoom } : {}}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-r ${getSkillNodeColor(node.category, node.isCompleted, node.isUnlocked)} flex items-center justify-center relative`}>
        {node.isUnlocked ? (
          node.isCompleted ? (
            <Star className="w-8 h-8 text-white fill-current" />
          ) : (
            <div className="text-center">
              <div className="text-white text-xs font-bold">{node.level}</div>
              <div className="text-white text-xs">/{node.maxLevel}</div>
            </div>
          )
        ) : (
          <Lock className="w-6 h-6 text-white" />
        )}
        
        {node.level > 0 && node.level < node.maxLevel && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-16 bg-gray-200 rounded-full h-1">
              <div
                className="bg-yellow-400 h-1 rounded-full"
                style={{ width: `${(node.level / node.maxLevel) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
    const isActive = challenge.status === 'active';
    const isUpcoming = challenge.status === 'upcoming';
    const timeRemaining = challenge.endDate.getTime() - new Date().getTime();
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <motion.div
        variants={itemVariants}
        className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
          isActive ? 'border-green-300 ring-2 ring-green-100' :
          isUpcoming ? 'border-blue-300 ring-2 ring-blue-100' :
          'border-gray-100'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              challenge.type === 'daily' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
              challenge.type === 'weekly' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
              challenge.type === 'monthly' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              challenge.type === 'team' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              'bg-gradient-to-r from-gray-500 to-slate-500'
            }`}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
              <p className="text-sm text-gray-600">{challenge.description}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isActive ? 'bg-green-100 text-green-800' :
              isUpcoming ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {challenge.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              {challenge.participants} participants
              {challenge.maxParticipants && ` / ${challenge.maxParticipants}`}
            </div>
            <div className="flex items-center text-gray-600">
              <Medal className="w-4 h-4 mr-2" />
              {challenge.difficulty} difficulty
            </div>
          </div>
          <div className="space-y-2">
            {challenge.timeLimit && (
              <div className="flex items-center text-gray-600">
                <Timer className="w-4 h-4 mr-2" />
                {challenge.timeLimit} minutes
              </div>
            )}
            {isActive && timeRemaining > 0 && (
              <div className="flex items-center text-orange-600 font-medium">
                <Clock className="w-4 h-4 mr-2" />
                {hours}h {minutes}m left
              </div>
            )}
          </div>
        </div>

        {challenge.progress !== undefined && isActive && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Your Progress</span>
              <span className="font-medium text-gray-900">{challenge.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${challenge.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-blue-600">
              <Zap className="w-4 h-4 mr-1" />
              {challenge.rewards.winner.xp} XP
            </div>
            <div className="flex items-center text-yellow-600">
              <Gem className="w-4 h-4 mr-1" />
              {challenge.rewards.winner.coins} coins
            </div>
          </div>
          <button className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isActive ? 'bg-green-600 text-white hover:bg-green-700' :
            isUpcoming ? 'bg-blue-600 text-white hover:bg-blue-700' :
            'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}>
            {isActive ? 'Join Now' : isUpcoming ? 'Register' : 'Completed'}
          </button>
        </div>
      </motion.div>
    );
  };

  const renderOverview = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      {/* User Profile Card */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <img
              src={mockUserProfile.avatar}
              alt={mockUserProfile.displayName}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold mb-1">{mockUserProfile.displayName}</h2>
              <p className="text-blue-100 mb-3">@{mockUserProfile.username}</p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockUserProfile.level}</p>
                  <p className="text-blue-100 text-sm">Level</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockUserProfile.streak}</p>
                  <p className="text-blue-100 text-sm">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockUserProfile.coins.toLocaleString()}</p>
                  <p className="text-blue-100 text-sm">Coins</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{mockUserProfile.xp.toLocaleString()}</p>
            <p className="text-blue-100">XP to next level</p>
            <div className="w-48 bg-blue-400 rounded-full h-2 mt-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: `${(mockUserProfile.xp / 3000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{mockUserProfile.stats.algorithmsLearned}</h3>
          <p className="text-gray-600 text-sm">Algorithms Learned</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{mockUserProfile.stats.challengesCompleted}</h3>
          <p className="text-gray-600 text-sm">Challenges Won</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{mockUserProfile.stats.collaborativeSessions}</h3>
          <p className="text-gray-600 text-sm">Collaborations</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{mockUserProfile.stats.helpfulVotes}</h3>
          <p className="text-gray-600 text-sm">Helpful Votes</p>
        </motion.div>
      </div>

      {/* Recent Achievements */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAchievements.filter(a => a.dateEarned).slice(0, 2).map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderAchievements = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Achievement Gallery</h2>
        <div className="text-sm text-gray-600">
          {mockAchievements.filter(a => a.dateEarned).length} of {mockAchievements.length} earned
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </motion.div>
  );

  const renderLeaderboard = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
        <select
          value={leaderboardPeriod}
          onChange={(e) => setLeaderboardPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all-time">All Time</option>
        </select>
      </div>

      <div className="space-y-3">
        {mockLeaderboard.map((entry, index) => (
          <LeaderboardRow key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </motion.div>
  );

  const renderSkillTree = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Algorithm Skill Tree</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSkillTreeZoom(Math.max(0.5, skillTreeZoom - 0.1))}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Zoom Out
          </button>
          <span className="text-gray-600">{Math.round(skillTreeZoom * 100)}%</span>
          <button
            onClick={() => setSkillTreeZoom(Math.min(2, skillTreeZoom + 0.1))}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Zoom In
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 overflow-auto" style={{ height: '600px' }}>
        <div className="relative" style={{ width: '800px', height: '600px' }}>
          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {mockSkillTree.map((node) =>
              node.connections.map((connectionId) => {
                const connectedNode = mockSkillTree.find(n => n.id === connectionId);
                if (!connectedNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${connectionId}`}
                    x1={node.position.x * skillTreeZoom + 48}
                    y1={node.position.y * skillTreeZoom + 48}
                    x2={connectedNode.position.x * skillTreeZoom + 48}
                    y2={connectedNode.position.y * skillTreeZoom + 48}
                    stroke={connectedNode.isUnlocked ? "#3B82F6" : "#D1D5DB"}
                    strokeWidth="2"
                    strokeDasharray={connectedNode.isUnlocked ? "0" : "5,5"}
                  />
                );
              })
            )}
          </svg>

          {/* Skill Nodes */}
          {mockSkillTree.map((node) => (
            <SkillTreeNode key={node.id} node={node} />
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderChallenges = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Active Challenges</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Advanced Gamification System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete achievements, climb leaderboards, master skill trees, and compete in challenges to enhance your learning journey
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'achievements' && renderAchievements()}
              {activeTab === 'leaderboard' && renderLeaderboard()}
              {activeTab === 'skill-tree' && renderSkillTree()}
              {activeTab === 'challenges' && renderChallenges()}
              {activeTab === 'social' && (
                <motion.div variants={containerVariants} className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Social Hub</h3>
                  <p className="text-gray-600">Connect with peers, form study groups, and share achievements coming soon...</p>
                </motion.div>
              )}
              {activeTab === 'rewards' && (
                <motion.div variants={containerVariants} className="text-center py-12">
                  <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Reward Store</h3>
                  <p className="text-gray-600">Spend your coins on exclusive themes, power-ups, and learning materials coming soon...</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Achievement Modal */}
          <AnimatePresence>
            {selectedAchievement && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedAchievement(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${getDifficultyColor(selectedAchievement.difficulty)} flex items-center justify-center mx-auto mb-4 relative`}>
                      <selectedAchievement.icon className="w-10 h-10 text-white" />
                      {selectedAchievement.dateEarned && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedAchievement.title}</h2>
                    <p className="text-gray-600 mb-6">{selectedAchievement.description}</p>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {selectedAchievement.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Rewards</h4>
                        <div className="flex items-center justify-center space-x-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center text-blue-600 mb-1">
                              <Zap className="w-5 h-5 mr-1" />
                              <span className="font-bold">{selectedAchievement.reward.xp}</span>
                            </div>
                            <span className="text-xs text-gray-600">XP</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center text-yellow-600 mb-1">
                              <Gem className="w-5 h-5 mr-1" />
                              <span className="font-bold">{selectedAchievement.reward.coins}</span>
                            </div>
                            <span className="text-xs text-gray-600">Coins</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedAchievement(null)}
                      className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedGamificationSystem;