/**
 * ContestsPage
 * Browse coding contests with admin management capabilities
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar, Clock, Trophy, Users, Filter, Plus, Trash2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContests } from "@/hooks/useContest";
import { useAdmin } from "@/contexts/AdminContext";
import { createContest, deleteContest, type Contest } from "@/services/contestService";

export default function ContestsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAdmin();
  const [typeFilter, setTypeFilter] = useState<Contest["type"] | "all">("all");

  const { contests, isLoading, reload } = useContests({
    type: typeFilter !== "all" ? typeFilter : undefined,
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deletingContestId, setDeletingContestId] = useState<string | null>(null);

  const [newContest, setNewContest] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    durationMinutes: 120,
    type: "standard" as Contest["type"],
    maxParticipants: 200,
    rules: "",
    prizes: "",
  });

  const upcomingContests = contests.filter((c) => c.status === "upcoming");
  const activeContests = contests.filter((c) => c.status === "active");
  const finishedContests = contests.filter((c) => c.status === "finished");

  const getStatusColor = (status: Contest["status"]) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "upcoming": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "finished": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getTypeColor = (type: Contest["type"]) => {
    switch (type) {
      case "weekly": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "monthly": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "special": return "bg-pink-500/10 text-pink-600 border-pink-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTimeUntil = (dateString: string) => {
    const diff = new Date(dateString).getTime() - Date.now();
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (days > 0) return `${days}d ${hours}h`;
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${mins}m`;
  };

  const handleCreateContest = async () => {
    if (!newContest.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    if (!newContest.startDate || !newContest.startTime) {
      toast({ title: "Start date/time required", variant: "destructive" });
      return;
    }

    try {
      const startTime = new Date(`${newContest.startDate}T${newContest.startTime}`);
      const endTime = new Date(startTime.getTime() + newContest.durationMinutes * 60 * 1000);

      await createContest({
        title: newContest.title,
        description: newContest.description,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: newContest.durationMinutes,
        type: newContest.type,
        max_participants: newContest.maxParticipants,
        rules: newContest.rules,
        prizes: newContest.prizes,
      });

      toast({ title: "Contest created!", description: `${newContest.title} has been scheduled` });
      setIsCreateDialogOpen(false);
      setNewContest({
        title: "", description: "", startDate: "", startTime: "",
        durationMinutes: 120, type: "standard", maxParticipants: 200, rules: "", prizes: "",
      });
      reload();
    } catch (error) {
      toast({
        title: "Failed to create",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContest = async () => {
    if (!deletingContestId) return;
    try {
      await deleteContest(deletingContestId);
      toast({ title: "Contest deleted" });
      setDeletingContestId(null);
      reload();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const ContestCard = ({ contest }: { contest: Contest }) => {
    const timeUntil = contest.status === "upcoming" ? getTimeUntil(contest.start_time) : null;

    return (
      <Card
        className="hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => navigate(`/contest/${contest.id}`)}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="outline" className={getStatusColor(contest.status)}>
                  {contest.status === "active" && "🔴 "}{contest.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className={getTypeColor(contest.type)}>
                  {contest.type}
                </Badge>
                {timeUntil && (
                  <Badge variant="secondary" className="text-xs">
                    Starts in {timeUntil}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {contest.title}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {contest.description || "Compete with other coders and solve challenging problems!"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={(e) => { e.stopPropagation(); setDeletingContestId(contest.id); }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Trophy className="h-8 w-8 text-yellow-500 shrink-0" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="font-medium">Start</p>
                <p className="text-muted-foreground truncate text-xs">{formatDate(contest.start_time)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-muted-foreground text-xs">{formatDuration(contest.duration)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Participants</p>
                <p className="text-muted-foreground text-xs">
                  {contest.total_participants}
                  {contest.max_participants && ` / ${contest.max_participants}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Type</p>
                <p className="text-muted-foreground capitalize text-xs">{contest.type}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ContestList = ({ list }: { list: Contest[] }) => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading contests...</p>
        </div>
      );
    }
    if (list.length === 0) {
      return (
        <Card>
          <CardContent className="p-12 text-center">
            <Trophy className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No contests in this category</p>
          </CardContent>
        </Card>
      );
    }
    return (
      <div className="space-y-4">
        {list.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Coding Contests</h1>
          <p className="text-muted-foreground">
            Compete with others, test your skills, and climb the leaderboard!
          </p>
        </div>

        {isAdmin && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Contest
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Contest</DialogTitle>
                <DialogDescription>
                  Schedule a new coding contest
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="ct-title">Title *</Label>
                  <Input
                    id="ct-title"
                    value={newContest.title}
                    onChange={(e) => setNewContest({ ...newContest, title: e.target.value })}
                    placeholder="e.g., Weekly Challenge #2"
                  />
                </div>
                <div>
                  <Label htmlFor="ct-desc">Description</Label>
                  <Textarea
                    id="ct-desc"
                    value={newContest.description}
                    onChange={(e) => setNewContest({ ...newContest, description: e.target.value })}
                    placeholder="What is this contest about?"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ct-date">Start Date *</Label>
                    <Input
                      id="ct-date"
                      type="date"
                      value={newContest.startDate}
                      onChange={(e) => setNewContest({ ...newContest, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ct-time">Start Time *</Label>
                    <Input
                      id="ct-time"
                      type="time"
                      value={newContest.startTime}
                      onChange={(e) => setNewContest({ ...newContest, startTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ct-duration">Duration (minutes)</Label>
                    <Input
                      id="ct-duration"
                      type="number"
                      value={newContest.durationMinutes}
                      onChange={(e) => setNewContest({ ...newContest, durationMinutes: parseInt(e.target.value) || 120 })}
                      min={15}
                      max={720}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ct-type">Type</Label>
                    <Select
                      value={newContest.type}
                      onValueChange={(v) => setNewContest({ ...newContest, type: v as Contest["type"] })}
                    >
                      <SelectTrigger id="ct-type"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="special">Special</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="ct-max">Max Participants</Label>
                  <Input
                    id="ct-max"
                    type="number"
                    value={newContest.maxParticipants}
                    onChange={(e) => setNewContest({ ...newContest, maxParticipants: parseInt(e.target.value) || 200 })}
                    min={2}
                    max={10000}
                  />
                </div>
                <div>
                  <Label htmlFor="ct-rules">Rules</Label>
                  <Textarea
                    id="ct-rules"
                    value={newContest.rules}
                    onChange={(e) => setNewContest({ ...newContest, rules: e.target.value })}
                    placeholder="Contest rules and guidelines..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="ct-prizes">Prizes</Label>
                  <Textarea
                    id="ct-prizes"
                    value={newContest.prizes}
                    onChange={(e) => setNewContest({ ...newContest, prizes: e.target.value })}
                    placeholder="Prize descriptions..."
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateContest}>Create Contest</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Contest Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="special">Special</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
          <TabsTrigger value="active">Active ({activeContests.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingContests.length})</TabsTrigger>
          <TabsTrigger value="finished">Finished ({finishedContests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <ContestList list={activeContests} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6">
          <ContestList list={upcomingContests} />
        </TabsContent>
        <TabsContent value="finished" className="mt-6">
          <ContestList list={finishedContests} />
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingContestId} onOpenChange={() => setDeletingContestId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Contest
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this contest and all its participants, submissions, and announcements. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteContest} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Contest
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
