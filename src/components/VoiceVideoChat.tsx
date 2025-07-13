
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { VoiceChatRoom, VideoChatRoom, VoiceParticipant, VideoParticipant } from '@/types/collaboration';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff,
  Volume2,
  VolumeX,
  Monitor,
  MonitorOff,
  Settings,
  Users,
  Grid3X3,
  Maximize
} from 'lucide-react';

interface VoiceVideoChatProps {
  voiceRoom?: VoiceChatRoom;
  videoRoom?: VideoChatRoom;
  onToggleMic?: (muted: boolean) => void;
  onToggleVideo?: (enabled: boolean) => void;
  onStartScreenShare?: () => void;
  onStopScreenShare?: () => void;
  onJoinVoice?: () => void;
  onLeaveVoice?: () => void;
  onJoinVideo?: () => void;
  onLeaveVideo?: () => void;
  onKickParticipant?: (userId: string) => void;
}

export const VoiceVideoChat: React.FC<VoiceVideoChatProps> = ({
  voiceRoom,
  videoRoom,
  onToggleMic,
  onToggleVideo,
  onStartScreenShare,
  onStopScreenShare,
  onJoinVoice,
  onLeaveVoice,
  onJoinVideo,
  onLeaveVideo,
  onKickParticipant
}) => {
  const [selectedTab, setSelectedTab] = useState<'voice' | 'video'>('voice');
  const [localMuted, setLocalMuted] = useState(false);
  const [localVideoEnabled, setLocalVideoEnabled] = useState(false);
  const [volume, setVolume] = useState([80]);

  const handleToggleMic = () => {
    const newMuted = !localMuted;
    setLocalMuted(newMuted);
    onToggleMic?.(newMuted);
  };

  const handleToggleVideo = () => {
    const newVideoEnabled = !localVideoEnabled;
    setLocalVideoEnabled(newVideoEnabled);
    onToggleVideo?.(newVideoEnabled);
  };

  const getLayoutIcon = (layout: VideoChatRoom['layout']) => {
    switch (layout) {
      case 'grid': return <Grid3X3 className="w-4 h-4" />;
      case 'spotlight': return <Maximize className="w-4 h-4" />;
      case 'sidebar': return <Monitor className="w-4 h-4" />;
      default: return <Grid3X3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Communication</h2>
        <div className="flex gap-1">
          <Button
            variant={selectedTab === 'voice' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('voice')}
            className={selectedTab === 'voice' ? 'bg-blue-600' : 'text-white hover:bg-white/10'}
          >
            <Mic className="w-4 h-4 mr-2" />
            Voice
          </Button>
          <Button
            variant={selectedTab === 'video' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('video')}
            className={selectedTab === 'video' ? 'bg-blue-600' : 'text-white hover:bg-white/10'}
          >
            <Video className="w-4 h-4 mr-2" />
            Video
          </Button>
        </div>
      </div>

      {selectedTab === 'voice' && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Voice Chat
                {voiceRoom?.isActive && (
                  <Badge variant="outline" className="bg-green-500 text-white border-0">
                    Active
                  </Badge>
                )}
              </CardTitle>
              
              <div className="flex gap-2">
                {voiceRoom?.isActive ? (
                  <Button
                    onClick={onLeaveVoice}
                    size="sm"
                    variant="destructive"
                  >
                    <PhoneOff className="w-4 h-4 mr-2" />
                    Leave
                  </Button>
                ) : (
                  <Button
                    onClick={onJoinVoice}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Join Voice
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {voiceRoom?.isActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handleToggleMic}
                      size="sm"
                      variant={localMuted ? 'destructive' : 'default'}
                      className={localMuted ? '' : 'bg-green-600 hover:bg-green-700'}
                    >
                      {localMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-white/60" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-24"
                      />
                      <span className="text-sm text-white/70 w-8">{volume[0]}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white/70">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{voiceRoom.participants.length} participants</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Participants</h4>
                  {voiceRoom.participants.map((participant) => (
                    <div 
                      key={participant.userId}
                      className="flex items-center justify-between bg-black/10 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs">
                            {participant.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{participant.username}</span>
                        
                        <div className="flex items-center gap-2">
                          {participant.isSpeaking && (
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-xs text-green-400">Speaking</span>
                            </div>
                          )}
                          
                          {participant.isMuted ? (
                            <MicOff className="w-4 h-4 text-red-400" />
                          ) : (
                            <Mic className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-white/60" />
                          <div className="w-12 bg-gray-700 rounded-full h-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full transition-all"
                              style={{ width: `${participant.volume * 100}%` }}
                            />
                          </div>
                        </div>

                        {participant.permissions.canKick && participant.userId !== 'current-user' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onKickParticipant?.(participant.userId)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          >
                            Kick
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Phone className="w-12 h-12 text-white/50 mx-auto mb-3" />
                <p className="text-white/70">Voice chat is not active</p>
                <p className="text-white/50 text-sm mt-1">Join to start talking with others</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedTab === 'video' && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Chat
                {videoRoom?.isActive && (
                  <Badge variant="outline" className="bg-green-500 text-white border-0">
                    Active
                  </Badge>
                )}
              </CardTitle>
              
              <div className="flex gap-2">
                {videoRoom?.isActive ? (
                  <>
                    <Button
                      onClick={handleToggleVideo}
                      size="sm"
                      variant={localVideoEnabled ? 'default' : 'outline'}
                      className={localVideoEnabled ? 'bg-blue-600' : 'border-white/30 text-white hover:bg-white/10'}
                    >
                      {localVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      onClick={videoRoom.settings.hasScreenShare ? onStopScreenShare : onStartScreenShare}
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      {videoRoom.settings.hasScreenShare ? <MonitorOff className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      onClick={onLeaveVideo}
                      size="sm"
                      variant="destructive"
                    >
                      <VideoOff className="w-4 h-4 mr-2" />
                      Leave
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={onJoinVideo}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join Video
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {videoRoom?.isActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white/70 text-sm">Layout:</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      {getLayoutIcon(videoRoom.layout)}
                      <span className="ml-2 capitalize">{videoRoom.layout}</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <span>{videoRoom.participants.length} participants</span>
                    <span>•</span>
                    <span>Quality: {videoRoom.settings.quality}</span>
                    {videoRoom.settings.isRecording && (
                      <>
                        <span>•</span>
                        <Badge variant="outline" className="border-red-400 text-red-300">
                          Recording
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {videoRoom.participants.map((participant) => (
                    <div 
                      key={participant.userId}
                      className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden"
                    >
                      {participant.hasVideo ? (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <span className="text-white/70">Video Stream</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xl">
                              {participant.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-white text-sm bg-black/50 rounded px-2 py-1">
                          {participant.username}
                        </span>
                        <div className="flex gap-1">
                          {!participant.hasVideo && (
                            <VideoOff className="w-4 h-4 text-red-400" />
                          )}
                          {participant.isScreenSharing && (
                            <Monitor className="w-4 h-4 text-blue-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Video className="w-12 h-12 text-white/50 mx-auto mb-3" />
                <p className="text-white/70">Video chat is not active</p>
                <p className="text-white/50 text-sm mt-1">Join to see and share video</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
