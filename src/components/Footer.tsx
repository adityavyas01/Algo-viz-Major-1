import React from 'react';
import { Zap, Users, BookOpen, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-white/10 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AlgoViz
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              The ultimate platform for visualizing algorithms and mastering data structures through interactive learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cyan-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/learning" className="text-slate-300 hover:text-cyan-400 transition-colors">Learn</Link></li>
              <li><Link to="/challenges" className="text-slate-300 hover:text-cyan-400 transition-colors">Challenges</Link></li>
              <li><Link to="/community" className="text-slate-300 hover:text-cyan-400 transition-colors">Community</Link></li>
              <li><Link to="/dashboard" className="text-slate-300 hover:text-cyan-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cyan-300">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cyan-300">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} AlgoViz. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
