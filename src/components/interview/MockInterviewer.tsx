
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, Square, Mic, MicOff, Clock, User } from 'lucide-react';
import { MockInterview, InterviewQuestion } from '@/types/interview';

export const MockInterviewer: React.FC = () => {
  const [interviewType, setInterviewType] = useState<string>('technical');
  const [difficulty, setDifficulty] = useState<string>('Mid');
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [response, setResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const sampleInterview: MockInterview = {
    id: '1',
    type: 'technical',
    difficulty: 'Mid',
    duration: 45,
    questions: [
      {
        id: '1',
        title: 'Implement a Binary Search Tree',
        description: 'Design and implement a binary search tree with insert, delete, and search operations.',
        difficulty: 'Medium',
        category: 'Tree',
        companies: ['Google', 'Amazon'],
        frequency: 75,
        timeLimit: 25,
        hints: ['Think about the BST property', 'Consider edge cases for deletion'],
        solution: {
          approach: 'Implement recursive methods for each operation maintaining BST invariant',
          code: 'class BST { /* implementation */ }',
          timeComplexity: 'O(log n) average',
          spaceComplexity: 'O(log n)'
        },
        tags: ['trees', 'data-structures']
      }
    ],
    startTime: new Date(),
    responses: []
  };

  const [interview, setInterview] = useState<MockInterview>(sampleInterview);

  const startInterview = () => {
    setIsInterviewActive(true);
    setTimeElapsed(0);
    setCurrentQuestionIndex(0);
    // Start timer logic would go here
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setIsRecording(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setResponse('');
    } else {
      endInterview();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = interview.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / interview.questions.length) * 100;

  if (!isInterviewActive) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Mock Interview Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Interview Type</label>
                <Select value={interviewType} onValueChange={setInterviewType}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="system-design">System Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white/80 text-sm mb-2 block">Difficulty Level</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry">Entry Level</SelectItem>
                    <SelectItem value="Mid">Mid Level</SelectItem>
                    <SelectItem value="Senior">Senior Level</SelectItem>
                    <SelectItem value="Staff">Staff Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-500/20 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Interview Details</h3>
              <div className="space-y-1 text-white/80 text-sm">
                <p>• Duration: 45 minutes</p>
                <p>• Questions: 2-3 coding problems</p>
                <p>• Format: Live coding with AI interviewer</p>
                <p>• Feedback: Real-time hints and post-interview analysis</p>
              </div>
            </div>

            <Button 
              onClick={startInterview}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Mock Interview
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-2">127</div>
              <div className="text-white/70 text-sm">Questions Practiced</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-2">23</div>
              <div className="text-white/70 text-sm">Mock Interviews</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-2">85%</div>
              <div className="text-white/70 text-sm">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              AI Interviewer
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <Button
                onClick={endInterview}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                <Square className="w-4 h-4 mr-2" />
                End Interview
              </Button>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-500/20 p-4 rounded-lg">
            <p className="text-white/90">
              "Hello! I'm your AI interviewer. Let's start with our first question. Take your time to understand the problem and feel free to ask clarifying questions."
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              Question {currentQuestionIndex + 1}: {currentQuestion?.title}
            </CardTitle>
            <Badge className="bg-yellow-500 text-white">
              {currentQuestion?.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2">Problem Statement</h3>
            <p className="text-white/80">{currentQuestion?.description}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Your Solution</h3>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Start typing your solution here... You can write pseudocode, actual code, or explain your approach."
              className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsRecording(!isRecording)}
                variant="outline"
                size="sm"
                className={`${isRecording ? 'border-red-500 text-red-500' : 'border-white/30 text-white'} hover:bg-white/10`}
              >
                {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isRecording ? 'Stop Recording' : 'Voice Input'}
              </Button>
              <span className="text-white/60 text-sm">
                Time remaining: {currentQuestion ? currentQuestion.timeLimit - Math.floor(timeElapsed / 60) : 0} min
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
              >
                💡 Request Hint
              </Button>
              <Button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Submit & Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-sm">Live Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-500/20 p-3 rounded-lg">
            <p className="text-green-400 text-sm">
              ✓ Good job identifying this as a tree problem! Consider the time complexity of your approach.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
