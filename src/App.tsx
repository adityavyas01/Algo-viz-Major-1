import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { EnhancedThemeProvider } from "@/contexts/EnhancedTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageLoader } from "@/components/ui/loader";

// Core pages - loaded immediately
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Lazy-loaded pages for better performance
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Learning = React.lazy(() => import("@/pages/Learning"));
const Community = React.lazy(() => import("@/pages/Community"));
const Challenges = React.lazy(() => import("@/pages/Challenges"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const SkillsAssessment = React.lazy(() => import("@/pages/SkillsAssessment"));
const EmailVerification = React.lazy(() => import("@/pages/EmailVerification"));
const EmailVerificationSuccess = React.lazy(() => import("@/pages/EmailVerificationSuccess"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/ResetPassword"));
const AdminPage = React.lazy(() => import("@/pages/AdminPage"));
const AdvancedFeatures = React.lazy(() => import("@/pages/AdvancedFeatures"));
const PracticeProblems = React.lazy(() => import("@/pages/PracticeProblems"));
const Leaderboard = React.lazy(() => import("@/pages/Leaderboard"));
const EnhancedVisualizationDemo = React.lazy(() => import("@/pages/EnhancedVisualizationDemo"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

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

function App() {
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
                <div className="App">
                  <Suspense fallback={<PageLoader />}>
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
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/learning" 
                      element={<Learning />} 
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

                    <Route 
                      path="/demo" 
                      element={<EnhancedVisualizationDemo />} 
                    />
                    {/* Admin Routes */}
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute requireAdmin>
                          <AdminPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Catch all route */}
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
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
