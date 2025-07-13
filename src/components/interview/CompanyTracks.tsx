
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Star, Clock, TrendingUp, Users } from 'lucide-react';
import { CompanyTrack } from '@/types/interview';

const companyTracks: CompanyTrack[] = [
  {
    id: '1',
    company: 'Google',
    logo: '🏢',
    difficulty: 'Hard',
    totalQuestions: 150,
    completedQuestions: 47,
    categories: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'System Design'],
    estimatedTime: '6-8 weeks',
    recentQuestions: []
  },
  {
    id: '2',
    company: 'Amazon',
    logo: '📦',
    difficulty: 'Medium-Hard',
    totalQuestions: 120,
    completedQuestions: 23,
    categories: ['Arrays', 'Strings', 'Trees', 'Leadership Principles'],
    estimatedTime: '4-6 weeks',
    recentQuestions: []
  },
  {
    id: '3',
    company: 'Facebook (Meta)',
    logo: '👤',
    difficulty: 'Hard',
    totalQuestions: 135,
    completedQuestions: 12,
    categories: ['Arrays', 'Trees', 'Graphs', 'System Design', 'Behavioral'],
    estimatedTime: '5-7 weeks',
    recentQuestions: []
  },
  {
    id: '4',
    company: 'Microsoft',
    logo: '🪟',
    difficulty: 'Medium',
    totalQuestions: 100,
    completedQuestions: 67,
    categories: ['Arrays', 'Strings', 'Trees', 'Object-Oriented Design'],
    estimatedTime: '3-5 weeks',
    recentQuestions: []
  },
  {
    id: '5',
    company: 'Apple',
    logo: '🍎',
    difficulty: 'Medium-Hard',
    totalQuestions: 85,
    completedQuestions: 8,
    categories: ['Arrays', 'Trees', 'System Design', 'Hardware Knowledge'],
    estimatedTime: '4-6 weeks',
    recentQuestions: []
  },
  {
    id: '6',
    company: 'Netflix',
    logo: '🎬',
    difficulty: 'Hard',
    totalQuestions: 75,
    completedQuestions: 0,
    categories: ['System Design', 'Algorithms', 'Scalability', 'Cultural Fit'],
    estimatedTime: '5-7 weeks',
    recentQuestions: []
  }
];

export const CompanyTracks: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<CompanyTrack | null>(null);

  const getProgressPercentage = (track: CompanyTrack) => {
    return (track.completedQuestions / track.totalQuestions) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes('Hard')) return 'text-red-400 border-red-400';
    if (difficulty.includes('Medium')) return 'text-yellow-400 border-yellow-400';
    return 'text-green-400 border-green-400';
  };

  if (selectedTrack) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => setSelectedTrack(null)}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            ← Back to Companies
          </Button>
          <Badge variant="outline" className={getDifficultyColor(selectedTrack.difficulty)}>
            {selectedTrack.difficulty}
          </Badge>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <span className="text-3xl">{selectedTrack.logo}</span>
              <div>
                <div className="text-2xl">{selectedTrack.company} Interview Track</div>
                <div className="text-sm text-white/70 font-normal">
                  {selectedTrack.completedQuestions} of {selectedTrack.totalQuestions} completed
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {getProgressPercentage(selectedTrack).toFixed(0)}%
                  </div>
                  <div className="text-white/70 text-sm">Progress</div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{selectedTrack.estimatedTime}</div>
                  <div className="text-white/70 text-sm">Estimated Time</div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{selectedTrack.categories.length}</div>
                  <div className="text-white/70 text-sm">Categories</div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Progress Overview</h3>
              <Progress value={getProgressPercentage(selectedTrack)} className="h-3" />
              <div className="flex justify-between text-sm text-white/70 mt-2">
                <span>{selectedTrack.completedQuestions} completed</span>
                <span>{selectedTrack.totalQuestions - selectedTrack.completedQuestions} remaining</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTrack.categories.map((category, index) => (
                  <Badge key={index} variant="outline" className="border-blue-400 text-blue-400">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Company-Specific Tips</h3>
              <div className="bg-blue-500/20 p-4 rounded-lg space-y-2">
                <p className="text-white/90">
                  💡 <strong>{selectedTrack.company}</strong> interview insights:
                </p>
                {selectedTrack.company === 'Google' && (
                  <ul className="text-white/80 text-sm space-y-1 ml-4">
                    <li>• Focus on algorithmic thinking and optimization</li>
                    <li>• Practice system design for senior roles</li>
                    <li>• Be prepared for follow-up questions</li>
                    <li>• Emphasize scalability in your solutions</li>
                  </ul>
                )}
                {selectedTrack.company === 'Amazon' && (
                  <ul className="text-white/80 text-sm space-y-1 ml-4">
                    <li>• Study the 14 Leadership Principles</li>
                    <li>• Practice behavioral questions with STAR method</li>
                    <li>• Focus on customer obsession examples</li>
                    <li>• Prepare for bar raiser interviews</li>
                  </ul>
                )}
                {selectedTrack.company === 'Microsoft' && (
                  <ul className="text-white/80 text-sm space-y-1 ml-4">
                    <li>• Emphasize collaboration and growth mindset</li>
                    <li>• Practice object-oriented design questions</li>
                    <li>• Be ready to discuss past project impacts</li>
                    <li>• Show passion for technology and learning</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Continue Track
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                View All Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Company-Specific Preparation</h2>
        <p className="text-white/70">Tailored question sets based on real interview experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyTracks.map((track) => (
          <Card 
            key={track.id}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
            onClick={() => setSelectedTrack(track)}
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <span className="text-2xl">{track.logo}</span>
                <div className="flex-1">
                  <div className="text-lg">{track.company}</div>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(track.difficulty)}`}>
                    {track.difficulty}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Progress</span>
                  <span>{track.completedQuestions}/{track.totalQuestions}</span>
                </div>
                <Progress value={getProgressPercentage(track)} className="h-2" />
              </div>

              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{track.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{track.totalQuestions} questions</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {track.categories.slice(0, 3).map((category, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-purple-400 text-purple-400">
                    {category}
                  </Badge>
                ))}
                {track.categories.length > 3 && (
                  <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                    +{track.categories.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Don't see your target company?</h3>
          <p className="text-white/70 mb-4">
            We're constantly adding new company tracks. Request a new company track and we'll prioritize it!
          </p>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Request Company Track
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
