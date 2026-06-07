import { useState } from 'react';
import { Plus, Pencil, Trash2, X, UserCheck, UserX, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Candidate, CandidateCourse } from '../types';

interface FormData { nim: string; name: string; code: string }
const empty: FormData = { nim: '', name: '', code: '' };

export default function CandidateManagement() {
  const { currentUser, courses, candidateCourses, candidates, createCandidate, updateCandidate, deleteCandidate, updateCandidateCourseStatus, getAdminCourses } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [form, setForm] = useState<FormData>(empty);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const myCourses = getAdminCourses(currentUser!.id);
  const activeCourse = selectedCourseId ? courses.find(c => c.id === selectedCourseId) : myCourses[0];
  const courseId = activeCourse?.id ?? '';

  const ccs = candidateCourses.filter(cc => cc.courseId === courseId);
  const courseCandidates = ccs.map(cc => ({
    cc,
    candidate: candidates.find(c => c.id === cc.candidateId),
  })).filter(x => x.candidate) as { cc: CandidateCourse; candidate: Candidate }[];

  const openCreate = () => { setForm(empty); setModal('create'); };
  const openEdit = (c: Candidate) => { setSelected(c); setForm({ nim: c.nim, name: c.name, code: c.code }); setModal('edit'); };

  const handleSave = () => {
    if (modal === 'create') {
      createCandidate({ ...form, userId: undefined }, courseId);
    } else if (modal === 'edit' && selected) {
      updateCandidate(selected.id, { nim: form.nim, name: form.name, code: form.code });
    }
    setModal(null);
  };

  const handleDelete = () => {
    if (deleteTarget) deleteCandidate(deleteTarget, courseId);
    setDeleteTarget(null);
  };

  const statusBadge = (status: CandidateCourse['status']) => {
    const map = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      rejected: 'bg-red-100 text-red-700',
    };
    const label = { active: 'Aktif', pending: 'Pending', rejected: 'Ditolak' };
    return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${map[status]}`}>{label[status]}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Manajemen Kandidat</h1>
          <p className="text-gray-500 text-sm mt-1">{courseCandidates.length} kandidat terdaftar</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
          <Plus size={16} /> Tambah Kandidat
        </button>
      </div>

      {/* Course Selector */}
      {myCourses.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {myCourses.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCourseId(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${(courseId === c.id) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {activeCourse && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">{activeCourse.name}</span> ({activeCourse.code}) · Kuota {activeCourse.quota} asprak
          </p>
        </div>
      )}

      {/* Candidates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {courseCandidates.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Belum ada kandidat. Tambahkan kandidat baru.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Kode</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Nama</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">NIM</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Terdaftar</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {courseCandidates.map(({ cc, candidate }) => (
                <tr key={candidate.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{candidate.code}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{candidate.name}</td>
                  <td className="py-3 px-4 font-mono text-gray-500 text-xs">{candidate.nim}</td>
                  <td className="py-3 px-4">{statusBadge(cc.status)}</td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {new Date(cc.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(candidate)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Pencil size={14} /></button>
                      {cc.status === 'pending' && (
                        <>
                          <button onClick={() => updateCandidateCourseStatus(candidate.id, courseId, 'active')} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"><UserCheck size={14} /></button>
                          <button onClick={() => updateCandidateCourseStatus(candidate.id, courseId, 'rejected')} className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"><UserX size={14} /></button>
                        </>
                      )}
                      <button onClick={() => setDeleteTarget(candidate.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3>{modal === 'create' ? 'Tambah Kandidat' : 'Edit Kandidat'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Kode</label>
                  <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="A8" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">NIM</label>
                  <input value={form.nim} onChange={e => setForm(f => ({ ...f, nim: e.target.value }))} placeholder="2011010008" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Nama Lengkap</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nama kandidat" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={!form.name || !form.nim} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Hapus Kandidat?</h3>
            <p className="text-sm text-gray-500 mb-5">Seluruh nilai dan data kandidat di matkul ini akan terhapus.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Batal</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
