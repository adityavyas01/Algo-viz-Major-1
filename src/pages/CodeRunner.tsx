/**
 * Multi-Language Code Runner Demo
 * Test page for new Piston API integration
 */

import React, { useState } from 'react';
import { Play, RotateCcw, Loader2, Terminal } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ExecutionResult } from '@/components/ExecutionResult';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { getTemplate } from '@/services/piston';
import type { LanguageId } from '@/types/execution';
import type { Testcase } from '@/services/multiLangExecutor';
import { toast } from 'sonner';

const CodeRunner = () => {
  const [language, setLanguage] = useState<LanguageId>('python');
  const [code, setCode] = useState(getTemplate('python'));
  const [stdin, setStdin] = useState('');
  const [activeTab, setActiveTab] = useState<'custom' | 'testcases'>('custom');

  const {
    isExecuting,
    executionResult,
    batchResult,
    error,
    executeCode,
    executeTestcases,
    clearResults,
    getLanguageTemplate
  } = useCodeExecution();

  // Sample testcases
  const sampleTestcases: Testcase[] = [
    {
      id: '1',
      input: '5\n',
      expectedOutput: '120\n',
      timeLimit: 3000
    },
    {
      id: '2',
      input: '3\n',
      expectedOutput: '6\n',
      timeLimit: 3000
    },
    {
      id: '3',
      input: '0\n',
      expectedOutput: '1\n',
      timeLimit: 3000
    }
  ];

  const handleLanguageChange = (newLanguage: LanguageId) => {
    setLanguage(newLanguage);
    setCode(getTemplate(newLanguage));
    clearResults();
  };

  const handleTemplateInsert = () => {
    const template = getLanguageTemplate(language);
    setCode(template);
    toast.success('Template inserted');
  };

  const handleRun = async () => {
    try {
      await executeCode(code, language, stdin);
      toast.success('Code executed successfully');
    } catch (err) {
      toast.error('Execution failed');
    }
  };

  const handleRunTestcases = async () => {
    try {
      await executeTestcases(code, language, sampleTestcases);
      toast.success('Testcases executed');
    } catch (err) {
      toast.error('Testcase execution failed');
    }
  };

  const handleReset = () => {
    setCode(getTemplate(language));
    setStdin('');
    clearResults();
    toast.info('Editor reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Multi-Language Code Runner
          </h1>
          <p className="text-white/70 text-lg">
            Test Piston API integration - Execute code in 15+ programming languages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Code Editor
                  </CardTitle>
                  <LanguageSelector
                    value={language}
                    onChange={handleLanguageChange}
                    onTemplateInsert={handleTemplateInsert}
                    disabled={isExecuting}
                  />
                </div>
                <CardDescription className="text-white/60">
                  Write your code here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                  className="min-h-[300px] font-mono text-sm bg-slate-900/50 border-white/10 text-white"
                  disabled={isExecuting}
                />

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                  <TabsList className="bg-white/5">
                    <TabsTrigger value="custom">Custom Input</TabsTrigger>
                    <TabsTrigger value="testcases">Run Testcases</TabsTrigger>
                  </TabsList>

                  <TabsContent value="custom" className="space-y-4">
                    <div>
                      <label className="text-sm text-white/70 mb-2 block">
                        Standard Input (stdin)
                      </label>
                      <Textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        placeholder="Enter input here (if needed)"
                        className="min-h-[100px] font-mono text-sm bg-slate-900/50 border-white/10 text-white"
                        disabled={isExecuting}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleRun}
                        disabled={isExecuting || !code.trim()}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {isExecuting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Run Code
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleReset}
                        disabled={isExecuting}
                        variant="outline"
                        className="border-white/10 hover:bg-white/5"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="testcases" className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/70 mb-2">
                        Sample Problem: Factorial
                      </p>
                      <p className="text-xs text-white/50">
                        Read a number n from input and print its factorial.
                      </p>
                      <div className="mt-3 space-y-1 text-xs text-white/60">
                        <div>• Test 1: input=5, expected=120</div>
                        <div>• Test 2: input=3, expected=6</div>
                        <div>• Test 3: input=0, expected=1</div>
                      </div>
                    </div>

                    <Button
                      onClick={handleRunTestcases}
                      disabled={isExecuting || !code.trim()}
                      className="w-full bg-cyan-600 hover:bg-cyan-700"
                    >
                      {isExecuting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Running Tests...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Run All Testcases
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Execution Results</CardTitle>
                <CardDescription className="text-white/60">
                  Output and testcase results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    {error}
                  </div>
                )}

                {!error && !executionResult && !batchResult && (
                  <div className="text-center py-12 text-white/50">
                    <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Run your code to see results</p>
                  </div>
                )}

                {executionResult && !batchResult && (
                  <div className="space-y-4">
                    {/* Single Execution Result */}
                    <div className={`p-4 rounded-lg border ${
                      executionResult.success
                        ? 'bg-green-500/10 border-green-500/20'
                        : 'bg-red-500/10 border-red-500/20'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-semibold ${
                          executionResult.success ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {executionResult.success ? '✓ Success' : '✗ Error'}
                        </span>
                        <span className="text-xs text-white/60">
                          {executionResult.runtime.toFixed(0)}ms
                        </span>
                      </div>

                      {executionResult.compilationError && (
                        <div className="mb-3">
                          <div className="text-xs font-semibold text-red-400 mb-1">
                            Compilation Error:
                          </div>
                          <pre className="text-xs text-red-300 whitespace-pre-wrap font-mono">
                            {executionResult.compilationError}
                          </pre>
                        </div>
                      )}

                      {executionResult.output && (
                        <div>
                          <div className="text-xs font-semibold text-white/70 mb-1">
                            Output:
                          </div>
                          <pre className="text-sm text-white whitespace-pre-wrap font-mono bg-slate-900/50 p-3 rounded">
                            {executionResult.output || '(no output)'}
                          </pre>
                        </div>
                      )}

                      {executionResult.stderr && !executionResult.compilationError && (
                        <div className="mt-3">
                          <div className="text-xs font-semibold text-yellow-400 mb-1">
                            Stderr:
                          </div>
                          <pre className="text-xs text-yellow-300 whitespace-pre-wrap font-mono">
                            {executionResult.stderr}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {batchResult && (
                  <ExecutionResult result={batchResult} showHiddenTests={true} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeRunner;
