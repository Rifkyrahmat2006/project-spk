import { useState } from 'react';
import { Plus, Pencil, Trash2, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Criterion } from '../types';

interface FormData { code: string; name: string; weight: number; type: 'benefit' | 'cost'; description: string; isActive: boolean }
const empty: FormData = { code: '', name: '', weight: 0, type: 'benefit', description: '', isActive: true };

export default function CriteriaManagement() {
  const { criteria, currentUser, createCriterion, updateCriterion, deleteCriterion } = useApp();
  const isAdmin = currentUser?.role === 'admin';

  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Criterion | null>(null);
  const [form, setForm] = useState<FormData>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalWeight = criteria.filter(c => c.isActive).reduce((s, c) => s + c.weight, 0);
  const weightValid = Math.abs(totalWeight - 1.0) < 0.001;

  const openCreate = () => { setForm(empty); setModal('create'); };
  const openEdit = (c: Criterion) => {
    setSelected(c);
    setForm({ code: c.code, name: c.name, weight: c.weight, type: c.type, description: c.description, isActive: c.isActive });
    setModal('edit');
  };

  const handleSave = () => {
    if (modal === 'create') createCriterion(form);
    else if (modal === 'edit' && selected) updateCriterion(selected.id, form);
    setModal(null);
  };

  const handleDelete = () => {
    if (deleteId) deleteCriterion(deleteId);
    setDeleteId(null);
  };

  const previewTotal = () => {
    if (modal === 'create') return totalWeight + form.weight;
    if (modal === 'edit' && selected) {
      const base = criteria.filter(c => c.isActive && c.id !== selected.id).reduce((s, c) => s + c.weight, 0);
      return base + (form.isActive ? form.weight : 0);
    }
    return totalWeight;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Kriteria & Bobot Penilaian</h1>
          <p className="text-gray-500 text-sm mt-1">{isAdmin ? 'Hanya dapat dilihat oleh KoorAsPrak.' : 'Kelola kriteria dan bobot seleksi asprak.'}</p>
        </div>
        {!isAdmin && (
          <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            <Plus size={16} /> Tambah Kriteria
          </button>
        )}
      </div>

      {/* Weight Status */}
      <div className={`rounded-xl border p-4 flex items-center gap-3 ${weightValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        {weightValid ? <CheckCircle2 size={18} className="text-green-600 shrink-0" /> : <AlertCircle size={18} className="text-red-600 shrink-0" />}
        <div className="flex-1">
          <p className={`text-sm font-medium ${weightValid ? 'text-green-800' : 'text-red-800'}`}>
            {weightValid ? 'Total bobot valid (100%)' : `Total bobot tidak valid: ${(totalWeight * 100).toFixed(1)}% (harus tepat 100%)`}
          </p>
          {!weightValid && <p className="text-xs text-red-600 mt-0.5">Sisa yang tersedia: {((1 - totalWeight) * 100).toFixed(1)}%</p>}
        </div>
        {/* Progress bar */}
        <div className="hidden md:flex items-center gap-2 w-48">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${totalWeight > 1 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(totalWeight * 100, 100)}%` }} />
          </div>
          <span className="text-xs font-mono text-gray-600">{(totalWeight * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Kode', 'Nama Kriteria', 'Bobot', 'Tipe', 'Deskripsi', 'Status', !isAdmin && 'Aksi'].filter(Boolean).map(h => (
                <th key={String(h)} className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, i) => (
              <tr key={c.id} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <td className="py-3 px-4">
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{c.code}</span>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900">{c.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${c.weight * 100}%` }} />
                    </div>
                    <span className="font-mono text-gray-700">{(c.weight * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.type === 'benefit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {c.type === 'benefit' ? 'Benefit' : 'Cost'}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500 max-w-xs truncate">{c.description}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                {!isAdmin && (
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Pencil size={14} /></button>
                      <button onClick={() => setDeleteId(c.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && !isAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3>{modal === 'create' ? 'Tambah Kriteria' : 'Edit Kriteria'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Kode</label>
                  <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="C7" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Tipe</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'benefit' | 'cost' }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="benefit">Benefit (semakin tinggi = semakin baik)</option>
                    <option value="cost">Cost (semakin rendah = semakin baik)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Nama Kriteria</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Public Speaking" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 flex items-center justify-between">
                  <span>Bobot</span>
                  <span className="text-xs text-gray-400">Preview total: <span className={previewTotal() > 1.001 ? 'text-red-600' : 'text-green-600'}>{(previewTotal() * 100).toFixed(1)}%</span></span>
                </label>
                <input
                  type="number" step="0.01" min="0" max="1"
                  value={form.weight}
                  onChange={e => setForm(f => ({ ...f, weight: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Nilai antara 0 dan 1 (contoh: 0.30 = 30%)</p>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Deskripsi</label>
                <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="criteriaActive" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                <label htmlFor="criteriaActive" className="text-sm text-gray-700">Kriteria aktif</label>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={!form.code || !form.name} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && !isAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Hapus Kriteria?</h3>
            <p className="text-sm text-gray-500 mb-5">Kriteria yang dihapus tidak dapat dikembalikan.</p>
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
