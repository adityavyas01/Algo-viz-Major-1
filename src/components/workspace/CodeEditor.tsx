
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkspaceCursor } from '@/types/collaboration/workspace';
import { Code } from 'lucide-react';

interface CodeEditorProps {
  sharedCode: string;
  cursors: WorkspaceCursor[];
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  sharedCode,
  cursors
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code className="w-5 h-5" />
          Shared Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-gray-900/50 p-4 rounded-lg text-white/90 text-sm overflow-x-auto">
            <code>{sharedCode}</code>
          </pre>
          
          {/* Live cursors */}
          {cursors.map((cursor) => (
            <div
              key={cursor.userId}
              className="absolute pointer-events-none z-10"
              style={{
                left: cursor.x,
                top: cursor.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div 
                className="w-3 h-3 rounded-full border-2 border-white"
                style={{ backgroundColor: cursor.color }}
              />
              <div 
                className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/70 rounded px-2 py-1 whitespace-nowrap"
              >
                {cursor.username}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
