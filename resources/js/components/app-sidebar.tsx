import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutGrid,
    BookOpen,
    SlidersHorizontal,
    Users,
    CalendarDays,
    BarChart3,
    UserCheck,
    ClipboardList,
    Trophy,
    FileText,
    LogOut,
    GraduationCap,
    Bell,
    ChevronDown,
} from 'lucide-react';

const superadminNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Mata Kuliah', href: '/superadmin/courses', icon: BookOpen },
    {
        title: 'Kriteria & Bobot',
        href: '/superadmin/criteria',
        icon: SlidersHorizontal,
    },
    { title: 'Manajemen Pengguna', href: '/superadmin/users', icon: Users },
    {
        title: 'Periode Seleksi',
        href: '/superadmin/periods',
        icon: CalendarDays,
    },
    {
        title: 'Rekap Hasil',
        href: '/superadmin/consolidated-results',
        icon: BarChart3,
    },
];

const adminNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Manajemen Kandidat', href: '/admin/candidates', icon: UserCheck },
    { title: 'Input Nilai', href: '/admin/scores', icon: ClipboardList },
    { title: 'Hasil TOPSIS', href: '/admin/topsis-results', icon: Trophy },
];

const candidateNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Portal Seleksi', href: '/portal', icon: FileText },
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

export function AppSidebar() {
    const { props, url } = usePage();
    const user = props.auth?.user;

    const getNavItems = () => {
        if (!user) return [];
        if (user.role === 'superadmin') return superadminNavItems;
        if (user.role === 'admin') return adminNavItems;
        if (user.role === 'user') return candidateNavItems;
        return [];
    };

    const isActive = (href: string) =>
        url === href || url.startsWith(href + '/');

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="flex h-screen w-64 flex-col bg-linear-to-b from-[#0f2d5c] via-[#1a4080] to-[#2563eb]">
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

            {/* Navigation */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
                {getNavItems().map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                                active
                                    ? 'bg-white/20 font-medium text-white'
                                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <Icon size={18} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="border-t border-white/10 px-3 py-4">
                <div className="mb-3 flex items-center gap-3 px-3 py-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                            {user?.name || 'User'}
                        </p>
                        <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${roleBadgeColor[user?.role || 'user']}`}
                        >
                            {roleLabel[user?.role || 'user']}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-blue-100 transition-all hover:bg-white/10 hover:text-white"
                >
                    <LogOut size={18} />
                    Keluar
                </button>
            </div>
        </div>
    );
}
