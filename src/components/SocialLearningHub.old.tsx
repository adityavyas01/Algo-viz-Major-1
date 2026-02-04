import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Trophy, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  Eye,
  Clock,
  Calendar,
  Filter,
  Search,
  Plus,
  Send,
  Bookmark,
  Flag,
  Award,
  Target,
  Zap,
  Crown,
  UserPlus,
  Settings,
  Bell,
  Globe,
  Lock,
  Unlock
} from 'lucide-react';

interface SocialPost {
  id: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    level: number;
    badges: string[];
  };
  content: string;
  algorithm?: string;
  type: 'discussion' | 'solution' | 'question' | 'achievement' | 'challenge';
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  codeSnippet?: string;
  attachments?: string[];
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  maxMembers: number;
  privacy: 'public' | 'private' | 'invite-only';
  topics: string[];
  activity: 'high' | 'medium' | 'low';
  schedule?: {
    day: string;
    time: string;
    duration: number;
  };
  nextSession?: Date;
  moderators: string[];
  achievements: string[];
  level: number;
}

interface LeaderboardUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  points: number;
  badges: string[];
  specialties: string[];
  contributions: number;
  helpfulAnswers: number;
  position: number;
  change: number;
}

const mockSocialPosts: SocialPost[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      username: 'algo_master',
      displayName: 'Alex Chen',
      avatar: '/api/placeholder/40/40',
      level: 15,
      badges: ['Sorting Expert', 'Helper Hero']
    },
    content: 'Just optimized my merge sort implementation to run 30% faster! The key was reducing the number of array allocations. Here\'s my approach...',
    algorithm: 'merge-sort',
    type: 'solution',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 24,
    comments: 8,
    shares: 5,
    views: 156,
    isLiked: false,
    isBookmarked: true,
    tags: ['optimization', 'sorting', 'performance'],
    difficulty: 'medium',
    codeSnippet: 'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  // Optimized implementation...\n}'
  },
  {
    id: '2',
    author: {
      id: 'user2',
      username: 'tree_walker',
      displayName: 'Sarah Kim',
      avatar: '/api/placeholder/40/40',
      level: 12,
      badges: ['Tree Specialist', 'Community Champion']
    },
    content: 'Can someone help me understand why my AVL tree rotation isn\'t working correctly? The tree becomes unbalanced after insertions.',
    algorithm: 'avl-tree',
    type: 'question',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    likes: 12,
    comments: 15,
    shares: 2,
    views: 89,
    isLiked: true,
    isBookmarked: false,
    tags: ['trees', 'balancing', 'help-needed'],
    difficulty: 'hard'
  },
  {
    id: '3',
    author: {
      id: 'user3',
      username: 'graph_guru',
      displayName: 'Michael Wong',
      avatar: '/api/placeholder/40/40',
      level: 18,
      badges: ['Graph Master', 'Algorithm Virtuoso', 'Mentor']
    },
    content: '🎉 Just earned the "Dijkstra\'s Disciple" achievement! Solved 50 shortest path problems. The journey taught me so much about graph algorithms.',
    algorithm: 'dijkstra',
    type: 'achievement',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    likes: 45,
    comments: 12,
    shares: 8,
    views: 203,
    isLiked: true,
    isBookmarked: false,
    tags: ['achievement', 'graphs', 'milestone'],
    difficulty: 'expert'
  }
];

const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Advanced Algorithms Study Circle',
    description: 'Deep dive into complex algorithmic problems and optimization techniques',
    avatar: '/api/placeholder/60/60',
    memberCount: 23,
    maxMembers: 30,
    privacy: 'public',
    topics: ['Dynamic Programming', 'Graph Algorithms', 'Advanced Data Structures'],
    activity: 'high',
    schedule: {
      day: 'Tuesday',
      time: '7:00 PM',
      duration: 90
    },
    nextSession: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    moderators: ['graph_guru', 'dp_dynamo'],
    achievements: ['Study Group Champion', 'Collaborative Learner'],
    level: 8
  },
  {
    id: '2',
    name: 'Beginners Code Together',
    description: 'Friendly environment for learning programming fundamentals and basic algorithms',
    avatar: '/api/placeholder/60/60',
    memberCount: 45,
    maxMembers: 50,
    privacy: 'public',
    topics: ['Sorting', 'Searching', 'Basic Data Structures'],
    activity: 'high',
    schedule: {
      day: 'Saturday',
      time: '2:00 PM',
      duration: 120
    },
    nextSession: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    moderators: ['helpful_mentor', 'code_teacher'],
    achievements: ['Newcomer Friendly', 'Patient Helpers'],
    level: 3
  },
  {
    id: '3',
    name: 'Competitive Programming Elite',
    description: 'Prepare for coding contests and tackle challenging algorithmic problems',
    avatar: '/api/placeholder/60/60',
    memberCount: 15,
    maxMembers: 20,
    privacy: 'invite-only',
    topics: ['Contest Problems', 'Advanced Techniques', 'Time Optimization'],
    activity: 'medium',
    schedule: {
      day: 'Friday',
      time: '8:00 PM',
      duration: 180
    },
    nextSession: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    moderators: ['contest_king'],
    achievements: ['Elite Performers', 'Problem Solvers'],
    level: 12
  }
];

const mockCommunityLeaderboard: LeaderboardUser[] = [
  {
    id: '1',
    username: 'helpful_mentor',
    displayName: 'Dr. Emma Wilson',
    avatar: '/api/placeholder/40/40',
    level: 20,
    points: 8945,
    badges: ['Mentor', 'Helper Hero', 'Community Champion', 'Expert Teacher'],
    specialties: ['Dynamic Programming', 'Graph Theory', 'Algorithm Design'],
    contributions: 156,
    helpfulAnswers: 89,
    position: 1,
    change: 0
  },
  {
    id: '2',
    username: 'graph_guru',
    displayName: 'Michael Wong',
    avatar: '/api/placeholder/40/40',
    level: 18,
    points: 7632,
    badges: ['Graph Master', 'Algorithm Virtuoso', 'Problem Solver'],
    specialties: ['Graph Algorithms', 'Network Theory', 'Optimization'],
    contributions: 134,
    helpfulAnswers: 67,
    position: 2,
    change: 1
  },
  {
    id: '3',
    username: 'algo_master',
    displayName: 'Alex Chen',
    avatar: '/api/placeholder/40/40',
    level: 15,
    points: 6823,
    badges: ['Sorting Expert', 'Speed Demon', 'Innovation Award'],
    specialties: ['Sorting Algorithms', 'Performance Optimization', 'Code Review'],
    contributions: 98,
    helpfulAnswers: 45,
    position: 3,
    change: -1
  }
];

export const SocialLearningHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [postFilter, setPostFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const tabs = [
    { id: 'feed', label: 'Community Feed', icon: MessageCircle },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'leaderboard', label: 'Community Leaders', icon: Crown },
    { id: 'events', label: 'Events & Challenges', icon: Calendar },
    { id: 'mentorship', label: 'Find Mentors', icon: Award }
  ];

  const postTypes = [
    { id: 'all', label: 'All Posts' },
    { id: 'discussion', label: 'Discussions' },
    { id: 'solution', label: 'Solutions' },
    { id: 'question', label: 'Questions' },
    { id: 'achievement', label: 'Achievements' }
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

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'solution': return 'bg-green-100 text-green-800';
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'achievement': return 'bg-purple-100 text-purple-800';
      case 'discussion': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return '';
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'public': return Globe;
      case 'private': return Lock;
      case 'invite-only': return Unlock;
      default: return Globe;
    }
  };

  const SocialPostCard: React.FC<{ post: SocialPost }> = ({ post }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <img
          src={post.author.avatar}
          alt={post.author.displayName}
          className="w-12 h-12 rounded-full border-2 border-gray-200"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-gray-900">{post.author.displayName}</h4>
            <span className="text-gray-500 text-sm">@{post.author.username}</span>
            <div className="flex items-center space-x-1">
              <Trophy className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-gray-600">Level {post.author.level}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
              {post.type}
            </span>
            {post.difficulty && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                {post.difficulty}
              </span>
            )}
          </div>

          <div className="mb-3">
            {post.author.badges.slice(0, 2).map((badge, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mr-2 mb-1"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-gray-700 mb-3">{post.content}</p>

          {post.codeSnippet && (
            <div className="bg-gray-900 rounded-lg p-4 mb-3">
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{post.codeSnippet}</code>
              </pre>
            </div>
          )}

          {post.algorithm && (
            <div className="mb-3">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {post.algorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2 mb-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span>{post.timestamp.toLocaleDateString()} at {post.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.views}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button className={`flex items-center space-x-2 transition-colors ${
                post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}>
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>{post.shares}</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-lg transition-colors ${
                post.isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
              }`}>
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const StudyGroupCard: React.FC<{ group: StudyGroup }> = ({ group }) => {
    const PrivacyIcon = getPrivacyIcon(group.privacy);
    
    return (
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={group.avatar}
            alt={group.name}
            className="w-16 h-16 rounded-xl border-2 border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
              <PrivacyIcon className="w-4 h-4 text-gray-500" />
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600">Level {group.level}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{group.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {group.memberCount}/{group.maxMembers} members
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                group.activity === 'high' ? 'bg-green-100 text-green-800' :
                group.activity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {group.activity} activity
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Topics Covered</h4>
            <div className="flex flex-wrap gap-2">
              {group.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {group.schedule && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Regular Sessions</h4>
              <p className="text-sm text-gray-600">
                {group.schedule.day}s at {group.schedule.time} ({group.schedule.duration} min)
              </p>
              {group.nextSession && (
                <p className="text-xs text-blue-600 mt-1">
                  Next: {group.nextSession.toLocaleDateString()} at {group.nextSession.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex space-x-2">
              {group.achievements.slice(0, 2).map((achievement, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium"
                >
                  {achievement}
                </span>
              ))}
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
              {group.privacy === 'invite-only' ? 'Request Invite' : 'Join Group'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const LeaderboardUserCard: React.FC<{ user: LeaderboardUser; index: number }> = ({ user, index }) => (
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
          <div className={`text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center ${
            index === 0 ? 'bg-yellow-500 text-white' :
            index === 1 ? 'bg-gray-400 text-white' :
            index === 2 ? 'bg-amber-600 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {user.position}
          </div>
          {user.change !== 0 && (
            <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              user.change > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {user.change > 0 ? '+' : ''}{user.change}
            </div>
          )}
        </div>

        <img
          src={user.avatar}
          alt={user.displayName}
          className="w-14 h-14 rounded-full border-2 border-white shadow-md"
        />

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900">{user.displayName}</h3>
            <span className="text-gray-500 text-sm">@{user.username}</span>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">Level {user.level}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {user.badges.slice(0, 3).map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <MessageCircle className="w-3 h-3 mr-1" />
              {user.contributions} posts
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {user.helpfulAnswers} helpful
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Specialties: {user.specialties.join(', ')}
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">{user.points.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Community Points</p>
        </div>
      </div>
    </motion.div>
  );

  const renderFeed = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <select
            value={postFilter}
            onChange={(e) => setPostFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {postTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </button>
      </div>

      <div className="space-y-6">
        {mockSocialPosts.map((post) => (
          <SocialPostCard key={post.id} post={post} />
        ))}
      </div>
    </motion.div>
  );

  const renderGroups = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Study Groups</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockStudyGroups.map((group) => (
          <StudyGroupCard key={group.id} group={group} />
        ))}
      </div>
    </motion.div>
  );

  const renderLeaderboard = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Community Leaders</h2>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="all-time">All Time</option>
        </select>
      </div>

      <div className="space-y-4">
        {mockCommunityLeaderboard.map((user, index) => (
          <LeaderboardUserCard key={user.id} user={user} index={index} />
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
              Social Learning Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with fellow learners, join study groups, share achievements, and build a collaborative learning community
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
              {activeTab === 'feed' && renderFeed()}
              {activeTab === 'groups' && renderGroups()}
              {activeTab === 'leaderboard' && renderLeaderboard()}
              {activeTab === 'events' && (
                <motion.div variants={containerVariants} className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Events & Challenges</h3>
                  <p className="text-gray-600">Community events, hackathons, and collaborative challenges coming soon...</p>
                </motion.div>
              )}
              {activeTab === 'mentorship' && (
                <motion.div variants={containerVariants} className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mentorship Program</h3>
                  <p className="text-gray-600">Connect with experienced mentors and help fellow learners grow coming soon...</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialLearningHub;