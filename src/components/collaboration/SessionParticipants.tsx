
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollaborativeSession, SessionParticipant } from '@/types/collaboration';
import { 
  Users, 
  Mic, 
  Video, 
  MessageSquare, 
  Share2,
  Crown,
  GraduationCap
} from 'lucide-react';

interface SessionParticipantsProps {
  session: CollaborativeSession;
  isExpanded: boolean;
  onToggleExpanded: (sessionId: string) => void;
}

export const SessionParticipants: React.FC<SessionParticipantsProps> = ({
  session,
  isExpanded,
  onToggleExpanded
}) => {
  const getRoleIcon = (role: SessionParticipant['role']) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'instructor':
        return <GraduationCap className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/80">Participants</span>
          </div>
          <div className="flex -space-x-2">
            {session.participants.slice(0, 5).map((participant) => (
              <div key={participant.id} className="relative">
                <Avatar className="w-8 h-8 border-2 border-gray-800">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs">
                    {participant.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {participant.isOnline && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full" />
                )}
                <div className="absolute -bottom-1 -right-1">
                  {getRoleIcon(participant.role)}
                </div>
              </div>
            ))}
            {session.participants.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                <span className="text-xs text-white">
                  +{session.participants.length - 5}
                </span>
              </div>
            )}
          </div>
        </div>

        {session.isActive && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Mic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="bg-black/20 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-white">Participants</h4>
          <div className="space-y-2">
            {session.participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs">
                      {participant.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm">{participant.username}</span>
                  {getRoleIcon(participant.role)}
                  {participant.isOnline ? (
                    <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-gray-400 text-gray-300 text-xs">
                      Offline
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  {participant.permissions.canEdit && (
                    <Badge variant="secondary" className="text-xs">Edit</Badge>
                  )}
                  {participant.permissions.canControl && (
                    <Badge variant="secondary" className="text-xs">Control</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
