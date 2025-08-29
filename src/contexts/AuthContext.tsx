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
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user) {
        // Handle different sign-in scenarios
        const isEmailVerification = session.user.email_confirmed_at && window.location.pathname.includes('email-verification');
        const isFirstTimeUser = !session.user.last_sign_in_at;
        
        if (isEmailVerification) {
          toast({
            title: "Email verified successfully! 🎉",
            description: "Welcome to AlgoViz! Setting up your account...",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in.",
          });
        }

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

          // Only auto-redirect if not on email verification pages
          if (!window.location.pathname.includes('email-verification')) {
            // Check if user has completed skills assessment
            const { data: assessment } = await supabase
              .from("user_assessments")
              .select("id")
              .eq("user_id", session.user.id)
              .single();

            // Redirect to skills assessment if not completed and not already on that page
            if (
              !assessment &&
              window.location.pathname !== "/skills-assessment"
            ) {
              navigate("/skills-assessment");
            } else if (assessment && window.location.pathname === "/") {
              // If they have completed assessment and are on home page, redirect to dashboard
              navigate("/dashboard");
            }
          }
        }, 500);
      }
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    // Production URL for email verification redirect
    const redirectUrl = "https://algo-viz-major-1.vercel.app/email-verification-success";

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: fullName ? { full_name: fullName } : undefined,
      },
    });

    if (error) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link",
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    // Rate limit authentication attempts
    const { checkAuthRateLimit } = await import('@/lib/security');
    const rateLimitResult = checkAuthRateLimit(email);
    
    if (!rateLimitResult.allowed) {
      const waitTime = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000 / 60);
      toast({
        title: "Too Many Login Attempts",
        description: `Please wait ${waitTime} minutes before trying again.`,
        variant: "destructive",
      });
      return { error: new Error('Rate limited') };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const { logAuthError } = await import('@/lib/errorLogging');
      logAuthError('Sign in failed', error, {
        feature: 'authentication',
        action: 'sign_in',
        metadata: { email, errorCode: error.message },
      });
      
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
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
