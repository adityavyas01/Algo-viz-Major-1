
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Brain, Clock, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { UserBehaviorEvent, AIInsight } from '@/types/ai-learning';

interface BehaviorAnalyticsProps {
  events: UserBehaviorEvent[];
  insights: AIInsight[];
}

export const BehaviorAnalytics: React.FC<BehaviorAnalyticsProps> = ({ events, insights }) => {
  const getEventIcon = (eventType: UserBehaviorEvent['eventType']) => {
    switch (eventType) {
      case 'algorithm_complete': return <Target className="w-4 h-4 text-green-500" />;
      case 'hint_requested': return <Brain className="w-4 h-4 text-blue-500" />;
      case 'error_made': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const recentEvents = events.slice(0, 5);
  const highPriorityInsights = insights.filter(insight => insight.priority === 'high');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Behavior Analytics</h2>
        <p className="text-white/70">AI-powered insights from your learning patterns</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  {getEventIcon(event.eventType)}
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">
                      {event.eventType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="text-white/60 text-xs">
                      {event.algorithmId && `${event.algorithmId} • `}
                      {event.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  {event.metadata.accuracy && (
                    <Badge className="bg-cyan-500/20 text-cyan-300">
                      {event.metadata.accuracy}%
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.slice(0, 4).map((insight) => (
                <div key={insight.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white text-sm font-medium">{insight.title}</h4>
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-xs mb-2">{insight.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <TrendingUp className="w-3 h-3" />
                      {Math.round(insight.confidence * 100)}% confidence
                    </div>
                    {insight.actionable && (
                      <Badge variant="outline" className="text-xs">
                        Actionable
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Learning Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24.5h</div>
              <div className="text-white/60 text-sm">Total Study Time</div>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">78%</div>
              <div className="text-white/60 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">+15%</div>
              <div className="text-white/60 text-sm">Weekly Improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Priority Insights */}
      {highPriorityInsights.length > 0 && (
        <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Needs Immediate Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highPriorityInsights.map((insight) => (
                <div key={insight.id} className="p-3 bg-white/10 rounded-lg">
                  <h4 className="text-white font-medium mb-1">{insight.title}</h4>
                  <p className="text-white/80 text-sm">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
