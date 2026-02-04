/**
 * StudyRoomsPage
 * Browse and join study rooms
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRooms } from "@/hooks/useRoom";
import { createRoom, joinRoom } from "@/services/roomService";

export default function StudyRoomsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { publicRooms, userRooms, isLoading, reload } = useRooms();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    topic: "",
    isPrivate: false,
    maxMembers: 10,
  });

  const handleCreateRoom = async () => {
    if (!newRoom.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a room name",
        variant: "destructive",
      });
      return;
    }

    try {
      const room = await createRoom(
        newRoom.name,
        newRoom.description,
        newRoom.topic,
        newRoom.isPrivate,
        newRoom.maxMembers
      );

      toast({
        title: "Room created!",
        description: `${room.name} has been created successfully`,
      });

      setIsCreateDialogOpen(false);
      setNewRoom({
        name: "",
        description: "",
        topic: "",
        isPrivate: false,
        maxMembers: 10,
      });

      reload();
      navigate(`/room/${room.id}`);
    } catch (error) {
      toast({
        title: "Creation failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      await joinRoom(roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      toast({
        title: "Join failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const RoomCard = ({ room, isJoined = false }: { room: any; isJoined?: boolean }) => (
    <Card className="hover:shadow-lg transition-all cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {room.is_private ? (
                <Lock className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Globe className="h-4 w-4 text-muted-foreground" />
              )}
              {room.topic && (
                <Badge variant="outline">{room.topic}</Badge>
              )}
            </div>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="mt-2">
              {room.description || "No description provided"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {room.active_members} / {room.max_members} members
            </span>
          </div>
          <Button
            onClick={() => handleJoinRoom(room.id)}
            variant={isJoined ? "outline" : "default"}
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Study Rooms</h1>
          <p className="text-muted-foreground">
            Collaborate with others in real-time study sessions
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Create Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Study Room</DialogTitle>
              <DialogDescription>
                Create a new room for collaborative learning
              </DialogDescription>
            </DialogHeader>
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
          </DialogContent>
        </Dialog>
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
        </div>
      )}

      {/* Public Rooms */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Public Rooms</h2>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading rooms...</p>
          </div>
        ) : publicRooms.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No public rooms available. Create one!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
