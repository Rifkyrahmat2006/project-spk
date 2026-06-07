import { Navigate, Outlet } from 'react-router';
import { useApp } from './context/AppContext';
import type { Role } from './types';

interface RoleGuardProps {
  allowedRoles: Role[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(currentUser.role)) return <Navigate to="/app/dashboard" replace />;
  return <Outlet />;
}
