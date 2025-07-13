
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { InstructorDashboard } from '@/types/collaboration';
import { 
  Plus,
  Users
} from 'lucide-react';
import {
  AnalyticsOverview,
  ClassroomsTab,
  AssignmentsTab,
  ActiveSessionsTab,
  AnalyticsTab
} from '@/components/instructor';

interface InstructorDashboardComponentProps {
  dashboard: InstructorDashboard;
  onCreateAssignment?: () => void;
  onEditAssignment?: (assignmentId: string) => void;
  onViewSubmissions?: (assignmentId: string) => void;
  onManageClassroom?: (classroomId: string) => void;
  onStartSession?: (algorithmId: string) => void;
}

export const InstructorDashboardComponent: React.FC<InstructorDashboardComponentProps> = ({
  dashboard,
  onCreateAssignment,
  onEditAssignment,
  onViewSubmissions,
  onManageClassroom,
  onStartSession
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Instructor Dashboard</h2>
        <div className="flex gap-2">
          <Button 
            onClick={onCreateAssignment}
            className="bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Assignment
          </Button>
          <Button 
            onClick={() => onStartSession?.('binary-search')}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Users className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>

      <AnalyticsOverview analytics={dashboard.analytics} />

      <Tabs defaultValue="classrooms" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="classrooms" className="space-y-4">
          <ClassroomsTab 
            classrooms={dashboard.classrooms}
            onManageClassroom={onManageClassroom}
          />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <AssignmentsTab
            assignments={dashboard.assignments}
            onEditAssignment={onEditAssignment}
            onViewSubmissions={onViewSubmissions}
          />
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <ActiveSessionsTab activeSessions={dashboard.activeSessions} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsTab analytics={dashboard.analytics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
