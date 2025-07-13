
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play } from 'lucide-react';

interface CreateTestFormProps {
  onClose: () => void;
}

export const CreateTestForm: React.FC<CreateTestFormProps> = ({ onClose }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
      <CardHeader>
        <CardTitle className="text-white text-xl">Create New A/B Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            placeholder="Test Name" 
            className="bg-white/10 border-white/20 text-white placeholder-white/60" 
          />
          <Select>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Test Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ui">UI/UX Test</SelectItem>
              <SelectItem value="content">Content Test</SelectItem>
              <SelectItem value="pricing">Pricing Test</SelectItem>
              <SelectItem value="feature">Feature Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Input 
          placeholder="Test Description" 
          className="bg-white/10 border-white/20 text-white placeholder-white/60" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            placeholder="Traffic Split %" 
            className="bg-white/10 border-white/20 text-white placeholder-white/60" 
          />
          <Input 
            placeholder="Minimum Sample Size" 
            className="bg-white/10 border-white/20 text-white placeholder-white/60" 
          />
          <Input 
            placeholder="Test Duration (days)" 
            className="bg-white/10 border-white/20 text-white placeholder-white/60" 
          />
        </div>
        
        <div className="flex gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Play className="w-4 h-4 mr-2" />
            Start Test
          </Button>
          <Button className="bg-gray-600 hover:bg-gray-700">
            Save as Draft
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-white/30 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
