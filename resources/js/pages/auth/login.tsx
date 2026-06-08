import { useState, useEffect } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { GraduationCap, Eye, EyeOff, AlertCircle } from 'lucide-react';

const demoAccounts = [
    {
        label: 'Superadmin (Dosen)',
        email: 'nofiyati@unsoed.ac.id',
        password: 'password',
        color: 'bg-purple-50 border-purple-200 text-purple-700',
    },
    {
        label: 'Admin (Struktur Data)',
        email: 'daiva@unsoed.ac.id',
        password: 'password',
        color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
        label: 'Calon Asprak',
        email: 'faqih@mhs.unsoed.ac.id',
        password: 'password',
        color: 'bg-green-50 border-green-200 text-green-700',
    },
];

type Props = {
    status?: string;
    canResetPassword: boolean;
    errors?: Record<string, string>;
};

export default function Login({
    status,
    canResetPassword,
    errors: serverErrors,
}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        router.post(
            '/login',
            { email, password },
            {
                onFinish: () => setLoading(false),
                onError: (errs) => {
                    const msg =
                        errs.email ||
                        errs.password ||
                        'Email atau password salah.';
                    setError(msg);
                },
            },
        );
    };

    const fillDemo = (acc: (typeof demoAccounts)[0]) => {
        setEmail(acc.email);
        setPassword(acc.password);
        setError('');
    };

    useEffect(() => {
        // Initialize Google Identity Services
        const initGoogleSignIn = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '', // We'll need to set this in .env
                    callback: (response: any) => {
                        setLoading(true);
                        router.post(
                            '/auth/google/authenticate',
                            {
                                credential: response.credential,
                            },
                            {
                                onFinish: () => setLoading(false),
                                onError: (errs) => {
                                    setError(
                                        errs.email || 'Autentikasi gagal.',
                                    );
                                },
                            },
                        );
                    },
                    auto_select: false,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('googleSignInDiv'),
                    {
                        theme: 'outline',
                        size: 'large',
                        width: '100%',
                        text: 'continue_with',
                    },
                );
            }
        };

        // Check if script is already loaded
        if (window.google) {
            initGoogleSignIn();
        } else {
            // Wait for script to load (script is added in app.blade.php)
            window.onload = initGoogleSignIn;
        }
    }, []);

    return (
        <>
            <Head title="Log in" />
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
                            Masuk ke Sistem
                        </h2>

                        {(error || status) && (
                            <div
                                className={`mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${status ? 'border border-green-200 bg-green-50 text-green-700' : 'border border-red-200 bg-red-50 text-red-700'}`}
                            >
                                <AlertCircle size={16} className="shrink-0" />
                                {error || status}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    autoFocus
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none autofill:shadow-[0_0_0_30px_white_inset] autofill:text-black"
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
                                        placeholder="Masukkan password"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none autofill:shadow-[0_0_0_30px_white_inset] autofill:text-black"
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
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {loading ? 'Memproses...' : 'Masuk'}
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs font-medium text-gray-400 uppercase">
                                    <span className="bg-white px-2">
                                        Atau masuk dengan
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    // Trigger Google Sign-In prompt
                                    if (window.google) {
                                        window.google.accounts.id.prompt();
                                    }
                                }}
                                className="relative flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <img
                                    src="/images/unsoed.png"
                                    alt="UNSOED Logo"
                                    className="h-6 w-6 object-contain"
                                />
                                Masuk Dengan Akun UNSOED
                            </button>
                            
                            {/* Hidden Google Sign-In Div - we need this for GIS to work */}
                            <div id="googleSignInDiv" className="hidden w-full"></div>
                        </form>

                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-500">
                                Belum punya akun?{' '}
                            </span>
                            <Link
                                href="/register"
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
                            <div className="grid grid-cols-1 gap-2">
                                {demoAccounts.map((acc) => (
                                    <button
                                        key={acc.email}
                                        type="button"
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
        </>
    );
}

Login.layout = null;
