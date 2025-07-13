
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Palette, Type, Eye, Accessibility } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeCustomizer: React.FC = () => {
  const { 
    currentTheme, 
    setTheme, 
    themes, 
    fontSize, 
    setFontSize, 
    reducedMotion, 
    setReducedMotion,
    highContrast,
    setHighContrast
  } = useTheme();

  const fontSizes = [
    { value: 'text-sm', label: 'Small' },
    { value: 'text-base', label: 'Medium' },
    { value: 'text-lg', label: 'Large' },
    { value: 'text-xl', label: 'Extra Large' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Theme Customization</h2>
        <p className="text-white/70">Personalize your learning experience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Color Themes */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Themes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  variant={currentTheme.id === theme.id ? 'default' : 'outline'}
                  className={`h-16 flex flex-col items-center justify-center gap-1 ${
                    currentTheme.id === theme.id
                      ? 'bg-white text-black'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <div className={`w-6 h-3 rounded bg-gradient-to-r ${theme.colors.primary}`} />
                  <span className="text-xs">{theme.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography & Accessibility */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Font Size */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                <Type className="w-4 h-4" />
                Font Size
              </label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {fontSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value} className="text-white hover:bg-white/10">
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <label className="text-white text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Reduce Motion
              </label>
              <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <label className="text-white text-sm font-medium">
                High Contrast
              </label>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
