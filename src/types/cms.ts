export interface AlgorithmCategory {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface Algorithm {
  id: string;
  name: string;
  category_id: string;
  description?: string;
  complexity_time?: string;
  complexity_space?: string;
  created_at: string;
  category?: AlgorithmCategory; // For joining data
}

export interface Article {
  id: string;
  algorithm_id: string;
  content: string; // Markdown content
  created_at: string;
  updated_at: string;
  algorithm?: Algorithm; // For joining data
}
