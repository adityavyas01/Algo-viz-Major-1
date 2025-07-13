
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Settings, 
  Key, 
  Building, 
  UserCheck,
  Lock,
  Globe,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface SSOProvider {
  id: string;
  name: string;
  type: 'saml' | 'oauth' | 'ldap' | 'oidc';
  status: 'active' | 'inactive' | 'pending';
  users: number;
}

interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  userCount: number;
}

export const EnterpriseSSO: React.FC = () => {
  const [ssoProviders, setSSOProviders] = useState<SSOProvider[]>([
    { id: '1', name: 'Microsoft Azure AD', type: 'saml', status: 'active', users: 1250 },
    { id: '2', name: 'Google Workspace', type: 'oauth', status: 'active', users: 340 },
    { id: '3', name: 'Okta', type: 'saml', status: 'pending', users: 0 },
    { id: '4', name: 'Active Directory', type: 'ldap', status: 'inactive', users: 0 }
  ]);

  const [userRoles, setUserRoles] = useState<UserRole[]>([
    { 
      id: '1', 
      name: 'Administrator', 
      permissions: ['manage_users', 'manage_content', 'view_analytics', 'system_config'],
      userCount: 12
    },
    { 
      id: '2', 
      name: 'Instructor', 
      permissions: ['create_content', 'manage_classes', 'view_student_progress'],
      userCount: 45
    },
    { 
      id: '3', 
      name: 'Student', 
      permissions: ['access_content', 'submit_assignments', 'view_progress'],
      userCount: 1533
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    mfaRequired: true,
    sessionTimeout: 8,
    passwordPolicy: true,
    ipWhitelist: false,
    auditLogging: true
  });

  const handleProviderToggle = (providerId: string) => {
    setSSOProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: provider.status === 'active' ? 'inactive' : 'active' }
        : provider
    ));
  };

  const getStatusColor = (status: SSOProvider['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Enterprise SSO & User Management</h2>
        <p className="text-white/70">Centralized authentication and user administration</p>
      </div>

      <Tabs defaultValue="sso" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sso" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            SSO Providers
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Security Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sso">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  SSO Provider Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {ssoProviders.map((provider) => (
                    <div key={provider.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(provider.status)}`} />
                        <div>
                          <h4 className="text-white font-medium">{provider.name}</h4>
                          <p className="text-white/60 text-sm">{provider.type.toUpperCase()} • {provider.users} users</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-white border-white/30">
                          {provider.status}
                        </Badge>
                        <Switch 
                          checked={provider.status === 'active'}
                          onCheckedChange={() => handleProviderToggle(provider.id)}
                        />
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Add New Provider
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Provider Setup Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">SAML 2.0</h4>
                    <ul className="text-white/70 space-y-1">
                      <li>• Entity ID: https://algoviz.edu/saml</li>
                      <li>• ACS URL: https://algoviz.edu/sso/saml/acs</li>
                      <li>• Certificate: Download from portal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">OAuth 2.0 / OIDC</h4>
                    <ul className="text-white/70 space-y-1">
                      <li>• Client ID: Generated automatically</li>
                      <li>• Redirect URI: https://algoviz.edu/oauth/callback</li>
                      <li>• Scopes: openid, profile, email</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Input 
                      placeholder="Search users..." 
                      className="bg-white/10 border-white/20 text-white placeholder-white/60"
                    />
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Filter
                    </Button>
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Invite Users
                  </Button>
                </div>

                <div className="grid gap-2">
                  {[
                    { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@university.edu', role: 'Administrator', lastLogin: '2 hours ago' },
                    { name: 'Prof. Michael Chen', email: 'michael.chen@university.edu', role: 'Instructor', lastLogin: '1 day ago' },
                    { name: 'Alice Williams', email: 'alice.williams@student.edu', role: 'Student', lastLogin: '5 minutes ago' }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{user.name}</h4>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-white border-white/30">
                          {user.role}
                        </Badge>
                        <span className="text-white/60 text-sm">{user.lastLogin}</span>
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRoles.map((role) => (
                  <div key={role.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{role.name}</h4>
                        <p className="text-white/60 text-sm">{role.userCount} users</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        Edit Role
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, idx) => (
                        <Badge key={idx} variant="outline" className="text-white border-white/30">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  Create New Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Multi-Factor Authentication</Label>
                        <p className="text-white/60 text-sm">Require MFA for all users</p>
                      </div>
                      <Switch 
                        checked={securitySettings.mfaRequired}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, mfaRequired: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Password Policy</Label>
                        <p className="text-white/60 text-sm">Enforce strong passwords</p>
                      </div>
                      <Switch 
                        checked={securitySettings.passwordPolicy}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, passwordPolicy: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">IP Whitelist</Label>
                        <p className="text-white/60 text-sm">Restrict access by IP</p>
                      </div>
                      <Switch 
                        checked={securitySettings.ipWhitelist}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: checked }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Session Timeout (hours)</Label>
                      <Input 
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Audit Logging</Label>
                        <p className="text-white/60 text-sm">Log all user actions</p>
                      </div>
                      <Switch 
                        checked={securitySettings.auditLogging}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, auditLogging: checked }))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/20">
                  <h4 className="text-white font-semibold mb-3">Compliance Status</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-white">SOC 2 Type II</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-white">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-white">FERPA Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
