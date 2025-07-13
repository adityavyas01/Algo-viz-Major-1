
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { WorkspaceAnnotation } from '@/types/collaboration/workspace';
import { Eye } from 'lucide-react';

interface VisualizationCanvasProps {
  annotations: WorkspaceAnnotation[];
  onAddAnnotation?: (x: number, y: number, content: string, type: WorkspaceAnnotation['type']) => void;
  onResolveAnnotation?: (annotationId: string) => void;
}

export const VisualizationCanvas: React.FC<VisualizationCanvasProps> = ({
  annotations,
  onAddAnnotation,
  onResolveAnnotation
}) => {
  const [newAnnotation, setNewAnnotation] = useState({ x: 0, y: 0, content: '', show: false });

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setNewAnnotation({ x, y, content: '', show: true });
  };

  const addAnnotation = (type: WorkspaceAnnotation['type']) => {
    if (newAnnotation.content.trim()) {
      onAddAnnotation?.(newAnnotation.x, newAnnotation.y, newAnnotation.content, type);
      setNewAnnotation({ x: 0, y: 0, content: '', show: false });
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Live Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="relative bg-gray-900/50 p-4 rounded-lg min-h-[300px] cursor-crosshair"
          onClick={handleCanvasClick}
        >
          {/* Visualization content would go here */}
          <div className="text-center text-white/70 mt-20">
            <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Live algorithm visualization</p>
            <p className="text-sm mt-1">Click to add annotations</p>
          </div>

          {/* Annotations */}
          {annotations.map((annotation) => (
            <div
              key={annotation.id}
              className="absolute z-20"
              style={{
                left: annotation.x,
                top: annotation.y,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="bg-yellow-400 text-black p-2 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-xs">{annotation.username}</div>
                    <div className="text-sm">{annotation.content}</div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${
                        annotation.type === 'question' ? 'border-blue-400 text-blue-600' :
                        annotation.type === 'comment' ? 'border-gray-400 text-gray-600' :
                        annotation.type === 'suggestion' ? 'border-green-400 text-green-600' :
                        'border-purple-400 text-purple-600'
                      }`}
                    >
                      {annotation.type}
                    </Badge>
                  </div>
                  {!annotation.isResolved && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onResolveAnnotation?.(annotation.id)}
                      className="h-6 w-6 p-0 hover:bg-black/20"
                    >
                      ✓
                    </Button>
                  )}
                </div>
              </div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-yellow-400 mx-auto" />
            </div>
          ))}

          {/* New annotation input */}
          {newAnnotation.show && (
            <div
              className="absolute z-30 bg-white rounded-lg shadow-lg p-3"
              style={{
                left: newAnnotation.x,
                top: newAnnotation.y,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <Textarea
                placeholder="Add your comment..."
                value={newAnnotation.content}
                onChange={(e) => setNewAnnotation(prev => ({ ...prev, content: e.target.value }))}
                className="w-64 h-20 text-sm"
              />
              <div className="flex gap-1 mt-2">
                <Button
                  size="sm"
                  onClick={() => addAnnotation('comment')}
                  className="text-xs"
                >
                  Comment
                </Button>
                <Button
                  size="sm"
                  onClick={() => addAnnotation('question')}
                  variant="outline"
                  className="text-xs"
                >
                  Question
                </Button>
                <Button
                  size="sm"
                  onClick={() => addAnnotation('suggestion')}
                  variant="outline"
                  className="text-xs"
                >
                  Suggest
                </Button>
                <Button
                  size="sm"
                  onClick={() => setNewAnnotation(prev => ({ ...prev, show: false }))}
                  variant="ghost"
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
