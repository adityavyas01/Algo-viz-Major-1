
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Play, CheckCircle, Clock, Award, Terminal } from 'lucide-react';
import { practiceProblems, type PracticeProblem } from '@/data/algorithmDatabase';
import { CodeEditor } from '@/components/CodeEditor';
import { useToast } from '@/hooks/use-toast';

interface PracticeProblemsProps {
  algorithmId: string;
}

export const PracticeProblems: React.FC<PracticeProblemsProps> = ({ algorithmId }) => {
  const { toast } = useToast();
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [userCode, setUserCode] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const problems = practiceProblems.filter(p => p.algorithmId === algorithmId);

  const handleProblemSolved = (problemId: string) => {
    setSolvedProblems(prev => new Set([...prev, problemId]));
    toast({
      title: "Problem Solved! 🎉",
      description: "Great job! You've completed this practice problem.",
    });
  };

  const handleCodeRun = (code: string, language: string) => {
    setUserCode(code);
    toast({
      title: "Code Executed",
      description: `Your ${language} solution has been tested!`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (problems.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <Code className="w-12 h-12 text-white/50 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">No Practice Problems Available</h3>
          <p className="text-white/70">Practice problems for this algorithm are coming soon!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Practice Problems</h2>
        <div className="flex items-center gap-4 text-white/70">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{solvedProblems.size} Solved</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>{problems.length} Total</span>
          </div>
        </div>
      </div>

      {!selectedProblem ? (
        <div className="grid gap-4">
          {problems.map((problem) => (
            <Card
              key={problem.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() => setSelectedProblem(problem)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-lg">{problem.title}</h3>
                  <div className="flex items-center gap-2">
                    {solvedProblems.has(problem.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    <Badge className={`${getDifficultyColor(problem.difficulty)} text-white`}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                </div>
                <p className="text-white/80 mb-4">{problem.description}</p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Estimated: 15-30 minutes</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">{selectedProblem.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setSelectedProblem(null)}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Back to Problems
                </Button>
                <Badge className={`${getDifficultyColor(selectedProblem.difficulty)} text-white`}>
                  {selectedProblem.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="problem" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="editor">Code Editor</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="problem" className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Description</h4>
                  <p className="text-white/80">{selectedProblem.description}</p>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowEditor(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    <Terminal className="w-4 h-4 mr-2" />
                    Open Code Editor
                  </Button>
                  <Button
                    onClick={() => handleProblemSolved(selectedProblem.id)}
                    disabled={solvedProblems.has(selectedProblem.id)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    {solvedProblems.has(selectedProblem.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Solved!
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Mark as Solved
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="editor" className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-4">Code Your Solution</h4>
                  <CodeEditor
                    algorithmName={selectedProblem.title}
                    onCodeRun={handleCodeRun}
                    complexity={{
                      time: selectedProblem.solution.timeComplexity,
                      space: selectedProblem.solution.spaceComplexity
                    }}
                  />
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="text-blue-400 font-semibold mb-2">💡 Hint</h5>
                    <p className="text-white/80 text-sm">{selectedProblem.solution.approach}</p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={() => handleProblemSolved(selectedProblem.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-4">
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-white font-semibold">Example {index + 1}</h4>
                    <div className="bg-black/30 p-4 rounded-lg space-y-2">
                      <div>
                        <span className="text-cyan-400">Input:</span>
                        <span className="text-white ml-2">{example.input}</span>
                      </div>
                      <div>
                        <span className="text-green-400">Output:</span>
                        <span className="text-white ml-2">{example.output}</span>
                      </div>
                      <div>
                        <span className="text-yellow-400">Explanation:</span>
                        <span className="text-white/80 ml-2">{example.explanation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="solution" className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Approach</h4>
                  <p className="text-white/80 mb-4">{selectedProblem.solution.approach}</p>
                  
                  <h4 className="text-white font-semibold mb-2">Solution Code</h4>
                  <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400 text-sm">
                      {selectedProblem.solution.code}
                    </code>
                  </pre>
                  
                  <div className="flex gap-4 mt-4">
                    <div>
                      <span className="text-white/70">Time Complexity:</span>
                      <span className="text-cyan-400 ml-2">{selectedProblem.solution.timeComplexity}</span>
                    </div>
                    <div>
                      <span className="text-white/70">Space Complexity:</span>
                      <span className="text-cyan-400 ml-2">{selectedProblem.solution.spaceComplexity}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
