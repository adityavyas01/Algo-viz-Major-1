import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionWrapper, MicroInteraction } from './motion/MotionWrapper';

export const Hero = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Animated floating orbs */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto text-center relative z-10">
        <MotionWrapper variant="stagger" className="max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <MicroInteraction type="card">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 hover:bg-white/15 transition-colors">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-sm font-medium text-white/90">Interactive Algorithm Learning Platform</span>
              </div>
            </MicroInteraction>
          </MotionWrapper>
          
          {/* Enhanced Title */}
          <MotionWrapper variant="fadeInUp" delay={0.4}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
              Visualize{' '}
              <span className="relative inline-block">
                <motion.span 
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Algorithms
                </motion.span>
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-lg rounded-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>
          </MotionWrapper>
          
          {/* Enhanced Description */}
          <MotionWrapper variant="fadeInUp" delay={0.6}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-4xl mx-auto px-4 sm:px-0">
              Master data structures and algorithms through{' '}
              <motion.span 
                className="text-cyan-400 font-semibold"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 10px rgba(34, 211, 238, 0.8)"
                }}
                transition={{ duration: 0.2 }}
              >
                interactive visualizations
              </motion.span>
              . 
              Watch algorithms come to life with real-time animations and step-by-step execution.
            </p>
          </MotionWrapper>
          
          {/* Enhanced Action Buttons */}
          <MotionWrapper variant="fadeInUp" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 px-4 sm:px-0">
              <a href="#visualizations" className="group">
                <MicroInteraction type="button">
                  <Button size="lg" className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-cyan-500/25 transition-all duration-300">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600/50 to-purple-600/50 rounded-xl blur opacity-75"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div className="relative flex items-center">
                      <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Play className="w-6 h-6 mr-3" />
                      </motion.div>
                      Try Visualizations
                    </div>
                  </Button>
                </MicroInteraction>
              </a>
              <Link to="/learning" className="group">
                <MicroInteraction type="button">
                  <Button size="lg" className="relative bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div className="relative flex items-center">
                      <BookOpen className="w-6 h-6 mr-3" />
                      View Tutorials
                    </div>
                  </Button>
                </MicroInteraction>
              </Link>
            </div>
          </MotionWrapper>

          {/* Enhanced Feature Cards */}
          <MotionWrapper variant="stagger" delay={1.0}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center px-4 sm:px-0">
              <MotionWrapper variant="scaleIn" delay={1.2}>
                <MicroInteraction type="card">
                  <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="relative">
                      <motion.div 
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 via-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-2xl blur-xl mx-auto opacity-75"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.75, 1, 0.75]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors">Interactive Learning</h3>
                    <p className="text-sm sm:text-base text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">Step through algorithms with real-time visualizations and intuitive controls</p>
                  </div>
                </MicroInteraction>
              </MotionWrapper>
              
              <MotionWrapper variant="scaleIn" delay={1.4} className="sm:col-span-2 lg:col-span-1">
                <MicroInteraction type="card">
                  <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="relative">
                      <motion.div 
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      >
                        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-2xl blur-xl mx-auto opacity-75"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.75, 1, 0.75]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors">Comprehensive Coverage</h3>
                    <p className="text-sm sm:text-base text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">From basic sorting to advanced graph algorithms and data structures</p>
                  </div>
                </MicroInteraction>
              </MotionWrapper>
              
              <MotionWrapper variant="scaleIn" delay={1.6} className="sm:col-span-2 lg:col-span-1">
                <MicroInteraction type="card">
                  <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="relative">
                      <motion.div 
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      >
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-2xl blur-xl mx-auto opacity-75"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.75, 1, 0.75]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-orange-300 transition-colors">Practice Mode</h3>
                    <p className="text-sm sm:text-base text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">Test your understanding with interactive coding challenges and assessments</p>
                  </div>
                </MicroInteraction>
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </MotionWrapper>
      </div>
    </section>
  );
};
