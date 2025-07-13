
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StudyGroup } from '@/types/social';
import { Users, Lock, Calendar, Plus, MessageCircle } from 'lucide-react';

interface StudyGroupsProps {
  groups: StudyGroup[];
  onJoinGroup?: (groupId: string) => void;
  onCreateGroup?: () => void;
  onViewGroup?: (groupId: string) => void;
}

export const StudyGroups: React.FC<StudyGroupsProps> = ({
  groups,
  onJoinGroup,
  onCreateGroup,
  onViewGroup
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Study Groups</h2>
        <Button
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          onClick={onCreateGroup}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{group.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-white">{group.name}</CardTitle>
                    {group.isPrivate && <Lock className="w-4 h-4 text-white/60" />}
                  </div>
                  <p className="text-white/70 text-sm mt-1">{group.description}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{group.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Active {group.lastActivity.toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.focusAreas.map((area, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Members</h4>
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 5).map((member, index) => (
                      <div 
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-sm"
                        title={member.displayName}
                      >
                        {member.avatar}
                      </div>
                    ))}
                    {group.memberCount > 5 && (
                      <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs text-white">
                        +{group.memberCount - 5}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                    onClick={() => onJoinGroup?.(group.id)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Join Group
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={() => onViewGroup?.(group.id)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
