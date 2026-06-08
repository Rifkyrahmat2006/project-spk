import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    breadcrumbs?: any[];
};

export default function AppSidebarLayout({ children }: Props) {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <AppHeader />
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
