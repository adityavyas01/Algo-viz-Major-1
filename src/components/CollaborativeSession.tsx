
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CollaborativeSession } from '@/types/collaboration';
import { SessionCard, EmptySessionState } from '@/components/collaboration';

interface CollaborativeSessionComponentProps {
  sessions: CollaborativeSession[];
  onJoinSession?: (sessionId: string) => void;
  onCreateSession?: () => void;
  onLeaveSession?: (sessionId: string) => void;
}

export const CollaborativeSessionComponent: React.FC<CollaborativeSessionComponentProps> = ({
  sessions,
  onJoinSession,
  onCreateSession,
  onLeaveSession
}) => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const handleToggleExpanded = (sessionId: string) => {
    setSelectedSession(selectedSession === sessionId ? null : sessionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Collaborative Sessions</h2>
        <Button 
          onClick={onCreateSession}
          className="bg-gradient-to-r from-cyan-500 to-blue-600"
        >
          Create Session
        </Button>
      </div>

      <div className="grid gap-4">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            isExpanded={selectedSession === session.id}
            onJoinSession={onJoinSession}
            onLeaveSession={onLeaveSession}
            onToggleExpanded={handleToggleExpanded}
          />
        ))}
      </div>

      {sessions.length === 0 && (
        <EmptySessionState onCreateSession={onCreateSession} />
      )}
    </div>
  );
};
