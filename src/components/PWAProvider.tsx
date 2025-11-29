import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Wifi, WifiOff, Smartphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicroInteraction } from './motion/MotionWrapper';

// Service Worker Registration Hook
export const useServiceWorker = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      registerServiceWorker();
    }

    // Online/offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      setIsRegistered(true);

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        }
      });

      // Listen for messages from SW
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, data } = event.data;
        
        switch (type) {
          case 'PROGRESS_SYNCED':
            console.log('Progress data synced successfully');
            break;
          case 'CACHE_UPDATED':
            console.log('Cache updated with new content');
            break;
          default:
            console.log('SW Message:', type, data);
        }
      });

      console.log('Service Worker registered successfully');
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const skipWaiting = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      setUpdateAvailable(false);
      window.location.reload();
    }
  };

  return {
    isSupported,
    isRegistered,
    isOnline,
    updateAvailable,
    skipWaiting,
    registerServiceWorker
  };
};

// Install Prompt Hook
export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return false;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
      }
      
      setDeferredPrompt(null);
      return outcome === 'accepted';
    } catch (error) {
      console.error('Install prompt failed:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    promptInstall
  };
};

// PWA Install Banner Component
interface InstallBannerProps {
  onDismiss?: () => void;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({ onDismiss }) => {
  const { isInstallable, promptInstall } = useInstallPrompt();
  const [isDismissed, setIsDismissed] = useState(false);

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed && onDismiss) {
      onDismiss();
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isInstallable || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50"
      >
        <div className="bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Install AlgoViz Pro</h3>
                <p className="text-white/70 text-sm">Get the full app experience</p>
              </div>
            </div>
            <MicroInteraction type="button">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </MicroInteraction>
          </div>
          
          <div className="space-y-2 mb-4 text-sm text-white/80">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2" />
              Offline access to algorithms
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2" />
              Faster loading and better performance
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2" />
              Push notifications for learning reminders
            </div>
          </div>

          <div className="flex gap-3">
            <MicroInteraction type="button" className="flex-1">
              <Button
                onClick={handleInstall}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Install App
              </Button>
            </MicroInteraction>
            <MicroInteraction type="button">
              <Button
                variant="outline"
                onClick={handleDismiss}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Later
              </Button>
            </MicroInteraction>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Connection Status Component
export const ConnectionStatus: React.FC = () => {
  const { isOnline } = useServiceWorker();
  const [showStatus, setShowStatus] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline && !wasOffline) {
      setWasOffline(true);
      setShowStatus(true);
    } else if (isOnline && wasOffline) {
      setShowStatus(true);
      // Hide after 3 seconds when back online
      setTimeout(() => setShowStatus(false), 3000);
    }
  }, [isOnline, wasOffline]);

  if (!showStatus) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className={`
          px-6 py-3 rounded-full shadow-lg backdrop-blur-md border
          ${isOnline 
            ? 'bg-green-500/90 border-green-400/50 text-white' 
            : 'bg-red-500/90 border-red-400/50 text-white'
          }
        `}>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? 'Back online!' : 'You\'re offline'}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Update Banner Component
interface UpdateBannerProps {
  onUpdate?: () => void;
}

export const UpdateBanner: React.FC<UpdateBannerProps> = ({ onUpdate }) => {
  const { updateAvailable, skipWaiting } = useServiceWorker();
  const [isDismissed, setIsDismissed] = useState(false);

  const handleUpdate = () => {
    skipWaiting();
    if (onUpdate) {
      onUpdate();
    }
  };

  if (!updateAvailable || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:w-96 z-50"
      >
        <div className="bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Update Available</h4>
                <p className="text-white/80 text-xs">New features and improvements</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <MicroInteraction type="button">
                <Button
                  size="sm"
                  onClick={handleUpdate}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs"
                >
                  Update
                </Button>
              </MicroInteraction>
              <MicroInteraction type="button">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDismissed(true)}
                  className="text-white/60 hover:text-white hover:bg-white/10 text-xs"
                >
                  <X className="w-3 h-3" />
                </Button>
              </MicroInteraction>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main PWA Provider Component
interface PWAProviderProps {
  children: React.ReactNode;
}

export const PWAProvider: React.FC<PWAProviderProps> = ({ children }) => {
  const [showInstallBanner, setShowInstallBanner] = useState(true);
  const [showUpdateBanner, setShowUpdateBanner] = useState(true);

  return (
    <>
      {children}
      
      {/* PWA Install Banner */}
      {showInstallBanner && (
        <InstallBanner onDismiss={() => setShowInstallBanner(false)} />
      )}
      
      {/* Connection Status */}
      <ConnectionStatus />
      
      {/* Update Banner */}
      {showUpdateBanner && (
        <UpdateBanner onUpdate={() => setShowUpdateBanner(false)} />
      )}
    </>
  );
};

export default PWAProvider;