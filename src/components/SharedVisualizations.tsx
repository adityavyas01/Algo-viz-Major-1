
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SharedVisualization } from '@/types/social';
import { Heart, Eye, Share2, Code, Clock } from 'lucide-react';

interface SharedVisualizationsProps {
  visualizations: SharedVisualization[];
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  onView?: (id: string) => void;
}

export const SharedVisualizations: React.FC<SharedVisualizationsProps> = ({
  visualizations,
  onLike,
  onShare,
  onView
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Shared Visualizations</h2>
      {visualizations.map((viz) => (
        <Card key={viz.id} className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white">{viz.title}</CardTitle>
                <p className="text-white/60 text-sm">by @{viz.username}</p>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Clock className="w-4 h-4" />
                {viz.createdAt.toLocaleDateString()}
              </div>
            </div>
            <p className="text-white/80">{viz.description}</p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                  {viz.algorithmName}
                </Badge>
                <div className="text-sm text-white/60">
                  Time: {viz.complexity.time} | Space: {viz.complexity.space}
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white/60">Implementation</span>
                </div>
                <pre className="text-sm text-white/90 overflow-x-auto">
                  <code>{viz.code}</code>
                </pre>
              </div>

              <div className="flex flex-wrap gap-2">
                {viz.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-white/60">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{viz.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className={`w-4 h-4 ${viz.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-sm">{viz.likes}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-white hover:bg-white/10 ${viz.isLiked ? 'text-red-500' : ''}`}
                    onClick={() => onLike?.(viz.id)}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${viz.isLiked ? 'fill-current' : ''}`} />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={() => onShare?.(viz.id)}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => onView?.(viz.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
