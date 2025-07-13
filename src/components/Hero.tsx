import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Visualize <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Algorithms</span>
            <br />Like Never Before
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Master data structures and algorithms through interactive visualizations. 
            Watch algorithms come to life with real-time animations and step-by-step execution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Link to="/learning">
              <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 px-8 py-3">
                <BookOpen className="w-5 h-5 mr-2" />
                View Tutorials
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Interactive Learning</h3>
              <p className="text-white/70">Step through algorithms with real-time visualizations and controls</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Coverage</h3>
              <p className="text-white/70">From basic sorting to advanced graph algorithms</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Practice Mode</h3>
              <p className="text-white/70">Test your understanding with interactive coding challenges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
