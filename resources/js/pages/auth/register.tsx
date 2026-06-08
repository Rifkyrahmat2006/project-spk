import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { GraduationCap, AlertCircle, Eye, EyeOff } from 'lucide-react';

type Props = {
    passwordRules?: string;
};

export default function Register({ passwordRules }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        router.post(
            '/register',
            { name, email, password, password_confirmation },
            {
                onFinish: () => setLoading(false),
                onError: (errs) => {
                    const msg =
                        errs.name ||
                        errs.email ||
                        errs.password ||
                        'Registrasi gagal.';
                    setError(msg);
                },
            },
        );
    };

    return (
        <>
            <Head title="Daftar" />
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
                        <h2 className="mb-6 text-xl font-semibold text-gray-900">
                            Buat Akun Baru
                        </h2>

                        {error && (
                            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nama lengkap Anda"
                                    required
                                    autoFocus
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@unsoed.ac.id"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Buat password"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={password_confirmation}
                                        onChange={(e) =>
                                            setPasswordConfirmation(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Ulangi password"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {loading ? 'Membuat akun...' : 'Daftar'}
                            </button>
                        </form>

                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-500">
                                Sudah punya akun?{' '}
                            </span>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Masuk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Register.layout = null;
