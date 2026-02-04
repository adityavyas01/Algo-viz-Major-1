/**
 * Multi-Language Code Executor
 * Handles testcase execution and batch processing
 */

import type {
  ExecutionRequest,
  ExecutionResult,
  TestcaseExecution,
  BatchExecutionResult,
  LanguageId
} from '@/types/execution';
import { executeCode, validateExecutionRequest } from './piston';

export interface Testcase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  timeLimit?: number;
}

/**
 * Execute code against a single testcase
 */
export async function executeTestcase(
  code: string,
  language: LanguageId,
  testcase: Testcase
): Promise<TestcaseExecution> {
  const startTime = performance.now();

  try {
    const request: ExecutionRequest = {
      language,
      code,
      stdin: testcase.input,
      runTimeout: testcase.timeLimit || 3000
    };

    // Validate request
    const validation = validateExecutionRequest(request);
    if (!validation.valid) {
      return {
        testcaseId: testcase.id,
        input: testcase.input,
        expectedOutput: testcase.expectedOutput,
        actualOutput: '',
        passed: false,
        runtime: 0,
        error: validation.error
      };
    }

    const result = await executeCode(request);
    const runtime = performance.now() - startTime;

    // Normalize outputs (trim whitespace)
    const actualOutput = result.output.trim();
    const expectedOutput = testcase.expectedOutput.trim();

    // Check if outputs match
    const passed = result.success && actualOutput === expectedOutput;

    return {
      testcaseId: testcase.id,
      input: testcase.input,
      expectedOutput: testcase.expectedOutput,
      actualOutput: result.output,
      passed,
      runtime,
      memory: result.memory,
      error: result.error || result.compilationError
    };

  } catch (error) {
    return {
      testcaseId: testcase.id,
      input: testcase.input,
      expectedOutput: testcase.expectedOutput,
      actualOutput: '',
      passed: false,
      runtime: performance.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Execute code against multiple testcases
 */
export async function executeBatch(
  code: string,
  language: LanguageId,
  testcases: Testcase[]
): Promise<BatchExecutionResult> {
  const startTime = performance.now();

  // Execute all testcases in parallel (with rate limiting handled by piston service)
  const results = await Promise.all(
    testcases.map(testcase => executeTestcase(code, language, testcase))
  );

  const totalRuntime = performance.now() - startTime;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = results.length - passedTests;

  // Determine verdict
  let verdict: BatchExecutionResult['verdict'] = 'Accepted';
  
  // Check for compilation errors
  const hasCompilationError = results.some(r => r.error?.includes('Compilation') || r.error?.includes('compile'));
  if (hasCompilationError) {
    verdict = 'Compilation Error';
  }
  // Check for runtime errors
  else if (results.some(r => r.error && !r.passed)) {
    verdict = 'Runtime Error';
  }
  // Check for time limit exceeded
  else if (results.some(r => r.runtime > (testcases[0]?.timeLimit || 3000))) {
    verdict = 'Time Limit Exceeded';
  }
  // Check for wrong answers
  else if (failedTests > 0) {
    verdict = 'Wrong Answer';
  }

  return {
    totalTests: testcases.length,
    passedTests,
    failedTests,
    testcases: results,
    totalRuntime,
    verdict
  };
}

/**
 * Quick test - run code with custom input
 */
export async function quickTest(
  code: string,
  language: LanguageId,
  stdin: string = ''
): Promise<ExecutionResult> {
  const request: ExecutionRequest = {
    language,
    code,
    stdin,
    runTimeout: 5000
  };

  const validation = validateExecutionRequest(request);
  if (!validation.valid) {
    return {
      success: false,
      stdout: '',
      stderr: validation.error || 'Invalid request',
      output: '',
      exitCode: 1,
      signal: null,
      runtime: 0,
      error: validation.error
    };
  }

  return await executeCode(request);
}

/**
 * Compare outputs (handles multiple output formats)
 */
export function compareOutputs(
  actual: string,
  expected: string,
  strict: boolean = true
): boolean {
  if (strict) {
    // Exact match after trimming
    return actual.trim() === expected.trim();
  } else {
    // Flexible matching (normalize whitespace)
    const normalizeWhitespace = (str: string) =>
      str.trim().replace(/\s+/g, ' ');
    
    return normalizeWhitespace(actual) === normalizeWhitespace(expected);
  }
}

/**
 * Format runtime for display
 */
export function formatRuntime(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Format memory for display
 */
export function formatMemory(bytes?: number): string {
  if (!bytes) return 'N/A';
  
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

/**
 * Get verdict color for UI
 */
export function getVerdictColor(verdict: BatchExecutionResult['verdict']): string {
  switch (verdict) {
    case 'Accepted':
      return 'text-green-500';
    case 'Wrong Answer':
      return 'text-red-500';
    case 'Runtime Error':
      return 'text-orange-500';
    case 'Time Limit Exceeded':
      return 'text-yellow-500';
    case 'Compilation Error':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
}

/**
 * Get verdict background color for UI
 */
export function getVerdictBgColor(verdict: BatchExecutionResult['verdict']): string {
  switch (verdict) {
    case 'Accepted':
      return 'bg-green-500/10 border-green-500/30';
    case 'Wrong Answer':
      return 'bg-red-500/10 border-red-500/30';
    case 'Runtime Error':
      return 'bg-orange-500/10 border-orange-500/30';
    case 'Time Limit Exceeded':
      return 'bg-yellow-500/10 border-yellow-500/30';
    case 'Compilation Error':
      return 'bg-purple-500/10 border-purple-500/30';
    default:
      return 'bg-gray-500/10 border-gray-500/30';
  }
}
