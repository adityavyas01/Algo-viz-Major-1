
import React from 'react';
import { Button } from '@/components/ui/button';
import { CollaborativeSession } from '@/types/collaboration';

interface SessionControlsProps {
  session: CollaborativeSession;
  isExpanded: boolean;
  onToggleExpanded: (sessionId: string) => void;
}

export const SessionControls: React.FC<SessionControlsProps> = ({
  session,
  isExpanded,
  onToggleExpanded
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onToggleExpanded(session.id)}
      className="text-white/70 hover:text-white hover:bg-white/10"
    >
      {isExpanded ? 'Hide Details' : 'Show Details'}
    </Button>
  );
};
