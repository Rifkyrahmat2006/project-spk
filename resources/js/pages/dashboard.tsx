import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import SADashboard from '@/pages/spk/SuperadminDashboard';
import AdminDashboard from '@/pages/spk/AdminDashboard';
import CandidateDashboard from '@/pages/spk/CandidateDashboard';

export default function Dashboard() {
    const { props } = usePage();
    const user = props.auth?.user;

    if (!user) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>;
    }

    if (user.role === 'superadmin') {
        return <SADashboard />;
    }

    if (user.role === 'admin') {
        return <AdminDashboard />;
    }

    return <CandidateDashboard />;
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
