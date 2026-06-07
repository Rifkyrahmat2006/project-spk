import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { GraduationCap, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
  const { register, currentUser } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', nim: '', password: '', confirm: '' });
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
    await new Promise(r => setTimeout(r, 500));
    const ok = register({ name: form.name, email: form.email, nim: form.nim, password: form.password });
    setLoading(false);

    if (ok) {
      setSuccess(true);
    } else {
      setError('Email atau NIM sudah terdaftar. Gunakan data yang berbeda.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f2d5c] via-[#1a4080] to-[#2563eb] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Registrasi Berhasil!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Akun Anda telah dibuat. Silakan login dengan kredensial yang telah didaftarkan.
          </p>
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            Masuk Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2d5c] via-[#1a4080] to-[#2563eb] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap size={30} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold">Daftar Calon Asprak</h1>
          <p className="text-blue-200 text-sm mt-1">eSPeKa · Jurusan Informatika UNSOED</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-gray-900 mb-6">Buat Akun Baru</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Nama Lengkap</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Nama lengkap sesuai KTM"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">NIM (10 digit)</label>
              <input
                type="text"
                value={form.nim}
                onChange={e => setForm(f => ({ ...f, nim: e.target.value }))}
                placeholder="contoh: 2011010001"
                required
                maxLength={10}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Email Kampus</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="nim@mhs.unsoed.ac.id"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Password (min. 8 karakter)</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Password Anda"
                  required
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Konfirmasi Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                placeholder="Ulangi password"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Sudah punya akun? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
