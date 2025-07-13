
import { PersonalizedDashboard } from '@/components/PersonalizedDashboard';
import { Header } from '@/components/Header';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      <PersonalizedDashboard />
    </div>
  );
};

export default Dashboard;
