/**
 * ContestsPage
 * Browse and filter coding contests
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Trophy, Users, Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContests } from "@/hooks/useContest";
import type { Contest } from "@/services/contestService";

export default function ContestsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<Contest["status"] | "all">("all");
  const [typeFilter, setTypeFilter] = useState<Contest["type"] | "all">("all");

  const { contests, isLoading } = useContests({
    status: statusFilter !== "all" ? statusFilter : undefined,
    type: typeFilter !== "all" ? typeFilter : undefined,
  });

  const upcomingContests = contests.filter((c) => c.status === "upcoming");
  const activeContests = contests.filter((c) => c.status === "active");
  const finishedContests = contests.filter((c) => c.status === "finished");

  const getStatusColor = (status: Contest["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "finished":
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: Contest["type"]) => {
    switch (type) {
      case "weekly":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "monthly":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "special":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const ContestCard = ({ contest }: { contest: Contest }) => (
    <Card
      className="hover:shadow-lg transition-all cursor-pointer"
      onClick={() => navigate(`/contest/${contest.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getStatusColor(contest.status)}>
                {contest.status.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={getTypeColor(contest.type)}>
                {contest.type}
              </Badge>
            </div>
            <CardTitle className="text-xl">{contest.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {contest.description || "Compete with other coders and solve challenging problems!"}
            </CardDescription>
          </div>
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Start Time</p>
              <p className="text-muted-foreground">{formatDate(contest.start_time)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Duration</p>
              <p className="text-muted-foreground">{formatDuration(contest.duration)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Participants</p>
              <p className="text-muted-foreground">
                {contest.total_participants}
                {contest.max_participants && ` / ${contest.max_participants}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Type</p>
              <p className="text-muted-foreground capitalize">{contest.type}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Coding Contests</h1>
        <p className="text-muted-foreground">
          Compete with others, test your skills, and climb the leaderboard!
        </p>
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
          <TabsTrigger value="active">
            Active ({activeContests.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingContests.length})
          </TabsTrigger>
          <TabsTrigger value="finished">
            Finished ({finishedContests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading contests...</p>
            </div>
          ) : activeContests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No active contests at the moment</p>
              </CardContent>
            </Card>
          ) : (
            activeContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading contests...</p>
            </div>
          ) : upcomingContests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No upcoming contests scheduled</p>
              </CardContent>
            </Card>
          ) : (
            upcomingContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))
          )}
        </TabsContent>

        <TabsContent value="finished" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading contests...</p>
            </div>
          ) : finishedContests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No finished contests yet</p>
              </CardContent>
            </Card>
          ) : (
            finishedContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
