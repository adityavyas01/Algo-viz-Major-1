
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, RotateCcw, Zap, Volume2 } from 'lucide-react';

export const MobileGestures: React.FC = () => {
  const [gestureLog, setGestureLog] = useState<string[]>([]);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const logGesture = (gesture: string) => {
    setGestureLog(prev => [...prev.slice(-4), gesture]);
  };

  const clearLog = () => {
    setGestureLog([]);
    setScale(1);
    setRotation(0);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    logGesture(`Touch Start: ${e.touches.length} finger(s)`);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      logGesture('Pinch gesture detected');
    } else if (e.touches.length === 1) {
      logGesture('Single touch move');
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    logGesture('Touch End');
  };

  // Mouse event handlers for desktop simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    logGesture('Mouse Down (simulated touch)');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      logGesture('Mouse Drag (simulated touch move)');
    }
  };

  const handleDoubleClick = () => {
    const newScale = scale === 1 ? 1.5 : 1;
    setScale(newScale);
    logGesture(`Double tap - Scale: ${newScale}x`);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.max(0.5, Math.min(2, scale + (e.deltaY > 0 ? -0.1 : 0.1)));
    setScale(newScale);
    logGesture(`Wheel scroll - Scale: ${newScale.toFixed(1)}x`);
  };

  const simulateSwipe = (direction: string) => {
    logGesture(`Swipe ${direction}`);
    if (direction === 'left' || direction === 'right') {
      setRotation(prev => prev + (direction === 'left' ? -15 : 15));
    }
  };

  const simulatePinch = (type: 'in' | 'out') => {
    const newScale = type === 'in' 
      ? Math.max(0.5, scale - 0.2) 
      : Math.min(2, scale + 0.2);
    setScale(newScale);
    logGesture(`Pinch ${type} - Scale: ${newScale.toFixed(1)}x`);
  };

  const simulateLongPress = () => {
    logGesture('Long press detected');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Mobile Gestures & Touch Controls</h2>
        <p className="text-white/80">Test mobile-friendly interactions for algorithm visualizations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Touch Canvas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              ref={canvasRef}
              className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-8 h-64 flex items-center justify-center cursor-pointer select-none relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onDoubleClick={handleDoubleClick}
              onWheel={handleWheel}
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="text-white text-center">
                <Smartphone className="w-12 h-12 mx-auto mb-2" />
                <p className="text-lg font-semibold">Touch/Click Here</p>
                <p className="text-sm text-white/70">Try gestures on mobile</p>
                <p className="text-xs text-white/50 mt-2">Scale: {scale.toFixed(1)}x</p>
                <p className="text-xs text-white/50">Rotation: {rotation}°</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Gesture Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => simulateSwipe('left')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-2"
              >
                Swipe Left
              </Button>
              <Button 
                onClick={() => simulateSwipe('right')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-2"
              >
                Swipe Right
              </Button>
              <Button 
                onClick={() => simulatePinch('in')}
                className="bg-green-600 hover:bg-green-700 text-white text-xs py-2"
              >
                Pinch In
              </Button>
              <Button 
                onClick={() => simulatePinch('out')}
                className="bg-green-600 hover:bg-green-700 text-white text-xs py-2"
              >
                Pinch Out
              </Button>
              <Button 
                onClick={simulateLongPress}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-2"
              >
                Long Press
              </Button>
              <Button 
                onClick={clearLog}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-xs py-2"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            </div>

            <div className="bg-black/30 rounded-lg p-3 h-32 overflow-y-auto">
              <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Gesture Log
              </h4>
              {gestureLog.length === 0 ? (
                <p className="text-white/50 text-xs">No gestures detected yet...</p>
              ) : (
                <div className="space-y-1">
                  {gestureLog.map((gesture, index) => (
                    <p key={index} className="text-white/80 text-xs font-mono">
                      {gesture}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Mobile Gesture Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-400">Navigation Gestures</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Swipe left/right to change algorithms</li>
                <li>• Swipe up/down to scroll through steps</li>
                <li>• Double tap to reset visualization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-400">Zoom & Scale</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Pinch to zoom in/out on visualizations</li>
                <li>• Two-finger rotate for array views</li>
                <li>• Long press for context menus</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-400">Control Integration</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Haptic feedback on interactions</li>
                <li>• Voice-over accessibility support</li>
                <li>• Adaptive UI for different screen sizes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
