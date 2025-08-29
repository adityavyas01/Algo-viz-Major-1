import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAssessment, setHasAssessment] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user) {
        // Check if user has completed skills assessment
        const { data: assessment } = await supabase
          .from("user_assessments")
          .select("id")
          .eq("user_id", user.id)
          .single();

        setHasAssessment(!!assessment);
        
        // Start countdown timer
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              // Auto-redirect after countdown
              if (assessment) {
                navigate("/dashboard");
              } else {
                navigate("/skills-assessment");
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(countdownInterval);
      }
      setIsLoading(false);
    };

    // Wait a bit for auth state to settle
    const timer = setTimeout(checkUserStatus, 1000);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleContinue = () => {
    if (hasAssessment) {
      navigate("/dashboard");
    } else {
      navigate("/skills-assessment");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Email Verified! 🎉
          </CardTitle>
          <CardDescription className="text-white/70 text-lg">
            Thank you for verifying your email address. Your account is now
            active!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-white/60">
              Welcome to AlgoViz! You're all set to start your algorithm
              learning journey.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg py-3"
            >
              {hasAssessment ? (
                <>
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Start Skills Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full border-white/30 text-white/70 hover:bg-white/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Home Page
            </Button>
          </div>

          <div className="text-center">
            <p className="text-white/50 text-sm">
              {hasAssessment
                ? "You can now access all features and continue your learning journey."
                : "Complete a quick skills assessment to get your personalized learning path."}
            </p>
            {countdown > 0 && (
              <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <p className="text-cyan-400 text-sm font-medium">
                  🚀 Auto-redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
                </p>
                <p className="text-cyan-300/70 text-xs mt-1">
                  Click the button above to continue immediately
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationSuccess;
