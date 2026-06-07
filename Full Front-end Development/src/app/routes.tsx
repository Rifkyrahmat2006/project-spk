import { createBrowserRouter, Navigate } from 'react-router';
import Root from './Root';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import MainLayout from './components/layout/MainLayout';
import DashboardRouter from './components/DashboardRouter';
import CourseManagement from './components/superadmin/CourseManagement';
import CriteriaManagement from './components/superadmin/CriteriaManagement';
import UserManagement from './components/superadmin/UserManagement';
import PeriodManagement from './components/superadmin/PeriodManagement';
import ConsolidatedResults from './components/superadmin/ConsolidatedResults';
import CandidateManagement from './components/admin/CandidateManagement';
import ScoreInput from './components/admin/ScoreInput';
import TopsisResults from './components/admin/TopsisResults';
import CandidatePortal from './components/candidate/CandidatePortal';
import RoleGuard from './components/RoleGuard';

const SAGuard = () => <RoleGuard allowedRoles={['superadmin']} />;
const AdminGuard = () => <RoleGuard allowedRoles={['admin']} />;
const UserGuard = () => <RoleGuard allowedRoles={['user']} />;
const SAAdminGuard = () => <RoleGuard allowedRoles={['superadmin', 'admin']} />;

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'login', Component: LoginPage },
      { path: 'register', Component: RegisterPage },
      {
        path: 'app',
        Component: MainLayout,
        children: [
          { index: true, Component: DashboardRouter },
          { path: 'dashboard', Component: DashboardRouter },
          // Superadmin only
          {
            Component: SAGuard,
            children: [
              { path: 'courses', Component: CourseManagement },
              { path: 'users', Component: UserManagement },
              { path: 'periods', Component: PeriodManagement },
              { path: 'consolidated', Component: ConsolidatedResults },
            ],
          },
          // Superadmin + Admin
          {
            Component: SAAdminGuard,
            children: [
              { path: 'criteria', Component: CriteriaManagement },
            ],
          },
          // Admin only
          {
            Component: AdminGuard,
            children: [
              { path: 'candidates', Component: CandidateManagement },
              { path: 'scores', Component: ScoreInput },
              { path: 'rankings', Component: TopsisResults },
            ],
          },
          // User (CalonAsPrak) only
          {
            Component: UserGuard,
            children: [
              { path: 'portal', Component: CandidatePortal },
            ],
          },
        ],
      },
    ],
  },
]);
