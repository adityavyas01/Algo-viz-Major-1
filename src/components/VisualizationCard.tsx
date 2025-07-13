
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/CodeEditor';

interface VisualizationCardProps {
  title: string;
  description: string;
  component: React.ReactNode;
  complexity: { time: string; space: string };
}

export const VisualizationCard: React.FC<VisualizationCardProps> = ({
  title,
  description,
  component,
  complexity
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20" id="main-content">
        <CardHeader>
          <CardTitle className="text-white text-2xl">{title}</CardTitle>
          <CardDescription className="text-white/70">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visualization" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="visualization">Interactive Visualization</TabsTrigger>
              <TabsTrigger value="code">Code Implementation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualization">
              {component}
            </TabsContent>
            
            <TabsContent value="code">
              <CodeEditor
                algorithmName={title}
                complexity={complexity}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
