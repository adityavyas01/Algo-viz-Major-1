
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { TreeNode } from './types';

interface DecisionTreeProps {
  decisionTree: TreeNode[];
}

export const DecisionTree: React.FC<DecisionTreeProps> = ({ decisionTree }) => {
  const renderNode = (node: TreeNode, index: number) => (
    <g key={node.id}>
      <circle
        cx={node.x}
        cy={node.y}
        r="15"
        fill={
          node.isSolution ? "#22c55e" :
          node.isValid ? "#3b82f6" : "#ef4444"
        }
        stroke="white"
        strokeWidth="2"
      />
      {node.isValid ? (
        <CheckCircle 
          x={node.x - 6} 
          y={node.y - 6} 
          width="12" 
          height="12" 
          className="text-white"
        />
      ) : (
        <XCircle 
          x={node.x - 6} 
          y={node.y - 6} 
          width="12" 
          height="12" 
          className="text-white"
        />
      )}
      <text
        x={node.x}
        y={node.y + 25}
        fill="white"
        fontSize="10"
        textAnchor="middle"
      >
        {node.value}
      </text>
      
      {node.children.map((child, childIndex) => (
        <g key={child.id}>
          <line
            x1={node.x}
            y1={node.y + 15}
            x2={child.x}
            y2={child.y - 15}
            stroke="#64748b"
            strokeWidth="1"
          />
          {renderNode(child, childIndex)}
        </g>
      ))}
    </g>
  );

  return (
    <>
      <div className="h-64 overflow-auto bg-black/30 rounded-lg">
        <svg width="100%" height="300" viewBox="0 0 400 300">
          {decisionTree.map((node, index) => renderNode(node, index))}
        </svg>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-white/80">Solution found</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-white/80">Valid partial solution</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-white/80">Invalid (pruned)</span>
        </div>
      </div>
    </>
  );
};
