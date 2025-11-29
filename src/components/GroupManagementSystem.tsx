import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Settings, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Mail,
  Edit3,
  Trash2,
  Eye,
  Filter,
  Search,
  Download,
  Upload,
  Shield,
  Crown,
  Award,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { CreateGroupModal } from './CreateGroupModal';

// Type definitions from the database schema
interface Group {
  id: number;
  name: string;
  description: string | null;
  institution_id: number | null;
  created_at: string;
}

interface GroupMember {
  id: number;
  group_id: number;
  user_id: string;
  role: 'admin' | 'member';
  // Joined from profiles table
  name?: string;
  email?: string;
}

export const GroupManagementSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [groups, setGroups] = useState<Group[]>([]);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { session } = useAuth();

  const tabs = [
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'members', label: 'Members', icon: UserPlus },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'permissions', label: 'Permissions', icon: Shield }
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;
      setIsLoading(true);
      setError(null);

      try {
        // Fetch groups the user is a member of
        const { data: groupMemberships, error: membershipError } = await supabase
          .from('group_members')
          .select('group_id')
          .eq('user_id', session.user.id);

        if (membershipError) throw membershipError;

        const groupIds = groupMemberships.map(m => m.group_id);

        if (groupIds.length > 0) {
          const { data: groupData, error: groupError } = await supabase
            .from('groups')
            .select('*')
            .in('id', groupIds);

          if (groupError) throw groupError;
          setGroups(groupData || []);
          if (groupData && groupData.length > 0) {
            setSelectedGroup(groupData[0]);
          }
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching group data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedGroup) return;
      
      try {
        const { data, error } = await supabase
          .from('group_members')
          .select(`
            id,
            group_id,
            user_id,
            role,
            profiles (
              full_name,
              email
            )
          `)
          .eq('group_id', selectedGroup.id);

        if (error) throw error;

        const formattedMembers = data.map((m: any) => ({
          ...m,
          name: m.profiles.full_name,
          email: m.profiles.email,
        }));
        setMembers(formattedMembers);

      } catch (err: any) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, [selectedGroup]);


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

  const GroupCard: React.FC<{ group: Group }> = ({ group }) => (
    <motion.div
      variants={itemVariants}
      className={`bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer ${
        selectedGroup?.id === group.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-100'
      }`}
      onClick={() => setSelectedGroup(group)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{group.description || 'No description available.'}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-800 transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-800 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          Created {new Date(group.created_at).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );

  const MemberRow: React.FC<{ member: GroupMember }> = ({ member }) => (
    <motion.tr
      variants={itemVariants}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
            member.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'
          }`}>
            {member.name ? member.name.charAt(0) : '?'}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{member.name || 'N/A'}</p>
            <p className="text-sm text-gray-600">{member.email || 'N/A'}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          member.role === 'admin' 
            ? 'bg-purple-100 text-purple-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {member.role}
        </span>
      </td>
      {/* Placeholder for progress and other stats */}
      <td className="px-6 py-4 text-sm text-gray-500">--</td>
      <td className="px-6 py-4 text-sm text-gray-500">--</td>
      <td className="px-6 py-4 text-sm text-gray-500">--</td>
      <td className="px-6 py-4 text-sm text-gray-500">--</td>
    </motion.tr>
  );

  const renderGroups = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      {/* Toolbar */}
      <div className="flex justify-end items-center space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Group
          </button>
      </div>

      {isLoading && <p>Loading groups...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </motion.div>
  );

  const renderMembers = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          Members of {selectedGroup?.name || 'Select a Group'}
        </h3>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Invite
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
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div variants={containerVariants} className="text-center py-12">
      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Analytics</h3>
      <p className="text-gray-600">Detailed analytics for group performance and engagement are coming soon.</p>
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
              Group Management System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced group management with role-based permissions, analytics, and collaborative learning features
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
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {activeTab === 'groups' && renderGroups()}
              {activeTab === 'members' && renderMembers()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'permissions' && (
                <motion.div variants={containerVariants} className="text-center py-12">
                  <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Permission Management</h3>
                  <p className="text-gray-600">Advanced role-based permission system coming soon...</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showCreateModal && (
            <CreateGroupModal
              onClose={() => setShowCreateModal(false)}
              onGroupCreated={() => {
                // Refetch groups data
                const fetchData = async () => {
                  if (!session) return;
                  const { data: groupMemberships, error: membershipError } = await supabase
                    .from('group_members')
                    .select('group_id')
                    .eq('user_id', session.user.id);

                  if (membershipError) return;
                  const groupIds = groupMemberships.map(m => m.group_id);

                  if (groupIds.length > 0) {
                    const { data: groupData, error: groupError } = await supabase
                      .from('groups')
                      .select('*')
                      .in('id', groupIds);
                    if (groupError) return;
                    setGroups(groupData || []);
                  }
                };
                fetchData();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GroupManagementSystem;