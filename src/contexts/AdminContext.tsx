import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { AdminRole, AdminStats } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

interface AdminContextType {
  isAdmin: boolean;
  adminRole: AdminRole | null;
  adminStats: AdminStats | null;
  loading: boolean;
  refreshAdminData: () => Promise<void>;
  checkAdminStatus: () => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (): Promise<boolean> => {
    if (!user) {
      setIsAdmin(false);
      setAdminRole(null);
      return false;
    }

    try {
      const { data, error } = await supabase
        .from("admin_roles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        // Handle different error codes gracefully
        if (error.code === "42P01") {
          // Table doesn't exist - this is expected in development
          console.warn("Admin roles table not found - running without admin features");
          return false;
        } else if (error.code === "42P17") {
          // Policy recursion error - disable admin features temporarily
          console.warn("Admin policy configuration issue - running without admin features");
          return false;
        } else if (error.code !== "PGRST116") {
          console.error("Error checking admin status:", error);
          return false;
        }
      }

      if (data) {
        setIsAdmin(true);
        setAdminRole({
          ...data,
          role: data.role as 'super_admin' | 'tournament_admin' | 'content_admin' | 'moderator',
          updated_at: data.updated_at || data.created_at,
        });
        return true;
      } else {
        setIsAdmin(false);
        setAdminRole(null);
        return false;
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
      setAdminRole(null);
      return false;
    }
  };

  const fetchAdminStats = async () => {
    if (!isAdmin) return;

    try {
      // Fetch total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Fetch total tournaments
      const { count: totalTournaments } = await supabase
        .from("tournaments")
        .select("*", { count: "exact", head: true });

      // Fetch active tournaments
      const { count: activeTournaments } = await supabase
        .from("tournaments")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Fetch total challenges
      const { count: totalChallenges } = await supabase
        .from("challenges")
        .select("*", { count: "exact", head: true });

      // Fetch recent signups (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentSignups } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo.toISOString());

      // Calculate average score from user stats
      const { data: userStats } = await supabase
        .from("user_stats")
        .select("total_points");

      const averageScore = userStats && userStats.length > 0
        ? userStats.reduce((sum, stat) => sum + (stat.total_points || 0), 0) / userStats.length
        : 0;

      setAdminStats({
        totalUsers: totalUsers || 0,
        totalTournaments: totalTournaments || 0,
        activeTournaments: activeTournaments || 0,
        totalChallenges: totalChallenges || 0,
        recentSignups: recentSignups || 0,
        averageScore: Math.round(averageScore),
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  const refreshAdminData = async () => {
    setLoading(true);
    await checkAdminStatus();
    if (isAdmin) {
      await fetchAdminStats();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      refreshAdminData();
    } else {
      setIsAdmin(false);
      setAdminRole(null);
      setAdminStats(null);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminStats();
    }
  }, [isAdmin]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminRole,
        adminStats,
        loading,
        refreshAdminData,
        checkAdminStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
