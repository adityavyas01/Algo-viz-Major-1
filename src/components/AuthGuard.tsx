
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  // BYPASS: Always allow access, no authentication required
  return <>{children}</>;
};
