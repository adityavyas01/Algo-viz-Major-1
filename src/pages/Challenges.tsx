import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChallengeMode } from "@/components/ChallengeMode";
import { ProfessionalChallenges } from "@/components/ProfessionalChallenges";
import { 
  Code, 
  Trophy, 
  Users, 
  Target, 
  TrendingUp, 
  Search,
  Filter,
  Play,
  Zap,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MotionWrapper } from "@/components/motion/MotionWrapper";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <MotionWrapper variant="fadeInUp">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Coding Challenges
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Sharpen your skills, prepare for interviews, and compete in contests.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1 flex gap-2">
              <button 
                onClick={() => setActiveTab('problems')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'problems' 
                    ? 'bg-cyan-500/20 text-cyan-300' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Problems
              </button>
              <button 
                onClick={() => setActiveTab('contests')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'contests' 
                    ? 'bg-purple-500/20 text-purple-300' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4" />
                Contests
              </button>
              <button 
                onClick={() => setActiveTab('interview')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'interview' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                Interview
              </button>
            </div>
          </div>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Stats Cards */}
            <StatCard icon={<Code />} title="Total Problems" value="2,547" color="cyan" />
            <StatCard icon={<Target />} title="Problems Solved" value="127" color="green" />
            <StatCard icon={<TrendingUp />} title="Acceptance Rate" value="67%" color="yellow" />
            <StatCard icon={<Zap />} title="Current Streak" value="7 days" color="purple" />
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        placeholder="Search problems..."
                        className="w-full bg-white/5 border-2 border-white/10 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <button className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white/80 hover:bg-white/20 transition-colors">
                      <Filter className="w-5 h-5" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ProfessionalChallenges onChallengeSelect={setSelectedChallenge} />
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <MotionWrapper variant="fadeInUp" delay={0.4}>
              <SidebarCard title="Quick Start">
                <div className="space-y-3">
                  <QuickStartButton onClick={() => setSelectedChallenge('random-easy')} difficulty="Easy" />
                  <QuickStartButton onClick={() => setSelectedChallenge('random-medium')} difficulty="Medium" />
                  <QuickStartButton onClick={() => setSelectedChallenge('random-hard')} difficulty="Hard" />
                </div>
              </SidebarCard>
            </MotionWrapper>

            <MotionWrapper variant="fadeInUp" delay={0.5}>
              <SidebarCard title="Today's Challenge">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 font-medium">Two Sum</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Easy</span>
                  </div>
                  <p className="text-white/60 text-sm">Find two numbers in an array that add up to a specific target.</p>
                  <button 
                    onClick={() => setSelectedChallenge('two-sum')}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    Start Challenge
                  </button>
                </div>
              </SidebarCard>
            </MotionWrapper>

            <MotionWrapper variant="fadeInUp" delay={0.6}>
              <SidebarCard title="Your Progress">
                <div className="space-y-4">
                  <ProgressBar title="Easy" value={12.4} color="green" count="76/612" />
                  <ProgressBar title="Medium" value={3.2} color="yellow" count="43/1356" />
                  <ProgressBar title="Hard" value={1.6} color="red" count="8/489" />
                </div>
              </SidebarCard>
            </MotionWrapper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
  <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-${color}-500/50 transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/60 text-sm">{title}</p>
        <p className={`text-3xl font-bold text-${color}-400`}>{value}</p>
      </div>
      <div className={`p-3 bg-${color}-500/10 rounded-lg`}>
        {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 text-${color}-400` })}
      </div>
    </div>
  </div>
);

const SidebarCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    {children}
  </div>
);

const QuickStartButton: React.FC<{ onClick: () => void; difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ onClick, difficulty }) => {
  const colors = {
    Easy: 'green',
    Medium: 'yellow',
    Hard: 'red',
  };
  const color = colors[difficulty];

  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between bg-${color}-500/10 border border-${color}-500/20 rounded-lg p-3 text-${color}-300 hover:bg-${color}-500/20 transition-colors group`}
    >
      <span>Random {difficulty}</span>
      <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

const ProgressBar: React.FC<{ title: string; value: number; color: string; count: string }> = ({ title, value, color, count }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className={`font-medium text-${color}-400`}>{title}</span>
      <span className="text-white/60">{count}</span>
    </div>
    <div className="w-full bg-white/10 rounded-full h-2">
      <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default Challenges;
