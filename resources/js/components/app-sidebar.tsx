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
    X,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    { title: 'Notifikasi', href: '/notifications', icon: Bell },
];

const adminNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Manajemen Kandidat', href: '/admin/candidates', icon: UserCheck },
    { title: 'Input Nilai', href: '/admin/scores', icon: ClipboardList },
    { title: 'Hasil TOPSIS', href: '/admin/topsis-results', icon: Trophy },
    { title: 'Notifikasi', href: '/notifications', icon: Bell },
];

const candidateNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Portal Seleksi', href: '/portal', icon: FileText },
    { title: 'Notifikasi', href: '/notifications', icon: Bell },
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

type Props = {
    isOpen?: boolean;
    onClose?: () => void;
};

export function AppSidebar({ isOpen, onClose }: Props) {
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
        <>
            {/* Mobile sidebar (overlay) */}
            <div
                className={`fixed inset-y-0 left-0 z-30 flex h-screen w-64 flex-col bg-linear-to-b from-[#0f2d5c] via-[#1a4080] to-[#2563eb] transition-transform duration-300 md:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Close button */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
                    <div className="flex items-center gap-3">
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
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-blue-200 transition-all hover:bg-white/10 hover:text-white"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
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
                                onClick={onClose}
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
                    <Link
                        href="/profile"
                        onClick={onClose}
                        className="mb-3 flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-white/10"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={user?.avatar || undefined}
                                alt={user?.name}
                            />
                            <AvatarFallback className="bg-white/20 text-sm font-semibold text-white">
                                {user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
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
                    </Link>
                    <button
                        onClick={() => {
                            onClose?.();
                            router.post('/logout');
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-blue-100 transition-all hover:bg-white/10 hover:text-white"
                    >
                        <LogOut size={18} />
                        Keluar
                    </button>
                </div>
            </div>

            {/* Desktop sidebar (always visible) */}
            <div className="hidden h-screen w-64 flex-col bg-linear-to-b from-[#0f2d5c] via-[#1a4080] to-[#2563eb] md:flex">
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
                    <Link
                        href="/profile"
                        className="mb-3 flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-white/10"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={user?.avatar || undefined}
                                alt={user?.name}
                            />
                            <AvatarFallback className="bg-white/20 text-sm font-semibold text-white">
                                {user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
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
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-blue-100 transition-all hover:bg-white/10 hover:text-white"
                    >
                        <LogOut size={18} />
                        Keluar
                    </button>
                </div>
            </div>
        </>
    );
}
