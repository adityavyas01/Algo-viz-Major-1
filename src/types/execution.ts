/**
 * Execution Types for Multi-Language Code Execution
 * Supports Piston API and custom execution engines
 */

export type LanguageId = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'python3'
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
  | 'dart'
  | 'haskell'
  | 'lua'
  | 'perl'
  | 'r'
  | 'bash'
  | 'elixir'
  | 'clojure'
  | 'fsharp'
  | 'groovy';

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

/**
 * Enhanced types for robust execution system
 */

export interface ParsedTestcase {
  variables: Record<string, unknown>;
  types: Record<string, DataType>;
  raw: string;
}

export type DataType = 
  | 'number' 
  | 'string' 
  | 'boolean' 
  | 'null' 
  | 'array' 
  | 'array2d' 
  | 'array3d'
  | 'object' 
  | 'linkedlist' 
  | 'tree' 
  | 'graph';

export interface MethodSignature {
  name: string;
  paramCount: number;
  params: ParameterInfo[];
  returnType: string;
  isStatic: boolean;
  isAsync: boolean;
  hasClass: boolean;
}

export interface ParameterInfo {
  name: string;
  type: string;
  isOptional: boolean;
  hasDefault: boolean;
  isVariadic: boolean;
}

export interface WrapperConfig {
  userCode: string;
  testcaseInput: string;
  language: LanguageId;
  problemId?: number;
  testcaseId?: string;
}

export interface WrapperResult {
  wrappedCode: string;
  signature: MethodSignature;
  metadata: {
    hasLinkedList: boolean;
    hasTree: boolean;
    hasGraph: boolean;
    detectionMethod: 'ast' | 'regex' | 'heuristic';
  };
}

/**
 * Error classes for execution pipeline
 */

export class ExecutionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = 'ExecutionError';
    Object.setPrototypeOf(this, ExecutionError.prototype);
  }
}

export class ParseError extends ExecutionError {
  constructor(message: string, context: Record<string, unknown> = {}) {
    super(message, 'PARSE_ERROR', context);
    this.name = 'ParseError';
    Object.setPrototypeOf(this, ParseError.prototype);
  }
}

export class WrapperError extends ExecutionError {
  constructor(message: string, context: Record<string, unknown> = {}) {
    super(message, 'WRAPPER_ERROR', context);
    this.name = 'WrapperError';
    Object.setPrototypeOf(this, WrapperError.prototype);
  }
}

export class SignatureDetectionError extends ExecutionError {
  constructor(message: string, context: Record<string, unknown> = {}) {
    super(message, 'SIGNATURE_ERROR', context);
    this.name = 'SignatureDetectionError';
    Object.setPrototypeOf(this, SignatureDetectionError.prototype);
  }
}

export class TestcaseParseError extends ExecutionError {
  constructor(message: string, context: Record<string, unknown> = {}) {
    super(message, 'TESTCASE_PARSE_ERROR', context);
    this.name = 'TestcaseParseError';
    Object.setPrototypeOf(this, TestcaseParseError.prototype);
  }
}

/**
 * Configuration for feature flags
 */
export interface ExecutionConfig {
  useEnhancedParsing: boolean;
  enableSignatureCache: boolean;
  strictTypeChecking: boolean;
  detailedErrorMessages: boolean;
}
