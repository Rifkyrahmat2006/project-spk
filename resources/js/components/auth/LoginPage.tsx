import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { GraduationCap, Eye, EyeOff, AlertCircle } from 'lucide-react';

const demoAccounts = [
    {
        label: 'Superadmin (Dosen)',
        email: 'nofiyati@unsoed.ac.id',
        password: 'password123',
        color: 'bg-purple-50 border-purple-200 text-purple-700',
    },
    {
        label: 'Admin (Struktur Data)',
        email: 'daiva@unsoed.ac.id',
        password: 'password123',
        color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
        label: 'Admin (Basis Data)',
        email: 'irfan@unsoed.ac.id',
        password: 'password123',
        color: 'bg-sky-50 border-sky-200 text-sky-700',
    },
    {
        label: 'Calon Asprak',
        email: 'faqih@mhs.unsoed.ac.id',
        password: 'password123',
        color: 'bg-green-50 border-green-200 text-green-700',
    },
];

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                // Inertia will redirect based on backend response
                reset();
            },
            onError: () => {
                setError('Email atau password salah, atau akun tidak aktif.');
            },
        });
    };

    const fillDemo = (acc: (typeof demoAccounts)[0]) => {
        setData('email', acc.email);
        setData('password', acc.password);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0f2d5c] via-[#1a4080] to-[#2563eb] p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                        <GraduationCap size={36} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        eSPeKa
                    </h1>
                    <p className="mt-1 text-sm text-blue-200">
                        Sistem Pendukung Keputusan Seleksi Asprak
                    </p>
                    <p className="mt-0.5 text-xs text-blue-300">
                        Jurusan Informatika · Universitas Jenderal Soedirman
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white p-8 shadow-2xl">
                    <h2 className="mb-6 text-gray-900">Masuk ke Sistem</h2>

                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <AlertCircle size={16} className="shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="email@unsoed.ac.id"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.email && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="Masukkan password"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-500">
                            Belum punya akun?{' '}
                        </span>
                        <Link
                            to="/register"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Daftar sebagai Calon Asprak
                        </Link>
                    </div>

                    {/* Demo Accounts */}
                    <div className="mt-6 border-t border-gray-100 pt-5">
                        <p className="mb-3 text-center text-xs font-medium tracking-wide text-gray-400 uppercase">
                            Akun Demo
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {demoAccounts.map((acc) => (
                                <button
                                    key={acc.email}
                                    onClick={() => fillDemo(acc)}
                                    className={`rounded-lg border px-3 py-2 text-left text-xs transition-all hover:shadow-sm ${acc.color}`}
                                >
                                    {acc.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
