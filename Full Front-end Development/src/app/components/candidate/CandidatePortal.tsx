import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, BookOpen, BarChart3, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CandidatePortal() {
  const { currentUser, courses, periods, candidateCourses, candidates, getTopsisForCourse } = useApp();
  const [showApply, setShowApply] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const activePeriod = periods.find(p => p.isActive);

  const enrollments = getCandidateEnrollments();

  function getCandidateEnrollments() {
    const candidateRecords = candidates.filter(c => c.userId === currentUser?.id);
    return candidateRecords.flatMap(candidate => {
      const ccs = candidateCourses.filter(cc => cc.candidateId === candidate.id);
      return ccs.map(cc => {
        const course = courses.find(c => c.id === cc.courseId)!;
        let topsisResult = null;
        if (activePeriod?.isPublished) {
          const snap = getTopsisForCourse(cc.courseId);
          topsisResult = snap.results.find(r => r.candidateId === candidate.id) ?? null;
        }
        return { candidate, candidateCourse: cc, course, topsisResult };
      });
    });
  }

  const enrolledCourseIds = enrollments.map(e => e.course.id);
  const availableCourses = courses.filter(c => c.isActive && !enrolledCourseIds.includes(c.id));

  const getStatusInfo = (enrollment: typeof enrollments[0]) => {
    const { topsisResult, candidateCourse } = enrollment;
    if (!activePeriod?.isPublished) {
      return { label: 'Menunggu Pengumuman', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <Clock size={16} className="text-yellow-600" /> };
    }
    if (!topsisResult) {
      return { label: 'Belum Diproses', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: <AlertCircle size={16} className="text-gray-400" /> };
    }
    if (topsisResult.isAccepted) {
      return { label: 'DITERIMA', color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle2 size={16} className="text-green-600" /> };
    }
    return { label: 'Tidak Diterima', color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle size={16} className="text-red-500" /> };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Portal Seleksi Asprak</h1>
        <p className="text-gray-500 text-sm mt-1">
          Selamat datang, <span className="font-medium text-gray-700">{currentUser?.name}</span>. Pantau status pendaftaran asprak Anda.
        </p>
      </div>

      {/* Period Status */}
      {activePeriod ? (
        <div className={`rounded-xl border p-4 ${activePeriod.isPublished ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-center gap-3">
            {activePeriod.isPublished ? <CheckCircle2 size={18} className="text-green-600 shrink-0" /> : <Clock size={18} className="text-blue-600 shrink-0" />}
            <div>
              <p className="text-sm font-medium text-gray-800">{activePeriod.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {activePeriod.isPublished
                  ? 'Hasil seleksi telah dipublikasikan. Lihat status Anda di bawah.'
                  : 'Seleksi sedang berlangsung. Hasil akan diumumkan setelah periode selesai.'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
          Tidak ada periode seleksi yang aktif saat ini.
        </div>
      )}

      {/* Apply Button */}
      {activePeriod && !activePeriod.isLocked && availableCourses.length > 0 && (
        <button
          onClick={() => setShowApply(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
        >
          <BookOpen size={16} /> Daftar Mata Kuliah Baru
        </button>
      )}

      {/* Enrollments */}
      {enrollments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-2">Anda belum mendaftar ke mata kuliah apapun.</p>
          {activePeriod && !activePeriod.isLocked && (
            <button onClick={() => setShowApply(true)} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Daftar sekarang →
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map(enrollment => {
            const status = getStatusInfo(enrollment);
            const { candidate, course, topsisResult } = enrollment;
            return (
              <div key={`${candidate.id}-${course.id}`} className={`bg-white rounded-xl border-2 p-5 ${status.color.includes('green') ? 'border-green-200' : status.color.includes('red') ? 'border-red-200' : status.color.includes('yellow') ? 'border-yellow-200' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 font-semibold">{course.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{course.code}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${status.color}`}>
                    {status.icon} {status.label}
                  </div>
                </div>

                {/* Score Details (if published and showScores enabled) */}
                {topsisResult && activePeriod?.showScores && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-3 flex items-center gap-1.5">
                      <BarChart3 size={14} /> Detail Skor TOPSIS Anda
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'Ranking', value: `#${topsisResult.ranking}`, color: 'text-blue-700' },
                        { label: 'Skor (Vi)', value: topsisResult.preferenceScore.toFixed(4), color: 'text-green-700' },
                        { label: 'D+', value: topsisResult.dPlus.toFixed(4), color: 'text-gray-700' },
                        { label: 'D−', value: topsisResult.dMinus.toFixed(4), color: 'text-gray-700' },
                      ].map(s => (
                        <div key={s.label} className="text-center bg-white rounded-lg p-3 border border-gray-100">
                          <p className={`text-lg font-mono font-bold ${s.color}`}>{s.value}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Weighted scores per criteria */}
                    <div className="mt-3">
                      <p className="text-xs text-gray-400 mb-2">Nilai terbobot per kriteria:</p>
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(topsisResult.weightedRow).map(([cId, v]) => (
                          <div key={cId} className="bg-white border border-gray-100 rounded px-2 py-1.5 text-center">
                            <p className="text-xs font-mono text-gray-400">{cId}</p>
                            <p className="text-xs font-mono font-semibold text-gray-700">{(v as number).toFixed(4)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Score hidden notice */}
                {topsisResult && !activePeriod?.showScores && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <Info size={13} /> Detail skor belum diaktifkan oleh pengelola sistem.
                  </div>
                )}

                {/* Not published notice */}
                {!activePeriod?.isPublished && (
                  <div className="flex items-center gap-2 text-xs text-yellow-600 mt-2">
                    <Clock size={13} /> Hasil belum dipublikasikan. Harap tunggu pengumuman resmi.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Apply Modal */}
      {showApply && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-gray-900">Daftar Mata Kuliah</h3>
              <button onClick={() => setShowApply(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-4">Pilih mata kuliah yang ingin Anda ikuti seleksinya:</p>
              <div className="space-y-2 mb-5">
                {availableCourses.map(c => (
                  <label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedCourseId === c.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                    <input type="radio" name="course" value={c.id} checked={selectedCourseId === c.id} onChange={() => setSelectedCourseId(c.id)} />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.code} · Kuota {c.quota} asprak</p>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mb-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                Catatan: Setelah mendaftar, data Anda akan ditinjau oleh KoorAsPrak sebelum nilai diinput.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowApply(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Batal</button>
                <button
                  disabled={!selectedCourseId}
                  onClick={() => {
                    // In a real app, this would create an application record
                    setShowApply(false);
                    setSelectedCourseId('');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium"
                >
                  Kirim Pendaftaran
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
