import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Settings, 
  Download, 
  Calendar,
  Target,
  Trophy,
  GraduationCap,
  UserCheck,
  Clock,
  TrendingUp,
  FileText,
  Lock,
  Globe,
  Zap
} from 'lucide-react';

interface EnterpriseUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  institution: string;
  department: string;
  enrolledCourses: string[];
  lastActive: Date;
  completionRate: number;
  skillLevel: number;
}

interface Institution {
  id: string;
  name: string;
  domain: string;
  logo: string;
  totalUsers: number;
  activeUsers: number;
  coursesOffered: number;
  subscriptionTier: 'basic' | 'premium' | 'enterprise';
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  department: string;
  enrolledStudents: number;
  completionRate: number;
  avgScore: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
}

interface SSOConfig {
  provider: string;
  enabled: boolean;
  domain: string;
  clientId: string;
  lastSync: Date;
}

const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'MIT Computer Science',
    domain: 'mit.edu',
    logo: '/api/placeholder/60/60',
    totalUsers: 2450,
    activeUsers: 1890,
    coursesOffered: 25,
    subscriptionTier: 'enterprise'
  },
  {
    id: '2',
    name: 'Stanford Engineering',
    domain: 'stanford.edu',
    logo: '/api/placeholder/60/60',
    totalUsers: 1820,
    activeUsers: 1320,
    coursesOffered: 18,
    subscriptionTier: 'premium'
  },
  {
    id: '3',
    name: 'Carnegie Mellon SCS',
    domain: 'cmu.edu',
    logo: '/api/placeholder/60/60',
    totalUsers: 1650,
    activeUsers: 1200,
    coursesOffered: 22,
    subscriptionTier: 'enterprise'
  }
];

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Data Structures',
    instructor: 'Dr. Sarah Chen',
    department: 'Computer Science',
    enrolledStudents: 180,
    completionRate: 85,
    avgScore: 87.5,
    difficulty: 'advanced',
    topics: ['Trees', 'Graphs', 'Hash Tables', 'Heaps']
  },
  {
    id: '2',
    title: 'Algorithm Design & Analysis',
    instructor: 'Prof. Michael Rodriguez',
    department: 'Computer Science',
    enrolledStudents: 220,
    completionRate: 78,
    avgScore: 82.3,
    difficulty: 'intermediate',
    topics: ['Dynamic Programming', 'Greedy Algorithms', 'Divide & Conquer']
  },
  {
    id: '3',
    title: 'Computational Complexity',
    instructor: 'Dr. Lisa Wang',
    department: 'Computer Science',
    enrolledStudents: 95,
    completionRate: 72,
    avgScore: 79.8,
    difficulty: 'advanced',
    topics: ['P vs NP', 'Approximation Algorithms', 'Cryptographic Protocols']
  }
];

const mockEnterpriseUsers: EnterpriseUser[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@mit.edu',
    role: 'student',
    institution: 'MIT Computer Science',
    department: 'Computer Science',
    enrolledCourses: ['Advanced Data Structures', 'Algorithm Design & Analysis'],
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    completionRate: 92,
    skillLevel: 8
  },
  {
    id: '2',
    name: 'Dr. Sarah Chen',
    email: 'sarah@mit.edu',
    role: 'instructor',
    institution: 'MIT Computer Science',
    department: 'Computer Science',
    enrolledCourses: [],
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    completionRate: 100,
    skillLevel: 10
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@stanford.edu',
    role: 'student',
    institution: 'Stanford Engineering',
    department: 'Computer Science',
    enrolledCourses: ['Algorithm Design & Analysis'],
    lastActive: new Date(Date.now() - 45 * 60 * 1000),
    completionRate: 76,
    skillLevel: 6
  }
];

const mockSSOConfigs: SSOConfig[] = [
  {
    provider: 'Microsoft Azure AD',
    enabled: true,
    domain: 'mit.edu',
    clientId: 'abc123-def456-ghi789',
    lastSync: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    provider: 'Google Workspace',
    enabled: true,
    domain: 'stanford.edu',
    clientId: 'xyz789-uvw456-rst123',
    lastSync: new Date(Date.now() - 25 * 60 * 1000)
  },
  {
    provider: 'Okta',
    enabled: false,
    domain: 'cmu.edu',
    clientId: 'pending-setup',
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

export const EnterpriseIntegrationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(mockInstitutions[0]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'institutions', label: 'Institutions', icon: Building2 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'sso', label: 'SSO Configuration', icon: Shield },
    { id: 'analytics', label: 'Advanced Analytics', icon: TrendingUp },
    { id: 'reports', label: 'Custom Reports', icon: FileText }
  ];

  const handleTabChange = (tabId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsLoading(false);
    }, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }> = ({ title, value, change, icon: Icon, color }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${
            change.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </motion.div>
  );

  const InstitutionCard: React.FC<{ institution: Institution }> = ({ institution }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedInstitution(institution)}
    >
      <div className="flex items-center mb-4">
        <img
          src={institution.logo}
          alt={`${institution.name} logo`}
          className="w-12 h-12 rounded-lg mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{institution.name}</h3>
          <p className="text-gray-600 text-sm">{institution.domain}</p>
        </div>
        <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
          institution.subscriptionTier === 'enterprise'
            ? 'bg-purple-100 text-purple-800'
            : institution.subscriptionTier === 'premium'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {institution.subscriptionTier}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-gray-900">{institution.totalUsers.toLocaleString()}</p>
          <p className="text-gray-600 text-xs">Total Users</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{institution.activeUsers.toLocaleString()}</p>
          <p className="text-gray-600 text-xs">Active Users</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-600">{institution.coursesOffered}</p>
          <p className="text-gray-600 text-xs">Courses</p>
        </div>
      </div>
    </motion.div>
  );

  const UserRow: React.FC<{ user: EnterpriseUser }> = ({ user }) => (
    <motion.tr
      variants={itemVariants}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          user.role === 'admin' 
            ? 'bg-red-100 text-red-800'
            : user.role === 'instructor'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.department}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.enrolledCourses.length}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${user.completionRate}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-900">{user.completionRate}%</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {user.lastActive.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </td>
    </motion.tr>
  );

  const renderDashboard = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Institutions"
          value={mockInstitutions.length}
          change="+2"
          icon={Building2}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Active Users"
          value="12,458"
          change="+8.2%"
          icon={Users}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <MetricCard
          title="Course Completions"
          value="89.4%"
          change="+3.1%"
          icon={GraduationCap}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Enterprise Revenue"
          value="$2.4M"
          change="+12.5%"
          icon={TrendingUp}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Institution Performance</h3>
          <div className="space-y-4">
            {mockInstitutions.map((institution, index) => (
              <div key={institution.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={institution.logo}
                    alt={institution.name}
                    className="w-8 h-8 rounded mr-3"
                  />
                  <span className="font-medium text-gray-900">{institution.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {((institution.activeUsers / institution.totalUsers) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-600">Engagement</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <UserCheck className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">New institution onboarded</p>
                <p className="text-xs text-gray-600">Harvard University joined 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Course completion milestone</p>
                <p className="text-xs text-gray-600">MIT achieved 90% completion rate</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">New feature deployed</p>
                <p className="text-xs text-gray-600">Advanced analytics now available</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderInstitutions = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Institution Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Building2 className="w-4 h-4 mr-2" />
          Add Institution
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInstitutions.map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>
    </motion.div>
  );

  const renderUserManagement = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Bulk Import
          </button>
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockEnterpriseUsers.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderSSO = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">SSO Configuration</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          Add SSO Provider
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSSOConfigs.map((config, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${config.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Shield className={`w-5 h-5 ${config.enabled ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{config.provider}</h3>
                  <p className="text-gray-600">{config.domain}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                config.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {config.enabled ? 'Active' : 'Inactive'}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Client ID</span>
                <span className="text-sm font-mono text-gray-900">{config.clientId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm text-gray-900">
                  {config.lastSync.toLocaleDateString()} at {config.lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Configure
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Test Connection
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Enterprise Integration Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive enterprise-grade features for educational institutions including SSO integration, 
              advanced analytics, and institutional management tools.
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'institutions' && renderInstitutions()}
                {activeTab === 'users' && renderUserManagement()}
                {activeTab === 'sso' && renderSSO()}
                {activeTab === 'courses' && (
                  <motion.div variants={containerVariants} className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Course Management</h3>
                    <p className="text-gray-600">Advanced course management features coming soon...</p>
                  </motion.div>
                )}
                {activeTab === 'analytics' && (
                  <motion.div variants={containerVariants} className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600">Deep institutional analytics dashboard coming soon...</p>
                  </motion.div>
                )}
                {activeTab === 'reports' && (
                  <motion.div variants={containerVariants} className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Reports</h3>
                    <p className="text-gray-600">Customizable reporting engine coming soon...</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default EnterpriseIntegrationHub;