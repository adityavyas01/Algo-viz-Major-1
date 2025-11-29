import React, { useState, useEffect } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ModernBacktrackingVisualization: React.FC = () => {
  const { toast } = useToast();
  const [boardSize, setBoardSize] = useState(8);
  const [board, setBoard] = useState<number[][]>([]);
  const [solutions, setSolutions] = useState<number[][][]>([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [animationStep, setAnimationStep] = useState<{ row: number, col: number, valid: boolean } | null>(null);

  const createBoard = (size: number) => Array.from({ length: size }, () => Array(size).fill(0));

  useEffect(() => {
    setBoard(createBoard(boardSize));
    setSolutions([]);
    setCurrentSolutionIndex(0);
  }, [boardSize]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const isSafe = (currentBoard: number[][], row: number, col: number, size: number): boolean => {
    // Check this row on left side
    for (let i = 0; i < col; i++) if (currentBoard[row][i] === 1) return false;
    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (currentBoard[i][j] === 1) return false;
    // Check lower diagonal on left side
    for (let i = row, j = col; i < size && j >= 0; i++, j--) if (currentBoard[i][j] === 1) return false;
    return true;
  };

  const solveNQueens = async (currentBoard: number[][], col: number, size: number, foundSolutions: number[][][]) => {
    if (col >= size) {
      foundSolutions.push(currentBoard.map(r => [...r]));
      setSolutions([...foundSolutions]);
      // Stop after finding a certain number of solutions to avoid browser freeze
      if (foundSolutions.length >= 100) return true; 
      return false;
    }

    for (let i = 0; i < size; i++) {
      const safe = isSafe(currentBoard, i, col, size);
      setAnimationStep({ row: i, col, valid: safe });
      setBoard(currentBoard.map((r, rIdx) => r.map((c, cIdx) => (rIdx === i && cIdx === col ? 2 : c))));
      await delay(50);

      if (safe) {
        currentBoard[i][col] = 1;
        setBoard(currentBoard.map(r => [...r]));
        await delay(50);

        if (await solveNQueens(currentBoard, col + 1, size, foundSolutions)) {
          return true; // Stop if limit reached
        }

        // Backtrack
        currentBoard[i][col] = 0;
        setBoard(currentBoard.map(r => [...r]));
        setAnimationStep(null);
        await delay(50);
      }
    }
    return false;
  };

  const handleSolve = async () => {
    setIsSolving(true);
    setSolutions([]);
    setCurrentSolutionIndex(0);
    const initialBoard = createBoard(boardSize);
    const foundSolutions: number[][][] = [];
    await solveNQueens(initialBoard, 0, boardSize, foundSolutions);
    setIsSolving(false);
    setAnimationStep(null);
    if (foundSolutions.length > 0) {
      setBoard(foundSolutions[0]);
      toast({ title: "N-Queens Solved", description: `Found ${foundSolutions.length} solutions.` });
    } else {
      toast({ title: "N-Queens", description: "No solution found." });
    }
  };

  const handleBoardSizeChange = (value: number[]) => {
    setBoardSize(value[0]);
  };

  const interactiveControls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">N-Queens Problem</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="board-size">Board Size: {boardSize}x{boardSize}</Label>
          <Slider
            id="board-size"
            min={4} max={10} step={1}
            value={[boardSize]}
            onValueChange={handleBoardSizeChange}
            disabled={isSolving}
          />
        </div>
        <Button onClick={handleSolve} disabled={isSolving} className="w-full">
          <Play className="w-4 h-4 mr-2" />
          {isSolving ? 'Solving...' : 'Solve'}
        </Button>
        {solutions.length > 1 && (
          <div className="space-y-2">
            <Label>Solution {currentSolutionIndex + 1} of {solutions.length}</Label>
            <div className="flex gap-2">
              <Button onClick={() => {
                const newIndex = (currentSolutionIndex - 1 + solutions.length) % solutions.length;
                setCurrentSolutionIndex(newIndex);
                setBoard(solutions[newIndex]);
              }} disabled={isSolving}>Prev</Button>
              <Button onClick={() => {
                const newIndex = (currentSolutionIndex + 1) % solutions.length;
                setCurrentSolutionIndex(newIndex);
                setBoard(solutions[newIndex]);
              }} disabled={isSolving}>Next</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const cellSize = Math.max(20, 400 / boardSize);

  const visualization = (
    <div className="flex justify-center items-center p-4 bg-gray-900 rounded-lg border border-gray-700">
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`, gap: '2px' }}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="flex justify-center items-center transition-colors duration-300"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: animationStep?.row === i && animationStep?.col === j
                  ? (animationStep.valid ? 'rgba(74, 222, 128, 0.5)' : 'rgba(248, 113, 113, 0.5)')
                  : ((i + j) % 2 === 0 ? '#4A5568' : '#2D3748'),
              }}
            >
              {cell === 1 && <span style={{ fontSize: `${cellSize * 0.6}px` }}>♕</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <ModernVisualizationBase
      title="Backtracking"
      description="A visualization of the N-Queens problem, a classic example of the backtracking algorithm."
      difficulty="Intermediate"
      category="Algorithmic Paradigms"
      complexity={{
        time: "O(N!)",
        space: "O(N^2)",
      }}
      interactiveControls={interactiveControls}
    >
      {visualization}
    </ModernVisualizationBase>
  );
};

export default ModernBacktrackingVisualization;
