import { Link, usePage } from '@inertiajs/react';
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
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const superadminNavItems: NavItem[] = [
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

const adminNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Manajemen Kandidat', href: '/admin/candidates', icon: UserCheck },
    { title: 'Input Nilai', href: '/admin/scores', icon: ClipboardList },
    { title: 'Hasil TOPSIS', href: '/admin/topsis-results', icon: Trophy },
];

const candidateNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Portal Seleksi', href: '/portal', icon: FileText },
];

export function AppSidebar() {
    const { props } = usePage();
    const user = props.auth?.user;

    const getNavItems = () => {
        if (!user) return [];

        if (user.role === 'superadmin') return superadminNavItems;
        if (user.role === 'admin') return adminNavItems;
        if (user.role === 'user') return candidateNavItems;
        return [];
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
