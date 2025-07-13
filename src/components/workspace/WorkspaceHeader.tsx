
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SharedWorkspace } from '@/types/collaboration/workspace';
import { 
  Play, 
  Pause, 
  Square, 
  Save, 
  Users
} from 'lucide-react';

interface WorkspaceHeaderProps {
  workspace: SharedWorkspace;
  onRunCode?: () => void;
  onPauseExecution?: () => void;
  onStopExecution?: () => void;
  onSaveWorkspace?: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  workspace,
  onRunCode,
  onPauseExecution,
  onStopExecution,
  onSaveWorkspace
}) => {
  const getExecutionStatusColor = () => {
    switch (workspace.executionState) {
      case 'running': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getExecutionStatusText = () => {
    switch (workspace.executionState) {
      case 'running': return 'Running';
      case 'paused': return 'Paused';
      case 'error': return 'Error';
      case 'completed': return 'Completed';
      default: return 'Idle';
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Shared Workspace</h2>
        <Badge 
          variant="outline" 
          className={`${getExecutionStatusColor()} text-white border-0`}
        >
          {getExecutionStatusText()}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-white/70">
          <Users className="w-4 h-4" />
          <span className="text-sm">{workspace.cursors.length} active</span>
        </div>
        
        <div className="flex gap-2">
          {workspace.executionState === 'idle' || workspace.executionState === 'paused' ? (
            <Button
              onClick={onRunCode}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Run
            </Button>
          ) : workspace.executionState === 'running' ? (
            <Button
              onClick={onPauseExecution}
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          ) : null}
          
          <Button
            onClick={onStopExecution}
            size="sm"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
          
          <Button
            onClick={onSaveWorkspace}
            size="sm"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
