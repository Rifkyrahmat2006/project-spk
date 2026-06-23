import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Bell,
    CheckCheck,
    Check,
    Info,
    AlertCircle,
    Award,
    CalendarCheck,
    UserPlus,
    ExternalLink,
    ArrowLeft,
    CheckCircle,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface PageProps {
    [key: string]: any;
    notifications?: { data: any[] };
    unreadCount?: number;
}

const typeConfig: Record<
    string,
    { icon: typeof Bell; color: string; bg: string }
> = {
    result_published: {
        icon: Award,
        color: 'text-green-600',
        bg: 'bg-green-100',
    },
    application_received: {
        icon: UserPlus,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
    },
    application_status: {
        icon: Info,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
    },
    period_locked: {
        icon: CalendarCheck,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
    },
    topsis_complete: {
        icon: CheckCircle,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100',
    },
    warning: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
};

function getTypeConfig(type: string) {
    return (
        typeConfig[type] || {
            icon: Bell,
            color: 'text-gray-600',
            bg: 'bg-gray-100',
        }
    );
}

export default function NotificationIndex() {
    const { props } = usePage<PageProps>();
    const notifications = props.notifications?.data ?? [];
    const unreadCount = props.unreadCount || 0;
    const [markingId, setMarkingId] = useState<string | null>(null);
    const [showMarkAllConfirm, setShowMarkAllConfirm] = useState(false);

    const handleMarkRead = (id: string) => {
        setMarkingId(id);
        router.post(
            `/notifications/${id}/read`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setMarkingId(null),
            },
        );
    };

    const handleMarkAllRead = () => {
        setShowMarkAllConfirm(false);
        router.post('/notifications/read-all', {}, { preserveScroll: true });
    };

    const handleVisitLink = (notification: any) => {
        const data = notification.data || {};
        let href = '#';

        if (data.course_id && data.type === 'topsis') {
            href = `/admin/courses/${data.course_id}/topsis`;
        } else if (data.period_id) {
            href = `/superadmin/periods`;
        } else if (data.candidate_id) {
            href = `/admin/candidates`;
        } else if (data.result_id) {
            href = `/superadmin/consolidated-results`;
        }

        if (!notification.read_at) {
            handleMarkRead(notification.id);
        }
        if (href !== '#') {
            router.visit(href);
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        if (diffDays < 7) return `${diffDays} hari lalu`;
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Notifikasi
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {unreadCount > 0
                            ? `${unreadCount} notifikasi belum dibaca`
                            : 'Tidak ada notifikasi baru'}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={() => setShowMarkAllConfirm(true)}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                    >
                        <CheckCheck size={16} />
                        Tandai Semua Dibaca
                    </button>
                )}
            </div>

            {/* Notification List */}
            {notifications.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-16 text-center">
                    <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-900">
                        Belum ada notifikasi
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        Notifikasi akan muncul di sini saat ada aktivitas
                        seleksi.
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {notifications.map((notification: any) => {
                        const cfg = getTypeConfig(notification.type);
                        const Icon = cfg.icon;
                        const isUnread = !notification.read_at;
                        const isMarking = markingId === notification.id;

                        return (
                            <div
                                key={notification.id}
                                className={`group rounded-xl border transition-all ${
                                    isUnread
                                        ? 'border-blue-200 bg-blue-50/50'
                                        : 'border-gray-200 bg-white'
                                }`}
                            >
                                <div className="flex items-start gap-4 p-4">
                                    {/* Icon */}
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${cfg.bg}`}
                                    >
                                        <Icon size={20} className={cfg.color} />
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p
                                                    className={`text-sm font-medium ${
                                                        isUnread
                                                            ? 'text-gray-900'
                                                            : 'text-gray-700'
                                                    }`}
                                                >
                                                    {notification.title}
                                                </p>
                                                <p className="mt-0.5 line-clamp-2 text-sm text-gray-500">
                                                    {notification.body}
                                                </p>
                                            </div>

                                            {/* Time + Actions */}
                                            <div className="flex shrink-0 items-center gap-2">
                                                <span className="text-xs whitespace-nowrap text-gray-400">
                                                    {formatTime(
                                                        notification.created_at,
                                                    )}
                                                </span>
                                                {isUnread && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="mt-2 flex items-center gap-2">
                                            {isUnread && (
                                                <button
                                                    onClick={() =>
                                                        handleMarkRead(
                                                            notification.id,
                                                        )
                                                    }
                                                    disabled={isMarking}
                                                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                                >
                                                    <Check size={12} />
                                                    {isMarking
                                                        ? '...'
                                                        : 'Tandai dibaca'}
                                                </button>
                                            )}

                                            {notification.data &&
                                                (notification.data.course_id ||
                                                    notification.data
                                                        .period_id) && (
                                                    <button
                                                        onClick={() =>
                                                            handleVisitLink(
                                                                notification,
                                                            )
                                                        }
                                                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-blue-600 transition-all hover:bg-blue-50"
                                                    >
                                                        <ExternalLink
                                                            size={12}
                                                        />
                                                        Lihat Detail
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <ConfirmDialog
                open={showMarkAllConfirm}
                onOpenChange={setShowMarkAllConfirm}
                onConfirm={handleMarkAllRead}
                title="Tandai Semua Dibaca"
                description="Semua notifikasi akan ditandai sebagai sudah dibaca."
                confirmText="Ya, Tandai Semua"
            />
        </div>
    );
}
