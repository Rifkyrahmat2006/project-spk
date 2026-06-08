import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import {
    LayoutDashboard,
    BookOpen,
    SlidersHorizontal,
    Users,
    CalendarDays,
    BarChart3,
    UserCheck,
    ClipboardList,
    FileText,
    Trophy,
    LogOut,
    Menu,
    X,
    Bell,
    ChevronDown,
    GraduationCap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    roles: string[];
}

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        path: '/app/dashboard',
        icon: <LayoutDashboard size={18} />,
        roles: ['superadmin', 'admin', 'user'],
    },
    {
        label: 'Mata Kuliah',
        path: '/app/courses',
        icon: <BookOpen size={18} />,
        roles: ['superadmin'],
    },
    {
        label: 'Kriteria & Bobot',
        path: '/app/criteria',
        icon: <SlidersHorizontal size={18} />,
        roles: ['superadmin', 'admin'],
    },
    {
        label: 'Manajemen Pengguna',
        path: '/app/users',
        icon: <Users size={18} />,
        roles: ['superadmin'],
    },
    {
        label: 'Periode Seleksi',
        path: '/app/periods',
        icon: <CalendarDays size={18} />,
        roles: ['superadmin'],
    },
    {
        label: 'Rekap Hasil',
        path: '/app/consolidated',
        icon: <BarChart3 size={18} />,
        roles: ['superadmin'],
    },
    {
        label: 'Manajemen Kandidat',
        path: '/app/candidates',
        icon: <UserCheck size={18} />,
        roles: ['admin'],
    },
    {
        label: 'Input Nilai',
        path: '/app/scores',
        icon: <ClipboardList size={18} />,
        roles: ['admin'],
    },
    {
        label: 'Hasil TOPSIS',
        path: '/app/rankings',
        icon: <Trophy size={18} />,
        roles: ['admin'],
    },
    {
        label: 'Portal Seleksi',
        path: '/app/portal',
        icon: <FileText size={18} />,
        roles: ['user'],
    },
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

    const filteredNav = navItems.filter((item) =>
        item.roles.includes(currentUser.role),
    );
    const unreadCount = notifications.filter(
        (n) => n.userId === currentUser.id && !n.readAt,
    ).length;

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    const isActive = (path: string) => location.pathname === path;

    const SidebarContent = () => (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                    <GraduationCap size={20} className="text-white" />
                </div>
                <div>
                    <p className="text-sm font-semibold tracking-wide text-white">
                        eSPeKa
                    </p>
                    <p className="text-xs text-blue-200">
                        Seleksi Asprak · UNSOED
                    </p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
                {filteredNav.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => {
                            navigate(item.path);
                            setSidebarOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                            isActive(item.path)
                                ? 'bg-white/20 font-medium text-white'
                                : 'text-blue-100 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* User */}
            <div className="border-t border-white/10 px-3 py-4">
                <div className="mb-1 flex items-center gap-3 px-3 py-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                        {currentUser.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                            {currentUser.name}
                        </p>
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleBadgeColor[currentUser.role]}`}
                        >
                            {roleLabel[currentUser.role]}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-200 transition-all hover:bg-white/10 hover:text-white"
                >
                    <LogOut size={16} /> Keluar
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="hidden w-60 shrink-0 flex-col bg-[#0f2d5c] md:flex">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="relative flex h-full w-64 flex-col bg-[#0f2d5c]">
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
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="flex shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 md:px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-800 md:hidden"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="flex-1" />

                    {/* Notification Bell */}
                    <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                        )}
                    </button>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all hover:bg-gray-100"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                {currentUser.name.charAt(0)}
                            </div>
                            <span className="hidden max-w-35 truncate text-sm font-medium text-gray-700 md:block">
                                {currentUser.name}
                            </span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 z-10 mt-1 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                                <div className="border-b border-gray-100 px-4 py-3">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {currentUser.name}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                        {currentUser.email}
                                    </p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition-all hover:bg-red-50"
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
