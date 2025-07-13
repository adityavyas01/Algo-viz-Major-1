
import React from 'react';

interface NQueensBoardProps {
  board: number[][];
  solutions: number[][][];
}

export const NQueensBoard: React.FC<NQueensBoardProps> = ({ board, solutions }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-white font-medium">4-Queens Board</h4>
      <div className="grid grid-cols-4 gap-1 max-w-48">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-12 h-12 flex items-center justify-center border border-white/30 ${
                (i + j) % 2 === 0 ? 'bg-white/20' : 'bg-black/30'
              }`}
            >
              {cell === 1 && (
                <span className="text-yellow-400 text-xl">♛</span>
              )}
            </div>
          ))
        )}
      </div>
      <div className="text-white/80 text-sm">
        <p>Solutions found: {solutions.length}</p>
        <p>The goal is to place queens so none attack each other.</p>
      </div>
    </div>
  );
};
