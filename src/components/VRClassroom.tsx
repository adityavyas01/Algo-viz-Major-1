
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Text } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Headphones, Users, Hand, Video } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  position: [number, number, number];
  isPresenting: boolean;
  handRaised: boolean;
  color: string;
}

interface VRObject {
  id: string;
  type: 'cube' | 'sphere' | 'text';
  position: [number, number, number];
  content?: string;
  color: string;
}

const ParticipantAvatar: React.FC<{ participant: Participant }> = ({ participant }) => {
  const meshRef = useRef<any>();
  
  useFrame(() => {
    if (meshRef.current && participant.isPresenting) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={participant.position}>
      <Sphere ref={meshRef} args={[0.5]}>
        <meshStandardMaterial 
          color={participant.isPresenting ? '#fbbf24' : participant.color}
          emissive={participant.isPresenting ? '#444400' : '#000000'}
        />
      </Sphere>
      {participant.handRaised && (
        <Box position={[0, 1.5, 0]} args={[0.2, 0.5, 0.1]}>
          <meshStandardMaterial color="#22c55e" />
        </Box>
      )}
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {participant.name}
      </Text>
    </group>
  );
};

const VREnvironment: React.FC<{ objects: VRObject[] }> = ({ objects }) => {
  return (
    <group>
      {/* Virtual classroom environment */}
      <Box position={[0, -2, 0]} args={[20, 0.2, 20]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>
      
      <group>
        {/* Whiteboard */}
        <Box position={[0, 2, -8]} args={[12, 6, 0.2]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        
        {/* Virtual objects in the scene */}
        {objects.map(obj => (
          <group key={obj.id} position={obj.position}>
            {obj.type === 'cube' && (
              <Box args={[1, 1, 1]}>
                <meshStandardMaterial color={obj.color} />
              </Box>
            )}
            {obj.type === 'sphere' && (
              <Sphere args={[0.5]}>
                <meshStandardMaterial color={obj.color} />
              </Sphere>
            )}
            {obj.type === 'text' && obj.content && (
              <Text
                fontSize={0.5}
                color={obj.color}
                anchorX="center"
                anchorY="middle"
              >
                {obj.content}
              </Text>
            )}
          </group>
        ))}
      </group>
    </group>
  );
};

export const VRClassroom: React.FC = () => {
  const [mode, setMode] = useState<'observe' | 'present' | 'collaborate'>('observe');
  const [handTracking, setHandTracking] = useState(false);
  const [voiceChat, setVoiceChat] = useState(false);
  
  const participants: Participant[] = [
    { id: '1', name: 'Alice', position: [2, 0, 2], isPresenting: false, handRaised: false, color: '#3b82f6' },
    { id: '2', name: 'Bob', position: [-2, 0, 2], isPresenting: true, handRaised: false, color: '#22c55e' },
    { id: '3', name: 'Charlie', position: [0, 0, 4], isPresenting: false, handRaised: true, color: '#ef4444' },
    { id: '4', name: 'Diana', position: [4, 0, 0], isPresenting: false, handRaised: false, color: '#f59e0b' }
  ];

  const vrObjects: VRObject[] = [
    { id: 'tree1', type: 'sphere', position: [-3, 1, -3], color: '#22c55e' },
    { id: 'tree2', type: 'sphere', position: [3, 1, -3], color: '#3b82f6' },
    { id: 'title', type: 'text', position: [0, 4, -7], content: 'Binary Search Tree', color: '#ffffff' },
    { id: 'cube1', type: 'cube', position: [-6, 1, 0], color: '#8b5cf6' }
  ];

  const toggleHandTracking = () => {
    setHandTracking(!handTracking);
  };

  const toggleVoiceChat = () => {
    setVoiceChat(!voiceChat);
  };

  const startPresentation = () => {
    setMode('present');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            VR Collaborative Classroom
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={mode} onValueChange={(value: typeof mode) => setMode(value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="observe">Observer Mode</SelectItem>
                <SelectItem value="present">Presenter Mode</SelectItem>
                <SelectItem value="collaborate">Collaborative Mode</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={toggleHandTracking}
              variant={handTracking ? "default" : "outline"}
              className={handTracking ? "bg-green-600 hover:bg-green-700" : "border-white/30 text-white hover:bg-white/10"}
            >
              <Hand className="w-4 h-4 mr-2" />
              Hand Tracking
            </Button>

            <Button
              onClick={toggleVoiceChat}
              variant={voiceChat ? "default" : "outline"}
              className={voiceChat ? "bg-blue-600 hover:bg-blue-700" : "border-white/30 text-white hover:bg-white/10"}
            >
              <Video className="w-4 h-4 mr-2" />
              Voice Chat
            </Button>

            <Button
              onClick={startPresentation}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Users className="w-4 h-4 mr-2" />
              Start Session
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <div className="h-96 w-full">
            <Canvas
              camera={{ position: [10, 5, 10], fov: 60 }}
              style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} />
                <pointLight position={[-10, 10, -10]} />
                <pointLight position={[0, 15, 0]} />
                
                <VREnvironment objects={vrObjects} />
                
                {participants.map(participant => (
                  <ParticipantAvatar key={participant.id} participant={participant} />
                ))}
                
                <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
              </Suspense>
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Participants ({participants.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/80 text-sm">
            {participants.map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <span>{p.name}</span>
                <div className="flex gap-2">
                  {p.isPresenting && <span className="text-yellow-400">🎤</span>}
                  {p.handRaised && <span className="text-green-400">✋</span>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">VR Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/80 text-sm">
            <p>• <strong>Hand Tracking:</strong> {handTracking ? 'Active' : 'Inactive'}</p>
            <p>• <strong>Voice Chat:</strong> {voiceChat ? 'Connected' : 'Disconnected'}</p>
            <p>• <strong>3D Interaction:</strong> Enabled</p>
            <p>• <strong>Spatial Audio:</strong> Active</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Current Mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/80 text-sm">
            {mode === 'observe' && (
              <>
                <p>• <strong>Observer Mode:</strong> Watch presentations</p>
                <p>• Can raise hand to ask questions</p>
                <p>• Navigate freely in VR space</p>
              </>
            )}
            {mode === 'present' && (
              <>
                <p>• <strong>Presenter Mode:</strong> Lead the session</p>
                <p>• Create and manipulate 3D objects</p>
                <p>• Control classroom environment</p>
              </>
            )}
            {mode === 'collaborate' && (
              <>
                <p>• <strong>Collaborative Mode:</strong> Work together</p>
                <p>• Shared editing capabilities</p>
                <p>• Real-time synchronization</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
