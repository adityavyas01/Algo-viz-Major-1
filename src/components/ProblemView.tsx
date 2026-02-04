/**
 * ProblemView Component
 * Complete problem solving interface with code editor and submission
 */

import { useState, useEffect } from "react";
import { Play, Send, Clock, Zap, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ExecutionResult } from "@/components/ExecutionResult";
import { SubmissionHistory } from "@/components/SubmissionHistory";
import { useCodeExecution } from "@/hooks/useCodeExecution";
import { useSubmission } from "@/hooks/useSubmission";
import { getProblemById, getTestcasesForProblem } from "@/services/testcaseService";
import type { Problem, Testcase } from "@/services/testcaseService";
import type { LanguageId } from "@/types/execution";

interface ProblemViewProps {
  problemId: string;
}

export function ProblemView({ problemId }: ProblemViewProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [code, setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("python");
  const [activeTab, setActiveTab] = useState<"testcases" | "history" | "description">("description");

  const { toast } = useToast();
  const { batchResult: quickResults, isExecuting: isQuickTesting, executeTestcases, clearResults: clearQuickResults } = useCodeExecution();
  const { submission, results: submissionResults, isSubmitting, submitCode, clearResults: clearSubmissionResults } = useSubmission();

  // Load problem and testcases
  useEffect(() => {
    const loadProblem = async () => {
      try {
        const problemData = await getProblemById(problemId);
        if (problemData) {
          setProblem(problemData);
        }

        const testcaseData = await getTestcasesForProblem(problemId, false); // Only visible testcases
        setTestcases(testcaseData);
      } catch (error) {
        console.error("Error loading problem:", error);
        toast({
          title: "Error",
          description: "Failed to load problem details",
          variant: "destructive",
        });
      }
    };

    loadProblem();
  }, [problemId]);

  // Load language template
  useEffect(() => {
    const template = getLanguageTemplate(selectedLanguage);
    setCode(template);
  }, [selectedLanguage]);

  const getLanguageTemplate = (lang: LanguageId): string => {
    const templates: Record<string, string> = {
      python: "# Write your solution here\ndef solution():\n    n = int(input())\n    # Your code here\n    print(result)\n\nsolution()",
      javascript: "// Write your solution here\nconst readline = require('readline');\nconst rl = readline.createInterface({\n  input: process.stdin\n});\n\nrl.on('line', (line) => {\n  const n = parseInt(line);\n  // Your code here\n  console.log(result);\n  rl.close();\n});",
      java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Your code here\n        System.out.println(result);\n    }\n}",
      cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Your code here\n    cout << result << endl;\n    return 0;\n}",
    };

    return templates[lang] || "// Write your solution here";
  };

  const handleQuickTest = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please write some code before testing",
        variant: "destructive",
      });
      return;
    }

    if (testcases.length === 0) {
      toast({
        title: "No testcases",
        description: "No testcases available for this problem",
        variant: "destructive",
      });
      return;
    }

    clearQuickResults();
    clearSubmissionResults();

    const requests = testcases.map((tc) => ({
      code,
      language: selectedLanguage,
      input: tc.input,
      expectedOutput: tc.expected_output,
    }));

    await executeTestcases(requests);
    setActiveTab("testcases");
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please write some code before submitting",
        variant: "destructive",
      });
      return;
    }

    clearQuickResults();
    clearSubmissionResults();

    try {
      await submitCode(problemId, code, selectedLanguage);
      
      toast({
        title: "Submitted!",
        description: submission?.status === "accepted" 
          ? "🎉 All testcases passed!" 
          : "Check results for details",
        variant: submission?.status === "accepted" ? "default" : "destructive",
      });

      setActiveTab("testcases");
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!problem) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Problem Description */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{problem.title}</CardTitle>
                <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty.toUpperCase()}
                </Badge>
              </div>
              <CardDescription>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {problem.points} points
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {problem.time_limit}ms
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {problem.category}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="examples">Examples ({testcases.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{problem.description}</p>
                  </div>
                  
                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-muted-foreground">Acceptance Rate</p>
                      <p className="text-2xl font-bold">{problem.acceptance_rate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">Submissions</p>
                      <p className="text-2xl font-bold">{problem.total_submissions}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="space-y-4">
                  {testcases.map((tc, index) => (
                    <div key={tc.id} className="p-4 rounded-lg border bg-muted/50">
                      <p className="font-semibold mb-2">Example {index + 1}</p>
                      <div className="space-y-2 text-sm font-mono">
                        <div>
                          <p className="text-muted-foreground">Input:</p>
                          <p className="bg-background p-2 rounded">{tc.input}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Output:</p>
                          <p className="bg-background p-2 rounded">{tc.expected_output}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Editor</CardTitle>
                <LanguageSelector
                  value={selectedLanguage}
                  onChange={(lang) => setSelectedLanguage(lang)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[400px] p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your code here..."
              />

              <div className="flex gap-2">
                <Button
                  onClick={handleQuickTest}
                  disabled={isQuickTesting || isSubmitting}
                  variant="outline"
                  className="flex-1"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isQuickTesting ? "Testing..." : "Test Run"}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isQuickTesting || isSubmitting}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="testcases">
                <Zap className="h-4 w-4 mr-2" />
                Results
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="testcases">
              {submissionResults && submission && (
                <ExecutionResult results={submissionResults} />
              )}
              {quickResults && !submissionResults && (
                <ExecutionResult results={quickResults} />
              )}
              {!quickResults && !submissionResults && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Run your code to see results here
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history">
              <SubmissionHistory problemId={problemId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProblemView;
