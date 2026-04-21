import React from 'react';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff, Share2, Settings } from 'lucide-react';

interface MediaControlsProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleScreenShare: () => void;
}

export const MediaControls: React.FC<MediaControlsProps> = ({
  isVideoEnabled,
  isAudioEnabled,
  isScreenSharing,
  onToggleVideo,
  onToggleAudio,
  onToggleScreenShare
}) => {
  return (
    <div className="flex items-center gap-2 bg-black/80 rounded-full px-4 py-2">
      <Button
        onClick={onToggleVideo}
        size="sm"
        variant={isVideoEnabled ? "default" : "outline"}
        className="rounded-full"
      >
        {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
      </Button>
      <Button
        onClick={onToggleAudio}
        size="sm"
        variant={isAudioEnabled ? "default" : "destructive"}
        className="rounded-full"
      >
        {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      </Button>
      <Button
        onClick={onToggleScreenShare}
        size="sm"
        variant={isScreenSharing ? "destructive" : "outline"}
        className="rounded-full"
      >
        <Share2 className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="rounded-full"
      >
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  );
};
