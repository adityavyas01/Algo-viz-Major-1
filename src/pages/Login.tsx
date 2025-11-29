import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff, Github } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, LoginForm } from '@/lib/validations';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // BYPASS: Redirect to home immediately - login page is disabled
  useEffect(() => {
    toast({
      title: "Login Disabled",
      description: "All visualizations are now freely accessible! Redirecting to home...",
    });
    setTimeout(() => navigate('/'), 1000);
  }, [navigate, toast]);

  return null;

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('algviz_remembered_email');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // BYPASS: No validation, always succeed
    await signIn('', '');
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-white/70">
            Sign in to continue your DSA learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email (optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password (optional)"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/60 ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember Me checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-white/40 text-white data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
              />
              <Label
                htmlFor="remember"
                className="text-sm text-white/80 cursor-pointer"
              >
                Remember me on this device
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800 px-2 text-white/60">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 space-y-2 text-center">
            <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300 text-sm block">
              Forgot your password?
            </Link>
            <button
              type="button"
              onClick={() => {
                const email = (document.getElementById('email') as HTMLInputElement)?.value;
                if (email) {
                  signInWithMagicLink(email);
                } else {
                  if (!formData.email) {
                  toast({
                    title: "Email Required",
                    description: "Please enter your email first",
                    variant: "destructive",
                  });
                  return;
                }
                }
              }}
              className="text-purple-400 hover:text-purple-300 text-sm block w-full"
            >
              Send magic link instead
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
