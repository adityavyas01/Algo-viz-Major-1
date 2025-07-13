
export type Algorithm = 'n-queens' | 'sudoku' | 'subset-sum' | 'graph-coloring';

export interface TreeNode {
  id: string;
  value: string;
  level: number;
  isValid: boolean;
  isSolution: boolean;
  children: TreeNode[];
  x: number;
  y: number;
}
