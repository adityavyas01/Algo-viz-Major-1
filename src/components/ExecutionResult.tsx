/**
 * Execution Result Component
 * Displays code execution results with testcase details
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Zap,
  Terminal,
  Code2,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { BatchExecutionResult, TestcaseExecution } from '@/types/execution';
import {
  formatRuntime,
  formatMemory,
  getVerdictColor,
  getVerdictBgColor
} from '@/services/multiLangExecutor';

interface ExecutionResultProps {
  result: BatchExecutionResult;
  showHiddenTests?: boolean;
}

export const ExecutionResult: React.FC<ExecutionResultProps> = ({
  result,
  showHiddenTests = false
}) => {
  const [expandedTests, setExpandedTests] = React.useState<Set<string>>(new Set());

  const toggleTest = (testId: string) => {
    setExpandedTests(prev => {
      const next = new Set(prev);
      if (next.has(testId)) {
        next.delete(testId);
      } else {
        next.add(testId);
      }
      return next;
    });
  };

  const verdictIcon = {
    'Accepted': <CheckCircle2 className="w-5 h-5 text-green-500" />,
    'Wrong Answer': <XCircle className="w-5 h-5 text-red-500" />,
    'Runtime Error': <AlertCircle className="w-5 h-5 text-orange-500" />,
    'Time Limit Exceeded': <Clock className="w-5 h-5 text-yellow-500" />,
    'Compilation Error': <Code2 className="w-5 h-5 text-purple-500" />
  }[result.verdict];

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            {verdictIcon}
            <span className={getVerdictColor(result.verdict)}>
              {result.verdict}
            </span>
          </CardTitle>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Zap className="w-4 h-4" />
              <span>{formatRuntime(result.totalRuntime)}</span>
            </div>
            <Badge className={getVerdictBgColor(result.verdict)}>
              {result.passedTests}/{result.totalTests} Passed
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {result.passedTests}
            </div>
            <div className="text-xs text-white/60">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {result.failedTests}
            </div>
            <div className="text-xs text-white/60">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-500">
              {result.totalTests}
            </div>
            <div className="text-xs text-white/60">Total</div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Test Cases */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-white/70 mb-3">
            Test Case Results
          </h4>
          
          <AnimatePresence>
            {result.testcases.map((testcase, index) => (
              <TestCaseResult
                key={testcase.testcaseId}
                testcase={testcase}
                index={index}
                isExpanded={expandedTests.has(testcase.testcaseId)}
                onToggle={() => toggleTest(testcase.testcaseId)}
                showDetails={showHiddenTests}
              />
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

interface TestCaseResultProps {
  testcase: TestcaseExecution;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  showDetails: boolean;
}

const TestCaseResult: React.FC<TestCaseResultProps> = ({
  testcase,
  index,
  isExpanded,
  onToggle,
  showDetails
}) => {
  const statusIcon = testcase.passed ? (
    <CheckCircle2 className="w-4 h-4 text-green-500" />
  ) : (
    <XCircle className="w-4 h-4 text-red-500" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      className={`border rounded-lg overflow-hidden ${
        testcase.passed
          ? 'bg-green-500/5 border-green-500/20'
          : 'bg-red-500/5 border-red-500/20'
      }`}
    >
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full justify-between p-4 h-auto hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          {statusIcon}
          <span className="font-medium text-white">
            Test Case {index + 1}
          </span>
          {testcase.error && (
            <Badge variant="destructive" className="text-xs">
              Error
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/60">
            {formatRuntime(testcase.runtime)}
          </span>
          {testcase.memory && (
            <span className="text-xs text-white/60">
              {formatMemory(testcase.memory)}
            </span>
          )}
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-3 border-t border-white/10">
              {/* Error Message */}
              {testcase.error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-400">Error</span>
                  </div>
                  <pre className="text-xs text-red-300 whitespace-pre-wrap font-mono">
                    {testcase.error}
                  </pre>
                </div>
              )}

              {/* Input */}
              {showDetails && testcase.input && (
                <div>
                  <div className="text-xs font-semibold text-white/70 mb-1 flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    Input
                  </div>
                  <pre className="p-2 bg-white/5 rounded text-xs text-white/80 whitespace-pre-wrap font-mono">
                    {testcase.input || '(empty)'}
                  </pre>
                </div>
              )}

              {/* Expected Output */}
              {showDetails && (
                <div>
                  <div className="text-xs font-semibold text-white/70 mb-1">
                    Expected Output
                  </div>
                  <pre className="p-2 bg-white/5 rounded text-xs text-white/80 whitespace-pre-wrap font-mono">
                    {testcase.expectedOutput || '(empty)'}
                  </pre>
                </div>
              )}

              {/* Actual Output */}
              <div>
                <div className="text-xs font-semibold text-white/70 mb-1">
                  Your Output
                </div>
                <pre className={`p-2 rounded text-xs whitespace-pre-wrap font-mono ${
                  testcase.passed
                    ? 'bg-green-500/10 text-green-300'
                    : 'bg-red-500/10 text-red-300'
                }`}>
                  {testcase.actualOutput || '(empty)'}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
