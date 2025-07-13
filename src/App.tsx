import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SkillsAssessmentPage from "./pages/SkillsAssessment";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import Dashboard from "./pages/Dashboard";
import LearningHub from "./pages/LearningHub";
import Gamification from "./pages/Gamification";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "./components/AuthGuard";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AdvancedFeatures from "./pages/AdvancedFeatures";
import SocialHub from "./pages/SocialHub";
import LearningEnhancement from "./pages/LearningEnhancement";
import AILearning from "./pages/AILearning";
import CollaborativeLearning from "./pages/CollaborativeLearning";
import InterviewPrep from "./pages/InterviewPrep";
import Enterprise from "./pages/Enterprise";
import ContentManagement from "./pages/ContentManagement";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/skills-assessment"
                  element={
                    <AuthGuard>
                      <SkillsAssessmentPage />
                    </AuthGuard>
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/email-verification"
                  element={<EmailVerification />}
                />
                <Route path="/learning" element={<LearningHub />} />
                <Route
                  path="/learning-enhancement"
                  element={<LearningEnhancement />}
                />
                <Route path="/ai-learning" element={<AILearning />} />
                <Route
                  path="/collaborative"
                  element={<CollaborativeLearning />}
                />
                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/gamification" element={<Gamification />} />
                <Route path="/social" element={<SocialHub />} />
                <Route path="/advanced" element={<AdvancedFeatures />} />
                <Route path="/enterprise" element={<Enterprise />} />
                <Route
                  path="/content-management"
                  element={<ContentManagement />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
      <SpeedInsights />
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
