import React from "react";
import { Header } from "@/components/Header";
import { AdminDashboard } from "@/components/AdminDashboard";

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
