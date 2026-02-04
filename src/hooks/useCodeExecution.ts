/**
 * Custom Hook for Code Execution
 * Manages execution state and provides execution functions
 */

import { useState, useCallback } from 'react';
import type { LanguageId, ExecutionResult, BatchExecutionResult } from '@/types/execution';
import type { Testcase } from '@/services/multiLangExecutor';
import { quickTest, executeBatch } from '@/services/multiLangExecutor';
import { getTemplate } from '@/services/piston';

export function useCodeExecution() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [batchResult, setBatchResult] = useState<BatchExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Execute code with custom input
   */
  const executeCode = useCallback(async (
    code: string,
    language: LanguageId,
    stdin: string = ''
  ): Promise<ExecutionResult> => {
    setIsExecuting(true);
    setError(null);
    setExecutionResult(null);

    try {
      const result = await quickTest(code, language, stdin);
      setExecutionResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Execution failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  /**
   * Execute code against multiple testcases
   */
  const executeTestcases = useCallback(async (
    code: string,
    language: LanguageId,
    testcases: Testcase[]
  ): Promise<BatchExecutionResult> => {
    setIsExecuting(true);
    setError(null);
    setBatchResult(null);

    try {
      const result = await executeBatch(code, language, testcases);
      setBatchResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Batch execution failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  /**
   * Clear results
   */
  const clearResults = useCallback(() => {
    setExecutionResult(null);
    setBatchResult(null);
    setError(null);
  }, []);

  /**
   * Get template for language
   */
  const getLanguageTemplate = useCallback((language: LanguageId): string => {
    return getTemplate(language);
  }, []);

  return {
    // State
    isExecuting,
    executionResult,
    batchResult,
    error,

    // Actions
    executeCode,
    executeTestcases,
    clearResults,
    getLanguageTemplate
  };
}
