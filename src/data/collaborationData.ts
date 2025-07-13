import { 
  CollaborativeSession, 
  SharedWorkspace, 
  VoiceChatRoom, 
  VideoChatRoom, 
  InstructorDashboard, 
  PeerReview, 
  GroupProject 
} from '@/types/collaboration';

export const mockCollaborativeSessions: CollaborativeSession[] = [
  {
    id: 'session-1',
    name: 'Algorithm Study Group',
    description: 'A collaborative session to study and implement various algorithms',
    algorithmId: 'sorting-algorithms',
    ownerId: 'user-1',
    ownerName: 'Alice',
    participants: [
      {
        id: 'participant-1',
        userId: 'user-1',
        username: 'Alice',
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'owner',
        isOnline: true,
        permissions: {
          canEdit: true,
          canControl: true,
          canSpeak: true,
          canShare: true
        },
        joinedAt: new Date(),
        lastActive: new Date()
      },
      {
        id: 'participant-2',
        userId: 'user-2',
        username: 'Bob',
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'student',
        isOnline: false,
        permissions: {
          canEdit: false,
          canControl: false,
          canSpeak: true,
          canShare: false
        },
        joinedAt: new Date(),
        lastActive: new Date()
      }
    ],
    maxParticipants: 10,
    isActive: true,
    isPublic: true,
    createdAt: new Date(),
    startedAt: new Date(),
    sessionType: 'study_group',
    currentStep: 1,
    sharedState: {}
  },
  {
    id: 'session-2',
    name: 'Classroom Session',
    description: 'A classroom session for learning data structures',
    algorithmId: 'data-structures',
    ownerId: 'user-3',
    ownerName: 'Professor Smith',
    participants: [
      {
        id: 'participant-3',
        userId: 'user-3',
        username: 'Professor Smith',
        avatar: 'https://i.pravatar.cc/150?img=3',
        role: 'instructor',
        isOnline: true,
        permissions: {
          canEdit: true,
          canControl: true,
          canSpeak: true,
          canShare: true
        },
        joinedAt: new Date(),
        lastActive: new Date()
      },
      {
        id: 'participant-4',
        userId: 'user-4',
        username: 'Charlie',
        avatar: 'https://i.pravatar.cc/150?img=4',
        role: 'student',
        isOnline: true,
        permissions: {
          canEdit: false,
          canControl: false,
          canSpeak: true,
          canShare: false
        },
        joinedAt: new Date(),
        lastActive: new Date()
      }
    ],
    maxParticipants: 20,
    isActive: false,
    isPublic: false,
    createdAt: new Date(),
    sessionType: 'classroom',
    currentStep: 0,
    sharedState: {}
  }
];

export const mockSharedWorkspace: SharedWorkspace = {
  id: 'workspace-1',
  sessionId: 'session-1',
  algorithmId: 'sorting-algorithms',
  sharedCode: `
    function bubbleSort(arr) {
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      return arr;
    }
  `,
  sharedVisualization: {},
  currentInput: [5, 1, 4, 2, 8],
  executionState: 'idle',
  cursors: [
    {
      userId: 'user-1',
      username: 'Alice',
      x: 100,
      y: 150,
      color: 'blue',
      isActive: true
    },
    {
      userId: 'user-4',
      username: 'Charlie',
      x: 200,
      y: 250,
      color: 'red',
      isActive: true
    }
  ],
  annotations: [
    {
      id: 'annotation-1',
      userId: 'user-1',
      username: 'Alice',
      x: 150,
      y: 200,
      content: 'Check this part',
      type: 'comment',
      createdAt: new Date(),
      isResolved: false
    }
  ],
  lastModified: new Date(),
  modifiedBy: 'user-1'
};

export const mockVoiceChatRoom: VoiceChatRoom = {
  id: 'voice-1',
  sessionId: 'session-1',
  isActive: true,
  participants: [
    {
      userId: 'user-1',
      username: 'Alice',
      isMuted: false,
      isSpeaking: true,
      volume: 0.7,
      permissions: {
        canSpeak: true,
        canMute: true,
        canKick: true
      }
    },
    {
      userId: 'user-2',
      username: 'Bob',
      isMuted: true,
      isSpeaking: false,
      volume: 0.2,
      permissions: {
        canSpeak: true,
        canMute: false,
        canKick: false
      }
    }
  ],
  settings: {
    isMuted: false,
    isRecording: false,
    quality: 'high'
  }
};

export const mockVideoChatRoom: VideoChatRoom = {
  id: 'video-1',
  sessionId: 'session-1',
  isActive: true,
  participants: [
    {
      userId: 'user-1',
      username: 'Alice',
      hasVideo: true,
      isScreenSharing: false,
      permissions: {
        canVideo: true,
        canScreenShare: true,
        canRecord: true
      }
    },
    {
      userId: 'user-2',
      username: 'Bob',
      hasVideo: false,
      isScreenSharing: false,
      permissions: {
        canVideo: true,
        canScreenShare: false,
        canRecord: false
      }
    }
  ],
  layout: 'grid',
  settings: {
    quality: 'high',
    isRecording: false,
    hasScreenShare: false
  }
};

export const mockInstructorDashboard: InstructorDashboard = {
  id: 'dashboard-1',
  instructorId: 'user-3',
  classrooms: [
    {
      id: 'classroom-1',
      name: 'Data Structures 101',
      description: 'Introduction to data structures',
      instructorId: 'user-3',
      students: [
        {
          userId: 'user-4',
          username: 'Charlie',
          email: 'charlie@example.com',
          avatar: 'https://i.pravatar.cc/150?img=4',
          joinedAt: new Date(),
          lastActive: new Date(),
          progress: {
            completedAlgorithms: ['sorting-algorithms'],
            currentLevel: 2,
            totalPoints: 150,
            averageScore: 0.85
          },
          permissions: {
            canEdit: false,
            canControl: false,
            canSpeak: true,
            canShare: false
          }
        }
      ],
      maxStudents: 30,
      isActive: true,
      schedule: [],
      createdAt: new Date(),
      settings: {
        allowStudentControl: false,
        requireApproval: true,
        enableVoiceChat: true,
        enableVideoChat: false
      }
    }
  ],
  activeSessions: [mockCollaborativeSessions[1]],
  assignments: [],
  analytics: {
    totalStudents: 25,
    activeStudents: 20,
    averageProgress: 0.75,
    completionRates: {
      'sorting-algorithms': 0.9
    },
    engagementMetrics: {
      averageSessionTime: 45,
      questionsPerSession: 3,
      collaborationScore: 0.8
    },
    performanceData: {
      averageScore: 0.82,
      improvementRate: 0.1,
      strugglingStudents: ['user-5']
    }
  }
};

export const mockPeerReviews: PeerReview[] = [
  {
    id: 'review-1',
    assignmentId: 'assignment-1',
    reviewerId: 'user-1',
    reviewerName: 'Alice',
    revieweeId: 'user-2',
    revieweeName: 'Bob',
    algorithmId: 'sorting-algorithms',
    submissionId: 'submission-1',
    status: 'pending',
    criteria: [
      {
        id: 'criteria-1',
        name: 'Correctness',
        description: 'The code produces the correct output for all test cases',
        maxScore: 5,
        weight: 0.4
      },
      {
        id: 'criteria-2',
        name: 'Efficiency',
        description: 'The code runs efficiently with respect to time and space complexity',
        maxScore: 5,
        weight: 0.3
      },
      {
        id: 'criteria-3',
        name: 'Code Quality',
        description: 'The code is well-structured, readable, and maintainable',
        maxScore: 5,
        weight: 0.3
      }
    ],
    feedback: [],
    overallScore: 0,
    createdAt: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
  },
  {
    id: 'review-2',
    assignmentId: 'assignment-1',
    reviewerId: 'user-2',
    reviewerName: 'Bob',
    revieweeId: 'user-1',
    revieweeName: 'Alice',
    algorithmId: 'sorting-algorithms',
    submissionId: 'submission-2',
    status: 'in_progress',
    criteria: [
      {
        id: 'criteria-1',
        name: 'Correctness',
        description: 'The code produces the correct output for all test cases',
        maxScore: 5,
        weight: 0.4
      },
      {
        id: 'criteria-2',
        name: 'Efficiency',
        description: 'The code runs efficiently with respect to time and space complexity',
        maxScore: 5,
        weight: 0.3
      },
      {
        id: 'criteria-3',
        name: 'Code Quality',
        description: 'The code is well-structured, readable, and maintainable',
        maxScore: 5,
        weight: 0.3
      }
    ],
    feedback: [
      {
        criteriaId: 'criteria-1',
        score: 4,
        comment: 'The code produces the correct output for most test cases, but fails for some edge cases.',
        suggestions: ['Consider adding more test cases to cover edge cases.'],
        highlights: []
      }
    ],
    overallScore: 0,
    createdAt: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
  }
];

export const mockGroupProjects: GroupProject[] = [
  {
    id: 'project-1',
    title: 'AI Chatbot',
    description: 'Develop an AI-powered chatbot using natural language processing',
    algorithmIds: ['nlp', 'machine-learning'],
    instructorId: 'user-3',
    groups: [],
    maxGroupSize: 5,
    minGroupSize: 3,
    deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
    requirements: [],
    rubric: [],
    status: 'active',
    createdAt: new Date()
  },
  {
    id: 'project-2',
    title: 'E-commerce Platform',
    description: 'Build a fully functional e-commerce platform with user authentication and payment processing',
    algorithmIds: ['web-development', 'database-management'],
    instructorId: 'user-3',
    groups: [],
    maxGroupSize: 5,
    minGroupSize: 3,
    deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
    requirements: [],
    rubric: [],
    status: 'active',
    createdAt: new Date()
  }
];
