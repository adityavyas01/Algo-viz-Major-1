/**
 * StudyRoomsPage
 * Browse, create, and join study rooms — with join code for private rooms
 */

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Lock, Globe, Search, KeyRound, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRooms } from "@/hooks/useRoom";
import { createRoom, joinRoom, joinRoomWithCode } from "@/services/roomService";

export default function StudyRoomsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, session } = useAuth();
  const { publicRooms, userRooms, isLoading, reload } = useRooms();

  // Check if user has real Supabase auth (not fallback mock)
  const isRealAuth = useCallback(() => {
    if (!user || !session) return false;
    // Fallback admin uses a mock token
    if (session.access_token === 'mock-admin-token') return false;
    return true;
  }, [user, session]);

  const requireAuth = useCallback(() => {
    if (!isRealAuth()) {
      toast({
        title: "Login required",
        description: "Please sign in with your account to use this feature",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }, [isRealAuth, toast]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinCodeDialogOpen, setIsJoinCodeDialogOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [createdRoomCode, setCreatedRoomCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    topic: "",
    isPrivate: false,
    maxMembers: 10,
  });

  const handleCreateRoom = async () => {
    if (!requireAuth()) return;
    if (!newRoom.name.trim()) {
      toast({ title: "Name required", description: "Please enter a room name", variant: "destructive" });
      return;
    }

    try {
      const room = await createRoom(
        newRoom.name, newRoom.description, newRoom.topic,
        newRoom.isPrivate, newRoom.maxMembers
      );

      if (room.is_private && room.join_code) {
        setCreatedRoomCode(room.join_code);
        toast({ title: "Room created!", description: `Share join code: ${room.join_code}` });
      } else {
        toast({ title: "Room created!", description: `${room.name} is ready` });
        setIsCreateDialogOpen(false);
        navigate(`/room/${room.id}`);
      }

      setNewRoom({ name: "", description: "", topic: "", isPrivate: false, maxMembers: 10 });
      reload();
    } catch (error) {
      toast({
        title: "Creation failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    if (!requireAuth()) return;
    try {
      await joinRoom(roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Please try again";
      if (msg.includes("private")) {
        setIsJoinCodeDialogOpen(true);
      } else {
        toast({ title: "Join failed", description: msg, variant: "destructive" });
      }
    }
  };

  const handleJoinWithCode = async () => {
    if (!requireAuth()) return;
    if (!joinCode.trim()) {
      toast({ title: "Code required", description: "Please enter a join code", variant: "destructive" });
      return;
    }
    try {
      const room = await joinRoomWithCode(joinCode.trim());
      toast({ title: "Joined!", description: `Welcome to ${room.name}` });
      setIsJoinCodeDialogOpen(false);
      setJoinCode("");
      navigate(`/room/${room.id}`);
    } catch (error) {
      toast({
        title: "Invalid code",
        description: error instanceof Error ? error.message : "Please check the code and try again",
        variant: "destructive",
      });
    }
  };

  const copyJoinCode = () => {
    if (createdRoomCode) {
      navigator.clipboard.writeText(createdRoomCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const filteredPublicRooms = publicRooms.filter((r) =>
    !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.topic?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RoomCard = ({ room, isJoined = false }: { room: any; isJoined?: boolean }) => (
    <Card className="hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {room.is_private ? (
                <Lock className="h-4 w-4 text-amber-500" />
              ) : (
                <Globe className="h-4 w-4 text-emerald-500" />
              )}
              {room.topic && (
                <Badge variant="secondary" className="text-xs">{room.topic}</Badge>
              )}
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {room.name}
            </CardTitle>
            <CardDescription className="mt-1.5 line-clamp-2">
              {room.description || "No description provided"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{room.active_members || 0} / {room.max_members}</span>
          </div>
          <Button
            onClick={(e) => { e.stopPropagation(); handleJoinRoom(room.id); }}
            variant={isJoined ? "outline" : "default"}
            size="sm"
          >
            {isJoined ? "Open" : "Join"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Study Rooms</h1>
          <p className="text-muted-foreground">
            Collaborate with others in real-time study sessions
          </p>
        </div>

        <div className="flex gap-3">
          {/* Join with Code */}
          <Dialog open={isJoinCodeDialogOpen} onOpenChange={setIsJoinCodeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg">
                <KeyRound className="h-4 w-4 mr-2" />
                Join with Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join Private Room</DialogTitle>
                <DialogDescription>
                  Enter the 6-character code shared by the room owner
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="joinCode">Join Code</Label>
                <Input
                  id="joinCode"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g., ABC123"
                  maxLength={6}
                  className="text-center text-2xl font-mono tracking-[0.3em] mt-2"
                  onKeyDown={(e) => { if (e.key === "Enter") handleJoinWithCode(); }}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsJoinCodeDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleJoinWithCode}>Join Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Create Room */}
          <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) setCreatedRoomCode(null);
          }}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Study Room</DialogTitle>
                <DialogDescription>
                  Create a new room for collaborative learning
                </DialogDescription>
              </DialogHeader>

              {createdRoomCode ? (
                /* Show join code after private room creation */
                <div className="py-6 text-center space-y-4">
                  <div className="text-sm text-muted-foreground">Your private room has been created! Share this code:</div>
                  <div className="flex items-center justify-center gap-3">
                    <code className="text-4xl font-mono font-bold tracking-[0.3em] bg-primary/10 px-6 py-3 rounded-lg border-2 border-dashed border-primary/30">
                      {createdRoomCode}
                    </code>
                    <Button variant="ghost" size="icon" onClick={copyJoinCode}>
                      {codeCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Anyone with this code can join your room</p>
                  <Button className="w-full mt-4" onClick={() => {
                    setIsCreateDialogOpen(false);
                    setCreatedRoomCode(null);
                    const room = userRooms.find((r) => r.join_code === createdRoomCode);
                    if (room) navigate(`/room/${room.id}`);
                  }}>
                    Enter Room
                  </Button>
                </div>
              ) : (
                /* Creation form */
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Room Name *</Label>
                      <Input
                        id="name"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        placeholder="e.g., Dynamic Programming Study"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newRoom.description}
                        onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                        placeholder="What will you study in this room?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="topic">Topic</Label>
                      <Input
                        id="topic"
                        value={newRoom.topic}
                        onChange={(e) => setNewRoom({ ...newRoom, topic: e.target.value })}
                        placeholder="e.g., Algorithms, Data Structures"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="private">Private Room</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Only people with the join code can enter
                        </p>
                      </div>
                      <Switch
                        id="private"
                        checked={newRoom.isPrivate}
                        onCheckedChange={(v) => setNewRoom({ ...newRoom, isPrivate: v })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxMembers">Max Members</Label>
                      <Input
                        id="maxMembers"
                        type="number"
                        value={newRoom.maxMembers}
                        onChange={(e) => setNewRoom({ ...newRoom, maxMembers: parseInt(e.target.value) || 10 })}
                        min={2}
                        max={50}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateRoom}>Create Room</Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search rooms by name or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Your Rooms */}
      {userRooms.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRooms.map((room) => (
              <RoomCard key={room.id} room={room} isJoined />
            ))}
          </div>
          <Separator className="mt-8" />
        </div>
      )}

      {/* Public Rooms */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Public Rooms</h2>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading rooms...</p>
          </div>
        ) : filteredPublicRooms.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No rooms match your search" : "No public rooms available. Create one!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPublicRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
