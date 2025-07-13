
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Star, Trophy, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthAwareFeatureProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  featureName: string;
  benefit: string;
  className?: string;
}

export const AuthAwareFeature: React.FC<AuthAwareFeatureProps> = ({
  children,
  requiresAuth = false,
  featureName,
  benefit,
  className = ""
}) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  if (!requiresAuth || isAuthenticated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-white text-xl font-semibold mb-2">
              Unlock {featureName}
            </h3>
            
            <p className="text-white/80 mb-4 text-sm leading-relaxed">
              {benefit}
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-6 text-cyan-300 text-sm">
              <Star className="w-4 h-4" />
              <span>Premium Feature</span>
            </div>
            
            <div className="space-y-3">
              <Button 
                asChild
                size="sm"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
              >
                <Link to="/register">
                  <Trophy className="w-4 h-4 mr-2" />
                  Sign Up Free
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="sm"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/login">
                  Already have an account? Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
