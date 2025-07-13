
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Smartphone, 
  Download, 
  Wifi, 
  WifiOff, 
  Database, 
  RefreshCw, 
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  Cloud,
  HardDrive
} from 'lucide-react';

interface PWACapability {
  name: string;
  status: 'available' | 'unavailable' | 'partial';
  description: string;
}

interface OfflineContent {
  type: string;
  size: string;
  lastSync: string;
  cached: boolean;
}

export const PWACapabilities: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [offlineEnabled, setOfflineEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [storageUsed, setStorageUsed] = useState(0);

  const capabilities: PWACapability[] = [
    { 
      name: 'Offline Access', 
      status: 'available', 
      description: 'Full access to cached content when offline' 
    },
    { 
      name: 'Push Notifications', 
      status: 'available', 
      description: 'Receive updates and reminders' 
    },
    { 
      name: 'Background Sync', 
      status: 'available', 
      description: 'Sync data when connection returns' 
    },
    { 
      name: 'Camera Access', 
      status: 'partial', 
      description: 'Access camera for code scanning' 
    },
    { 
      name: 'File System', 
      status: 'unavailable', 
      description: 'Direct file system access (not supported)' 
    }
  ];

  const offlineContent: OfflineContent[] = [
    { type: 'Algorithm Visualizations', size: '45.2 MB', lastSync: '2 min ago', cached: true },
    { type: 'Tutorial Videos', size: '128.7 MB', lastSync: '1 hour ago', cached: true },
    { type: 'Code Examples', size: '12.8 MB', lastSync: '5 min ago', cached: true },
    { type: 'Practice Problems', size: '8.3 MB', lastSync: '30 min ago', cached: false },
    { type: 'User Progress', size: '2.1 MB', lastSync: 'Just now', cached: true }
  ];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Simulate storage usage
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(estimate => {
        const used = estimate.usage || 0;
        const quota = estimate.quota || 100 * 1024 * 1024; // 100MB default
        setStorageUsed((used / quota) * 100);
      });
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
      }
    }
  };

  const handleEnableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  const handleSync = async () => {
    setSyncInProgress(true);
    // Simulate sync process
    setTimeout(() => {
      setSyncInProgress(false);
    }, 2000);
  };

  const getStatusIcon = (status: PWACapability['status']) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'partial': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'unavailable': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: PWACapability['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      case 'unavailable': return 'bg-red-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">PWA Capabilities</h2>
        <p className="text-white/70">Progressive Web App features for enhanced mobile experience</p>
      </div>

      {/* Connection Status */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              <div>
                <h3 className="text-white font-medium">
                  {isOnline ? 'Online' : 'Offline Mode'}
                </h3>
                <p className="text-white/60 text-sm">
                  {isOnline ? 'All features available' : 'Using cached content'}
                </p>
              </div>
            </div>
            {!isOnline && (
              <Button 
                onClick={handleSync}
                disabled={syncInProgress}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncInProgress ? 'animate-spin' : ''}`} />
                {syncInProgress ? 'Syncing...' : 'Sync'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Installation & Features */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              App Installation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isInstalled && installPrompt && (
              <div className="p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Install AlgoViz</h4>
                    <p className="text-white/70 text-sm">Get the full app experience</p>
                  </div>
                  <Button 
                    onClick={handleInstallApp}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install
                  </Button>
                </div>
              </div>
            )}

            {isInstalled && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-white">App is installed</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-white font-medium">PWA Features</h4>
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(capability.status)}
                    <div>
                      <span className="text-white">{capability.name}</span>
                      <p className="text-white/60 text-sm">{capability.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(capability.status)} text-white`}>
                    {capability.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white">Push Notifications</span>
                  <p className="text-white/60 text-sm">Get updates and reminders</p>
                </div>
                <Switch 
                  checked={notificationsEnabled}
                  onCheckedChange={handleEnableNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white">Offline Content</span>
                  <p className="text-white/60 text-sm">Cache content for offline use</p>
                </div>
                <Switch 
                  checked={offlineEnabled}
                  onCheckedChange={setOfflineEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offline Content & Storage */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5" />
              Offline Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Storage Used</span>
                <span className="text-white/70 text-sm">{storageUsed.toFixed(1)}%</span>
              </div>
              <Progress value={storageUsed} className="h-2" />
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Cached Content</h4>
              {offlineContent.map((content, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {content.cached ? (
                      <HardDrive className="w-4 h-4 text-green-500" />
                    ) : (
                      <Cloud className="w-4 h-4 text-white/60" />
                    )}
                    <div>
                      <span className="text-white text-sm">{content.type}</span>
                      <p className="text-white/60 text-xs">{content.size} • {content.lastSync}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={content.cached ? 'border-green-500/50 text-green-400' : 'border-white/30 text-white/70'}
                  >
                    {content.cached ? 'Cached' : 'Online Only'}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-white/30 text-white hover:bg-white/10"
                onClick={handleSync}
                disabled={syncInProgress}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncInProgress ? 'animate-spin' : ''}`} />
                Sync All
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
