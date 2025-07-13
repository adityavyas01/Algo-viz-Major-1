
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CollaborativeSession } from '@/types/collaboration/sessions';
import { Users } from 'lucide-react';

interface ActiveSessionsTabProps {
  activeSessions: CollaborativeSession[];
}

export const ActiveSessionsTab: React.FC<ActiveSessionsTabProps> = ({
  activeSessions
}) => {
  return (
    <div className="grid gap-4">
      {activeSessions.map((session) => (
        <Card key={session.id} className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              {session.name}
              <Badge variant="outline" className="bg-green-500 text-white border-0">
                Live
              </Badge>
            </CardTitle>
            <p className="text-white/70">{session.description}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-white/60 text-sm">
                {session.participants.length} participants • Started {session.startedAt?.toLocaleTimeString()}
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Join Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
