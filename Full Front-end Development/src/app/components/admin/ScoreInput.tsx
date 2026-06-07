import { useState } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ScoreInput() {
  const { currentUser, criteria, periods, getAdminCourses, getCourseCandidates, getCandidateScores, upsertScore } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [savedCells, setSavedCells] = useState<Set<string>>(new Set());
  const [editValues, setEditValues] = useState<Record<string, Record<string, string>>>({});

  const myCourses = getAdminCourses(currentUser!.id);
  const activeCourse = selectedCourseId ? myCourses.find(c => c.id === selectedCourseId) : myCourses[0];
  const courseId = activeCourse?.id ?? '';
  const activePeriod = periods.find(p => p.isActive);
  const isLocked = activePeriod?.isLocked ?? false;

  const candidates = getCourseCandidates(courseId);
  const activeCriteria = criteria.filter(c => c.isActive);

  const getDisplayValue = (candidateId: string, criteriaId: string): string => {
    if (editValues[candidateId]?.[criteriaId] !== undefined) return editValues[candidateId][criteriaId];
    const stored = getCandidateScores(candidateId, courseId)[criteriaId];
    return stored !== undefined ? String(stored) : '';
  };

  const handleChange = (candidateId: string, criteriaId: string, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [candidateId]: { ...prev[candidateId], [criteriaId]: value },
    }));
  };

  const handleBlur = (candidateId: string, criteriaId: string, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      upsertScore(candidateId, courseId, criteriaId, num);
      const key = `${candidateId}-${criteriaId}`;
      setSavedCells(prev => new Set(prev).add(key));
      setTimeout(() => setSavedCells(prev => { const s = new Set(prev); s.delete(key); return s; }), 1500);
    }
  };

  const totalCells = candidates.length * activeCriteria.length;
  const filledCells = candidates.reduce((total, cand) => {
    const scores = getCandidateScores(cand.id, courseId);
    return total + Object.keys(scores).length;
  }, 0);
  const pct = totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Input Nilai Kandidat</h1>
        <p className="text-gray-500 text-sm mt-1">Masukkan nilai untuk setiap kandidat per kriteria (skala 0–100).</p>
      </div>

      {isLocked && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          Periode seleksi telah dikunci. Input nilai tidak dapat diubah.
        </div>
      )}

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

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">Kelengkapan Data — {activeCourse?.name}</span>
          <span className="text-sm font-semibold text-gray-900">{filledCells}/{totalCells} ({pct}%)</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className={`h-2 rounded-full transition-all ${pct === 100 ? 'bg-green-500' : pct > 60 ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Score Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {candidates.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Belum ada kandidat untuk mata kuliah ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 min-w-[150px]">Kandidat</th>
                  {activeCriteria.map(c => (
                    <th key={c.id} className="text-center py-3 px-3 text-xs font-medium text-gray-500 uppercase min-w-[90px]">
                      <div>{c.code}</div>
                      <div className={`text-xs mt-0.5 font-normal normal-case ${c.type === 'cost' ? 'text-red-500' : 'text-green-500'}`}>{c.type}</div>
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => {
                  const scores = getCandidateScores(candidate.id, courseId);
                  const complete = Object.keys(scores).length === activeCriteria.length;
                  return (
                    <tr key={candidate.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="py-2 px-4 sticky left-0 bg-white font-medium text-gray-900">
                        <div>{candidate.name}</div>
                        <div className="text-xs text-gray-400 font-mono">{candidate.nim}</div>
                      </td>
                      {activeCriteria.map(crit => {
                        const key = `${candidate.id}-${crit.id}`;
                        const saved = savedCells.has(key);
                        const val = getDisplayValue(candidate.id, crit.id);
                        const numVal = parseFloat(val);
                        const valid = val === '' || (!isNaN(numVal) && numVal >= 0 && numVal <= 100);
                        return (
                          <td key={crit.id} className="py-2 px-3 text-center">
                            <div className="relative">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={val}
                                disabled={isLocked}
                                onChange={e => handleChange(candidate.id, crit.id, e.target.value)}
                                onBlur={e => handleBlur(candidate.id, crit.id, e.target.value)}
                                className={`w-20 px-2 py-1.5 text-center rounded-lg text-sm border transition-all focus:outline-none ${
                                  saved ? 'border-green-400 bg-green-50' :
                                  !valid ? 'border-red-400 bg-red-50' :
                                  val !== '' ? 'border-blue-300 bg-blue-50' :
                                  'border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                              />
                              {saved && (
                                <CheckCircle2 size={12} className="absolute -top-1 -right-1 text-green-500 bg-white rounded-full" />
                              )}
                            </div>
                          </td>
                        );
                      })}
                      <td className="py-2 px-4 text-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${complete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {complete ? 'Lengkap' : `${Object.keys(scores).length}/${activeCriteria.length}`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Criteria Legend */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Keterangan Kriteria</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {activeCriteria.map(c => (
            <div key={c.id} className="flex items-center gap-2 text-sm">
              <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${c.type === 'cost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{c.code}</span>
              <span className="text-gray-700">{c.name}</span>
              <span className="text-gray-400">— {(c.weight * 100).toFixed(0)}%</span>
              <span className={`text-xs ml-auto ${c.type === 'cost' ? 'text-red-500' : 'text-green-500'}`}>{c.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
