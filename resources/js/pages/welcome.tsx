import { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Welcome() {
    useEffect(() => {
        router.visit('/login', { method: 'get' });
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0f2d5c] via-[#1a4080] to-[#2563eb]">
            <div className="text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 animate-pulse items-center justify-center rounded-2xl bg-white/20">
                    <svg className="h-10 w-10" fill="white" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                </div>
                <h1 className="mb-2 text-4xl font-bold tracking-tight">
                    eSPeKa
                </h1>
                <p className="text-lg text-blue-200">
                    Sistem Pendukung Keputusan Seleksi Asprak
                </p>
                <p className="mt-2 text-sm text-blue-300">
                    Jurusan Informatika · Universitas Jenderal Soedirman
                </p>
            </div>
        </div>
    );
}
