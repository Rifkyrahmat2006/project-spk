import { useState } from 'react';
import { Plus, Lock, Unlock, Globe, X, CalendarDays, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { SelectionPeriod } from '../types';

interface FormData { name: string; description: string; startDate: string; endDate: string }
const empty: FormData = { name: '', description: '', startDate: '', endDate: '' };

export default function PeriodManagement() {
  const { periods, createPeriod, updatePeriod, deletePeriod } = useApp();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<FormData>(empty);
  const [confirmAction, setConfirmAction] = useState<{ periodId: string; action: string } | null>(null);

  const handleCreate = () => {
    createPeriod({ ...form, isActive: true, isLocked: false, isPublished: false, showScores: false, createdBy: 'u-sa-1' });
    setModal(false);
    setForm(empty);
  };

  const handleAction = () => {
    if (!confirmAction) return;
    const { periodId, action } = confirmAction;
    if (action === 'lock') updatePeriod(periodId, { isLocked: true, isActive: false });
    else if (action === 'unlock') updatePeriod(periodId, { isLocked: false, isActive: true });
    else if (action === 'publish') updatePeriod(periodId, { isPublished: true });
    else if (action === 'unpublish') updatePeriod(periodId, { isPublished: false });
    setConfirmAction(null);
  };

  const statusBadge = (p: SelectionPeriod) => {
    if (p.isLocked) return <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-600">Terkunci</span>;
    if (p.isActive) return <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-100 text-green-700">Aktif</span>;
    return <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-yellow-100 text-yellow-700">Selesai</span>;
  };

  const actionLabels: Record<string, string> = {
    lock: 'Kunci Periode',
    unlock: 'Buka Kunci Periode',
    publish: 'Publikasikan Hasil',
    unpublish: 'Batalkan Publikasi',
  };

  const actionDescs: Record<string, string> = {
    lock: 'Setelah dikunci, tidak ada data yang dapat diubah. Kalkulasi TOPSIS akan diblokir.',
    unlock: 'Periode akan dibuka kembali, kalkulasi ulang TOPSIS akan diizinkan.',
    publish: 'Hasil seleksi akan dapat dilihat oleh CalonAsPrak yang terdaftar.',
    unpublish: 'Hasil seleksi akan disembunyikan dari CalonAsPrak.',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Manajemen Periode Seleksi</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola periode pendaftaran dan seleksi asprak.</p>
        </div>
        <button onClick={() => { setForm(empty); setModal(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
          <Plus size={16} /> Buat Periode
        </button>
      </div>

      <div className="space-y-4">
        {periods.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <CalendarDays size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Belum ada periode seleksi.</p>
          </div>
        )}
        {periods.map(period => (
          <div key={period.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-gray-900 font-semibold">{period.name}</h3>
                  {statusBadge(period)}
                  {period.isPublished && <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-700">Dipublikasikan</span>}
                  {period.showScores && <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-purple-100 text-purple-700">Skor Terlihat</span>}
                </div>
                <p className="text-sm text-gray-500 mb-2">{period.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5"><CalendarDays size={14} /> Mulai: {period.startDate}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays size={14} /> Selesai: {period.endDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 shrink-0">
                {!period.isLocked ? (
                  <button
                    onClick={() => setConfirmAction({ periodId: period.id, action: 'lock' })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all"
                  >
                    <Lock size={14} /> Kunci
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmAction({ periodId: period.id, action: 'unlock' })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-all"
                  >
                    <Unlock size={14} /> Buka Kunci
                  </button>
                )}

                {!period.isPublished ? (
                  <button
                    onClick={() => setConfirmAction({ periodId: period.id, action: 'publish' })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all"
                  >
                    <Globe size={14} /> Publikasikan
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmAction({ periodId: period.id, action: 'unpublish' })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all"
                  >
                    <X size={14} /> Unpublish
                  </button>
                )}

                <button
                  onClick={() => updatePeriod(period.id, { showScores: !period.showScores })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-all ${period.showScores ? 'bg-purple-50 hover:bg-purple-100 text-purple-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}
                >
                  {period.showScores ? <><EyeOff size={14} /> Sembunyikan Skor</> : <><Eye size={14} /> Tampilkan Skor</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3>Buat Periode Seleksi Baru</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Nama Periode</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Seleksi Asprak Genap 2026/2027" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Deskripsi</label>
                <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Tanggal Mulai</label>
                  <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Tanggal Selesai</label>
                  <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Batal</button>
              <button onClick={handleCreate} disabled={!form.name || !form.startDate || !form.endDate} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">Buat Periode</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Action Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={22} className="text-yellow-600" />
            </div>
            <h3 className="text-gray-900 mb-2">{actionLabels[confirmAction.action]}</h3>
            <p className="text-sm text-gray-500 mb-5">{actionDescs[confirmAction.action]}</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmAction(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Batal</button>
              <button onClick={handleAction} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Konfirmasi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
