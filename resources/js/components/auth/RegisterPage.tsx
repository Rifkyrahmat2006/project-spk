import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import {
    GraduationCap,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
    const { register, currentUser } = useApp();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        nim: '',
        password: '',
        confirm: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    if (currentUser) {
        return <Navigate to="/app/dashboard" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!/^\d{10}$/.test(form.nim)) {
            setError('NIM harus terdiri dari 10 digit angka.');
            return;
        }
        if (form.password !== form.confirm) {
            setError('Konfirmasi password tidak cocok.');
            return;
        }
        if (form.password.length < 8) {
            setError('Password minimal 8 karakter.');
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        const ok = register({
            name: form.name,
            email: form.email,
            nim: form.nim,
            password: form.password,
        });
        setLoading(false);

        if (ok) {
            setSuccess(true);
        } else {
            setError(
                'Email atau NIM sudah terdaftar. Gunakan data yang berbeda.',
            );
        }
    };

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0f2d5c] via-[#1a4080] to-[#2563eb] p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 size={36} className="text-green-600" />
                    </div>
                    <h2 className="mb-2 text-gray-900">Registrasi Berhasil!</h2>
                    <p className="mb-6 text-sm text-gray-500">
                        Akun Anda telah dibuat. Silakan login dengan kredensial
                        yang telah didaftarkan.
                    </p>
                    <button
                        onClick={() => navigate('/login', { replace: true })}
                        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
                    >
                        Masuk Sekarang
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0f2d5c] via-[#1a4080] to-[#2563eb] p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                        <GraduationCap size={30} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        Daftar Calon Asprak
                    </h1>
                    <p className="mt-1 text-sm text-blue-200">
                        eSPeKa · Jurusan Informatika UNSOED
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-2xl">
                    <h2 className="mb-6 text-gray-900">Buat Akun Baru</h2>

                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <AlertCircle size={16} className="shrink-0" />{' '}
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm text-gray-700">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Nama lengkap sesuai KTM"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm text-gray-700">
                                NIM (10 digit)
                            </label>
                            <input
                                type="text"
                                value={form.nim}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        nim: e.target.value,
                                    }))
                                }
                                placeholder="contoh: 2011010001"
                                required
                                maxLength={10}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm text-gray-700">
                                Email Kampus
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        email: e.target.value,
                                    }))
                                }
                                placeholder="nim@mhs.unsoed.ac.id"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm text-gray-700">
                                Password (min. 8 karakter)
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            password: e.target.value,
                                        }))
                                    }
                                    placeholder="Password Anda"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
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
                            <label className="mb-1 block text-sm text-gray-700">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                value={form.confirm}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        confirm: e.target.value,
                                    }))
                                }
                                placeholder="Ulangi password"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Sudah punya akun?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-700"
                        >
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
