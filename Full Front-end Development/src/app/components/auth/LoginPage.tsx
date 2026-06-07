import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { GraduationCap, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const demoAccounts = [
  { label: 'Superadmin (Dosen)', email: 'nofiyati@unsoed.ac.id', password: 'password123', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { label: 'Admin (Struktur Data)', email: 'daiva@unsoed.ac.id', password: 'password123', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { label: 'Admin (Basis Data)', email: 'irfan@unsoed.ac.id', password: 'password123', color: 'bg-sky-50 border-sky-200 text-sky-700' },
  { label: 'Calon Asprak', email: 'faqih@mhs.unsoed.ac.id', password: 'password123', color: 'bg-green-50 border-green-200 text-green-700' },
];

export default function LoginPage() {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (currentUser) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const ok = login(email.trim(), password);
    setLoading(false);
    if (ok) {
      navigate('/app/dashboard', { replace: true });
    } else {
      setError('Email atau password salah, atau akun tidak aktif.');
    }
  };

  const fillDemo = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2d5c] via-[#1a4080] to-[#2563eb] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={36} className="text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight">eSPeKa</h1>
          <p className="text-blue-200 mt-1 text-sm">Sistem Pendukung Keputusan Seleksi Asprak</p>
          <p className="text-blue-300 text-xs mt-0.5">Jurusan Informatika · Universitas Jenderal Soedirman</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-gray-900 mb-6">Masuk ke Sistem</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@unsoed.ac.id"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">Belum punya akun? </span>
            <Link to="/register" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Daftar sebagai Calon Asprak</Link>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3 font-medium uppercase tracking-wide">Akun Demo</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map(acc => (
                <button
                  key={acc.email}
                  onClick={() => fillDemo(acc)}
                  className={`text-xs px-3 py-2 rounded-lg border text-left transition-all hover:shadow-sm ${acc.color}`}
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
