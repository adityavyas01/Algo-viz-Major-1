/**
 * RoomView Component
 * Study room interface with chat and collaborative code editor
 */

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Users, Code, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRoom } from "@/hooks/useRoom";
import { leaveRoom } from "@/services/roomService";
import { LanguageSelector } from "@/components/LanguageSelector";
import type { LanguageId } from "@/types/execution";

export function RoomView() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { members, messages, sharedCode, isLoading, sendMessage, updateCode } = useRoom(roomId || "");

  const [messageInput, setMessageInput] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<LanguageId>("python");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sharedCode) {
      setCode(sharedCode.code);
      setLanguage(sharedCode.language as LanguageId);
    }
  }, [sharedCode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      await sendMessage(messageInput);
      setMessageInput("");
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCodeBlur = async () => {
    if (sharedCode && code !== sharedCode.code) {
      try {
        await updateCode(code, language);
      } catch (error) {
        console.error("Failed to update code:", error);
      }
    }
  };

  const handleLeave = async () => {
    try {
      await leaveRoom(roomId || "");
      navigate("/rooms");
    } catch (error) {
      toast({
        title: "Failed to leave room",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const onlineMembers = members.filter((m) => m.is_online);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Loading room...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Study Room</h1>
          <div className="flex items-center gap-2 mt-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {onlineMembers.length} online
            </span>
          </div>
        </div>
        <Button variant="outline" onClick={handleLeave}>
          <LogOut className="h-4 w-4 mr-2" />
          Leave Room
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Code Editor & Chat */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">
                <Code className="h-4 w-4 mr-2" />
                Collaborative Code
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Shared Code Editor</CardTitle>
                    <LanguageSelector
                      selectedLanguage={language}
                      onLanguageChange={(lang) => {
                        setLanguage(lang as LanguageId);
                        if (sharedCode) {
                          updateCode(code, lang);
                        }
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={code}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    onBlur={handleCodeBlur}
                    className="w-full h-[600px] p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Write code together..."
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Code is automatically saved and synced across all members
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Room Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">
                              {msg.user?.email || "Anonymous"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.created_at).toLocaleTimeString()}
                            </span>
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              msg.message_type === "system"
                                ? "bg-muted italic"
                                : "bg-primary/10"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Members Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Members ({members.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 rounded-lg border"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            member.is_online ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {member.user?.email || "Anonymous"}
                          </p>
                          {member.role !== "member" && (
                            <Badge variant="outline" className="text-xs mt-1">
                              {member.role}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
