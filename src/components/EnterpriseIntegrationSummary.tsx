import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Shield, 
  BarChart3, 
  BookOpen, 
  Settings, 
  CheckCircle2, 
  Target, 
  Award, 
  Globe, 
  Lock, 
  TrendingUp,
  GraduationCap,
  UserCheck,
  Calendar,
  Mail,
  FileText,
  Zap,
  Crown,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface EnterpriseFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'security' | 'management' | 'analytics' | 'integration' | 'curriculum';
  benefits: string[];
  capabilities: string[];
  status: 'implemented' | 'enhanced' | 'new';
}

interface ImplementationPhase {
  phase: string;
  title: string;
  description: string;
  components: string[];
  keyFeatures: string[];
  metrics: {
    componentsBuilt: number;
    featuresImplemented: number;
    integrationPoints: number;
  };
}

const enterpriseFeatures: EnterpriseFeature[] = [
  {
    id: '1',
    title: 'Single Sign-On (SSO) Integration',
    description: 'Enterprise-grade authentication with support for multiple SSO providers including Azure AD, Google Workspace, and Okta',
    icon: Shield,
    category: 'security',
    benefits: [
      'Seamless user authentication across institutional systems',
      'Reduced password fatigue and improved security',
      'Centralized user management and access control',
      'Compliance with enterprise security policies'
    ],
    capabilities: [
      'Microsoft Azure AD integration',
      'Google Workspace SSO support',
      'Okta identity provider configuration',
      'SAML 2.0 and OAuth 2.0 protocols',
      'Real-time user synchronization',
      'Role-based access mapping'
    ],
    status: 'implemented'
  },
  {
    id: '2',
    title: 'Institutional Analytics Dashboard',
    description: 'Comprehensive analytics platform providing deep insights into learning performance, user engagement, and institutional metrics',
    icon: BarChart3,
    category: 'analytics',
    benefits: [
      'Data-driven decision making for curriculum improvement',
      'Real-time monitoring of student progress and engagement',
      'Identification of learning bottlenecks and optimization opportunities',
      'ROI analysis and institutional performance metrics'
    ],
    capabilities: [
      'Multi-dimensional performance analytics',
      'Department-wise progress tracking',
      'Skill progression visualization',
      'Engagement pattern analysis',
      'Custom reporting and data export',
      'Predictive analytics for student success'
    ],
    status: 'implemented'
  },
  {
    id: '3',
    title: 'Advanced Group Management System',
    description: 'Sophisticated group management with role-based permissions, member analytics, and collaborative learning features',
    icon: Users,
    category: 'management',
    benefits: [
      'Streamlined course and group administration',
      'Enhanced collaborative learning experiences',
      'Granular permission control and user management',
      'Automated group analytics and performance tracking'
    ],
    capabilities: [
      'Hierarchical group structure management',
      'Role-based permission system (Admin, Instructor, TA, Student)',
      'Bulk user import and management',
      'Group performance analytics',
      'Member activity tracking',
      'Collaborative workspace management'
    ],
    status: 'implemented'
  },
  {
    id: '4',
    title: 'Curriculum Integration Platform',
    description: 'Comprehensive curriculum management with structured learning paths, interactive modules, and performance tracking',
    icon: BookOpen,
    category: 'curriculum',
    benefits: [
      'Structured curriculum delivery and management',
      'Adaptive learning path optimization',
      'Comprehensive assessment and certification tracking',
      'Integration with existing LMS platforms'
    ],
    capabilities: [
      'Modular curriculum design and management',
      'Interactive learning content integration',
      'Assessment and quiz management',
      'Certification pathway tracking',
      'Learning objective mapping',
      'Progress milestone monitoring'
    ],
    status: 'implemented'
  },
  {
    id: '5',
    title: 'Enterprise User Management',
    description: 'Centralized user management system with advanced role controls, department organization, and user lifecycle management',
    icon: UserCheck,
    category: 'management',
    benefits: [
      'Centralized user provisioning and deprovisioning',
      'Department and organizational structure mapping',
      'Automated user lifecycle management',
      'Compliance with institutional access policies'
    ],
    capabilities: [
      'Bulk user import/export functionality',
      'Department-based user organization',
      'Role hierarchy and permission inheritance',
      'User activity and engagement tracking',
      'Automated user status management',
      'Integration with HR systems'
    ],
    status: 'implemented'
  },
  {
    id: '6',
    title: 'Advanced Reporting Engine',
    description: 'Customizable reporting system with automated report generation, data visualization, and export capabilities',
    icon: FileText,
    category: 'analytics',
    benefits: [
      'Automated institutional reporting and compliance',
      'Customizable dashboards and data visualization',
      'Scheduled report generation and distribution',
      'Multi-format export and integration capabilities'
    ],
    capabilities: [
      'Custom report builder interface',
      'Scheduled automated reporting',
      'Multi-format export (PDF, Excel, CSV)',
      'Interactive data visualization',
      'Report template library',
      'Email distribution and sharing'
    ],
    status: 'enhanced'
  }
];

const implementationPhases: ImplementationPhase[] = [
  {
    phase: 'Phase 3C.1',
    title: 'Enterprise Integration Hub',
    description: 'Core enterprise platform with institutional management, SSO configuration, and basic analytics',
    components: ['EnterpriseIntegrationHub.tsx', 'InstitutionalAnalytics.tsx'],
    keyFeatures: [
      'Institution management dashboard',
      'SSO provider configuration',
      'Basic institutional metrics',
      'User management interface'
    ],
    metrics: {
      componentsBuilt: 1,
      featuresImplemented: 7,
      integrationPoints: 4
    }
  },
  {
    phase: 'Phase 3C.2',
    title: 'Group Management System',
    description: 'Advanced group management with role-based permissions and collaborative features',
    components: ['GroupManagementSystem.tsx'],
    keyFeatures: [
      'Hierarchical group structure',
      'Role-based permission system',
      'Group analytics dashboard',
      'Member management tools'
    ],
    metrics: {
      componentsBuilt: 1,
      featuresImplemented: 8,
      integrationPoints: 3
    }
  },
  {
    phase: 'Phase 3C.3',
    title: 'Curriculum Integration Platform',
    description: 'Comprehensive curriculum management with structured learning paths and assessments',
    components: ['CurriculumIntegration.tsx'],
    keyFeatures: [
      'Modular curriculum design',
      'Learning path management',
      'Assessment integration',
      'Performance analytics'
    ],
    metrics: {
      componentsBuilt: 1,
      featuresImplemented: 9,
      integrationPoints: 5
    }
  }
];

export const EnterpriseIntegrationSummary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', label: 'All Features', icon: Globe },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'management', label: 'Management', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'integration', label: 'Integration', icon: Zap }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? enterpriseFeatures 
    : enterpriseFeatures.filter(feature => feature.category === selectedCategory);

  const toggleFeatureExpansion = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'enhanced': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'from-red-500 to-pink-500';
      case 'management': return 'from-blue-500 to-indigo-500';
      case 'analytics': return 'from-green-500 to-emerald-500';
      case 'curriculum': return 'from-purple-500 to-violet-500';
      case 'integration': return 'from-orange-500 to-amber-500';
      default: return 'from-gray-500 to-slate-500';
    }
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
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium mb-4">
              <Building2 className="w-5 h-5 mr-2" />
              Phase 3C Completed
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Enterprise Integration Summary
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive enterprise-grade features designed for educational institutions, featuring advanced authentication, 
              user management, analytics, and curriculum integration capabilities.
            </p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
              <p className="text-gray-600 text-sm">Major Components</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">24+</h3>
              <p className="text-gray-600 text-sm">Features Implemented</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
              <p className="text-gray-600 text-sm">Integration Points</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">6</h3>
              <p className="text-gray-600 text-sm">Enterprise Systems</p>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex space-x-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Enterprise Features */}
          <div className="space-y-6">
            {filteredFeatures.map((feature) => {
              const Icon = feature.icon;
              const isExpanded = expandedFeatures.has(feature.id);
              
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleFeatureExpansion(feature.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(feature.category)} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                              {feature.status}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100 p-6 bg-gray-50"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Target className="w-5 h-5 text-green-600 mr-2" />
                            Key Benefits
                          </h4>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Zap className="w-5 h-5 text-blue-600 mr-2" />
                            Core Capabilities
                          </h4>
                          <ul className="space-y-2">
                            {feature.capabilities.map((capability, index) => (
                              <li key={index} className="flex items-start">
                                <Star className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{capability}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Implementation Phases */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Implementation Timeline</h2>
            <div className="space-y-4">
              {implementationPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {phase.phase}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{phase.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{phase.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-2xl font-bold text-blue-600">{phase.metrics.componentsBuilt}</p>
                          <p className="text-sm text-gray-600">Components</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-2xl font-bold text-green-600">{phase.metrics.featuresImplemented}</p>
                          <p className="text-sm text-gray-600">Features</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-2xl font-bold text-purple-600">{phase.metrics.integrationPoints}</p>
                          <p className="text-sm text-gray-600">Integrations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Next Phase Preview */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
          >
            <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-4">Ready for Phase 4A: Advanced Gamification</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Next up: Enhanced gamification with achievement badges, leaderboard competitions, skill trees, 
              virtual rewards, team challenges, and social learning features to boost engagement.
            </p>
            <div className="flex items-center justify-center">
              <span className="text-blue-100 mr-2">Continue Development</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnterpriseIntegrationSummary;