
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, Calendar, Trophy, Clock, Target, Code } from 'lucide-react';
import { CommunityChallenge } from '@/types/learning';

interface CommunityChallengesProps {
  challenges: CommunityChallenge[];
  onJoinChallenge?: (challengeId: string) => void;
}

export const CommunityChallenges: React.FC<CommunityChallengesProps> = ({ 
  challenges, 
  onJoinChallenge 
}) => {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed'>('active');

  const filteredChallenges = challenges.filter(challenge => challenge.status === selectedTab);

  const getChallengeIcon = (type: CommunityChallenge['type']) => {
    switch (type) {
      case 'hackathon': return <Code className="w-5 h-5 text-purple-500" />;
      case 'algorithm_sprint': return <Target className="w-5 h-5 text-blue-500" />;
      case 'team_challenge': return <Users className="w-5 h-5 text-green-500" />;
      case 'learning_marathon': return <Trophy className="w-5 h-5 text-yellow-500" />;
      default: return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'advanced': return 'bg-red-500/20 text-red-300';
      case 'mixed': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const timeLeft = endDate.getTime() - now.getTime();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Ending soon';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Community Challenges</h2>
        <p className="text-white/70">Join exciting challenges and compete with fellow learners</p>
      </div>

      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="space-y-4">
            {filteredChallenges.length === 0 ? (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-semibold mb-2">
                    No {selectedTab} challenges
                  </h3>
                  <p className="text-white/60">
                    Check back soon for new challenges!
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredChallenges.map((challenge) => (
                <Card key={challenge.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{challenge.bannerImage}</div>
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {getChallengeIcon(challenge.type)}
                            {challenge.title}
                          </CardTitle>
                          <p className="text-white/70 text-sm mt-1">
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                      
                      {challenge.status === 'active' && (
                        <Badge className="bg-green-500/20 text-green-300">
                          Live
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Challenge Info */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-white/80">
                            {challenge.participants}
                            {challenge.maxParticipants && ` / ${challenge.maxParticipants}`}
                          </span>
                        </div>
                        
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                        
                        {challenge.status === 'active' && (
                          <div className="flex items-center gap-1 text-orange-300">
                            <Clock className="w-4 h-4" />
                            {formatTimeRemaining(challenge.endDate)}
                          </div>
                        )}
                      </div>

                      {/* Progress Bar for Active Challenges */}
                      {challenge.status === 'active' && challenge.maxParticipants && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-white/70">
                            <span>Participation</span>
                            <span>{Math.round((challenge.participants / challenge.maxParticipants) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(challenge.participants / challenge.maxParticipants) * 100} 
                            className="h-2" 
                          />
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {challenge.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-white/60 border-white/30 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4 className="text-white font-medium mb-2 text-sm">Requirements:</h4>
                        <ul className="space-y-1">
                          {challenge.requirements.slice(0, 2).map((req, index) => (
                            <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                          {challenge.requirements.length > 2 && (
                            <li className="text-white/50 text-xs">
                              +{challenge.requirements.length - 2} more requirements
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Rewards */}
                      <div>
                        <h4 className="text-white font-medium mb-2 text-sm">Rewards:</h4>
                        <div className="flex flex-wrap gap-1">
                          {challenge.rewards.map((reward, index) => (
                            <Badge key={index} className="bg-yellow-500/20 text-yellow-300 text-xs">
                              {reward}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {challenge.status === 'active' ? (
                          <Button
                            onClick={() => onJoinChallenge?.(challenge.id)}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                          >
                            Join Challenge
                          </Button>
                        ) : challenge.status === 'upcoming' ? (
                          <Button
                            variant="outline"
                            className="w-full border-white/30 text-white hover:bg-white/10"
                            disabled
                          >
                            Starts {challenge.startDate.toLocaleDateString()}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full border-white/30 text-white/50"
                            disabled
                          >
                            Challenge Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
