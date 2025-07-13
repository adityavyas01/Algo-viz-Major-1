
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkspaceCursor } from '@/types/collaboration/workspace';
import { Users } from 'lucide-react';

interface ParticipantsListProps {
  cursors: WorkspaceCursor[];
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  cursors
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Active Participants
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {cursors.map((cursor) => (
            <div 
              key={cursor.userId}
              className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cursor.color }}
              />
              <span className="text-white text-sm">{cursor.username}</span>
              {cursor.isActive && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
