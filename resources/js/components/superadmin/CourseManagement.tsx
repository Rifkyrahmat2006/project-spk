import { useState } from 'react';
import { Plus, Pencil, Trash2, X, BookOpen, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Course } from '../types';

interface FormData { code: string; name: string; description: string; quota: number; isActive: boolean; assignedAdminIds: string[] }
const empty: FormData = { code: '', name: '', description: '', quota: 3, isActive: true, assignedAdminIds: [] };

export default function CourseManagement() {
  const { courses, users, candidateCourses, createCourse, updateCourse, deleteCourse } = useApp();
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Course | null>(null);
  const [form, setForm] = useState<FormData>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const admins = users.filter(u => u.role === 'admin' && u.isActive);

  const openCreate = () => { setForm(empty); setModal('create'); };
  const openEdit = (c: Course) => { setSelected(c); setForm({ code: c.code, name: c.name, description: c.description, quota: c.quota, isActive: c.isActive, assignedAdminIds: c.assignedAdminIds }); setModal('edit'); };

  const handleSave = () => {
    if (modal === 'create') createCourse(form);
    else if (modal === 'edit' && selected) updateCourse(selected.id, form);
    setModal(null);
  };

  const handleDelete = () => {
    if (deleteId) deleteCourse(deleteId);
    setDeleteId(null);
  };

  const toggleAdmin = (id: string) => {
    setForm(f => ({
      ...f,
      assignedAdminIds: f.assignedAdminIds.includes(id)
        ? f.assignedAdminIds.filter(a => a !== id)
        : [...f.assignedAdminIds, id],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Manajemen Mata Kuliah</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} mata kuliah terdaftar</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
          <Plus size={16} /> Tambah Matkul
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map(course => {
          const enrolled = candidateCourses.filter(cc => cc.courseId === course.id && cc.status === 'active').length;
          const assignedAdmins = admins.filter(a => course.assignedAdminIds.includes(a.id));
          return (
            <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{course.name}</p>
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{course.code}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(course)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => setDeleteId(course.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">{course.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Users size={14} /> {enrolled} kandidat · Kuota {course.quota}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {course.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
              {assignedAdmins.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-400">KoorAsPrak: <span className="text-gray-600">{assignedAdmins.map(a => a.name).join(', ')}</span></p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-gray-900">{modal === 'create' ? 'Tambah Mata Kuliah' : 'Edit Mata Kuliah'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Kode Matkul</label>
                  <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="IF201" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Kuota Diterima</label>
                  <input type="number" value={form.quota} min={1} max={20} onChange={e => setForm(f => ({ ...f, quota: parseInt(e.target.value) || 3 }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Nama Mata Kuliah</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Struktur Data" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Deskripsi</label>
                <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Tugaskan KoorAsPrak</label>
                <div className="space-y-2">
                  {admins.map(admin => (
                    <label key={admin.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.assignedAdminIds.includes(admin.id)} onChange={() => toggleAdmin(admin.id)} className="rounded" />
                      <span className="text-sm text-gray-700">{admin.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                <label htmlFor="isActive" className="text-sm text-gray-700">Mata kuliah aktif</label>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={!form.code || !form.name} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Hapus Mata Kuliah?</h3>
            <p className="text-sm text-gray-500 mb-5">Aksi ini tidak dapat dibatalkan. Seluruh data terkait akan terhapus.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Batal</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
