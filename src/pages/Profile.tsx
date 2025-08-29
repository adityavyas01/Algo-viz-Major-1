import React from "react";
import { Header } from "@/components/Header";
import { UserProfile } from "@/components/UserProfile";
import { LearningStreakCard } from "@/components/LearningStreakCard";
import { CategoryProgress } from "@/components/CategoryProgress";
import { AchievementBadge } from "@/components/AchievementBadge";
import { UserProfile as UserProfileType } from "@/types/social";
import { LearningStreak } from "@/types/learning";
import { Achievement } from "@/types/gamification";

const Profile: React.FC = () => {
  // Mock user profile data
  const mockProfile: UserProfileType = {
    id: 'user-1',
    username: 'algorithmaster',
    displayName: 'Algorithm Master',
    avatar: '/api/placeholder/150/150',
    bio: 'Passionate about algorithms and data structures. Love teaching and learning!',
    level: 15,
    totalPoints: 2500,
    joinedDate: new Date('2024-01-15'),
    isOnline: true,
    badges: ['Early Adopter', 'Algorithm Expert', 'Mentor'],
    achievements: 25,
    followers: 150,
    following: 75,
    studyStreak: 30
  };

  // Mock learning streak data
  const mockStreak: LearningStreak = {
    id: 'streak-1',
    userId: 'user-1',
    currentStreak: 30,
    longestStreak: 45,
    lastActivityDate: new Date(),
    streakGoal: 50,
    streakType: 'daily',
    isActive: true
  };

  // Mock achievement data
  const mockAchievement: Achievement = {
    id: 'achievement-1',
    name: 'Algorithm Master',
    description: 'Complete 100 different algorithms',
    icon: '🏆',
    category: 'mastery',
    points: 500,
    unlocked: true,
    unlockedAt: new Date(),
    progress: 85,
    maxProgress: 100,
    rarity: 'epic'
  };

  // Mock category progress data
  const mockCategoryData = [
    { category: 'Sorting', completed: 15, total: 20 },
    { category: 'Searching', completed: 8, total: 10 },
    { category: 'Dynamic Programming', completed: 5, total: 15 },
    { category: 'Graph Algorithms', completed: 12, total: 18 },
    { category: 'Trees', completed: 10, total: 12 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          My Profile
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UserProfile 
              profile={mockProfile}
              isOwnProfile={true}
            />
            <div className="mt-8">
              <CategoryProgress data={mockCategoryData} />
            </div>
          </div>
          <div>
            <LearningStreakCard streak={mockStreak} />
            <div className="mt-8">
              <AchievementBadge achievement={mockAchievement} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
