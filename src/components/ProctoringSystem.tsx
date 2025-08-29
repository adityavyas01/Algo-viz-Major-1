import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Monitor, Shield, AlertTriangle, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProctoringSystemProps {
  tournamentId: string;
  onPermissionsGranted: () => void;
  onViolationDetected: (violation: string) => void;
}

interface ProctoringPermissions {
  camera: boolean;
  screenRecording: boolean;
  clipboardAccess: boolean;
}

export const ProctoringSystem: React.FC<ProctoringSystemProps> = ({
  tournamentId,
  onPermissionsGranted,
  onViolationDetected,
}) => {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<ProctoringPermissions>({
    camera: false,
    screenRecording: false,
    clipboardAccess: false,
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [videoRef] = useState(useRef<HTMLVideoElement>(null));
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [violations, setViolations] = useState<string[]>([]);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      
      setMediaStream(stream);
      setPermissions(prev => ({ ...prev, camera: true }));
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      toast({
        title: 'Camera Access Granted',
        description: 'Camera monitoring is now active',
      });
    } catch (error) {
      console.error('Camera permission denied:', error);
      toast({
        title: 'Camera Access Required',
        description: 'Please allow camera access to continue with the tournament',
        variant: 'destructive',
      });
    }
  };

  // Request screen recording permission
  const requestScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      
      // We don't actually record, just verify permission
      stream.getTracks().forEach(track => track.stop());
      setPermissions(prev => ({ ...prev, screenRecording: true }));
      
      toast({
        title: 'Screen Recording Permission Granted',
        description: 'Screen monitoring is now active',
      });
    } catch (error) {
      console.error('Screen recording permission denied:', error);
      toast({
        title: 'Screen Recording Required',
        description: 'Please allow screen recording access to continue',
        variant: 'destructive',
      });
    }
  };

  // Setup clipboard monitoring
  const setupClipboardMonitoring = () => {
    const handleClipboard = (e: ClipboardEvent) => {
      if (isMonitoring) {
        const violation = `Clipboard access detected: ${e.type}`;
        setViolations(prev => [...prev, violation]);
        onViolationDetected(violation);
        
        toast({
          title: 'Clipboard Activity Detected',
          description: 'Copy/paste operations are being monitored',
          variant: 'destructive',
        });
      }
    };

    document.addEventListener('copy', handleClipboard);
    document.addEventListener('paste', handleClipboard);
    document.addEventListener('cut', handleClipboard);
    
    setPermissions(prev => ({ ...prev, clipboardAccess: true }));
    
    return () => {
      document.removeEventListener('copy', handleClipboard);
      document.removeEventListener('paste', handleClipboard);
      document.removeEventListener('cut', handleClipboard);
    };
  };

  // Tab switch detection
  const setupTabSwitchDetection = () => {
    const handleVisibilityChange = () => {
      if (document.hidden && isMonitoring) {
        const newCount = tabSwitches + 1;
        setTabSwitches(newCount);
        
        const violation = `Tab switch detected (#${newCount})`;
        setViolations(prev => [...prev, violation]);
        onViolationDetected(violation);
        
        toast({
          title: 'Tab Switch Detected',
          description: `Warning: Switching tabs is not allowed during the tournament`,
          variant: 'destructive',
        });
      }
    };

    const handleFocusChange = () => {
      if (isMonitoring) {
        setLastActivity(Date.now());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleVisibilityChange);
    window.addEventListener('focus', handleFocusChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleVisibilityChange);
      window.removeEventListener('focus', handleFocusChange);
    };
  };

  // Start monitoring
  const startMonitoring = () => {
    if (permissions.camera && permissions.screenRecording && permissions.clipboardAccess) {
      setIsMonitoring(true);
      onPermissionsGranted();
      
      toast({
        title: 'Proctoring Active',
        description: 'All monitoring systems are now active',
      });
    }
  };

  // Cleanup
  const cleanup = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setIsMonitoring(false);
  };

  useEffect(() => {
    const cleanupClipboard = setupClipboardMonitoring();
    const cleanupTabDetection = setupTabSwitchDetection();
    
    return () => {
      cleanupClipboard();
      cleanupTabDetection();
      cleanup();
    };
  }, [isMonitoring]);

  const allPermissionsGranted = Object.values(permissions).every(Boolean);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Proctoring System Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-yellow-500/10 border-yellow-500/20">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-100">
              This tournament requires proctoring for fair play. Please grant all requested permissions.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            {/* Camera Permission */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-white/70" />
                <div>
                  <h4 className="text-white font-medium">Camera Access</h4>
                  <p className="text-white/60 text-sm">Required for identity verification</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {permissions.camera ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Button
                    onClick={requestCameraPermission}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Grant Access
                  </Button>
                )}
              </div>
            </div>

            {/* Screen Recording Permission */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-white/70" />
                <div>
                  <h4 className="text-white font-medium">Screen Recording</h4>
                  <p className="text-white/60 text-sm">Required for activity monitoring</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {permissions.screenRecording ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Button
                    onClick={requestScreenRecording}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Grant Access
                  </Button>
                )}
              </div>
            </div>

            {/* Clipboard Monitoring */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-white/70" />
                <div>
                  <h4 className="text-white font-medium">Clipboard Monitoring</h4>
                  <p className="text-white/60 text-sm">Detects copy/paste activities</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {permissions.clipboardAccess ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <X className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            </div>
          </div>

          {/* Camera Preview */}
          {permissions.camera && (
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Camera Preview</h4>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-32 h-24 bg-black rounded border border-white/20"
              />
            </div>
          )}

          {/* Start Monitoring Button */}
          {allPermissionsGranted && !isMonitoring && (
            <Button
              onClick={startMonitoring}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Start Tournament with Proctoring
            </Button>
          )}

          {/* Monitoring Status */}
          {isMonitoring && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Proctoring Active</span>
              </div>
              <div className="text-white/70 text-sm space-y-1">
                <div>Tab switches: {tabSwitches}</div>
                <div>Violations: {violations.length}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
