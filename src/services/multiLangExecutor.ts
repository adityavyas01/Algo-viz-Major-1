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
import { executeCode, validateExecutionRequest } from './judge0';
import { wrapCode } from './codeWrapper';

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
    // Wrap user code with testcase execution boilerplate
    const wrappedCode = wrapCode({
      userCode: code,
      testcaseInput: testcase.input,
      language,
    });
    
    const request: ExecutionRequest = {
      language,
      code: wrappedCode,
      stdin: '',
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

    // Normalize outputs with safety checks
    // Handle both camelCase and snake_case from database
    const actualOutput = (result.output || result.stdout || '').trim();
    const expectedOutput = (testcase.expectedOutput || (testcase as any).expected_output || '').trim();

    // Normalize for comparison (handles JSON formatting differences)
    const actualNormalized = normalizeOutput(actualOutput);
    const expectedNormalized = normalizeOutput(expectedOutput);


    // Check if outputs match
    const passed = result.success && actualNormalized === expectedNormalized;

    return {
      testcaseId: testcase.id,
      input: testcase.input,
      expectedOutput: expectedOutput,
      actualOutput: actualOutput,
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

  // Safety check for undefined or empty testcases
  if (!testcases || testcases.length === 0) {
    return {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      testcases: [],
      totalRuntime: 0,
      verdict: 'Accepted'
    };
  }

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
 * Enhanced output normalization with epsilon comparison
 */
function normalizeOutput(output: string, strict: boolean = true): string {
  const trimmed = output.trim();

  try {
    const parsed = JSON.parse(trimmed);
    return normalizeValue(parsed, strict);
  } catch {
    // Not JSON, try language-specific normalization
    let normalized = trimmed;

    // Python booleans
    normalized = normalized
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null');

    // Ruby symbols
    normalized = normalized.replace(/:(\w+)/g, '"$1"');

    // C++ vector output
    normalized = normalized.replace(/std::vector|vector/g, '');

    // Rust Debug format
    normalized = normalized.replace(/Vec\s*/g, '');

    if (!strict) {
      normalized = normalized.replace(/\s+/g, ' ');
    }

    return normalized;
  }
}

/**
 * Normalize parsed value recursively
 */
function normalizeValue(value: unknown, strict: boolean): string {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'number') {
    // Handle special values
    if (!isFinite(value)) {
      return String(value);
    }
    
    // Epsilon comparison for floats
    const EPSILON = 1e-9;
    if (Math.abs(value - Math.round(value)) < EPSILON) {
      return String(Math.round(value));
    }
    
    // Round to 5 decimal places for floats
    return String(Math.round(value * 100000) / 100000);
  }

  if (typeof value === 'boolean') {
    return String(value);
  }

  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    const normalized = value.map(item => normalizeValue(item, strict));
    return `[${normalized.join(',')}]`;
  }

  if (typeof value === 'object') {
    // Sort object keys for consistent comparison
    const sorted: Record<string, unknown> = {};
    Object.keys(value).sort().forEach(key => {
      sorted[key] = (value as Record<string, unknown>)[key];
    });
    return JSON.stringify(sorted, null, strict ? 0 : 2);
  }

  return JSON.stringify(value);
}

/**
 * Compare outputs with flexible matching
 */
export function compareOutputs(
  actual: string,
  expected: string,
  epsilon: number = 1e-6
): boolean {
  // Try strict equality first
  if (actual === expected) return true;

  // Normalize and try again
  const normalizedActual = normalizeOutput(actual, true);
  const normalizedExpected = normalizeOutput(expected, true);
  
  if (normalizedActual === normalizedExpected) return true;

  // Try flexible comparison
  try {
    const actualValue = JSON.parse(normalizedActual);
    const expectedValue = JSON.parse(normalizedExpected);
    
    return deepCompare(actualValue, expectedValue, epsilon);
  } catch {
    // Fallback to whitespace-normalized comparison
    const flexibleActual = normalizeOutput(actual, false);
    const flexibleExpected = normalizeOutput(expected, false);
    return flexibleActual === flexibleExpected;
  }
}

/**
 * Deep comparison with epsilon for numbers
 */
function deepCompare(a: unknown, b: unknown, epsilon: number): boolean {
  if (a === b) return true;

  if (typeof a === 'number' && typeof b === 'number') {
    if (!isFinite(a) || !isFinite(b)) {
      return a === b;
    }
    return Math.abs(a - b) < epsilon;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepCompare(item, b[index], epsilon));
  }

  if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    
    if (aKeys.length !== bKeys.length) return false;
    if (aKeys.some((key, i) => key !== bKeys[i])) return false;
    
    return aKeys.every(key => 
      deepCompare((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], epsilon)
    );
  }

  return false;
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
