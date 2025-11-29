export interface SessionState {
  code: string;
  language: string;
  visualizationState: {
    array: any[];
    steps: any[];
  };
}

export interface RealtimeMessage {
  event: 'state-update' | 'cursor-update' | 'user-join' | 'user-leave';
  payload: any;
}
