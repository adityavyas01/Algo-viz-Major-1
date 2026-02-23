/**
 * Judge0 CE (Community Edition) Service
 * Free multi-language code execution using Judge0 API
 * Supports 60+ programming languages
 * Rate limit: Generous (varies by RapidAPI tier, free tier: 50 requests/day)
 */

import type {
  ExecutionRequest,
  ExecutionResult,
  Language,
  LanguageId
} from '@/types/execution';
import { env } from '@/lib/env';

// Judge0 CE API Configuration
// OPTION 1 (FREE): Self-hosted Judge0 (see docs/SELF_HOSTED_JUDGE0.md)
// OPTION 2 (PAID): RapidAPI ($0.0017/request)
const USE_SELF_HOSTED = env.RAPIDAPI_KEY === 'demo-key-limited' || env.RAPIDAPI_KEY === 'self-hosted';
const JUDGE0_API_URL = USE_SELF_HOSTED 
  ? 'http://localhost:2358'  // Local self-hosted instance
  : 'https://judge0-ce.p.rapidapi.com';  // RapidAPI (paid)
const RAPIDAPI_KEY = env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';

// Judge0 language ID mapping (Judge0 uses numeric IDs)
const JUDGE0_LANGUAGE_IDS: Record<LanguageId, number> = {
  // Core languages
  javascript: 63,    // Node.js 12.14.0
  typescript: 74,    // TypeScript 3.7.4
  python: 71,        // Python 3.8.1
  java: 62,          // Java OpenJDK 13.0.1
  cpp: 54,           // C++ (GCC 9.2.0)
  c: 50,             // C (GCC 9.2.0)
  
  // Modern languages
  csharp: 51,        // C# (Mono 6.6.0.161)
  go: 60,            // Go 1.13.5
  rust: 73,          // Rust 1.40.0
  kotlin: 78,        // Kotlin 1.3.70
  swift: 83,         // Swift 5.2.3
  
  // Scripting languages
  ruby: 72,          // Ruby 2.7.0
  php: 68,           // PHP 7.4.1
  lua: 64,           // Lua 5.3.5
  perl: 85,          // Perl 5.28.1
  bash: 46,          // Bash 5.0.0
  
  // Functional languages
  scala: 81,         // Scala 2.13.2
  haskell: 61,       // Haskell GHC 8.8.1
  elixir: 57,        // Elixir 1.9.4
  clojure: 86,       // Clojure 1.10.1
  fsharp: 87,        // F# (.NET Core SDK 3.1.202)
  
  // Statistical
  r: 80,             // R 4.0.0
  groovy: 88,        // Groovy 3.0.3
};

// Supported languages configuration (same as before)
export const SUPPORTED_LANGUAGES: Record<LanguageId, Language> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    version: '18.15.0',
    pistonId: 'javascript',
    monacoId: 'javascript',
    extension: 'js',
    comment: '//',
    template: `// Write your code here
function solution() {
    // Your solution
}

solution();`
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    version: '5.0.3',
    pistonId: 'typescript',
    monacoId: 'typescript',
    extension: 'ts',
    comment: '//',
    template: `// Write your code here
function solution(): void {
    // Your solution
}

solution();`
  },
  python: {
    id: 'python',
    name: 'Python',
    version: '3.10.0',
    pistonId: 'python',
    monacoId: 'python',
    extension: 'py',
    comment: '#',
    template: `# Write your code here
def solution():
    # Your solution
    pass

solution()`
  },
  java: {
    id: 'java',
    name: 'Java',
    version: '15.0.2',
    pistonId: 'java',
    monacoId: 'java',
    extension: 'java',
    comment: '//',
    template: `public class Main {
    public static void main(String[] args) {
        // Write your code here
        solution();
    }
    
    public static void solution() {
        // Your solution
    }
}`
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    version: '10.2.0',
    pistonId: 'c++',
    monacoId: 'cpp',
    extension: 'cpp',
    comment: '//',
    template: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void solution() {
    // Write your code here
}

int main() {
    solution();
    return 0;
}`
  },
  c: {
    id: 'c',
    name: 'C',
    version: '10.2.0',
    pistonId: 'c',
    monacoId: 'c',
    extension: 'c',
    comment: '//',
    template: `#include <stdio.h>
#include <stdlib.h>

void solution() {
    // Write your code here
}

int main() {
    solution();
    return 0;
}`
  }
};

// Rate limiter (simpler than Piston's queue)
class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private running = 0;
  private maxConcurrent = 2; // Judge0 allows concurrent requests

  async add<T>(fn: () => Promise<T>): Promise<T> {
    if (this.running < this.maxConcurrent) {
      return this.run(fn);
    }

    return new Promise((resolve, reject) => {
      this.queue.push(() => this.run(fn).then(resolve).catch(reject));
    });
  }

  private async run<T>(fn: () => Promise<T>): Promise<T> {
    this.running++;
    try {
      return await fn();
    } finally {
      this.running--;
      const next = this.queue.shift();
      if (next) next();
    }
  }
}

const rateLimiter = new RateLimiter();

// Judge0 submission response interface
interface Judge0Submission {
  token: string;
  status: {
    id: number;
    description: string;
  };
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string | null;
  memory: number | null;
}

/**
 * Submit code to Judge0 for execution
 */
async function submitToJudge0(request: ExecutionRequest): Promise<string> {
  const languageId = JUDGE0_LANGUAGE_IDS[request.language];
  if (!languageId) {
    throw new Error(`Unsupported language: ${request.language}`);
  }

  const payload = {
    language_id: languageId,
    source_code: btoa(request.code), // Base64 encode
    stdin: request.stdin ? btoa(request.stdin) : undefined,
    cpu_time_limit: request.runTimeout ? request.runTimeout / 1000 : 3,
    wall_time_limit: request.runTimeout ? request.runTimeout / 1000 : 5
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add RapidAPI headers only if using RapidAPI (not self-hosted)
  if (!USE_SELF_HOSTED) {
    headers['X-RapidAPI-Key'] = RAPIDAPI_KEY;
    headers['X-RapidAPI-Host'] = RAPIDAPI_HOST;
  }

  const response = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Judge0 API error: ${response.status} ${response.statusText}`);
  }

  const result: Judge0Submission = await response.json();
  return result.token;
}

/**
 * Get submission result from Judge0
 */
async function getSubmissionResult(token: string): Promise<Judge0Submission> {
  const headers: Record<string, string> = {};

  // Add RapidAPI headers only if using RapidAPI (not self-hosted)
  if (!USE_SELF_HOSTED) {
    headers['X-RapidAPI-Key'] = RAPIDAPI_KEY;
    headers['X-RapidAPI-Host'] = RAPIDAPI_HOST;
  }

  const response = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true`, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    throw new Error(`Judge0 API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Execute code using Judge0 API
 */
export async function executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
  try {
    const startTime = performance.now();

    const result = await rateLimiter.add(async () => {
      // Submit code
      const token = await submitToJudge0(request);

      // Wait for result (Judge0 with wait=true returns completed result)
      // But let's poll once to ensure we have final result
      await new Promise(resolve => setTimeout(resolve, 100));
      const submission = await getSubmissionResult(token);

      // If still processing, poll again
      if (submission.status.id <= 2) { // 1=In Queue, 2=Processing
        await new Promise(resolve => setTimeout(resolve, 500));
        return await getSubmissionResult(token);
      }

      return submission;
    });

    const endTime = performance.now();
    const runtime = endTime - startTime;

    const judge0Result = result as Judge0Submission;

    // Decode base64 outputs
    const stdout = judge0Result.stdout ? atob(judge0Result.stdout) : '';
    const stderr = judge0Result.stderr ? atob(judge0Result.stderr) : '';
    const compileOutput = judge0Result.compile_output ? atob(judge0Result.compile_output) : '';

    // Judge0 status IDs:
    // 3 = Accepted, 4 = Wrong Answer, 5 = Time Limit Exceeded, 6 = Compilation Error
    // 7 = Runtime Error (SIGSEGV), 8 = Runtime Error (SIGXFSZ), 9 = Runtime Error (SIGFPE)
    // 10 = Runtime Error (SIGABRT), 11 = Runtime Error (NZEC), 12 = Runtime Error (Other)
    // 13 = Internal Error, 14 = Exec Format Error
    
    const statusId = judge0Result.status.id;
    const success = statusId === 3; // Accepted

    // Check for compilation error
    if (statusId === 6 || compileOutput) {
      return {
        success: false,
        stdout: '',
        stderr: compileOutput || stderr,
        output: compileOutput || stderr,
        exitCode: 1,
        runtime,
        compilationError: compileOutput || stderr || 'Compilation failed'
      };
    }

    // Check for runtime errors
    if (statusId >= 7 && statusId <= 12) {
      return {
        success: false,
        stdout,
        stderr: stderr || judge0Result.message || 'Runtime error',
        output: stdout || stderr || judge0Result.message || '',
        exitCode: statusId,
        runtime,
        error: stderr || judge0Result.message || 'Runtime error'
      };
    }

    // Check for time limit exceeded
    if (statusId === 5) {
      return {
        success: false,
        stdout,
        stderr: 'Time Limit Exceeded',
        output: stdout,
        exitCode: 124,
        runtime,
        error: 'Time Limit Exceeded'
      };
    }

    // Success or other status
    return {
      success,
      stdout,
      stderr,
      output: stdout || stderr,
      exitCode: success ? 0 : statusId,
      runtime,
      error: success ? undefined : (stderr || judge0Result.message || 'Execution failed')
    };

  } catch (error) {
    console.error('Judge0 execution error:', error);
    return {
      success: false,
      stdout: '',
      stderr: error instanceof Error ? error.message : 'Unknown error',
      output: '',
      exitCode: 1,
      runtime: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get template code for a language
 */
export function getTemplate(language: LanguageId): string {
  return SUPPORTED_LANGUAGES[language]?.template || '';
}

/**
 * Get a specific language configuration
 */
export function getLanguage(languageId: LanguageId): Language | undefined {
  return SUPPORTED_LANGUAGES[languageId];
}

/**
 * Get all supported languages
 */
export function getAllLanguages(): Language[] {
  return Object.values(SUPPORTED_LANGUAGES);
}

/**
 * Validate execution request
 */
export function validateExecutionRequest(request: ExecutionRequest): { valid: boolean; error?: string } {
  if (!request.language) {
    return { valid: false, error: 'Language is required' };
  }

  if (!JUDGE0_LANGUAGE_IDS[request.language]) {
    return { valid: false, error: `Unsupported language: ${request.language}` };
  }

  if (!request.code || request.code.trim() === '') {
    return { valid: false, error: 'Code cannot be empty' };
  }

  if (request.code.length > 50000) {
    return { valid: false, error: 'Code is too long (max 50KB)' };
  }

  return { valid: true };
}

/**
 * Get available languages
 */
export function getAvailableLanguages(): Language[] {
  return Object.values(SUPPORTED_LANGUAGES);
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(language: LanguageId): boolean {
  return language in JUDGE0_LANGUAGE_IDS;
}
