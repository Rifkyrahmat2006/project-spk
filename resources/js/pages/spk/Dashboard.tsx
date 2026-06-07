import { usePage } from '@inertiajs/react';
import SADashboard from '@/components/superadmin/SADashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import Portal from './candidate/Portal';

export default function Dashboard() {
    const { props } = usePage();
    const user = props.auth?.user;

    if (!user) {
        return <div>Loading...</div>;
    }

    // Route to appropriate dashboard based on role
    if (user.role === 'superadmin') {
        return <SADashboard />;
    }

    if (user.role === 'admin') {
        return <AdminDashboard />;
    }

    return <Portal />;
}
