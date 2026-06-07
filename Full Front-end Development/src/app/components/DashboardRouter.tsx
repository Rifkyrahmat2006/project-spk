import { Navigate } from 'react-router';
import { useApp } from './context/AppContext';
import SADashboard from './superadmin/SADashboard';
import AdminDashboard from './admin/AdminDashboard';
import CandidatePortal from './candidate/CandidatePortal';

export default function DashboardRouter() {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'superadmin') return <SADashboard />;
  if (currentUser.role === 'admin') return <AdminDashboard />;
  return <CandidatePortal />;
}
