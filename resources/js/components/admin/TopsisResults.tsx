import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, Trophy, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { TopsisSnapshot } from '../utils/topsisEngine';

function AuditModal({ snap, candidateId, candidateName, onClose }: { snap: TopsisSnapshot; candidateId: string; candidateName: string; onClose: () => void }) {
  const result = snap.results.find(r => r.candidateId === candidateId);
  const criteriaIds = Object.keys(snap.idealPositive);

  if (!result) return null;

  const TableSection = ({ title, data, format = (v: number) => v.toFixed(4) }: { title: string; data: Record<string, number>; format?: (v: number) => string }) => (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{title}</p>
      <div className="flex gap-2 flex-wrap">
        {criteriaIds.map(cId => (
          <div key={cId} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center min-w-[70px]">
            <p className="text-xs text-gray-400 font-mono">{cId}</p>
            <p className="text-sm font-mono font-semibold text-gray-800 mt-1">{format(data[cId] ?? 0)}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-gray-900">Audit Trail TOPSIS</h3>
            <p className="text-sm text-gray-500">{candidateName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6 space-y-5">
          <TableSection title="1. Matriks Keputusan (Nilai Asli)" data={snap.decisionMatrix[candidateId]} format={v => v.toFixed(0)} />
          <TableSection title="2. Matriks Normalisasi (rij)" data={result.normalizedRow} />
          <TableSection title="3. Matriks Normalisasi Terbobot (vij)" data={result.weightedRow} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">4. Solusi Ideal Positif (A+)</p>
              <div className="flex gap-2 flex-wrap">
                {criteriaIds.map(cId => (
                  <div key={cId} className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-center min-w-[70px]">
                    <p className="text-xs text-gray-400 font-mono">{cId}</p>
                    <p className="text-sm font-mono font-semibold text-green-700 mt-1">{(snap.idealPositive[cId] ?? 0).toFixed(4)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">5. Solusi Ideal Negatif (A−)</p>
              <div className="flex gap-2 flex-wrap">
                {criteriaIds.map(cId => (
                  <div key={cId} className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-center min-w-[70px]">
                    <p className="text-xs text-gray-400 font-mono">{cId}</p>
                    <p className="text-sm font-mono font-semibold text-red-700 mt-1">{(snap.idealNegative[cId] ?? 0).toFixed(4)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">6. Jarak ke A+ (D+)</p>
              <p className="text-lg font-mono font-bold text-blue-700">{result.dPlus.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">7. Jarak ke A− (D−)</p>
              <p className="text-lg font-mono font-bold text-blue-700">{result.dMinus.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">8. Skor Preferensi (Vi)</p>
              <p className="text-lg font-mono font-bold text-green-700">{result.preferenceScore.toFixed(4)}</p>
              <p className="text-xs text-gray-400 mt-1">D− / (D+ + D−)</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">9. Perankingan</p>
            <p className="text-2xl font-bold text-gray-900">#{result.ranking}</p>
            <span className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full mt-2 font-medium ${result.isAccepted ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {result.isAccepted ? <><CheckCircle2 size={14} /> DITERIMA</> : <><XCircle size={14} /> TIDAK DITERIMA</>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopsisResults() {
  const { currentUser, candidates, criteria, getAdminCourses, getTopsisForCourse } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [auditTarget, setAuditTarget] = useState<{ candidateId: string; candidateName: string } | null>(null);

  const myCourses = getAdminCourses(currentUser!.id);
  const activeCourse = selectedCourseId ? myCourses.find(c => c.id === selectedCourseId) : myCourses[0];
  const courseId = activeCourse?.id ?? '';

  const snap = useMemo(() => getTopsisForCourse(courseId), [courseId, getTopsisForCourse]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Hasil Perankingan TOPSIS</h1>
        <p className="text-gray-500 text-sm mt-1">Hasil kalkulasi TOPSIS real-time untuk mata kuliah yang Anda kelola.</p>
      </div>

      {/* Course Selector */}
      {myCourses.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {myCourses.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCourseId(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${courseId === c.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Course Info */}
      {activeCourse && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-5 py-4">
          <div>
            <h3 className="text-gray-900">{activeCourse.name}</h3>
            <p className="text-sm text-gray-500">{snap.results.length} kandidat · Kuota {activeCourse.quota} asprak terbaik</p>
          </div>
          <div className="flex gap-3">
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">{snap.results.filter(r => r.isAccepted).length}</p>
              <p className="text-xs text-gray-400">Diterima</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-600">{snap.results.filter(r => !r.isAccepted).length}</p>
              <p className="text-xs text-gray-400">Tidak</p>
            </div>
          </div>
        </div>
      )}

      {snap.results.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Trophy size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Belum ada data untuk dikalkulasi.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Ranking</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Nama</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">NIM</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">D+</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">D−</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Skor (Vi)</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase">Detail</th>
              </tr>
            </thead>
            <tbody>
              {snap.results.map((r, i) => {
                const cand = candidates.find(c => c.id === r.candidateId);
                return (
                  <tr key={r.candidateId} className={`border-b border-gray-100 last:border-0 ${r.isAccepted ? 'bg-green-50/60' : ''}`}>
                    <td className="py-3 px-4">
                      <span className={`w-7 h-7 inline-flex items-center justify-center rounded-full text-xs font-bold ${
                        i === 0 ? 'bg-yellow-100 text-yellow-700' :
                        i === 1 ? 'bg-gray-200 text-gray-700' :
                        i === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {r.ranking}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{cand?.name ?? '—'}</td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-500">{cand?.nim ?? '—'}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-gray-600">{r.dPlus.toFixed(4)}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-gray-600">{r.dMinus.toFixed(4)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-mono font-bold ${r.isAccepted ? 'text-green-700' : 'text-gray-700'}`}>{r.preferenceScore.toFixed(4)}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {r.isAccepted
                        ? <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium"><CheckCircle2 size={12} /> Diterima</span>
                        : <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"><XCircle size={12} /> Tidak</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setAuditTarget({ candidateId: r.candidateId, candidateName: cand?.name ?? '—' })}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Lihat Audit Trail"
                      >
                        <Info size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {auditTarget && (
        <AuditModal
          snap={snap}
          candidateId={auditTarget.candidateId}
          candidateName={auditTarget.candidateName}
          onClose={() => setAuditTarget(null)}
        />
      )}
    </div>
  );
}
