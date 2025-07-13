
export interface SharedWorkspace {
  id: string;
  sessionId: string;
  algorithmId: string;
  sharedCode: string;
  sharedVisualization: any;
  currentInput: any;
  executionState: 'idle' | 'running' | 'paused' | 'completed' | 'error';
  cursors: WorkspaceCursor[];
  annotations: WorkspaceAnnotation[];
  lastModified: Date;
  modifiedBy: string;
}

export interface WorkspaceCursor {
  userId: string;
  username: string;
  x: number;
  y: number;
  color: string;
  isActive: boolean;
}

export interface WorkspaceAnnotation {
  id: string;
  userId: string;
  username: string;
  x: number;
  y: number;
  content: string;
  type: 'comment' | 'question' | 'suggestion' | 'highlight';
  createdAt: Date;
  isResolved: boolean;
}
