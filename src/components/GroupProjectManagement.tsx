
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GroupProject } from '@/types/collaboration';
import { 
  Users, 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Eye, 
  CheckCircle,
  AlertCircle,
  Crown,
  Code,
  Star
} from 'lucide-react';

interface GroupProjectCardProps {
  project: GroupProject;
  onJoinProject: (projectId: string) => void;
  onLeaveProject: (projectId: string) => void;
  onSubmitProject: (projectId: string, submission: any) => void;
}

const GroupProjectCard: React.FC<GroupProjectCardProps> = ({ project, onJoinProject, onLeaveProject, onSubmitProject }) => {
  const [submission, setSubmission] = useState('');
  const isPastDeadline = new Date() > project.deadline;
  const daysLeft = Math.max(0, Math.ceil((project.deadline.getTime() - new Date().getTime()) / (1000 * 3600 * 24)));

  const handleSubmit = () => {
    onSubmitProject(project.id, submission);
    setSubmission('');
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {project.status === 'completed' ? <CheckCircle className="text-green-500 w-5 h-5 mr-1" /> : null}
          {project.title}
        </CardTitle>
        <p className="text-white/70 text-sm">{project.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-white/70">
            <Calendar className="w-4 h-4" />
            <span>Deadline: {project.deadline.toLocaleDateString()}</span>
          </div>
          {isPastDeadline ? (
            <Badge variant="destructive">Overdue</Badge>
          ) : (
            <div className="flex items-center gap-1 text-white/70">
              <Clock className="w-4 h-4" />
              <span>{daysLeft} days left</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-white/70" />
          <div className="text-white/70 text-sm">
            {project.groups.length} / {project.maxGroupSize} participants
          </div>
        </div>

        {project.status === 'active' ? (
          <>
            <textarea
              placeholder="Enter your submission..."
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              className="w-full bg-black/20 text-white rounded-md p-3 mb-4"
            />
            <Button onClick={handleSubmit} className="w-full">Submit Project</Button>
            <Button variant="outline" onClick={() => onLeaveProject(project.id)} className="w-full border-white/30 text-white hover:bg-white/10">
              Leave Project
            </Button>
          </>
        ) : (
          <div className="text-white/70">
            <CheckCircle className="text-green-500 inline-block mr-2" />
            Project Completed
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface GroupProjectManagementProps {
  projects: GroupProject[];
  onCreateProject: () => void;
  onJoinProject: (projectId: string) => void;
  onLeaveProject: (projectId: string) => void;
  onSubmitProject: (projectId: string, submission: any) => void;
}

export const GroupProjectManagement: React.FC<GroupProjectManagementProps> = ({ 
  projects, 
  onCreateProject,
  onJoinProject,
  onLeaveProject,
  onSubmitProject
}) => {
  const [activeTab, setActiveTab] = useState('available');

  const availableProjects = projects.filter(project => project.status === 'active');
  const completedProjects = projects.filter(project => project.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Group Projects</h2>
        <Button onClick={onCreateProject}>
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Available Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="space-y-4">
          {availableProjects.map(project => (
            <GroupProjectCard 
              key={project.id} 
              project={project} 
              onJoinProject={onJoinProject}
              onLeaveProject={onLeaveProject}
              onSubmitProject={onSubmitProject}
            />
          ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {completedProjects.map(project => (
            <GroupProjectCard 
              key={project.id} 
              project={project}
              onJoinProject={onJoinProject}
              onLeaveProject={onLeaveProject}
              onSubmitProject={onSubmitProject}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
