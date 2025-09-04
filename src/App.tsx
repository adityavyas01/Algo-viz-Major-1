import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Learning from "@/pages/Learning";
import Community from "@/pages/Community";
import Challenges from "@/pages/Challenges";
import Profile from "@/pages/Profile";
import SkillsAssessment from "@/pages/SkillsAssessment";
import EmailVerification from "@/pages/EmailVerification";
import EmailVerificationSuccess from "@/pages/EmailVerificationSuccess";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AdminPage from "@/pages/AdminPage";
import AdvancedFeatures from "@/pages/AdvancedFeatures";
import PracticeProblems from "@/pages/PracticeProblems";
import Leaderboard from "@/pages/Leaderboard";
import EnhancedVisualizationDemo from "@/pages/EnhancedVisualizationDemo";
import NotFound from "@/pages/NotFound";

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
          <Router future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}>
            <AuthProvider>
              <AdminProvider>
                <div className="App">
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
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
