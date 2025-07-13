
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LearningStreakCard } from '@/components/LearningStreakCard';
import { DifficultyAdjustment } from '@/components/DifficultyAdjustment';
import { LearningReports } from '@/components/LearningReports';
import { MotivationSystem } from '@/components/MotivationSystem';
import { CommunityChallenges } from '@/components/CommunityChallenges';
import { CertificationSystem } from '@/components/CertificationSystem';
import { Flame, Brain, FileText, Heart, Users, Award } from 'lucide-react';
import { 
  mockLearningStreak,
  mockDifficultySettings,
  mockLearningReports,
  mockMotivationReminders,
  mockCommunityMobileChallenges,
  mockCertifications
} from '@/data/learningData';

export const LearningEnhancement: React.FC = () => {
  const [learningStreak, setLearningStreak] = useState(mockLearningStreak);
  const [difficultySettings, setDifficultySettings] = useState(mockDifficultySettings);
  const [motivationReminders, setMotivationReminders] = useState(mockMotivationReminders);

  const handleUpdateStreakGoal = (newGoal: number) => {
    setLearningStreak(prev => ({ ...prev, streakGoal: newGoal }));
  };

  const handleToggleAdaptive = (enabled: boolean) => {
    setDifficultySettings(prev => ({ ...prev, adaptiveEnabled: enabled }));
  };

  const handleLevelChange = (level: typeof difficultySettings.currentLevel) => {
    setDifficultySettings(prev => ({ ...prev, currentLevel: level }));
  };

  const handleToggleReminder = (reminderId: string, enabled: boolean) => {
    setMotivationReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, isEnabled: enabled }
          : reminder
      )
    );
  };

  const handleTimeChange = (reminderId: string, newTime: string) => {
    setMotivationReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, scheduledTime: newTime }
          : reminder
      )
    );
  };

  const handleJoinChallenge = (challengeId: string) => {
    console.log('Joining challenge:', challengeId);
  };

  const handleStartCertification = (certificationId: string) => {
    console.log('Starting certification:', certificationId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Learning Enhancement</h2>
        <p className="text-white/70">Personalized learning tools to accelerate your progress</p>
      </div>

      {/* Overview Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <LearningStreakCard 
          streak={learningStreak}
          onUpdateGoal={handleUpdateStreakGoal}
        />
        <DifficultyAdjustment
          settings={difficultySettings}
          onToggleAdaptive={handleToggleAdaptive}
          onLevelChange={handleLevelChange}
        />
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="motivation" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Motivation</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Certifications</span>
          </TabsTrigger>
          <TabsTrigger value="streaks" className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            <span className="hidden sm:inline">Habits</span>
          </TabsTrigger>
          <TabsTrigger value="adaptive" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Adaptive</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <LearningReports reports={mockLearningReports} />
        </TabsContent>

        <TabsContent value="motivation">
          <MotivationSystem
            reminders={motivationReminders}
            onToggleReminder={handleToggleReminder}
            onTimeChange={handleTimeChange}
          />
        </TabsContent>

        <TabsContent value="challenges">
          <CommunityChallenges
            challenges={mockCommunityMobileChallenges}
            onJoinChallenge={handleJoinChallenge}
          />
        </TabsContent>

        <TabsContent value="certifications">
          <CertificationSystem
            certifications={mockCertifications}
            onStartCertification={handleStartCertification}
          />
        </TabsContent>

        <TabsContent value="streaks">
          <LearningStreakCard 
            streak={learningStreak}
            onUpdateGoal={handleUpdateStreakGoal}
          />
        </TabsContent>

        <TabsContent value="adaptive">
          <DifficultyAdjustment
            settings={difficultySettings}
            onToggleAdaptive={handleToggleAdaptive}
            onLevelChange={handleLevelChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
