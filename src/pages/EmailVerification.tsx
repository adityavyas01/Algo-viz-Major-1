import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signUp } = useAuth();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const email = searchParams.get("email") || "";

  // Function to check if user has completed skills assessment
  const checkUserStatus = async () => {
    if (!user) return null;

    const { data: assessment } = await supabase
      .from("user_assessments")
      .select("id")
      .eq("user_id", user.id)
      .single();

    return assessment;
  };

  // Function to redirect user to appropriate page
  const redirectUser = async () => {
    const assessment = await checkUserStatus();
    if (assessment) {
      navigate("/dashboard");
    } else {
      navigate("/skills-assessment");
    }
  };

  useEffect(() => {
    // If user is already authenticated and verified, redirect to appropriate page
    if (user && user.email_confirmed_at) {
      setIsVerified(true);
      redirectUser();
    }
  }, [user, navigate]);

  // Enhanced polling mechanism to check verification status (webhook-style)
  useEffect(() => {
    if (!user || user.email_confirmed_at) return;

    let pollCount = 0;
    const maxPolls = 60; // Stop polling after 5 minutes (60 * 5 seconds)

    const pollInterval = setInterval(async () => {
      pollCount++;
      setIsChecking(true);

      try {
        // Refresh the session to get latest user data
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error refreshing session:", error);
          return;
        }

        // Check if user is now verified
        if (session?.user?.email_confirmed_at) {
          setIsVerified(true);
          toast({
            title: "Email Verified! 🎉",
            description:
              "Your email has been successfully verified. Redirecting...",
          });

          // Redirect to appropriate page
          const assessment = await checkUserStatus();
          if (assessment) {
            navigate("/dashboard");
          } else {
            navigate("/skills-assessment");
          }

          // Clear the interval since verification is complete
          clearInterval(pollInterval);
          return;
        }

        // If we've been polling for too long, stop and show a message
        if (pollCount >= maxPolls) {
          clearInterval(pollInterval);
          toast({
            title: "Verification Timeout",
            description:
              "Please check your email and click the verification link, or try resending the email.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      } finally {
        setIsChecking(false);
      }
    }, 5000); // Check every 5 seconds for better performance

    return () => clearInterval(pollInterval);
  }, [user, navigate, toast]);

  const handleResendEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address not found. Please try signing up again.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    try {
      // Production URL for email verification redirect
      const redirectUrl = "https://algo-viz-major-1.vercel.app/email-verification-success";

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setResendCount((prev) => prev + 1);
        toast({
          title: "Email Sent",
          description: "We've sent you another confirmation email.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to resend email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToSignup = () => {
    navigate("/register");
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Email Verified! 🎉
            </CardTitle>
            <CardDescription className="text-white/70">
              Your email has been successfully verified. Redirecting you to the
              next step...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-cyan-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-white/70">
            We've sent a verification link to{" "}
            <span className="text-cyan-400 font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Click the link in your email to verify your account and complete
              the signup process.
            </p>
            {isChecking && (
              <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                  <p className="text-cyan-400 text-sm font-medium">
                    🔍 Checking verification status...
                  </p>
                </div>
                <p className="text-cyan-300/70 text-xs mt-1">
                  We'll automatically detect when you verify from any device
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleResendEmail}
              disabled={isResending || resendCount >= 3}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  {resendCount > 0
                    ? "Resend Email"
                    : "Resend Verification Email"}
                </>
              )}
            </Button>

            {resendCount >= 3 && (
              <p className="text-yellow-400 text-sm text-center">
                Maximum resend attempts reached. Please try again later or
                contact support.
              </p>
            )}

            <Button
              onClick={handleBackToSignup}
              variant="outline"
              className="w-full border-white/30 text-white/70 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign Up
            </Button>
          </div>

          <div className="text-center">
            <p className="text-white/50 text-xs">
              Didn't receive the email? Check your spam folder or try resending.
              {isChecking && (
                <span className="block mt-1 text-cyan-300/70">
                  🔄 Checking verification status...
                </span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
