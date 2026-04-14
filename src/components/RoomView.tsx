/**
 * RoomView Component
 * Study room interface with side-by-side chat and code editor,
 * real-time presence, and code snippet sharing
 */

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Send, Users, Code, MessageSquare, LogOut, Copy,
  Check, Hash, Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useRoom } from "@/hooks/useRoom";
import { leaveRoom } from "@/services/roomService";
import { LanguageSelector } from "@/components/LanguageSelector";
import type { LanguageId } from "@/types/execution";

export function RoomView() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    room, members, messages, sharedCode, isLoading,
    onlineUsers, sendMessage, updateCode,
  } = useRoom(roomId || "");

  const [messageInput, setMessageInput] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<LanguageId>("python");
  const [joinCodeCopied, setJoinCodeCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const codeUpdateTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync shared code from realtime
  useEffect(() => {
    if (sharedCode) {
      setCode(sharedCode.code);
      if (sharedCode.language) {
        setLanguage(sharedCode.language as LanguageId);
      }
    }
  }, [sharedCode]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    try {
      // Check for /code command
      if (messageInput.startsWith("/code ")) {
        const codeContent = messageInput.slice(6);
        await sendMessage(codeContent, "code");
      } else {
        await sendMessage(messageInput);
      }
      setMessageInput("");
    } catch (error) {
      toast({
        title: "Failed to send",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  // Debounced code sync (saves after 1.5s of no typing)
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (codeUpdateTimer.current) clearTimeout(codeUpdateTimer.current);
    codeUpdateTimer.current = setTimeout(() => {
      updateCode(newCode, language).catch(() => {});
    }, 1500);
  };

  const handleLanguageChange = (lang: LanguageId) => {
    setLanguage(lang);
    updateCode(code, lang).catch(() => {});
  };

  const handleLeave = async () => {
    try {
      await leaveRoom(roomId || "");
      navigate("/rooms");
    } catch (error) {
      toast({
        title: "Failed to leave",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const copyJoinCode = () => {
    if (room?.join_code) {
      navigator.clipboard.writeText(room.join_code);
      setJoinCodeCopied(true);
      setTimeout(() => setJoinCodeCopied(false), 2000);
    }
  };

  const getInitials = (name: string) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  };

  const getDisplayName = (member: any) => {
    return member.profile?.display_name || "User";
  };

  const getMessageDisplayName = (msg: any) => {
    return msg.profile?.display_name || "User";
  };

  const onlineCount = members.filter((m) => onlineUsers.has(m.user_id)).length;

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
    <div className="container mx-auto p-4 max-w-[1600px] h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{room?.name || "Study Room"}</h1>
              {room?.topic && <Badge variant="secondary">{room.topic}</Badge>}
              {room?.is_private && (
                <Badge variant="outline" className="text-amber-500 border-amber-500/30">
                  Private
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                {onlineCount} online
              </span>
              <span>•</span>
              <span>{members.length} members</span>
              {room?.is_private && room?.join_code && (
                <>
                  <span>•</span>
                  <button
                    onClick={copyJoinCode}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <Hash className="h-3 w-3" />
                    <span className="font-mono">{room.join_code}</span>
                    {joinCodeCopied ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLeave}>
          <LogOut className="h-4 w-4 mr-2" />
          Leave
        </Button>
      </div>

      {/* Main Content — 3-column: Chat | Code | Members */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr_220px] gap-4 h-[calc(100%-80px)]">
        {/* Chat Panel */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="py-3 px-4 border-b shrink-0">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            <ScrollArea className="flex-1 px-4 py-3">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No messages yet. Say hello! 👋
                  </p>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs">
                        {getMessageDisplayName(msg)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    {msg.message_type === "code" ? (
                      <pre className="p-2 rounded bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                        {msg.message}
                      </pre>
                    ) : msg.message_type === "system" ? (
                      <div className="text-xs text-muted-foreground italic bg-muted/50 px-2 py-1 rounded">
                        {msg.message}
                      </div>
                    ) : (
                      <div className="text-sm bg-primary/5 px-3 py-1.5 rounded-lg">
                        {msg.message}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-3 border-t shrink-0">
              <div className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                  placeholder="Type a message... (/code for snippets)"
                  className="text-sm"
                />
                <Button size="icon" onClick={handleSendMessage} className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Tip: Start with <code className="bg-muted px-1 rounded">/code</code> to share a code snippet
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Code Editor Panel */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="py-3 px-4 border-b flex-row items-center justify-between shrink-0">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code className="h-4 w-4" />
              Shared Code Editor
            </CardTitle>
            <LanguageSelector
              value={language}
              onChange={handleLanguageChange}
              showTemplate={false}
            />
          </CardHeader>
          <CardContent className="flex-1 p-0 min-h-0">
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-transparent"
              placeholder="Write code together... changes sync in real-time"
              spellCheck={false}
            />
          </CardContent>
          <div className="px-4 py-2 border-t text-[10px] text-muted-foreground shrink-0">
            💡 Code auto-saves and syncs to all members after 1.5s of inactivity
          </div>
        </Card>

        {/* Members Sidebar */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="py-3 px-4 border-b shrink-0">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Members ({members.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="p-3 space-y-1">
                <TooltipProvider>
                  {/* Online members first */}
                  {members
                    .sort((a, b) => {
                      const aOnline = onlineUsers.has(a.user_id) ? 0 : 1;
                      const bOnline = onlineUsers.has(b.user_id) ? 0 : 1;
                      return aOnline - bOnline;
                    })
                    .map((member) => {
                      const isOnline = onlineUsers.has(member.user_id);
                      const displayName = getDisplayName(member);
                      return (
                        <Tooltip key={member.id}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="relative">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="text-[10px]">
                                    {getInitials(displayName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div
                                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${
                                    isOnline ? "bg-green-500" : "bg-gray-400"
                                  }`}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {displayName}
                                </p>
                                {member.role !== "member" && (
                                  <Badge variant="outline" className="text-[9px] h-4 px-1 mt-0.5">
                                    {member.role}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>{displayName} — {isOnline ? "Online" : "Offline"}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                </TooltipProvider>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RoomView;
