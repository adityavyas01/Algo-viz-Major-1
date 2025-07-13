
import { TreeNode } from './types';

export const isValidQueen = (board: number[][], row: number, col: number, n: number): boolean => {
  // Check column
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 1) return false;
  }
  
  // Check diagonal (top-left to bottom-right)
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) return false;
  }
  
  // Check diagonal (top-right to bottom-left)
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 1) return false;
  }
  
  return true;
};

export const solveNQueens = (): number[][][] => {
  const n = 4;
  const solutions: number[][][] = [];
  const board = Array(n).fill(null).map(() => Array(n).fill(0));
  
  const backtrack = (row: number): boolean => {
    if (row === n) {
      solutions.push(board.map(r => [...r]));
      return true;
    }
    
    for (let col = 0; col < n; col++) {
      if (isValidQueen(board, row, col, n)) {
        board[row][col] = 1;
        if (backtrack(row + 1)) {
          return true;
        }
        board[row][col] = 0; // backtrack
      }
    }
    
    return false;
  };
  
  backtrack(0);
  return solutions;
};

export const buildNQueensDecisionTree = (): TreeNode[] => {
  const n = 4;
  const newBoard = Array(n).fill(null).map(() => Array(n).fill(0));
  
  let nodeId = 0;
  
  const buildTree = (level: number, currentBoard: number[][], x: number, y: number): TreeNode[] => {
    if (level >= n) return [];
    
    const nodes: TreeNode[] = [];
    
    for (let col = 0; col < n; col++) {
      const newBoard = currentBoard.map(row => [...row]);
      const isValid = isValidQueen(newBoard, level, col, n);
      
      if (isValid) {
        newBoard[level][col] = 1;
      }
      
      const node: TreeNode = {
        id: `node-${nodeId++}`,
        value: `Q(${level},${col})`,
        level,
        isValid,
        isSolution: level === n - 1 && isValid,
        children: [],
        x: x + col * 80,
        y: y + level * 60
      };
      
      if (isValid && level < n - 1) {
        node.children = buildTree(level + 1, newBoard, x + col * 20, y + 60);
      }
      
      nodes.push(node);
    }
    
    return nodes;
  };
  
  return buildTree(0, newBoard, 50, 50);
};
