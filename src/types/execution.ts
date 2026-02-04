/**
 * Execution Types for Multi-Language Code Execution
 * Supports Piston API and custom execution engines
 */

export type LanguageId = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'c'
  | 'csharp'
  | 'go'
  | 'rust'
  | 'kotlin'
  | 'swift'
  | 'ruby'
  | 'php'
  | 'scala'
  | 'dart';

export interface Language {
  id: LanguageId;
  name: string;
  version: string;
  pistonId: string;
  monacoId: string;
  extension: string;
  comment: string;
  template: string;
  icon?: string;
}

export interface ExecutionRequest {
  language: LanguageId;
  code: string;
  stdin?: string;
  args?: string[];
  compileTimeout?: number;
  runTimeout?: number;
}

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  output: string;
  exitCode: number;
  signal: string | null;
  runtime: number;
  memory?: number;
  error?: string;
  compilationError?: string;
}

export interface PistonRunRequest {
  language: string;
  version: string;
  files: Array<{
    name?: string;
    content: string;
  }>;
  stdin?: string;
  args?: string[];
  compile_timeout?: number;
  run_timeout?: number;
  compile_memory_limit?: number;
  run_memory_limit?: number;
}

export interface PistonRunResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
  compile?: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
}

export interface PistonRuntime {
  language: string;
  version: string;
  aliases: string[];
  runtime?: string;
}

export interface TestcaseExecution {
  testcaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  runtime: number;
  memory?: number;
  error?: string;
}

export interface BatchExecutionResult {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  testcases: TestcaseExecution[];
  totalRuntime: number;
  verdict: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded' | 'Compilation Error';
}
