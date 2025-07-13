
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface EmptySessionStateProps {
  onCreateSession?: () => void;
}

export const EmptySessionState: React.FC<EmptySessionStateProps> = ({
  onCreateSession
}) => {
  return (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-white/50 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">No Active Sessions</h3>
      <p className="text-white/70 mb-4">Create or join a collaborative session to get started</p>
      <Button 
        onClick={onCreateSession}
        className="bg-gradient-to-r from-cyan-500 to-blue-600"
      >
        Create Your First Session
      </Button>
    </div>
  );
};
