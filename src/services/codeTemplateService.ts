/**
 * Code Template Service
 * Manages code templates for problems
 */

import { supabase } from "@/integrations/supabase/client";
import type { LanguageId } from "@/types/execution";

export interface CodeTemplate {
  id: number;
  problem_id: number;
  language: string;  // Full name: "C++", "Python3"
  lang_slug: string;  // API slug: "cpp", "python3"
  code_stub: string;  // Starter code
  created_at: string;
}

export interface Hint {
  id: number;
  problem_id: number;
  hint_number: number;
  hint_text: string;
  created_at: string;
}

// Language slug mapping for compatibility
const LANG_SLUG_MAP: Record<LanguageId, string> = {
  cpp: "cpp",
  java: "java",
  python3: "python3",
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  csharp: "csharp",
  c: "c",
  go: "go",
  kotlin: "kotlin",
  swift: "swift",
  rust: "rust",
  ruby: "ruby",
  php: "php",
  scala: "scala",
  dart: "dart"
};

/**
 * Fetch code templates for a problem
 */
export async function getCodeTemplates(problemId: number): Promise<CodeTemplate[]> {
  const { data, error } = await supabase
    .from("code_templates")
    .select("*")
    .eq("problem_id", problemId)
    .order("lang_slug", { ascending: true });

  if (error) {
    console.error("Error fetching code templates:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch a specific code template by problem ID and language
 */
export async function getCodeTemplate(
  problemId: number,
  language: LanguageId
): Promise<CodeTemplate | null> {
  const langSlug = LANG_SLUG_MAP[language];
  
  const { data, error } = await supabase
    .from("code_templates")
    .select("*")
    .eq("problem_id", problemId)
    .eq("lang_slug", langSlug)
    .single();

  if (error) {
    console.error("Error fetching code template:", error);
    return null;
  }

  return data;
}

/**
 * Fetch hints for a problem
 */
export async function getHints(problemId: number): Promise<Hint[]> {
  const { data, error } = await supabase
    .from("hints")
    .select("*")
    .eq("problem_id", problemId)
    .order("hint_number", { ascending: true });

  if (error) {
    console.error("Error fetching hints:", error);
    return [];
  }

  return data || [];
}

/**
 * Get available languages for a problem
 */
export async function getAvailableLanguages(problemId: number): Promise<LanguageId[]> {
  const templates = await getCodeTemplates(problemId);
  return templates
    .map(t => t.lang_slug as LanguageId)
    .filter(slug => Object.keys(LANG_SLUG_MAP).includes(slug));
}
