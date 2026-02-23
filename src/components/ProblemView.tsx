/**
 * ProblemView Component
 * LeetCode-style split-screen problem solving interface with resizable panels
 */

import { useState, useEffect } from "react";
import { Play, Check, ChevronLeft, ChevronRight, Settings, RotateCcw, ThumbsUp, ThumbsDown, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { useCodeExecution } from "@/hooks/useCodeExecution";
import { useSubmission } from "@/hooks/useSubmission";
import { getProblemBySlug, getTestcasesForProblem } from "@/services/testcaseService";
import { getCodeTemplate, getCodeTemplates, getHints } from "@/services/codeTemplateService";
import type { Problem, Testcase } from "@/services/testcaseService";
import type { CodeTemplate, Hint } from "@/services/codeTemplateService";
import type { LanguageId } from "@/types/execution";
import { SUPPORTED_LANGUAGES } from "@/services/piston";
import { cn } from "@/lib/utils";
import { getLeetCodeTemplate } from "@/services/codeWrapper";

interface ProblemViewProps {
  slug: string;
}

export function ProblemView({ slug }: ProblemViewProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [hints, setHints] = useState<Hint[]>([]);
  const [code, setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("python");
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"description" | "hints" | "submissions">("description");
  const [resultsTab, setResultsTab] = useState<"testcase" | "result">("testcase");
  const [selectedTestcase, setSelectedTestcase] = useState(0);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [quickTestPassed, setQuickTestPassed] = useState(false);

  const { toast } = useToast();
  const { batchResult: quickResults, isExecuting: isQuickTesting, executeTestcases, clearResults: clearQuickResults } = useCodeExecution();
  const { submission, results: submissionResults, isSubmitting, submitCode, clearResults: clearSubmissionResults } = useSubmission();

  // Load problem and testcases
  useEffect(() => {
    const loadProblem = async () => {
      try {
        const problemData = await getProblemBySlug(slug);
        if (problemData) {
          setProblem(problemData);
          
          // Load testcases
          const testcaseData = await getTestcasesForProblem(problemData.id.toString(), false);
          setTestcases(testcaseData);
          
          // Load hints
          const hintsData = await getHints(problemData.id);
          setHints(hintsData);
          
          // Load all available code templates for this problem
          const templates = await getCodeTemplates(problemData.id);
          const langs = templates.map(t => t.lang_slug);
          setAvailableLanguages(langs);
          
          // Set default language to first available or python
          const defaultLang = (langs.includes('python') ? 'python' : langs[0]) as LanguageId;
          if (!selectedLanguage || !langs.includes(selectedLanguage)) {
            setSelectedLanguage(defaultLang);
          }
          
          // Load code template for selected language
          const template = await getCodeTemplate(problemData.id, selectedLanguage);
          if (template) {
            setCode(template.code_stub);
          } else {
            // Fallback to generic template
            setCode(getLeetCodeTemplate(selectedLanguage));
          }
        }
      } catch (error) {
        console.error("Error loading problem:", error);
        toast({
          title: "Error",
          description: "Failed to load problem data",
          variant: "destructive",
        });
      }
    };

    loadProblem();
  }, [slug, selectedLanguage, toast]);

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
    setQuickTestPassed(false);

    // Get only visible testcases (is_hidden = false)
    const visibleTestcases = testcases.filter(tc => !tc.is_hidden).slice(0, 3);
    const testcasesToRun = visibleTestcases.length > 0 ? visibleTestcases : testcases.slice(0, 3);
    
    // Map testcases to the format expected by executeTestcases
    const mappedTestcases = testcasesToRun.map((tc, idx) => ({
      id: tc.id || `temp-${idx}`,
      input: tc.input,
      expectedOutput: tc.expected_output,
      timeLimit: tc.time_limit || 2000,
      memoryLimit: tc.memory_limit || 256,
      isHidden: tc.is_hidden || false
    }));
    
    const result = await executeTestcases(code, selectedLanguage, mappedTestcases);
    
    // Check if all testcases passed
    const allPassed = result?.testcases?.every(tc => tc.passed) || false;
    setQuickTestPassed(allPassed);
    
    if (allPassed) {
      toast({
        title: "All test cases passed! ✅",
        description: "You can now submit your solution",
      });
    }
    
    setResultsTab("result");
  };

  const handleSubmit = async () => {
    if (!problem) return;
    
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please write some code before submitting",
        variant: "destructive",
      });
      return;
    }

    clearSubmissionResults();

    try {
      // Submit code - this will run against ALL testcases (including hidden ones)
      const result = await submitCode(problem.id.toString(), code, selectedLanguage);
      
      const isAccepted = result?.results?.verdict === "Accepted";
      
      toast({
        title: isAccepted ? "Accepted! 🎉" : "Submission Complete",
        description: isAccepted
          ? "All testcases passed! Problem marked as solved."
          : "Check results for details",
        variant: isAccepted ? "default" : "destructive",
      });

      // Reset quick test state after submission
      setQuickTestPassed(false);
      setResultsTab("result");
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "hard":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getLanguageForMonaco = (lang: LanguageId): string => {
    const map: Record<string, string> = {
      python: "python",
      javascript: "javascript",
      typescript: "typescript",
      java: "java",
      cpp: "cpp",
      c: "c",
      csharp: "csharp",
      go: "go",
      rust: "rust",
      ruby: "ruby",
      php: "php",
    };
    return map[lang] || "javascript";
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-[#1a1a1a]">
        <div className="text-gray-500 dark:text-gray-400">Loading problem...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-[#1a1a1a] overflow-hidden">
      <Split
        className="flex w-full"
        sizes={[50, 50]}
        minSize={[400, 400]}
        gutterSize={8}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
        style={{ display: 'flex', height: '100%' }}
      >
        {/* Left Panel - Problem Description */}
        <div className="border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* Top Bar */}
          <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="h-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="h-12 w-full justify-start rounded-none border-b border-gray-200 dark:border-gray-800 bg-transparent px-4 flex-shrink-0">
            <TabsTrigger value="description" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Description
            </TabsTrigger>
            <TabsTrigger value="hints" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Hints ({hints.length})
            </TabsTrigger>
            <TabsTrigger value="submissions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="flex-1 overflow-auto p-4 mt-0">
            <div className="max-w-3xl">
              {/* Title */}
              <div className="mb-4">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {problem.id}. {problem.title}
                </h1>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={cn("border-0 font-medium", getDifficultyColor(problem.difficulty))}>
                    {problem.difficulty}
                  </Badge>
                  {problem.is_premium && (
                    <Badge variant="outline" className="border-0 bg-gradient-to-r from-amber-400 to-yellow-500 text-white flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                  {problem.asked_by_faang && (
                    <Star className="h-4 w-4 text-blue-500 fill-blue-500" />
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                <div 
                  className="text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>

              {/* Examples */}
              {testcases.slice(0, 3).map((tc, idx) => (
                <div key={tc.id} className="mb-6">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Example {idx + 1}:</p>
                  <div className="bg-gray-100 dark:bg-[#282828] rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Input:</span>
                      <span className="ml-2 text-gray-900 dark:text-gray-100">{tc.input}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Output:</span>
                      <span className="ml-2 text-gray-900 dark:text-gray-100">{tc.expected_output}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Constraints */}
              {problem.acceptance_rate && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Statistics:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Acceptance Rate: {problem.acceptance_rate}%</li>
                  </ul>
                </div>
              )}

              {/* Tags */}
              {problem.topics && problem.topics.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {problem.topics.map((topic, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{problem.likes || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{problem.dislikes || 0}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Accepted: {problem.acceptance_rate?.toFixed(1)}%
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hints" className="flex-1 overflow-auto p-4 mt-0">
            <div className="max-w-3xl">
              {hints.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No hints available for this problem
                </div>
              ) : (
                <div className="space-y-4">
                  {hints.map((hint, idx) => (
                    <div key={hint.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => {
                          if (revealedHints.includes(idx)) {
                            setRevealedHints(revealedHints.filter(i => i !== idx));
                          } else {
                            setRevealedHints([...revealedHints, idx]);
                          }
                        }}
                        className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          Hint {hint.hint_number}
                        </span>
                        <ChevronRight className={cn(
                          "h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform",
                          revealedHints.includes(idx) && "rotate-90"
                        )} />
                      </button>
                      {revealedHints.includes(idx) && (
                        <div className="px-4 py-3 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
                          {hint.hint_text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="flex-1 overflow-auto p-4 mt-0">
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No submissions yet
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="flex flex-col overflow-hidden">
        <Split
          className="flex flex-col"
          sizes={[60, 40]}
          minSize={[200, 150]}
          gutterSize={8}
          direction="vertical"
          cursor="row-resize"
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {/* Editor Section */}
          <div className="flex flex-col overflow-hidden">
            {/* Editor Top Bar */}
            <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
              <Select value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as LanguageId)}>
                <SelectTrigger className="w-[140px] h-8 border-gray-300 dark:border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((langSlug) => {
                    const lang = SUPPORTED_LANGUAGES[langSlug as LanguageId];
                    return lang ? (
                      <SelectItem key={langSlug} value={langSlug}>
                        {lang.name}
                      </SelectItem>
                    ) : null;
                  })}
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8" 
                  onClick={async () => {
                    if (problem) {
                      const template = await getCodeTemplate(problem.id, selectedLanguage);
                      setCode(template?.code_stub || getLeetCodeTemplate(selectedLanguage));
                    }
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={getLanguageForMonaco(selectedLanguage)}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                }}
              />
            </div>
          </div>

          {/* Bottom Panel - Testcases/Results */}
          <div className="flex flex-col overflow-hidden min-h-0">
          {/* Testcase Tabs */}
          <Tabs value={resultsTab} onValueChange={(v) => setResultsTab(v as any)} className="flex-1 flex flex-col min-h-0">
            <TabsList className="h-10 w-full justify-start rounded-none border-b border-gray-200 dark:border-gray-800 bg-transparent px-4 flex-shrink-0">
              <TabsTrigger value="testcase" className="rounded-none text-xs data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                Testcase
              </TabsTrigger>
              <TabsTrigger value="result" className="rounded-none text-xs data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                Test Result
              </TabsTrigger>
            </TabsList>

            <TabsContent value="testcase" className="flex-1 overflow-auto p-4 mt-0 min-h-0">
              <div className="space-y-2">
                <div className="flex gap-2">
                  {testcases.slice(0, 3).map((_, idx) => (
                    <Button
                      key={idx}
                      variant={selectedTestcase === idx ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTestcase(idx)}
                      className="h-8"
                    >
                      Case {idx + 1}
                    </Button>
                  ))}
                </div>
                {testcases[selectedTestcase] && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Input:</p>
                      <div className="bg-gray-100 dark:bg-[#282828] rounded p-2 font-mono text-sm text-gray-900 dark:text-gray-100">
                        {testcases[selectedTestcase].input}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Expected Output:</p>
                      <div className="bg-gray-100 dark:bg-[#282828] rounded p-2 font-mono text-sm text-gray-900 dark:text-gray-100">
                        {testcases[selectedTestcase].expected_output}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="result" className="flex-1 overflow-auto p-4 mt-0 min-h-0">
              {quickResults?.testcases && quickResults.testcases.length > 0 ? (
                <div className="space-y-3">
                  {/* Summary */}
                  <div className={cn(
                    "border rounded-lg p-4",
                    quickTestPassed 
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                      : "border-red-500 bg-red-50 dark:bg-red-950/20"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      {quickTestPassed ? (
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className="text-red-600 dark:text-red-400 text-lg">✗</span>
                      )}
                      <span className={cn(
                        "font-semibold",
                        quickTestPassed 
                          ? "text-green-700 dark:text-green-300" 
                          : "text-red-700 dark:text-red-300"
                      )}>
                        {quickTestPassed ? "All test cases passed!" : "Some test cases failed"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {quickResults.testcases.filter(tc => tc.passed).length} / {quickResults.testcases.length} test cases passed
                    </p>
                  </div>

                  {/* Individual Results */}
                  {quickResults.testcases.map((result, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Case {idx + 1}</span>
                        <Badge variant={result.passed ? "default" : "destructive"} className="text-xs">
                          {result.passed ? <Check className="h-3 w-3 mr-1" /> : null}
                          {result.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                      {!result.passed && result.error && (
                        <p className="text-xs text-red-600 dark:text-red-400 font-mono">{result.error}</p>
                      )}
                      {result.runtime && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Runtime: {result.runtime.toFixed(0)}ms
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : submissionResults?.testcases && submissionResults.testcases.length > 0 ? (
                <div className="space-y-3">
                  {/* Submission Summary */}
                  <div className={cn(
                    "border rounded-lg p-4",
                    submissionResults.verdict === "Accepted"
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                      : "border-red-500 bg-red-50 dark:bg-red-950/20"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      {submissionResults.verdict === "Accepted" ? (
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className="text-red-600 dark:text-red-400 text-lg">✗</span>
                      )}
                      <span className={cn(
                        "font-semibold",
                        submissionResults.verdict === "Accepted"
                          ? "text-green-700 dark:text-green-300" 
                          : "text-red-700 dark:text-red-300"
                      )}>
                        {submissionResults.verdict}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {submissionResults.testcases.filter(tc => tc.passed).length} / {submissionResults.testcases.length} test cases passed
                    </p>
                    {submissionResults.verdict === "Accepted" && (
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1 font-medium">
                        🎉 Problem marked as solved!
                      </p>
                    )}
                  </div>

                  {/* Individual Results */}
                  {submissionResults.testcases.map((result, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Test Case {idx + 1}</span>
                        <Badge variant={result.passed ? "default" : "destructive"} className="text-xs">
                          {result.passed ? <Check className="h-3 w-3 mr-1" /> : null}
                          {result.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                      {!result.passed && result.error && (
                        <p className="text-xs text-red-600 dark:text-red-400 font-mono mb-2">{result.error}</p>
                      )}
                      {result.runtime && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Runtime: {result.runtime.toFixed(0)}ms {result.memory ? `| Memory: ${(result.memory / 1024).toFixed(1)}KB` : ''}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                  You must run your code first
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Split>

      {/* Action Buttons */}
      <div className="h-12 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 gap-2 flex-shrink-0">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {quickTestPassed && !isSubmitting && (
              <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                <Check className="h-4 w-4" />
                Ready to submit
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleQuickTest}
              disabled={isQuickTesting || isSubmitting}
              className="h-8"
            >
              <Play className="h-4 w-4 mr-2" />
              {isQuickTesting ? "Running..." : "Run"}
            </Button>
            <Button 
              size="sm"
              onClick={handleSubmit}
              disabled={isQuickTesting || isSubmitting}
              className={cn(
                "h-8",
                quickTestPassed 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </Split>
  </div>
  );
}

export default ProblemView;
