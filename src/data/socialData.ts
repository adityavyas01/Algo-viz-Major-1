
import { UserProfile, SharedVisualization, Comment, StudyGroup, ActivityFeedItem, Notification, Tournament, TournamentEntry } from '@/types/social';

export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    username: 'alex_coder',
    displayName: 'Alex Johnson',
    avatar: '👨‍💻',
    bio: 'Full-stack developer passionate about algorithms and data structures. Love sharing knowledge!',
    level: 15,
    totalPoints: 12500,
    joinedDate: new Date('2024-01-15'),
    isOnline: true,
    badges: ['Early Adopter', 'Algorithm Master', 'Social Butterfly'],
    achievements: 23,
    followers: 156,
    following: 89,
    studyStreak: 45
  },
  {
    id: '2',
    username: 'sarah_algo',
    displayName: 'Sarah Chen',
    avatar: '👩‍🔬',
    bio: 'CS student exploring the beauty of algorithms. Always ready for a coding challenge!',
    level: 12,
    totalPoints: 9800,
    joinedDate: new Date('2024-02-10'),
    isOnline: false,
    badges: ['Rising Star', 'Problem Solver'],
    achievements: 18,
    followers: 92,
    following: 134,
    studyStreak: 12
  },
  {
    id: '3',
    username: 'mike_structures',
    displayName: 'Mike Rodriguez',
    avatar: '🧑‍💼',
    bio: 'Software engineer with 5+ years experience. Helping others master DSA concepts.',
    level: 18,
    totalPoints: 18200,
    joinedDate: new Date('2023-11-20'),
    isOnline: true,
    badges: ['Mentor', 'Expert', 'Helpful'],
    achievements: 31,
    followers: 234,
    following: 67,
    studyStreak: 78
  }
];

export const mockSharedVisualizations: SharedVisualization[] = [
  {
    id: '1',
    userId: '1',
    username: 'alex_coder',
    title: 'Optimized Binary Search Implementation',
    description: 'A clean implementation of binary search with detailed complexity analysis',
    algorithmId: 'binary-search',
    algorithmName: 'Binary Search',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    complexity: { time: 'O(log n)', space: 'O(1)' },
    createdAt: new Date('2024-06-10'),
    likes: 45,
    views: 234,
    isLiked: true,
    tags: ['searching', 'optimization', 'beginner-friendly']
  },
  {
    id: '2',
    userId: '3',
    username: 'mike_structures',
    title: 'Advanced Graph Traversal Visualization',
    description: 'Interactive DFS and BFS comparison with performance metrics',
    algorithmId: 'graph-traversal',
    algorithmName: 'Graph Traversal',
    code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    createdAt: new Date('2024-06-12'),
    likes: 78,
    views: 456,
    isLiked: false,
    tags: ['graphs', 'traversal', 'advanced']
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    userId: '2',
    username: 'sarah_algo',
    avatar: '👩‍🔬',
    content: 'Great explanation! This helped me understand binary search much better.',
    createdAt: new Date('2024-06-11'),
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    userId: '3',
    username: 'mike_structures',
    avatar: '🧑‍💼',
    content: 'Nice clean implementation. Have you considered adding error handling for edge cases?',
    createdAt: new Date('2024-06-12'),
    likes: 8,
    isLiked: true
  }
];

export const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Algorithm Enthusiasts',
    description: 'A group for passionate algorithm learners to share knowledge and solve problems together',
    avatar: '🧠',
    creatorId: '1',
    members: mockUserProfiles.slice(0, 3),
    isPrivate: false,
    focusAreas: ['Dynamic Programming', 'Graph Algorithms', 'Tree Structures'],
    createdAt: new Date('2024-05-01'),
    lastActivity: new Date('2024-06-14'),
    memberCount: 23
  },
  {
    id: '2',
    name: 'Data Structure Masters',
    description: 'Advanced study group focusing on complex data structures and their applications',
    avatar: '📊',
    creatorId: '3',
    members: [mockUserProfiles[0], mockUserProfiles[2]],
    isPrivate: true,
    focusAreas: ['Hash Tables', 'B-Trees', 'Segment Trees'],
    createdAt: new Date('2024-04-15'),
    lastActivity: new Date('2024-06-13'),
    memberCount: 12
  }
];

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: '1',
    userId: '1',
    username: 'alex_coder',
    avatar: '👨‍💻',
    type: 'share',
    content: 'shared a new visualization for Binary Search',
    targetId: '1',
    targetName: 'Optimized Binary Search Implementation',
    createdAt: new Date('2024-06-10'),
    likes: 15,
    isLiked: true
  },
  {
    id: '2',
    userId: '2',
    username: 'sarah_algo',
    avatar: '👩‍🔬',
    type: 'achievement',
    content: 'unlocked the "Problem Solver" badge',
    createdAt: new Date('2024-06-12'),
    likes: 8,
    isLiked: false
  },
  {
    id: '3',
    userId: '3',
    username: 'mike_structures',
    avatar: '🧑‍💼',
    type: 'level_up',
    content: 'reached level 18!',
    createdAt: new Date('2024-06-13'),
    likes: 22,
    isLiked: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'friend_request',
    title: 'New friend request',
    content: 'sarah_algo wants to connect with you',
    isRead: false,
    createdAt: new Date('2024-06-14'),
    actionUrl: '/profile/sarah_algo'
  },
  {
    id: '2',
    userId: '1',
    type: 'comment',
    title: 'New comment on your visualization',
    content: 'mike_structures commented on your Binary Search implementation',
    isRead: true,
    createdAt: new Date('2024-06-12'),
    actionUrl: '/visualizations/1'
  }
];

export const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Summer Algorithm Challenge',
    description: 'A month-long tournament featuring the most challenging algorithms and data structures',
    bannerImage: '🏆',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-31'),
    status: 'upcoming',
    participants: 0,
    maxParticipants: 100,
    prize: 'Premium Badge + Certificate',
    rules: [
      'Complete challenges within time limits',
      'Solutions must pass all test cases',
      'No external help allowed',
      'Fair play and sportsmanship required'
    ],
    challenges: ['dynamic-programming', 'graph-algorithms', 'tree-traversal'],
    leaderboard: []
  },
  {
    id: '2',
    name: 'Quick Sort Sprint',
    description: 'Weekly challenge focusing on sorting algorithms and optimization techniques',
    bannerImage: '⚡',
    startDate: new Date('2024-06-10'),
    endDate: new Date('2024-06-17'),
    status: 'active',
    participants: 45,
    maxParticipants: 50,
    prize: 'Speed Demon Badge',
    rules: [
      'Implement sorting algorithms from scratch',
      'Optimize for both time and space complexity',
      'Submit within 2 hours'
    ],
    challenges: ['quick-sort', 'merge-sort', 'heap-sort'],
    leaderboard: [
      {
        userId: '3',
        username: 'mike_structures',
        avatar: '🧑‍💼',
        score: 95,
        rank: 1,
        completedChallenges: 3,
        lastSubmission: new Date('2024-06-14')
      },
      {
        userId: '1',
        username: 'alex_coder',
        avatar: '👨‍💻',
        score: 87,
        rank: 2,
        completedChallenges: 3,
        lastSubmission: new Date('2024-06-13')
      }
    ]
  }
];
