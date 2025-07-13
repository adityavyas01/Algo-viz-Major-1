
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollaborativeSessionComponent } from '@/components/CollaborativeSession';
import { SharedWorkspaceComponent } from '@/components/SharedWorkspace';
import { VoiceVideoChat } from '@/components/VoiceVideoChat';
import { InstructorDashboardComponent } from '@/components/InstructorDashboard';
import { PeerReviewSystem } from '@/components/PeerReviewSystem';
import { GroupProjectManagement } from '@/components/GroupProjectManagement';
import { 
  Users, 
  Code, 
  Video, 
  GraduationCap, 
  FileText, 
  FolderOpen 
} from 'lucide-react';
import {
  mockCollaborativeSessions,
  mockSharedWorkspace,
  mockVoiceChatRoom,
  mockVideoChatRoom,
  mockInstructorDashboard,
  mockPeerReviews,
  mockGroupProjects
} from '@/data/collaborationData';

export const CollaborativeLearning: React.FC = () => {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const handleJoinSession = (sessionId: string) => {
    console.log('Joining session:', sessionId);
    setActiveSessionId(sessionId);
  };

  const handleCreateSession = () => {
    console.log('Creating new session');
  };

  const handleLeaveSession = (sessionId: string) => {
    console.log('Leaving session:', sessionId);
    setActiveSessionId(null);
  };

  const handleRunCode = () => {
    console.log('Running shared code');
  };

  const handleToggleMic = (muted: boolean) => {
    console.log('Toggle mic:', muted);
  };

  const handleToggleVideo = (enabled: boolean) => {
    console.log('Toggle video:', enabled);
  };

  const handleCreateAssignment = () => {
    console.log('Creating new assignment');
  };

  const handleStartPeerReview = (submissionId: string) => {
    console.log('Starting peer review for:', submissionId);
  };

  const handleCreateProject = () => {
    console.log('Creating new group project');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Collaborative Learning</h2>
        <p className="text-white/70">Work together, learn faster with real-time collaboration tools</p>
      </div>

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Sessions</span>
          </TabsTrigger>
          <TabsTrigger value="workspace" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Workspace</span>
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="instructor" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Instructor</span>
          </TabsTrigger>
          <TabsTrigger value="peer-review" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <CollaborativeSessionComponent
            sessions={mockCollaborativeSessions}
            onJoinSession={handleJoinSession}
            onCreateSession={handleCreateSession}
            onLeaveSession={handleLeaveSession}
          />
        </TabsContent>

        <TabsContent value="workspace">
          <SharedWorkspaceComponent
            workspace={mockSharedWorkspace}
            onRunCode={handleRunCode}
            onPauseExecution={() => console.log('Pause execution')}
            onStopExecution={() => console.log('Stop execution')}
            onSaveWorkspace={() => console.log('Save workspace')}
            onAddAnnotation={(x, y, content, type) => console.log('Add annotation:', { x, y, content, type })}
            onResolveAnnotation={(id) => console.log('Resolve annotation:', id)}
          />
        </TabsContent>

        <TabsContent value="communication">
          <VoiceVideoChat
            voiceRoom={mockVoiceChatRoom}
            videoRoom={mockVideoChatRoom}
            onToggleMic={handleToggleMic}
            onToggleVideo={handleToggleVideo}
            onStartScreenShare={() => console.log('Start screen share')}
            onStopScreenShare={() => console.log('Stop screen share')}
            onJoinVoice={() => console.log('Join voice chat')}
            onLeaveVoice={() => console.log('Leave voice chat')}
            onJoinVideo={() => console.log('Join video chat')}
            onLeaveVideo={() => console.log('Leave video chat')}
            onKickParticipant={(userId) => console.log('Kick participant:', userId)}
          />
        </TabsContent>

        <TabsContent value="instructor">
          <InstructorDashboardComponent
            dashboard={mockInstructorDashboard}
            onCreateAssignment={handleCreateAssignment}
            onEditAssignment={(id) => console.log('Edit assignment:', id)}
            onViewSubmissions={(id) => console.log('View submissions:', id)}
            onManageClassroom={(id) => console.log('Manage classroom:', id)}
            onStartSession={(algorithmId) => console.log('Start session for:', algorithmId)}
          />
        </TabsContent>

        <TabsContent value="peer-review">
          <PeerReviewSystem
            reviews={mockPeerReviews}
            onStartReview={handleStartPeerReview}
            onSubmitReview={(reviewId, feedback) => console.log('Submit review:', reviewId, feedback)}
            onRequestReview={(submissionId) => console.log('Request review for:', submissionId)}
          />
        </TabsContent>

        <TabsContent value="projects">
          <GroupProjectManagement
            projects={mockGroupProjects}
            onCreateProject={handleCreateProject}
            onJoinProject={(projectId) => console.log('Join project:', projectId)}
            onLeaveProject={(projectId) => console.log('Leave project:', projectId)}
            onSubmitProject={(projectId, submission) => console.log('Submit project:', projectId, submission)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
