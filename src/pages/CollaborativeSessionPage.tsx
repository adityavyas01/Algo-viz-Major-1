import React from 'react';
import { useParams } from 'react-router-dom';
import { useCollaborativeSession } from '../hooks/useCollaborativeSession';
import { CodeEditor } from '../components/CodeEditor';
import { ArrayVisualization } from '../components/ArrayVisualization';
import { SessionChat } from '../components/SessionChat';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Button } from '../components/ui/button';
import { Copy } from 'lucide-react';
import { VisualizationControls } from '../components/VisualizationControls';
import { useToast } from '../components/ui/use-toast';

const CollaborativeSessionPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user, sessionState, participants, broadcastStateUpdate, setSessionState } = useCollaborativeSession();
  const { toast } = useToast();

  const handleCodeChange = (newCode: string) => {
    const newState = { ...sessionState, code: newCode };
    setSessionState(newState);
    broadcastStateUpdate(newState);
  };

  const handleLanguageChange = (newLanguage: string) => {
    const newState = { ...sessionState, language: newLanguage };
    setSessionState(newState);
    broadcastStateUpdate(newState);
  };

  const handleGenerateRandomArray = () => {
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 90) + 10);
    const newVisState = {
      array: newArray.map(v => ({ value: v, isHighlighted: false, isSelected: false })),
      steps: [], // You might want to clear steps or generate new ones
    };
    const newState = { ...sessionState, visualizationState: newVisState };
    setSessionState(newState);
    broadcastStateUpdate(newState);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "The session link has been copied to your clipboard.",
    });
  };

  if (!user || !sessionId) {
    return <div>Loading session...</div>;
  }

  return (
    <div className="container mx-auto p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Collaborative Session</h1>
        <Button onClick={handleCopyLink} variant="outline">
          <Copy className="w-4 h-4 mr-2" />
          Copy Invite Link
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeEditor
                algorithmName="Collaborative Session"
                code={sessionState.code}
                language={sessionState.language}
                onCodeChange={handleCodeChange}
                onLanguageChange={handleLanguageChange}
                onCodeRun={(code, lang) => {
                  const newState = { ...sessionState, code, language: lang };
                  setSessionState(newState);
                  broadcastStateUpdate(newState);
                }}
              />
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Shared Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <VisualizationControls onGenerateRandom={handleGenerateRandomArray} />
                <ArrayVisualization data={sessionState.visualizationState.array} showControls={false} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Participants ({participants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  {participants.map((p) => (
                    <Tooltip key={p.id}>
                      <TooltipTrigger>
                        <Avatar>
                          <AvatarImage src={p.avatar_url} />
                          <AvatarFallback>{p.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{p.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <SessionChat sessionId={sessionId} user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeSessionPage;
