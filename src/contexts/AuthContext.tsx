import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    // Set up real auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user) {
        // Handle different sign-in scenarios
        const isEmailVerification = session.user.email_confirmed_at && window.location.pathname.includes('email-verification');
        const isFirstTimeUser = !session.user.last_sign_in_at;
        const currentPath = window.location.pathname;
        
        if (isEmailVerification) {
          toast({
            title: "Email verified successfully! 🎉",
            description: "Welcome to AlgoViz! Setting up your account...",
          });
        } else if (currentPath !== "/login" && currentPath !== "/register") {
          // Don't show welcome message if user is just refreshing the page
          console.log("User session restored");
        }

        // Store session preference for "Remember Me" functionality
        localStorage.setItem('algviz_remember_session', 'true');

        // Create user stats if they don't exist
        setTimeout(async () => {
          const { error } = await supabase.from("user_stats").upsert(
            {
              user_id: session.user.id,
              level: 1,
              experience: 0,
              total_points: 0,
              current_streak: 0,
              total_study_time: 0,
              rank: 0,
              algorithms_completed: 0,
              challenges_completed: 0,
            },
            { onConflict: "user_id" }
          );

          if (error && error.code !== "23505") {
            // Ignore unique constraint violations
            console.error("Error creating user stats:", error);
            import('@/lib/errorLogging').then(({ logDatabaseError }) => {
              logDatabaseError('Failed to create user stats', error, {
                userId: session.user.id,
                feature: 'user_onboarding',
              });
            });
          }

          // Only auto-redirect if not on email verification pages and this is an actual sign-in event
          if (!window.location.pathname.includes('email-verification') && (event === "SIGNED_IN" || isFirstTimeUser)) {
            const currentPath = window.location.pathname;
            
            // Don't redirect if user is already on a valid authenticated page
            const authenticatedPaths = ['/dashboard', '/learning', '/community', '/challenges', '/profile', '/skills-assessment', '/practice', '/advanced-features', '/leaderboard'];
            const isOnAuthenticatedPage = authenticatedPaths.some(path => currentPath.startsWith(path));
            
            if (!isOnAuthenticatedPage) {
              // Check if user has completed skills assessment
              const { data: assessment } = await supabase
                .from("user_assessments")
                .select("id")
                .eq("user_id", session.user.id)
                .single();

              // Only redirect if coming from login/register pages, and only for new sign-ins
              const shouldRedirect = ['/login', '/register'].includes(currentPath) && event === "SIGNED_IN";
              
              if (shouldRedirect) {
                if (!assessment) {
                  navigate("/skills-assessment");
                } else {
                  navigate("/dashboard");
                }
              }
            }
          }
        }, 500);
      }

      if (event === "SIGNED_OUT") {
        // Clean up session preferences
        localStorage.removeItem('algviz_remember_session');
        localStorage.removeItem('algviz_last_visit');
        
        toast({
          title: "Signed out successfully",
          description: "Come back soon!",
        });
      }
    });

    // Get initial session with persistence check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Store last visit for analytics
        if (session) {
          localStorage.setItem('algviz_last_visit', new Date().toISOString());
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/email-verification-success`,
        },
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return { error };
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        toast({
          title: "Verification Email Sent! 📧",
          description: "Please check your email to verify your account.",
        });
        navigate("/email-verification");
      } else {
        toast({
          title: "Account Created Successfully! 🎉",
          description: "Welcome to AlgoViz!",
        });
      }

      setLoading(false);
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setLoading(false);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // HARDCODED FALLBACK ADMIN ACCOUNT (Emergency Access)
    // Credentials: admin@algoviz.com / Admin@123
    if (email === "admin@algoviz.com" && password === "Admin@123") {
      const mockUser = {
        id: "00000000-0000-0000-0000-000000000001",
        email: "admin@algoviz.com",
        email_confirmed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        aud: "authenticated",
        role: "authenticated",
        app_metadata: { provider: "email", is_admin: true },
        user_metadata: { full_name: "AlgoViz Admin", is_admin: true },
      } as User;

      const mockSession = {
        access_token: "mock-admin-token",
        token_type: "bearer",
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        refresh_token: "mock-refresh-token",
        user: mockUser,
      } as Session;

      setUser(mockUser);
      setSession(mockSession);
      localStorage.setItem('algviz_fallback_admin', 'true');
      
      // Create/update user stats for fallback admin
      await supabase.from("user_stats").upsert(
        {
          user_id: mockUser.id,
          level: 99,
          experience: 999999,
          total_points: 999999,
          current_streak: 365,
          total_study_time: 10000,
          rank: 1,
          algorithms_completed: 2157,
          challenges_completed: 500,
        },
        { onConflict: "user_id" }
      );

      toast({
        title: "🔑 Admin Access Granted",
        description: "Logged in with fallback admin account",
      });
      
      setLoading(false);
      navigate("/dashboard");
      return { error: null };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return { error };
      }

      if (data.user) {
        toast({
          title: "Login Successful! 👋",
          description: `Welcome back, ${data.user.email}!`,
        });
      }

      setLoading(false);
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    // Check if it's a fallback admin session
    const isFallbackAdmin = localStorage.getItem('algviz_fallback_admin') === 'true';
    
    if (isFallbackAdmin) {
      // Handle fallback admin logout without calling Supabase
      setUser(null);
      setSession(null);
      localStorage.removeItem('algviz_fallback_admin');
      localStorage.removeItem('algviz_remember_session');
      
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
      navigate("/login");
      return;
    }
    
    // Normal Supabase sign out
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({
        title: "Password Reset",
        description: 'Password reset email sent! Check your inbox.',
      });
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || 'Failed to send reset email',
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      toast({
        title: "Magic Link Sent",
        description: 'Magic link sent! Check your email to sign in.',
      });
    } catch (error: any) {
      toast({
        title: "Magic Link Failed",
        description: error.message || 'Failed to send magic link',
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithMagicLink,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
