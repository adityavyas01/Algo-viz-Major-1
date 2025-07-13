
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  MessageSquare, 
  Building, 
  PenTool, 
  TrendingUp, 
  FileText 
} from 'lucide-react';
import { QuestionDatabase } from '@/components/interview/QuestionDatabase';
import { MockInterviewer } from '@/components/interview/MockInterviewer';
import { CompanyTracks } from '@/components/interview/CompanyTracks';
import { WhiteboardMode } from '@/components/interview/WhiteboardMode';
import { InterviewAnalytics } from '@/components/interview/InterviewAnalytics';
import { ResumeIntegration } from '@/components/interview/ResumeIntegration';

const InterviewPrep = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Interview Preparation</h1>
          <p className="text-xl text-white/80">Ace your technical interviews with our comprehensive preparation platform</p>
        </div>

        <Tabs defaultValue="database" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Questions</span>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Mock Interview</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Companies</span>
            </TabsTrigger>
            <TabsTrigger value="whiteboard" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              <span className="hidden sm:inline">Whiteboard</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="database">
            <QuestionDatabase />
          </TabsContent>

          <TabsContent value="simulator">
            <MockInterviewer />
          </TabsContent>

          <TabsContent value="companies">
            <CompanyTracks />
          </TabsContent>

          <TabsContent value="whiteboard">
            <WhiteboardMode />
          </TabsContent>

          <TabsContent value="analytics">
            <InterviewAnalytics />
          </TabsContent>

          <TabsContent value="resume">
            <ResumeIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InterviewPrep;
