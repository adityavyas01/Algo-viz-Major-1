
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, Target, Heart, Zap, Star } from 'lucide-react';
import { MotivationReminder } from '@/types/learning';

interface MotivationSystemProps {
  reminders: MotivationReminder[];
  onToggleReminder?: (reminderId: string, enabled: boolean) => void;
  onTimeChange?: (reminderId: string, newTime: string) => void;
}

export const MotivationSystem: React.FC<MotivationSystemProps> = ({ 
  reminders, 
  onToggleReminder, 
  onTimeChange 
}) => {
  const motivationalQuotes = [
    "Every expert was once a beginner! 🌟",
    "Progress, not perfection! 💪",
    "You're building amazing skills! 🚀",
    "Small steps lead to big achievements! 🎯",
    "Your future self will thank you! ✨"
  ];

  const [currentQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const getReminderIcon = (type: MotivationReminder['type']) => {
    switch (type) {
      case 'daily_practice': return <Target className="w-4 h-4 text-blue-500" />;
      case 'streak_maintenance': return <Zap className="w-4 h-4 text-orange-500" />;
      case 'goal_reminder': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'achievement_celebration': return <Heart className="w-4 h-4 text-pink-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Motivation & Reminders</h2>
        <p className="text-white/70">Stay motivated with personalized reminders and encouragement</p>
      </div>

      {/* Daily Motivation */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
          <h3 className="text-white text-lg font-semibold mb-2">Today's Motivation</h3>
          <p className="text-white/90 text-lg">{currentQuote}</p>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Reminder Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getReminderIcon(reminder.type)}
                    <div>
                      <h4 className="text-white font-medium">{reminder.title}</h4>
                      <p className="text-white/70 text-sm">{reminder.message}</p>
                    </div>
                  </div>
                  <Switch
                    checked={reminder.isEnabled}
                    onCheckedChange={(enabled) => onToggleReminder?.(reminder.id, enabled)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/60" />
                    <input
                      type="time"
                      value={reminder.scheduledTime}
                      onChange={(e) => onTimeChange?.(reminder.id, e.target.value)}
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                      disabled={!reminder.isEnabled}
                    />
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className="text-white/60 border-white/30"
                  >
                    {reminder.frequency}
                  </Badge>
                </div>

                {reminder.lastSent && (
                  <div className="text-xs text-white/50 mt-2">
                    Last sent: {reminder.lastSent.toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Quick Motivation Boost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Star className="w-4 h-4 mr-2" />
              View Achievements
            </Button>
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Target className="w-4 h-4 mr-2" />
              Set New Goal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
