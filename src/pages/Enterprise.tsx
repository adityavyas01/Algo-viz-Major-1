
import React from 'react';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnterpriseSSO } from '@/components/EnterpriseSSO';
import { EnhancedAccessibilityFeatures } from '@/components/EnhancedAccessibilityFeatures';
import { PWACapabilities } from '@/components/PWACapabilities';
import { Internationalization } from '@/components/Internationalization';
import { LMSIntegration } from '@/components/LMSIntegration';
import { InstitutionalAnalytics } from '@/components/InstitutionalAnalytics';
import { 
  Shield, 
  Accessibility, 
  Smartphone, 
  Globe, 
  BookOpen, 
  BarChart3
} from 'lucide-react';

const Enterprise = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Enterprise Features</h1>
          <p className="text-xl text-white/80">Advanced capabilities for institutional deployment</p>
        </div>

        <Tabs defaultValue="sso" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="sso" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">SSO</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Accessibility className="w-4 h-4" />
              <span className="hidden sm:inline">Accessibility</span>
            </TabsTrigger>
            <TabsTrigger value="pwa" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">PWA</span>
            </TabsTrigger>
            <TabsTrigger value="i18n" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">i18n</span>
            </TabsTrigger>
            <TabsTrigger value="lms" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">LMS</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sso">
            <EnterpriseSSO />
          </TabsContent>

          <TabsContent value="accessibility">
            <EnhancedAccessibilityFeatures />
          </TabsContent>

          <TabsContent value="pwa">
            <PWACapabilities />
          </TabsContent>

          <TabsContent value="i18n">
            <Internationalization />
          </TabsContent>

          <TabsContent value="lms">
            <LMSIntegration />
          </TabsContent>

          <TabsContent value="analytics">
            <InstitutionalAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Enterprise;
