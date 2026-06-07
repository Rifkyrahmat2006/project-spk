import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Users, GraduationCap, ShieldCheck, UserX, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { User } from '../types';

type Tab = 'admin' | 'user';

interface AdminForm { name: string; email: string; password: string; assignedCourseIds: string[]; isActive: boolean }
const emptyAdmin: AdminForm = { name: '', email: '', password: 'password123', assignedCourseIds: [], isActive: true };

export default function UserManagement() {
  const { users, courses, createUser, updateUser, deleteUser } = useApp();
  const [tab, setTab] = useState<Tab>('admin');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [form, setForm] = useState<AdminForm>(emptyAdmin);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const admins = users.filter(u => u.role === 'admin');
  const candidates = users.filter(u => u.role === 'user');

  const openCreate = () => { setForm(emptyAdmin); setModal('create'); };
  const openEdit = (u: User) => {
    setSelected(u);
    setForm({ name: u.name, email: u.email, password: '', assignedCourseIds: u.assignedCourseIds ?? [], isActive: u.isActive });
    setModal('edit');
  };

  const handleSave = () => {
    if (modal === 'create') {
      createUser({ name: form.name, email: form.email, password: form.password, role: 'admin', isActive: form.isActive, assignedCourseIds: form.assignedCourseIds });
    } else if (modal === 'edit' && selected) {
      updateUser(selected.id, { name: form.name, email: form.email, isActive: form.isActive, assignedCourseIds: form.assignedCourseIds, ...(form.password ? { password: form.password } : {}) });
    }
    setModal(null);
  };

  const toggleCourse = (id: string) => {
    setForm(f => ({
      ...f,
      assignedCourseIds: f.assignedCourseIds.includes(id)
        ? f.assignedCourseIds.filter(c => c !== id)
        : [...f.assignedCourseIds, id],
    }));
  };

  const RoleIcon = ({ role }: { role: string }) => {
    if (role === 'superadmin') return <ShieldCheck size={16} className="text-purple-600" />;
    if (role === 'admin') return <UserCheck size={16} className="text-blue-600" />;
    return <GraduationCap size={16} className="text-green-600" />;
  };

  const roleBadge: Record<string, string> = {
    superadmin: 'bg-purple-100 text-purple-700',
    admin: 'bg-blue-100 text-blue-700',
    user: 'bg-green-100 text-green-700',
  };
  const roleLabel: Record<string, string> = { superadmin: 'Superadmin', admin: 'KoorAsPrak', user: 'CalonAsPrak' };

  const displayUsers = tab === 'admin' ? admins : candidates;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Manajemen Pengguna</h1>
          <p className="text-gray-500 text-sm mt-1">{admins.length} KoorAsPrak · {candidates.length} CalonAsPrak</p>
        </div>
        {tab === 'admin' && (
          <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            <Plus size={16} /> Tambah KoorAsPrak
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['admin', 'user'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${tab === t ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {t === 'admin' ? `KoorAsPrak (${admins.length})` : `CalonAsPrak (${candidates.length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Email</th>
              {tab === 'user' && <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">NIM</th>}
              {tab === 'admin' && <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Penugasan</th>}
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Login Terakhir</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map(u => {
              const assigned = courses.filter(c => (u.assignedCourseIds ?? []).includes(c.id));
              return (
                <tr key={u.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{u.email}</td>
                  {tab === 'user' && <td className="py-3 px-4 font-mono text-gray-600">{u.nim || '—'}</td>}
                  {tab === 'admin' && (
                    <td className="py-3 px-4">
                      {assigned.length > 0
                        ? assigned.map(c => <span key={c.id} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded mr-1">{c.name}</span>)
                        : <span className="text-gray-400 text-xs">Belum ditugaskan</span>}
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {u.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(u)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Pencil size={14} /></button>
                      <button onClick={() => updateUser(u.id, { isActive: !u.isActive })} className={`p-1.5 rounded-lg transition-all ${u.isActive ? 'text-gray-400 hover:text-orange-600 hover:bg-orange-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}>
                        {u.isActive ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal (admin only) */}
      {modal && tab === 'admin' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3>{modal === 'create' ? 'Tambah KoorAsPrak' : 'Edit KoorAsPrak'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Nama Lengkap</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">{modal === 'edit' ? 'Password (kosongkan jika tidak diubah)' : 'Password Sementara'}</label>
                <input type="text" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Tugaskan ke Mata Kuliah</label>
                <div className="space-y-2">
                  {courses.map(c => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.assignedCourseIds.includes(c.id)} onChange={() => toggleCourse(c.id)} />
                      <span className="text-sm text-gray-700">{c.name} ({c.code})</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="userActive" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                <label htmlFor="userActive" className="text-sm text-gray-700">Akun aktif</label>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={!form.name || !form.email} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
