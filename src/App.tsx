import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { EnhancedThemeProvider } from "@/contexts/EnhancedTheme";
import { CollaborationProvider } from "@/contexts/CollaborationContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageLoader } from "@/components/ui/loader";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/motion/MotionWrapper";
import { PWAProvider } from "@/components/PWAProvider";
import { usePerformanceOptimization } from "@/lib/optimization";
import { performanceMonitor } from "@/lib/performance";

// Core pages - loaded immediately
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Lazy-loaded pages for better performance
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const LearnPageRouter = React.lazy(() => import("@/pages/Learn/LearnPageRouter"));
const ArticlePage = React.lazy(() => import("@/pages/Learn/ArticlePage"));
const Community = React.lazy(() => import("@/pages/Community"));
const Challenges = React.lazy(() => import("@/pages/Challenges"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const SkillsAssessment = React.lazy(() => import("@/pages/SkillsAssessment"));
const EmailVerification = React.lazy(() => import("@/pages/EmailVerification"));
const EmailVerificationSuccess = React.lazy(() => import("@/pages/EmailVerificationSuccess"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/ResetPassword"));
const AdminPage = React.lazy(() => import("@/pages/AdminPage"));
const ManageCategoriesPage = React.lazy(() => import("@/pages/Admin/ManageCategoriesPage"));
const ManageAlgorithmsPage = React.lazy(() => import("@/pages/Admin/ManageAlgorithmsPage"));
const ManageArticlesPage = React.lazy(() => import("@/pages/Admin/ManageArticlesPage"));
const AdvancedFeatures = React.lazy(() => import("@/pages/AdvancedFeatures"));
const PracticeProblems = React.lazy(() => import("@/pages/PracticeProblems"));
const Leaderboard = React.lazy(() => import("@/pages/Leaderboard"));
const RealTimeCollaboration = React.lazy(() => import("@/components/RealTimeCollaboration"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const CollaborativeSessionPage = React.lazy(() => import("@/pages/CollaborativeSessionPage"));
const MyCertificatesPage = React.lazy(() => import("@/pages/Profile/MyCertificatesPage"));
const VerifyCertificatePage = React.lazy(() => import("@/pages/VerifyCertificatePage"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors (client errors)
        if (typeof error === 'object' && error !== null && 'status' in error) {
          const httpError = error as { status: number };
          if (httpError.status >= 400 && httpError.status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
});

// Animated Routes wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/email-verification-success" element={<EmailVerificationSuccess />} />
        
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/learning" 
            element={<LearnPageRouter />} 
          />
          <Route 
            path="/learn/:algorithmId" 
            element={<ArticlePage />} 
          />
          <Route 
            path="/community" 
            element={<Community />} 
          />
          <Route 
            path="/challenges" 
            element={<Challenges />} 
          />
          <Route 
            path="/practice" 
            element={
              <ProtectedRoute>
                <PracticeProblems />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile/certificates" 
            element={
              <ProtectedRoute>
                <MyCertificatesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/verify-certificate/:verificationKey" 
            element={<VerifyCertificatePage />} 
          />
          <Route 
            path="/skills-assessment" 
            element={
              <ProtectedRoute>
                <SkillsAssessment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/advanced-features" 
            element={
              <ProtectedRoute>
                <AdvancedFeatures />
              </ProtectedRoute>
            } 
          />

          {/* Collaboration Routes */}
          <Route 
            path="/collaborate/:sessionId" 
            element={
              <ProtectedRoute>
                <RealTimeCollaboration />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <Navigate to="/admin/categories" replace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/categories" 
            element={
              <ProtectedRoute requireAdmin>
                <ManageCategoriesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/algorithms" 
            element={
              <ProtectedRoute requireAdmin>
                <ManageAlgorithmsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/articles" 
            element={
              <ProtectedRoute requireAdmin>
                <ManageArticlesPage />
              </ProtectedRoute>
            } 
          />
          
          {/* New Collaborative Session Route */}
          <Route 
            path="/session/:sessionId" 
            element={
              <ProtectedRoute>
                <CollaborativeSessionPage />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

function App() {
  // Initialize performance optimization
  usePerformanceOptimization();
  
  // Initialize performance monitoring
  useEffect(() => {
    performanceMonitor.initialize();
    
    return () => {
      performanceMonitor.disconnect();
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <EnhancedThemeProvider>
            <Router future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}>
              <AuthProvider>
                <AdminProvider>
                  <CollaborationProvider>
                    <PWAProvider>
                      <div className="App">
                        <Suspense fallback={<PageLoader />}>
                          <AnimatedRoutes />
                        </Suspense>
                        
                        <Toaster 
                          position="top-right"
                          toastOptions={{
                            style: {
                              background: "rgba(0, 0, 0, 0.8)",
                              color: "white",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                            },
                          }}
                        />
                      </div>
                    </PWAProvider>
                  </CollaborationProvider>
                </AdminProvider>
              </AuthProvider>
            </Router>
          </EnhancedThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
