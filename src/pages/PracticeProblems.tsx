import React from "react";
import { Header } from "@/components/Header";
import { LeetCodeQuestions } from "@/components/LeetCodeQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Brain, Target, Clock } from "lucide-react";

const PracticeProblems: React.FC = () => {
  const practiceTopics = [
    { id: 'arrays', name: 'Arrays & Hashing', count: 45, difficulty: 'Beginner' },
    { id: 'two-pointers', name: 'Two Pointers', count: 19, difficulty: 'Intermediate' },
    { id: 'sliding-window', name: 'Sliding Window', count: 12, difficulty: 'Intermediate' },
    { id: 'stack', name: 'Stack', count: 22, difficulty: 'Beginner' },
    { id: 'binary-search', name: 'Binary Search', count: 17, difficulty: 'Intermediate' },
    { id: 'linked-list', name: 'Linked List', count: 31, difficulty: 'Beginner' },
    { id: 'trees', name: 'Trees', count: 25, difficulty: 'Intermediate' },
    { id: 'tries', name: 'Tries', count: 8, difficulty: 'Advanced' },
    { id: 'heap', name: 'Heap / Priority Queue', count: 16, difficulty: 'Advanced' },
    { id: 'backtracking', name: 'Backtracking', count: 14, difficulty: 'Advanced' },
    { id: 'graphs', name: 'Graphs', count: 21, difficulty: 'Advanced' },
    { id: 'dynamic-programming', name: 'Dynamic Programming', count: 35, difficulty: 'Advanced' }
  ];

  const [selectedTopic, setSelectedTopic] = React.useState(practiceTopics[0]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Practice Problems
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Topics Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {practiceTopics.map((topic) => (
                  <Button
                    key={topic.id}
                    variant={selectedTopic.id === topic.id ? "default" : "ghost"}
                    className={`w-full justify-between text-left ${
                      selectedTopic.id === topic.id 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{topic.name}</span>
                      <span className="text-xs opacity-70">{topic.count} problems</span>
                    </div>
                    <Badge 
                      className={`${getDifficultyColor(topic.difficulty)} text-white text-xs`}
                    >
                      {topic.difficulty}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Problems Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  {selectedTopic.name}
                  <Badge className={`${getDifficultyColor(selectedTopic.difficulty)} text-white ml-2`}>
                    {selectedTopic.difficulty}
                  </Badge>
                </CardTitle>
                <p className="text-gray-300">
                  Practice {selectedTopic.count} problems in {selectedTopic.name}. 
                  Start with the basics and work your way up to more challenging problems.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-500/20 p-4 rounded-lg text-center">
                    <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{selectedTopic.count}</div>
                    <div className="text-sm text-gray-300">Problems</div>
                  </div>
                  <div className="bg-green-500/20 p-4 rounded-lg text-center">
                    <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">0</div>
                    <div className="text-sm text-gray-300">Completed</div>
                  </div>
                  <div className="bg-purple-500/20 p-4 rounded-lg text-center">
                    <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">~2h</div>
                    <div className="text-sm text-gray-300">Est. Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <LeetCodeQuestions 
              topicId={selectedTopic.id}
              topicName={selectedTopic.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeProblems;
