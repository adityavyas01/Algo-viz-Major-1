
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';
import { CollaborativeSession } from '@/types/collaboration';
import { Play, Square } from 'lucide-react';

interface SessionHeaderProps {
  session: CollaborativeSession;
  onJoinSession?: (sessionId: string) => void;
  onLeaveSession?: (sessionId: string) => void;
}

export const SessionHeader: React.FC<SessionHeaderProps> = ({
  session,
  onJoinSession,
  onLeaveSession
}) => {
  const getSessionStatusColor = (session: CollaborativeSession) => {
    if (session.isActive) return 'bg-green-500';
    if (session.endedAt) return 'bg-gray-500';
    return 'bg-yellow-500';
  };

  const getSessionStatusText = (session: CollaborativeSession) => {
    if (session.isActive) return 'Active';
    if (session.endedAt) return 'Ended';
    return 'Scheduled';
  };

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-white">{session.name}</CardTitle>
          <Badge 
            variant="outline" 
            className={`${getSessionStatusColor(session)} text-white border-0`}
          >
            {getSessionStatusText(session)}
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            {session.sessionType.replace('_', ' ')}
          </Badge>
        </div>
        <p className="text-white/70">{session.description}</p>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span>by {session.ownerName}</span>
          <span>•</span>
          <span>{session.participants.length}/{session.maxParticipants} participants</span>
          {session.isPublic && (
            <>
              <span>•</span>
              <span>Public</span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        {session.isActive ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onLeaveSession?.(session.id)}
          >
            <Square className="w-4 h-4 mr-2" />
            Leave
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onJoinSession?.(session.id)}
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Play className="w-4 h-4 mr-2" />
            Join
          </Button>
        )}
      </div>
    </div>
  );
};
