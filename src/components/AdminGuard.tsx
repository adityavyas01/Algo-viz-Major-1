import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
  requiredRole?: 'super_admin' | 'tournament_admin' | 'content_admin' | 'moderator';
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAdmin, adminRole, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
            <p className="text-white/70">Checking admin privileges...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-white/70 mb-4">
              You don't have permission to access this admin area.
            </p>
            <p className="text-white/50 text-sm">
              Please contact a system administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check specific role requirements
  if (requiredRole && adminRole) {
    const roleHierarchy = {
      'super_admin': 4,
      'tournament_admin': 3,
      'content_admin': 2,
      'moderator': 1,
    };

    const userLevel = roleHierarchy[adminRole.role];
    const requiredLevel = roleHierarchy[requiredRole];

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Shield className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Insufficient Privileges</h2>
              <p className="text-white/70 mb-2">
                This area requires {requiredRole.replace('_', ' ')} privileges.
              </p>
              <p className="text-white/50 text-sm">
                Your current role: {adminRole.role.replace('_', ' ')}
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
};
