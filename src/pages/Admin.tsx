import React from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AdminGuard } from '@/components/AdminGuard';

const Admin = () => {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
};

export default Admin;
