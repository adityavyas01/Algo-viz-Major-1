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
    
    // BYPASS: Create mock user session immediately
    const mockUser = {
      id: 'mock-user-id',
      email: 'demo@algoviz.com',
      email_confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: { full_name: 'Demo User' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User;
    
    const mockSession = {
      user: mockUser,
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      expires_at: Date.now() + 3600000,
      token_type: 'bearer',
    } as Session;
    
    setUser(mockUser);
    setSession(mockSession);
    setLoading(false);
    
    // Keep original listener for compatibility but override with mock data
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      // Always use mock session
      setSession(mockSession);
      setUser(mockUser);
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
    // BYPASS: Always succeed immediately
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    toast({
      title: "Account Created Successfully! 🎉",
      description: "Welcome to AlgoViz! Redirecting to dashboard...",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
    
    setLoading(false);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // BYPASS: Always succeed immediately
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    toast({
      title: "Login Successful! 👋",
      description: `Welcome back! Redirecting to dashboard...`,
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
    
    setLoading(false);
    return { error: null };
  };

  const signOut = async () => {
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
