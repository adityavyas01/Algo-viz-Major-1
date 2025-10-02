import React, { useState } from "react";
import { Header } from "@/components/Header";
import { ChallengeMode } from "@/components/ChallengeMode";
import { ProfessionalChallenges } from "@/components/ProfessionalChallenges";
import { 
  Code, 
  Trophy, 
  Clock, 
  Users, 
  Target, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  ChevronRight,
  Star,
  Zap,
  BookOpen,
  Play
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Challenges: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'problems' | 'contests' | 'interview'>('problems');

  // Show professional challenge interface if a challenge is selected
  if (selectedChallenge) {
    return (
      <ChallengeMode
        challengeId={selectedChallenge}
        onBack={() => setSelectedChallenge(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      {/* Clean, Minimal Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] opacity-60"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 pt-20">
        {/* Clean Header Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Problems</h1>
              <p className="text-gray-400">Sharpen your coding skills with our curated challenges</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-800/50 rounded-lg p-1">
                <button 
                  onClick={() => setActiveTab('problems')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'problems' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Problems
                </button>
                <button 
                  onClick={() => setActiveTab('contests')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'contests' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Trophy className="w-4 h-4 inline mr-2" />
                  Contests
                </button>
                <button 
                  onClick={() => setActiveTab('interview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'interview' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Interview
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Problems</p>
                  <p className="text-2xl font-bold text-white">2,547</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Solved</p>
                  <p className="text-2xl font-bold text-green-400">127</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Acceptance</p>
                  <p className="text-2xl font-bold text-yellow-400">67%</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Streak</p>
                  <p className="text-2xl font-bold text-orange-400">7 days</p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Problems List */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                
                {/* Search and Filter Bar */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="text"
                        placeholder="Search problems..."
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-600/50 transition-colors">
                      <Filter className="w-5 h-5" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                {/* Professional Problems Interface */}
                <div className="p-6">
                  <ProfessionalChallenges onChallengeSelect={setSelectedChallenge} />
                </div>
                
              </div>
            </div>

            {/* Clean Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                
                {/* Quick Start */}
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setSelectedChallenge('random-easy')}
                      className="w-full flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 hover:bg-green-500/20 transition-colors group"
                    >
                      <span>Random Easy</span>
                      <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setSelectedChallenge('random-medium')}
                      className="w-full flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-400 hover:bg-yellow-500/20 transition-colors group"
                    >
                      <span>Random Medium</span>
                      <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setSelectedChallenge('random-hard')}
                      className="w-full flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 hover:bg-red-500/20 transition-colors group"
                    >
                      <span>Random Hard</span>
                      <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Today's Challenge */}
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Daily Challenge</h3>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Two Sum</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Easy</span>
                    </div>
                    <p className="text-gray-400 text-sm">Find two numbers that add up to target.</p>
                    <button 
                      onClick={() => setSelectedChallenge('two-sum')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Start Challenge
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-400">Easy</span>
                        <span className="text-gray-400">76/612</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '12.4%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-yellow-400">Medium</span>
                        <span className="text-gray-400">43/1356</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '3.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-400">Hard</span>
                        <span className="text-gray-400">8/489</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '1.6%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
