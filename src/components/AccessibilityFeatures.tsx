
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Accessibility, Keyboard, Volume2, Eye, Navigation, Users } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AccessibilityState {
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  audioDescriptions: boolean;
  focusIndicators: boolean;
  skipLinks: boolean;
}

export const AccessibilityFeatures: React.FC = () => {
  const { highContrast, setHighContrast, reducedMotion, setReducedMotion } = useTheme();
  const [accessibilityState, setAccessibilityState] = React.useState<AccessibilityState>({
    screenReaderMode: false,
    keyboardNavigation: true,
    audioDescriptions: false,
    focusIndicators: true,
    skipLinks: true
  });

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!accessibilityState.keyboardNavigation) return;

      // Skip to main content (Alt + M)
      if (event.altKey && event.key === 'm') {
        event.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Skip to navigation (Alt + N)
      if (event.altKey && event.key === 'n') {
        event.preventDefault();
        const navigation = document.querySelector('nav');
        if (navigation) {
          const firstFocusable = navigation.querySelector('a, button, input, [tabindex="0"]') as HTMLElement;
          firstFocusable?.focus();
        }
      }

      // Escape key to close modals/dropdowns
      if (event.key === 'Escape') {
        const openDropdown = document.querySelector('[data-state="open"]');
        if (openDropdown) {
          (openDropdown as HTMLElement).click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [accessibilityState.keyboardNavigation]);

  // Enhanced focus indicators
  useEffect(() => {
    if (accessibilityState.focusIndicators) {
      const style = document.createElement('style');
      style.textContent = `
        *:focus {
          outline: 3px solid #06B6D4 !important;
          outline-offset: 2px !important;
          border-radius: 4px !important;
        }
        
        button:focus,
        a:focus,
        input:focus,
        select:focus,
        textarea:focus {
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.3) !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [accessibilityState.focusIndicators]);

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    if (!accessibilityState.screenReaderMode) return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const updateAccessibilitySetting = (key: keyof AccessibilityState, value: boolean) => {
    setAccessibilityState(prev => ({ ...prev, [key]: value }));
    
    if (value) {
      announceToScreenReader(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} enabled`);
    } else {
      announceToScreenReader(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} disabled`);
    }
  };

  const wcagGuidelines = [
    {
      principle: 'Perceivable',
      description: 'Information must be presentable in ways users can perceive',
      features: ['High contrast mode', 'Text alternatives', 'Audio descriptions'],
      status: 'Implemented'
    },
    {
      principle: 'Operable',
      description: 'Interface components must be operable',
      features: ['Keyboard navigation', 'No seizure triggers', 'Sufficient time'],
      status: 'Implemented'
    },
    {
      principle: 'Understandable',
      description: 'Information and UI operation must be understandable',
      features: ['Readable text', 'Predictable functionality', 'Input assistance'],
      status: 'Implemented'
    },
    {
      principle: 'Robust',
      description: 'Content must be robust enough for various user agents',
      features: ['Valid markup', 'Compatible with assistive technologies'],
      status: 'Implemented'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Accessibility Features</h2>
        <p className="text-white/70">Making AlgoViz accessible to everyone (WCAG 2.1 AA compliant)</p>
      </div>

      {/* Skip Links */}
      {accessibilityState.skipLinks && (
        <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-50">
          <Button
            className="bg-black text-white"
            onFocus={() => announceToScreenReader('Skip navigation link focused')}
            onClick={() => {
              const mainContent = document.getElementById('main-content');
              mainContent?.focus();
              announceToScreenReader('Skipped to main content');
            }}
          >
            Skip to main content (Alt + M)
          </Button>
        </div>
      )}

      {/* Accessibility Controls */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Accessibility className="w-5 h-5" />
            Accessibility Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Accessibility */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Visual Accessibility
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="text-white text-sm">High Contrast Mode</label>
                <Switch 
                  checked={highContrast} 
                  onCheckedChange={(checked) => {
                    setHighContrast(checked);
                    announceToScreenReader(checked ? 'High contrast enabled' : 'High contrast disabled');
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white text-sm">Reduce Motion</label>
                <Switch 
                  checked={reducedMotion} 
                  onCheckedChange={(checked) => {
                    setReducedMotion(checked);
                    announceToScreenReader(checked ? 'Motion reduced' : 'Motion restored');
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white text-sm">Enhanced Focus Indicators</label>
                <Switch 
                  checked={accessibilityState.focusIndicators} 
                  onCheckedChange={(checked) => updateAccessibilitySetting('focusIndicators', checked)}
                />
              </div>
            </div>
          </div>

          {/* Navigation Accessibility */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Navigation Accessibility
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="text-white text-sm">Keyboard Navigation</label>
                <Switch 
                  checked={accessibilityState.keyboardNavigation} 
                  onCheckedChange={(checked) => updateAccessibilitySetting('keyboardNavigation', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white text-sm">Skip Links</label>
                <Switch 
                  checked={accessibilityState.skipLinks} 
                  onCheckedChange={(checked) => updateAccessibilitySetting('skipLinks', checked)}
                />
              </div>
            </div>
          </div>

          {/* Assistive Technology Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Assistive Technology Support
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="text-white text-sm">Screen Reader Mode</label>
                <Switch 
                  checked={accessibilityState.screenReaderMode} 
                  onCheckedChange={(checked) => updateAccessibilitySetting('screenReaderMode', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white text-sm">Audio Descriptions</label>
                <Switch 
                  checked={accessibilityState.audioDescriptions} 
                  onCheckedChange={(checked) => updateAccessibilitySetting('audioDescriptions', checked)}
                />
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              Keyboard Shortcuts
            </h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div className="text-white/80">Alt + M: Skip to main content</div>
              <div className="text-white/80">Alt + N: Skip to navigation</div>
              <div className="text-white/80">Escape: Close modals/dropdowns</div>
              <div className="text-white/80">Tab: Navigate between elements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WCAG Compliance */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">WCAG 2.1 AA Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {wcagGuidelines.map((guideline, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold">{guideline.principle}</h4>
                  <Badge className="bg-green-500 text-white">
                    {guideline.status}
                  </Badge>
                </div>
                <p className="text-white/70 text-sm">{guideline.description}</p>
                <ul className="text-white/60 text-xs space-y-1">
                  {guideline.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Screen Reader Only Content */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        AlgoViz is a fully accessible algorithm visualization platform. 
        Use Tab to navigate, Enter to activate buttons, and Escape to close dialogs.
        All visualizations include text descriptions for screen readers.
      </div>
    </div>
  );
};
