import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, Eye, EyeOff, Github, Zap, ShieldCheck, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, LoginForm } from '@/lib/validations';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signInWithMagicLink, user } = useAuth();
  
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
    
    // Validate form data
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof LoginForm, string>> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    const { error } = await signIn(formData.email, formData.password);
    
    if (!error) {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('algviz_remembered_email', formData.email);
      } else {
        localStorage.removeItem('algviz_remembered_email');
      }
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrors({});
    
    // Auto-fill and submit with demo credentials
    const demoEmail = 'admin@algoviz.com';
    const demoPassword = 'Admin@123';
    
    setFormData({ email: demoEmail, password: demoPassword });
    
    const { error } = await signIn(demoEmail, demoPassword);
    
    if (!error) {
      toast({
        title: "🚀 Demo Mode Activated",
        description: "Exploring AlgoViz with full admin access!",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Demo Access Banner */}
        <Alert className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/50 backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          <AlertDescription className="text-white/90 text-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <strong className="text-cyan-300">Demo Access Available</strong>
                <p className="text-white/70 mt-1">
                  Try AlgoViz instantly with full admin access - no email verification needed!
                </p>
              </div>
              <Info className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            </div>
          </AlertDescription>
        </Alert>

      <Card className="w-full bg-white/10 backdrop-blur-sm border-white/20">
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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

            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              {/* Quick Demo Login Button */}
              <Button 
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                <Zap className="mr-2 h-4 w-4" />
                {isLoading ? 'Loading Demo...' : '⚡ Quick Demo Login'}
              </Button>

              {/* Demo Credentials Display */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3 space-y-1">
                <p className="text-xs text-cyan-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Demo Access
                </p>
                <p className="text-xs text-white/50 pt-1">
                  Click "Quick Demo Login" above for instant full access — no signup needed.
                </p>
              </div>
            </div>
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
            <Button 
              variant="outline" 
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => {
                toast({
                  title: "OAuth Coming Soon",
                  description: "GitHub authentication will be available in the next update. Use email/password or demo login for now.",
                });
              }}
            >
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
    </div>
  );
};

export default Login;
