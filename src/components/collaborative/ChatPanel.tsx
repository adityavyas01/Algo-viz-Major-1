import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export const ChatPanel: React.FC = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-3 max-h-60 overflow-y-auto">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <p className="text-blue-400 text-xs font-medium">Alice Johnson</p>
            <p className="text-white text-sm">Let's walk through the binary search step by step</p>
          </div>
          <div className="p-3 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-xs font-medium">Bob Smith</p>
            <p className="text-white text-sm">Great! I'm following along</p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <p className="text-purple-400 text-xs font-medium">Carol Wilson</p>
            <p className="text-white text-sm">Can we slow down the visualization?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/50"
          />
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
