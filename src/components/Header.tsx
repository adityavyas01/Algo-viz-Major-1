
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Shield, BookOpen, Users, Zap, Home, Trophy, Code2, Swords, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { NotificationBell } from '@/components/NotificationBell';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home, description: 'Homepage and demos' },
    { path: '/learning', label: 'Learning', icon: BookOpen, description: 'Tutorials and learning paths', isNew: false },
    { path: '/problems', label: 'Problems', icon: Code2, description: 'Practice coding problems', badge: 'New' },
    { path: '/contests', label: 'Contests', icon: Swords, description: 'Competitive programming contests', isNew: true },
    { path: '/rooms', label: 'Study Rooms', icon: MessageSquare, description: 'Collaborative learning spaces', isNew: true },
    { path: '/community', label: 'Community', icon: Users, description: 'Social features and groups', badge: 'Popular' },
    { path: '/challenges', label: 'Challenges', icon: Zap, description: 'Coding challenges and competitions', isNew: false },
  ];

  if (user) {
    navigationItems.push(
      { path: '/dashboard', label: 'Dashboard', icon: User, description: 'Your personal dashboard' },
      { path: '/leaderboard', label: 'Leaderboard', icon: Trophy, description: 'Rankings and achievements' }
    );
  }

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/80 to-slate-900/95" />
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AlgoViz
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.slice(1, 6).map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg border border-cyan-500/30'
                        : 'text-white/80 hover:text-cyan-300 hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-0.5 rounded-full">
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-orange-400 to-orange-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                        New
                      </Badge>
                    )}
                  </Link>
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-3 bg-slate-800/95 backdrop-blur-sm text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap border border-white/10 shadow-xl">
                    {item.description}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-800/95 rotate-45 border-t border-l border-white/10"></div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            {user && <NotificationBell />}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10 transition-all duration-300 group">
                    <Avatar className="h-10 w-10 ring-2 ring-cyan-500/30 group-hover:ring-cyan-400/60 transition-all duration-300">
                      <AvatarFallback className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white font-bold text-lg">
                        {user.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-slate-800/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-[60]" align="end">
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-white hover:bg-white/10"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator className="bg-white/20" />
                      <DropdownMenuItem 
                        className="text-cyan-400 hover:bg-cyan-400/10"
                        onClick={() => navigate('/admin')}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-400/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm">
                  All Access - No Login Required
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
