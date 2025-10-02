import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/90">Interactive Algorithm Learning Platform</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            Visualize{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Algorithms
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-lg rounded-lg animate-pulse" />
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-4xl mx-auto animate-fade-in-up delay-200 px-4 sm:px-0">
            Master data structures and algorithms through{' '}
            <span className="text-cyan-400 font-semibold">interactive visualizations</span>. 
            Watch algorithms come to life with real-time animations and step-by-step execution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 animate-fade-in-up delay-300 px-4 sm:px-0">
            <Link to="/register" className="group">
              <Button size="lg" className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-cyan-500/40">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/50 to-purple-600/50 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center">
                  <Play className="w-6 h-6 mr-3" />
                  Start Learning
                </div>
              </Button>
            </Link>
            <Link to="/learning" className="group">
              <Button size="lg" className="relative bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  View Tutorials
                </div>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center px-4 sm:px-0">
            <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-fade-in-up delay-400 hover-lift">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 via-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300 group-hover:scale-110 animate-float">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-2xl blur-xl mx-auto opacity-75 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors">Interactive Learning</h3>
              <p className="text-sm sm:text-base text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">Step through algorithms with real-time visualizations and intuitive controls</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-fade-in-up delay-500 hover-lift sm:col-span-2 lg:col-span-1">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110 animate-float delay-300">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-2xl blur-xl mx-auto opacity-75 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors">Comprehensive Coverage</h3>
              <p className="text-sm sm:text-base text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">From basic sorting to advanced graph algorithms and data structures</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 animate-fade-in-up delay-600 hover-lift sm:col-span-2 lg:col-span-1">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-110 animate-float delay-600">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-2xl blur-xl mx-auto opacity-75 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-orange-300 transition-colors">Practice Mode</h3>
              <p className="text-sm sm:text-base text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">Test your understanding with interactive coding challenges and assessments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
