
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Accessibility, 
  Mic, 
  Volume2, 
  Eye, 
  Keyboard, 
  MousePointer,
  Users,
  Settings,
  CheckCircle,
  Headphones,
  Hand,
  Brain,
  Heart
} from 'lucide-react';

interface AccessibilityProfile {
  name: string;
  description: string;
  settings: {
    textSize: number;
    contrast: boolean;
    motion: boolean;
    audio: boolean;
    voiceControl: boolean;
  };
}

interface VoiceCommand {
  command: string;
  action: string;
  category: 'navigation' | 'interaction' | 'content' | 'system';
}

export const EnhancedAccessibilityFeatures: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState('default');
  const [voiceControlActive, setVoiceControlActive] = useState(false);
  const [audioDescription, setAudioDescription] = useState(true);
  const [textSize, setTextSize] = useState([100]);
  const [contrastLevel, setContrastLevel] = useState([100]);
  const [motionSensitivity, setMotionSensitivity] = useState([50]);
  const [isListening, setIsListening] = useState(false);

  const accessibilityProfiles: AccessibilityProfile[] = [
    {
      name: 'Default',
      description: 'Standard accessibility settings',
      settings: { textSize: 100, contrast: false, motion: false, audio: false, voiceControl: false }
    },
    {
      name: 'Visual Impairment',
      description: 'High contrast, large text, screen reader optimized',
      settings: { textSize: 150, contrast: true, motion: false, audio: true, voiceControl: true }
    },
    {
      name: 'Motor Impairment',
      description: 'Voice control, keyboard navigation, reduced motion',
      settings: { textSize: 120, contrast: false, motion: false, audio: false, voiceControl: true }
    },
    {
      name: 'Cognitive Assistance',
      description: 'Simplified interface, audio cues, reduced distractions',
      settings: { textSize: 120, contrast: true, motion: false, audio: true, voiceControl: false }
    },
    {
      name: 'Hearing Impairment',
      description: 'Visual alerts, captions, vibration feedback',
      settings: { textSize: 100, contrast: true, motion: true, audio: false, voiceControl: false }
    }
  ];

  const voiceCommands: VoiceCommand[] = [
    { command: 'Go to algorithms', action: 'Navigate to algorithms section', category: 'navigation' },
    { command: 'Start visualization', action: 'Begin algorithm visualization', category: 'interaction' },
    { command: 'Pause animation', action: 'Pause current animation', category: 'interaction' },
    { command: 'Increase speed', action: 'Increase animation speed', category: 'interaction' },
    { command: 'Read description', action: 'Read algorithm description aloud', category: 'content' },
    { command: 'Next step', action: 'Move to next algorithm step', category: 'interaction' },
    { command: 'Previous step', action: 'Move to previous algorithm step', category: 'interaction' },
    { command: 'Open settings', action: 'Open accessibility settings', category: 'system' },
    { command: 'Help me', action: 'Show available voice commands', category: 'system' }
  ];

  const applyProfile = (profileName: string) => {
    const profile = accessibilityProfiles.find(p => p.name === profileName);
    if (profile) {
      setTextSize([profile.settings.textSize]);
      setContrastLevel([profile.settings.contrast ? 150 : 100]);
      setMotionSensitivity([profile.settings.motion ? 25 : 50]);
      setAudioDescription(profile.settings.audio);
      setVoiceControlActive(profile.settings.voiceControl);
      setCurrentProfile(profileName);
    }
  };

  const toggleVoiceControl = () => {
    setVoiceControlActive(!voiceControlActive);
    if (!voiceControlActive && 'webkitSpeechRecognition' in window) {
      // Initialize speech recognition
      console.log('Voice control activated');
    }
  };

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      console.log('Voice command processed');
    }, 3000);
  };

  const getCategoryIcon = (category: VoiceCommand['category']) => {
    switch (category) {
      case 'navigation': return <MousePointer className="w-4 h-4" />;
      case 'interaction': return <Hand className="w-4 h-4" />;
      case 'content': return <Volume2 className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    // Apply text size changes to document
    document.documentElement.style.fontSize = `${textSize[0]}%`;
    
    // Apply contrast changes
    if (contrastLevel[0] > 120) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    return () => {
      document.documentElement.style.fontSize = '';
      document.body.classList.remove('high-contrast');
    };
  }, [textSize, contrastLevel]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Advanced Accessibility Features</h2>
        <p className="text-white/70">Comprehensive accessibility support including voice control and screen reader optimization</p>
      </div>

      {/* Quick Profile Selection */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Accessibility Profiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {accessibilityProfiles.map((profile, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentProfile === profile.name 
                    ? 'bg-cyan-500/20 border border-cyan-500/50' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => applyProfile(profile.name)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-medium text-sm">{profile.name}</h4>
                  {currentProfile === profile.name && (
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                  )}
                </div>
                <p className="text-white/60 text-xs">{profile.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Voice Control */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Voice Commands</span>
                <p className="text-white/60 text-sm">Control the app using voice</p>
              </div>
              <Switch 
                checked={voiceControlActive}
                onCheckedChange={toggleVoiceControl}
              />
            </div>

            {voiceControlActive && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={startListening}
                    disabled={isListening}
                    className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    <Mic className={`w-4 h-4 mr-2 ${isListening ? 'animate-pulse' : ''}`} />
                    {isListening ? 'Listening...' : 'Start Listening'}
                  </Button>
                  
                  {isListening && (
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Say a command
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Available Commands</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {voiceCommands.map((cmd, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded text-sm">
                        {getCategoryIcon(cmd.category)}
                        <div>
                          <span className="text-cyan-400">"{cmd.command}"</span>
                          <p className="text-white/60 text-xs">{cmd.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Audio Descriptions */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              Audio Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Audio Descriptions</span>
                <p className="text-white/60 text-sm">Narrate visual elements</p>
              </div>
              <Switch 
                checked={audioDescription}
                onCheckedChange={setAudioDescription}
              />
            </div>

            {audioDescription && (
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium">Narration Speed</label>
                  <Slider 
                    value={[100]} 
                    onValueChange={() => {}}
                    max={200}
                    min={50}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-white/60 text-xs mt-1">
                    <span>Slow</span>
                    <span>Normal</span>
                    <span>Fast</span>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium">Voice</label>
                  <Select defaultValue="default">
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Voice</SelectItem>
                      <SelectItem value="female">Female Voice</SelectItem>
                      <SelectItem value="male">Male Voice</SelectItem>
                      <SelectItem value="natural">Natural Voice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm">Audio Description Types</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Algorithm Steps', enabled: true },
                      { label: 'Data Changes', enabled: true },
                      { label: 'UI Interactions', enabled: false },
                      { label: 'Navigation Hints', enabled: true }
                    ].map((type, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">{type.label}</span>
                        <Switch defaultChecked={type.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Visual Adjustments */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Visual Adjustments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-white text-sm font-medium">Text Size</label>
              <Slider 
                value={textSize} 
                onValueChange={setTextSize}
                max={200}
                min={75}
                step={25}
                className="mt-2"
              />
              <div className="flex justify-between text-white/60 text-xs mt-1">
                <span>75%</span>
                <span>{textSize[0]}%</span>
                <span>200%</span>
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium">Contrast Level</label>
              <Slider 
                value={contrastLevel} 
                onValueChange={setContrastLevel}
                max={200}
                min={50}
                step={25}
                className="mt-2"
              />
              <div className="flex justify-between text-white/60 text-xs mt-1">
                <span>Low</span>
                <span>{contrastLevel[0]}%</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium">Motion Sensitivity</label>
              <Slider 
                value={motionSensitivity} 
                onValueChange={setMotionSensitivity}
                max={100}
                min={0}
                step={25}
                className="mt-2"
              />
              <div className="flex justify-between text-white/60 text-xs mt-1">
                <span>None</span>
                <span>{motionSensitivity[0]}%</span>
                <span>Full</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-medium mb-3">Color & Visual</h4>
              <div className="space-y-2">
                {[
                  { label: 'Color Blind Safe Palette', enabled: false },
                  { label: 'Focus Indicators', enabled: true },
                  { label: 'Reduced Transparency', enabled: false },
                  { label: 'Simplified Animations', enabled: false }
                ].map((option, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">{option.label}</span>
                    <Switch defaultChecked={option.enabled} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Navigation</h4>
              <div className="space-y-2">
                {[
                  { label: 'Skip Links', enabled: true },
                  { label: 'Keyboard Shortcuts', enabled: true },
                  { label: 'Tab Navigation', enabled: true },
                  { label: 'Gesture Controls', enabled: false }
                ].map((option, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">{option.label}</span>
                    <Switch defaultChecked={option.enabled} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assistive Technology Support */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Assistive Technology Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Screen Readers</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-white">NVDA Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-white">JAWS Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-white">VoiceOver Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-white">TalkBack Compatible</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Input Methods</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-blue-400" />
                  <span className="text-white">Full Keyboard Navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-green-400" />
                  <span className="text-white">Voice Commands</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span className="text-white">Eye Tracking Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hand className="w-4 h-4 text-orange-400" />
                  <span className="text-white">Switch Control</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              Accessibility Commitment
            </h4>
            <p className="text-white/70 text-sm">
              AlgoViz is committed to providing an inclusive learning experience for all users. 
              We continuously work to meet and exceed WCAG 2.1 AA standards and actively seek 
              feedback from our accessibility community to improve our platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
