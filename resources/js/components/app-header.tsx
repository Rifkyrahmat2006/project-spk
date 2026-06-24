import { usePage, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AppHeader() {
    const { props } = usePage();
    const user = props.auth?.user;
    const unreadCount = (props as any).unreadCount ?? 0;
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6">
            <div className="flex-1" />

            {/* Notification Bell */}
            <Link
                href="/notifications"
                className="relative rounded-lg p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-800"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all hover:bg-gray-100"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user?.avatar || undefined}
                            alt={user?.name}
                        />
                        <AvatarFallback className="bg-blue-600 text-sm font-semibold text-white">
                            {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-35 truncate text-sm font-medium text-gray-700 md:block">
                        {user?.name || 'User'}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                </button>

                {profileOpen && (
                    <div className="absolute right-0 z-10 mt-1 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                        <div className="border-b border-gray-100 px-4 py-3">
                            <p className="truncate text-sm font-medium text-gray-900">
                                {user?.name || 'User'}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                                {user?.email || 'email@example.com'}
                            </p>
                        </div>
                        <Link
                            href="/profile"
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-all hover:bg-gray-50"
                            onClick={() => setProfileOpen(false)}
                        >
                            <User size={16} /> Profile
                        </Link>
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
    );
}
