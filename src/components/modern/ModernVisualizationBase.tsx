import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Settings,
  BookOpen,
  TrendingUp,
  Zap,
  Eye,
  Activity
} from 'lucide-react';
import './ModernVisualizationBase.css';

interface ModernControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

interface ModernMetricsProps {
  metrics: Array<{
    label: string;
    value: string | number;
    icon: ReactNode;
    color?: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
}

interface ModernVisualizationBaseProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  complexity: {
    time: string;
    space: string;
  };
  children: ReactNode;
  controls: ModernControlsProps;
  metrics?: ModernMetricsProps['metrics'];
  educational?: {
    keyPoints: string[];
    pseudocode: string[];
    realWorldUse: string[];
  };
  className?: string;
}

const ModernControls: React.FC<ModernControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBack,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  disabled = false
}) => {
  const { currentTheme } = useVisualizationTheme();

  return (
    <Card 
      className="mb-6 overflow-hidden border-0 shadow-2xl"
      style={{ 
        background: `linear-gradient(135deg, ${currentTheme.colors.surface}E6 0%, ${currentTheme.colors.surface}CC 100%)`,
        backdropFilter: 'blur(20px)',
        borderRadius: '24px'
      }}
    >
      <CardContent className="p-6">
        <div className="controls-section">
          {/* Primary Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              disabled={disabled}
              className="rounded-full w-12 h-12 p-0 border-2 hover:scale-110 transition-all duration-300"
              style={{ 
                borderColor: currentTheme.colors.border,
                backgroundColor: 'transparent',
                color: currentTheme.colors.text
              }}
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={onStepBack}
              variant="outline"
              size="lg"
              disabled={disabled || currentStep === 0}
              className="rounded-full w-12 h-12 p-0 border-2 hover:scale-110 transition-all duration-300"
              style={{ 
                borderColor: currentTheme.colors.border,
                backgroundColor: 'transparent',
                color: currentTheme.colors.text
              }}
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              onClick={isPlaying ? onPause : onPlay}
              size="lg"
              disabled={disabled}
              className="rounded-full w-16 h-16 p-0 shadow-lg hover:scale-110 transition-all duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`,
                border: 'none'
              }}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>

            <Button
              onClick={onStepForward}
              variant="outline"
              size="lg"
              disabled={disabled || currentStep >= totalSteps - 1}
              className="rounded-full w-12 h-12 p-0 border-2 hover:scale-110 transition-all duration-300"
              style={{ 
                borderColor: currentTheme.colors.border,
                backgroundColor: 'transparent',
                color: currentTheme.colors.text
              }}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Section */}
          <div className="progress-section flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="visualization-label text-sm font-medium" style={{ color: currentTheme.colors.textSecondary }}>
                Progress
              </span>
              <span className="step-indicator text-sm font-mono" style={{ color: currentTheme.colors.text }}>
                {currentStep + 1} / {totalSteps}
              </span>
            </div>
            <Progress 
              value={(currentStep / Math.max(totalSteps - 1, 1)) * 100} 
              className="h-2 bg-white/10"
              style={{ 
                '--progress-foreground': `linear-gradient(90deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`
              } as React.CSSProperties}
            />
          </div>

          {/* Speed Control */}
          <div className="speed-control">
            <Zap className="w-4 h-4 flex-shrink-0" style={{ color: currentTheme.colors.textSecondary }} />
            <span className="visualization-label text-sm font-medium whitespace-nowrap flex-shrink-0" style={{ color: currentTheme.colors.textSecondary }}>
              Speed
            </span>
            <div className="flex-1 px-2">
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={2100 - speed} // Invert for intuitive control (higher value = faster)
                onChange={(e) => onSpeedChange(2100 - Number(e.target.value))}
                className="w-full modern-slider"
                style={{
                  background: `linear-gradient(90deg, ${currentTheme.colors.primary}40 0%, ${currentTheme.colors.secondary}40 100%)`
                }}
              />
            </div>
            <span className="text-xs font-mono min-w-[50px] text-right flex-shrink-0 visualization-text" style={{ color: currentTheme.colors.text }}>
              {speed < 500 ? 'Fast' : speed < 1000 ? 'Med' : speed < 1500 ? 'Slow' : 'V.Slow'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ModernMetrics: React.FC<ModernMetricsProps> = ({ metrics }) => {
  const { currentTheme } = useVisualizationTheme();

  return (
    <div className="metrics-container grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <Card 
          key={index}
          className="metrics-item overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.colors.surface}E6 0%, ${currentTheme.colors.surface}CC 100%)`,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px'
          }}
        >
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div 
                className="p-2 rounded-full"
                style={{ 
                  backgroundColor: metric.color || currentTheme.colors.primary + '20',
                  color: metric.color || currentTheme.colors.primary
                }}
              >
                {metric.icon}
              </div>
            </div>
            <div className="visualization-text text-2xl font-bold mb-1" style={{ color: currentTheme.colors.text }}>
              {metric.value}
            </div>
            <div className="visualization-label text-xs" style={{ color: currentTheme.colors.textSecondary }}>
              {metric.label}
            </div>
            {metric.trend && (
              <div className={`visualization-text text-xs mt-1 ${
                metric.trend === 'up' ? 'text-green-400' : 
                metric.trend === 'down' ? 'text-red-400' : 
                'text-gray-400'
              }`}>
                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const ModernVisualizationBase: React.FC<ModernVisualizationBaseProps> = ({
  title,
  description,
  difficulty,
  category,
  complexity,
  children,
  controls,
  metrics,
  educational,
  className = ""
}) => {
  const { currentTheme } = useVisualizationTheme();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return currentTheme.colors.primary;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Section */}
      <Card 
        className="overflow-hidden border-0 shadow-2xl"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.colors.surface}E6 0%, ${currentTheme.colors.surface}CC 100%)`,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px'
        }}
      >
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge 
                  className="px-3 py-1 rounded-full border-0 font-medium"
                  style={{ 
                    backgroundColor: getDifficultyColor(difficulty) + '20',
                    color: getDifficultyColor(difficulty)
                  }}
                >
                  {difficulty}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="px-3 py-1 rounded-full border-2"
                  style={{ 
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.textSecondary
                  }}
                >
                  {category}
                </Badge>
              </div>
              <CardTitle 
                className="text-2xl lg:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent break-words"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`
                }}
              >
                {title}
              </CardTitle>
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: currentTheme.colors.textSecondary }}>
                {description}
              </p>
            </div>
            <div className="flex flex-row lg:flex-col gap-3 lg:gap-2 min-w-[200px] flex-wrap lg:flex-nowrap">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" style={{ color: currentTheme.colors.primary }} />
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: currentTheme.colors.textSecondary }}>
                  Time: {complexity.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: currentTheme.colors.secondary }} />
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: currentTheme.colors.textSecondary }}>
                  Space: {complexity.space}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controls */}
      <ModernControls {...controls} />

      {/* Metrics */}
      {metrics && <ModernMetrics metrics={metrics} />}

      {/* Main Visualization */}
      <Card 
        className="overflow-hidden border-0 shadow-2xl"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.colors.surface}E6 0%, ${currentTheme.colors.surface}CC 100%)`,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px'
        }}
      >
        <CardContent className="p-4 md:p-8">
          {children}
        </CardContent>
      </Card>

      {/* Educational Content */}
      {educational && (
        <Card 
          className="overflow-hidden border-0 shadow-2xl"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.colors.surface}E6 0%, ${currentTheme.colors.surface}CC 100%)`,
            backdropFilter: 'blur(20px)',
            borderRadius: '24px'
          }}
        >
          <CardHeader className="card-header-mobile">
            <CardTitle 
              className="flex items-center gap-2"
              style={{ color: currentTheme.colors.text }}
            >
              <BookOpen className="w-5 h-5" />
              Learn More
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content-mobile">
            <Tabs defaultValue="concepts" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
                <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
                <TabsTrigger value="pseudocode">Pseudocode</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="concepts" className="space-y-3 tabs-content">
                {educational.keyPoints.map((point, index) => (
                  <div key={index} className="educational-point flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface + '40' }}>
                    <div 
                      className="point-number w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: currentTheme.colors.primary, color: 'white' }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-sm md:text-base" style={{ color: currentTheme.colors.text }}>{point}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="pseudocode" className="tabs-content">
                <div 
                  className="p-4 rounded-lg font-mono text-xs md:text-sm space-y-1"
                  style={{ backgroundColor: currentTheme.colors.surface + '40' }}
                >
                  {educational.pseudocode.map((line, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span 
                        className="text-xs w-6 text-center flex-shrink-0"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        {index + 1}
                      </span>
                      <span className="break-all" style={{ color: currentTheme.colors.text }}>{line}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="applications" className="space-y-3 tabs-content">
                {educational.realWorldUse.map((application, index) => (
                  <div key={index} className="educational-point flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface + '40' }}>
                    <Eye className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: currentTheme.colors.primary }} />
                    <p className="text-sm md:text-base" style={{ color: currentTheme.colors.text }}>{application}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModernVisualizationBase;
