
import React from 'react';
import { Header } from '@/components/Header';
import { ContentManagement } from '@/components/ContentManagement';

const ContentManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <ContentManagement />
      </div>
    </div>
  );
};

export default ContentManagementPage;
