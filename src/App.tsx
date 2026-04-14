import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
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


import { PWAProvider } from "@/components/PWAProvider";
import { usePerformanceOptimization } from "@/lib/optimization";
import { performanceMonitor } from "@/lib/performance";

// Core pages - loaded immediately
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Lazy-loaded pages for better performance
const LearnPageRouter = React.lazy(() => import("@/pages/Learn/LearnPageRouter"));
const ArticlePage = React.lazy(() => import("@/pages/Learn/ArticlePage"));
const Community = React.lazy(() => import("@/pages/Community"));
const Challenges = React.lazy(() => import("@/pages/Challenges"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const EmailVerification = React.lazy(() => import("@/pages/EmailVerification"));
const EmailVerificationSuccess = React.lazy(() => import("@/pages/EmailVerificationSuccess"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/ResetPassword"));
const ManageCategoriesPage = React.lazy(() => import("@/pages/Admin/ManageCategoriesPage"));
const ManageAlgorithmsPage = React.lazy(() => import("@/pages/Admin/ManageAlgorithmsPage"));
const ManageArticlesPage = React.lazy(() => import("@/pages/Admin/ManageArticlesPage"));
const Leaderboard = React.lazy(() => import("@/pages/Leaderboard"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const MyCertificatesPage = React.lazy(() => import("@/pages/Profile/MyCertificatesPage"));
const VerifyCertificatePage = React.lazy(() => import("@/pages/VerifyCertificatePage"));
const ProblemsPage = React.lazy(() => import("@/pages/ProblemsPage"));
const ProblemView = React.lazy(() => import("@/components/ProblemView"));
const ContestsPage = React.lazy(() => import("@/pages/ContestsPage"));
const ContestView = React.lazy(() => import("@/components/ContestView"));
const StudyRoomsPage = React.lazy(() => import("@/pages/StudyRoomsPage"));
const RoomView = React.lazy(() => import("@/components/RoomView"));

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

// Wrapper component for ProblemView to handle route params
const ProblemViewWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ProblemView slug={slug || ""} />;
};

// Routes wrapper component
const AppRoutes = () => {
  return (
        <Routes>
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
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <Leaderboard />
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


          {/* Problems - LeetCode style problem solving */}
          <Route 
            path="/problems" 
            element={<ProblemsPage />} 
          />
          <Route 
            path="/problem/:slug" 
            element={<ProblemViewWrapper />} 
          />

          {/* Contests - Competitive Programming */}
          <Route 
            path="/contests" 
            element={<ContestsPage />} 
          />
          <Route 
            path="/contest/:contestId" 
            element={<ContestView />} 
          />

          {/* Study Rooms - Collaborative Learning */}
          <Route 
            path="/rooms" 
            element={<StudyRoomsPage />} 
          />
          <Route 
            path="/room/:roomId" 
            element={<RoomView />} 
          />

          {/* Catch all route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
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
                          <AppRoutes />
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
