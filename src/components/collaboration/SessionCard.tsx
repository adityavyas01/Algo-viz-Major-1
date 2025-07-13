
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CollaborativeSession } from '@/types/collaboration';
import { SessionHeader } from './SessionHeader';
import { SessionParticipants } from './SessionParticipants';
import { SessionControls } from './SessionControls';

interface SessionCardProps {
  session: CollaborativeSession;
  isExpanded: boolean;
  onJoinSession?: (sessionId: string) => void;
  onLeaveSession?: (sessionId: string) => void;
  onToggleExpanded: (sessionId: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  isExpanded,
  onJoinSession,
  onLeaveSession,
  onToggleExpanded
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
      <CardHeader>
        <SessionHeader
          session={session}
          onJoinSession={onJoinSession}
          onLeaveSession={onLeaveSession}
        />
      </CardHeader>

      <CardContent>
        <SessionParticipants
          session={session}
          isExpanded={isExpanded}
          onToggleExpanded={onToggleExpanded}
        />

        <SessionControls
          session={session}
          isExpanded={isExpanded}
          onToggleExpanded={onToggleExpanded}
        />
      </CardContent>
    </Card>
  );
};
