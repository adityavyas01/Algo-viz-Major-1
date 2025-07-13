
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  Eye,
  UserCheck,
  Database,
  Wifi,
  Key,
  Scan
} from 'lucide-react';

interface SecurityCheck {
  id: string;
  name: string;
  status: 'Passed' | 'Failed' | 'Warning';
  lastCheck: string;
  description: string;
}

interface SecurityMetric {
  name: string;
  value: string | number;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

export const SecurityPanel: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sslEnabled, setSslEnabled] = useState(true);
  const [auditLogsEnabled, setAuditLogsEnabled] = useState(true);

  const securityChecks: SecurityCheck[] = [
    {
      id: 'sql-injection',
      name: 'SQL Injection Protection',
      status: 'Passed',
      lastCheck: '2024-01-15 10:30',
      description: 'All database queries are properly parameterized'
    },
    {
      id: 'xss-protection',
      name: 'XSS Protection',
      status: 'Passed',
      lastCheck: '2024-01-15 10:30',
      description: 'Input sanitization and CSP headers implemented'
    },
    {
      id: 'auth-security',
      name: 'Authentication Security',
      status: 'Warning',
      lastCheck: '2024-01-15 10:30',
      description: 'Consider implementing stronger password policies'
    },
    {
      id: 'data-encryption',
      name: 'Data Encryption',
      status: 'Passed',
      lastCheck: '2024-01-15 10:30',
      description: 'All sensitive data encrypted at rest and in transit'
    },
    {
      id: 'dependencies',
      name: 'Dependency Vulnerabilities',
      status: 'Failed',
      lastCheck: '2024-01-15 10:30',
      description: '3 critical vulnerabilities found in dependencies'
    }
  ];

  const securityMetrics: SecurityMetric[] = [
    {
      name: 'Security Score',
      value: 87,
      status: 'good',
      description: 'Overall security posture rating'
    },
    {
      name: 'Failed Login Attempts',
      value: 23,
      status: 'warning',
      description: 'Suspicious login attempts in last 24h'
    },
    {
      name: 'SSL Certificate',
      value: '45 days',
      status: 'good',
      description: 'Days until certificate expiration'
    },
    {
      name: 'GDPR Compliance',
      value: '98%',
      status: 'good',
      description: 'Data protection compliance score'
    }
  ];

  const getStatusIcon = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'Passed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Failed': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'Passed': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Failed': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'Warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    }
  };

  const getMetricColor = (status: SecurityMetric['status']) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Security & Compliance</h3>
        <p className="text-white/70">Monitor security status and ensure platform compliance</p>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                {metric.value}
              </div>
              <div className="text-white/70 text-sm">{metric.name}</div>
              <div className="text-white/50 text-xs mt-1">{metric.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Settings */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <span className="text-white">Two-Factor Authentication</span>
              <p className="text-white/60 text-sm">Require 2FA for all admin accounts</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <span className="text-white">SSL/TLS Encryption</span>
              <p className="text-white/60 text-sm">Force HTTPS for all connections</p>
            </div>
            <Switch checked={sslEnabled} onCheckedChange={setSslEnabled} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <span className="text-white">Audit Logging</span>
              <p className="text-white/60 text-sm">Log all admin and user activities</p>
            </div>
            <Switch checked={auditLogsEnabled} onCheckedChange={setAuditLogsEnabled} />
          </div>
        </CardContent>
      </Card>

      {/* Security Checks */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Scan className="w-5 h-5" />
            Security Checks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityChecks.map(check => (
              <div key={check.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <h4 className="text-white font-medium">{check.name}</h4>
                    <p className="text-white/60 text-sm">{check.description}</p>
                    <p className="text-white/50 text-xs">Last check: {check.lastCheck}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(check.status)}>
                  {check.status}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Scan className="w-4 h-4 mr-2" />
              Run Security Scan
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              View Full Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-4">GDPR Compliance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Data Processing Records</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">User Consent Management</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Data Deletion Procedures</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Privacy Policy Updates</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Security Standards</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">SOC 2 Type II</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">ISO 27001</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">OWASP Top 10</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">PCI DSS</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
