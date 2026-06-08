import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    variant?: string;
    className?: string;
};

export function AppContent({ children, className = '' }: Props) {
    return (
        <main
            className={`flex flex-1 flex-col overflow-x-hidden bg-gray-50 ${className}`}
        >
            {children}
        </main>
    );
}
