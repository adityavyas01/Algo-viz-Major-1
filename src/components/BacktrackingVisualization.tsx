
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, GitBranch } from 'lucide-react';
import { Algorithm, TreeNode } from './backtracking/types';
import { NQueensBoard } from './backtracking/NQueensBoard';
import { DecisionTree } from './backtracking/DecisionTree';
import { solveNQueens, buildNQueensDecisionTree } from './backtracking/NQueensSolver';

export const BacktrackingVisualization: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('n-queens');
  const [isRunning, setIsRunning] = useState(false);
  const [board, setBoard] = useState<number[][]>([]);
  const [decisionTree, setDecisionTree] = useState<TreeNode[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [solutions, setSolutions] = useState<number[][][]>([]);

  const initializeNQueens = (n: number = 4) => {
    const newBoard = Array(n).fill(null).map(() => Array(n).fill(0));
    setBoard(newBoard);
    
    const tree = buildNQueensDecisionTree();
    setDecisionTree(tree);
  };

  const startVisualization = () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    if (algorithm === 'n-queens') {
      const foundSolutions = solveNQueens();
      setSolutions(foundSolutions);
      if (foundSolutions.length > 0) {
        setBoard(foundSolutions[0]);
      }
    }
  };

  const resetVisualization = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSolutions([]);
    
    if (algorithm === 'n-queens') {
      initializeNQueens();
    }
  };

  useEffect(() => {
    if (algorithm === 'n-queens') {
      initializeNQueens();
    }
  }, [algorithm]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Backtracking Algorithms with Decision Trees
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
              <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="n-queens">N-Queens Problem</SelectItem>
                <SelectItem value="sudoku">Sudoku Solver</SelectItem>
                <SelectItem value="subset-sum">Subset Sum</SelectItem>
                <SelectItem value="graph-coloring">Graph Coloring</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={startVisualization}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Solve
              </Button>
              <Button
                onClick={resetVisualization}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Problem Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            {algorithm === 'n-queens' && (
              <NQueensBoard board={board} solutions={solutions} />
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Decision Tree</CardTitle>
          </CardHeader>
          <CardContent>
            <DecisionTree decisionTree={decisionTree} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
