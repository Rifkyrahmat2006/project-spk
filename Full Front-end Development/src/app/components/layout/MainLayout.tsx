import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, SlidersHorizontal, Users, CalendarDays,
  BarChart3, UserCheck, ClipboardList, FileText, Trophy, LogOut,
  Menu, X, Bell, ChevronDown, GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: <LayoutDashboard size={18} />, roles: ['superadmin', 'admin', 'user'] },
  { label: 'Mata Kuliah', path: '/app/courses', icon: <BookOpen size={18} />, roles: ['superadmin'] },
  { label: 'Kriteria & Bobot', path: '/app/criteria', icon: <SlidersHorizontal size={18} />, roles: ['superadmin', 'admin'] },
  { label: 'Manajemen Pengguna', path: '/app/users', icon: <Users size={18} />, roles: ['superadmin'] },
  { label: 'Periode Seleksi', path: '/app/periods', icon: <CalendarDays size={18} />, roles: ['superadmin'] },
  { label: 'Rekap Hasil', path: '/app/consolidated', icon: <BarChart3 size={18} />, roles: ['superadmin'] },
  { label: 'Manajemen Kandidat', path: '/app/candidates', icon: <UserCheck size={18} />, roles: ['admin'] },
  { label: 'Input Nilai', path: '/app/scores', icon: <ClipboardList size={18} />, roles: ['admin'] },
  { label: 'Hasil TOPSIS', path: '/app/rankings', icon: <Trophy size={18} />, roles: ['admin'] },
  { label: 'Portal Seleksi', path: '/app/portal', icon: <FileText size={18} />, roles: ['user'] },
];

const roleLabel: Record<string, string> = {
  superadmin: 'Dosen / Kepala Lab',
  admin: 'Koordinator Asprak',
  user: 'Calon Asisten',
};

const roleBadgeColor: Record<string, string> = {
  superadmin: 'bg-purple-100 text-purple-700',
  admin: 'bg-blue-100 text-blue-700',
  user: 'bg-green-100 text-green-700',
};

export default function MainLayout() {
  const { currentUser, logout, notifications } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!currentUser) return <Navigate to="/login" replace />;

  const filteredNav = navItems.filter(item => item.roles.includes(currentUser.role));
  const unreadCount = notifications.filter(n => n.userId === currentUser.id && !n.readAt).length;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <p className="text-white font-semibold tracking-wide text-sm">eSPeKa</p>
          <p className="text-blue-200 text-xs">Seleksi Asprak · UNSOED</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {filteredNav.map(item => (
          <button
            key={item.path}
            onClick={() => { navigate(item.path); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              isActive(item.path)
                ? 'bg-white/20 text-white font-medium'
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{currentUser.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColor[currentUser.role]}`}>
              {roleLabel[currentUser.role]}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all"
        >
          <LogOut size={16} /> Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0f2d5c] shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-[#0f2d5c] h-full">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-500 hover:text-gray-800"
          >
            <Menu size={22} />
          </button>

          <div className="flex-1" />

          {/* Notification Bell */}
          <button className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[140px] truncate">
                {currentUser.name}
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-lg z-10 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut size={16} /> Keluar
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
