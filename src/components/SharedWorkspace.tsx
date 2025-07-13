
import React from 'react';
import { SharedWorkspace, WorkspaceAnnotation } from '@/types/collaboration/workspace';
import { 
  WorkspaceHeader,
  CodeEditor,
  VisualizationCanvas,
  ParticipantsList
} from '@/components/workspace';

interface SharedWorkspaceComponentProps {
  workspace: SharedWorkspace;
  onRunCode?: () => void;
  onPauseExecution?: () => void;
  onStopExecution?: () => void;
  onSaveWorkspace?: () => void;
  onAddAnnotation?: (x: number, y: number, content: string, type: WorkspaceAnnotation['type']) => void;
  onResolveAnnotation?: (annotationId: string) => void;
}

export const SharedWorkspaceComponent: React.FC<SharedWorkspaceComponentProps> = ({
  workspace,
  onRunCode,
  onPauseExecution,
  onStopExecution,
  onSaveWorkspace,
  onAddAnnotation,
  onResolveAnnotation
}) => {
  return (
    <div className="space-y-6">
      <WorkspaceHeader
        workspace={workspace}
        onRunCode={onRunCode}
        onPauseExecution={onPauseExecution}
        onStopExecution={onStopExecution}
        onSaveWorkspace={onSaveWorkspace}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeEditor
          sharedCode={workspace.sharedCode}
          cursors={workspace.cursors}
        />

        <VisualizationCanvas
          annotations={workspace.annotations}
          onAddAnnotation={onAddAnnotation}
          onResolveAnnotation={onResolveAnnotation}
        />
      </div>

      <ParticipantsList cursors={workspace.cursors} />
    </div>
  );
};
