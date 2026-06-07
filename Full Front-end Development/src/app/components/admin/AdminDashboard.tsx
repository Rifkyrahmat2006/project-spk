import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Users, Trophy, ClipboardList, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { currentUser, criteria, periods, getAdminCourses, getCourseCandidates, getCandidateScores, getTopsisForCourse } = useApp();
  const navigate = useNavigate();

  const myCourses = getAdminCourses(currentUser!.id);
  const activePeriod = periods.find(p => p.isActive);
  const activeCriteria = criteria.filter(c => c.isActive);

  const courseStats = useMemo(() => myCourses.map(course => {
    const candidates = getCourseCandidates(course.id);
    const totalCriteria = activeCriteria.length;
    let filled = 0;
    candidates.forEach(cand => {
      const scores = getCandidateScores(cand.id, course.id);
      filled += Object.keys(scores).length;
    });
    const totalExpected = candidates.length * totalCriteria;
    const completePct = totalExpected > 0 ? Math.round((filled / totalExpected) * 100) : 0;
    const snap = getTopsisForCourse(course.id);
    const accepted = snap.results.filter(r => r.isAccepted).length;
    return { course, candidates: candidates.length, accepted, completePct, quota: course.quota };
  }), [myCourses, getCourseCandidates, getCandidateScores, getTopsisForCourse, activeCriteria]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Dashboard KoorAsPrak</h1>
        <p className="text-gray-500 text-sm mt-1">
          Selamat datang, <span className="font-medium text-gray-700">{currentUser?.name}</span>. Anda mengelola {myCourses.length} mata kuliah.
        </p>
      </div>

      {/* Period Status */}
      {activePeriod ? (
        <div className={`rounded-xl border p-4 ${activePeriod.isLocked ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-start gap-3">
            {activePeriod.isLocked
              ? <AlertCircle size={18} className="text-gray-500 shrink-0 mt-0.5" />
              : <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />}
            <div>
              <p className="text-sm font-medium text-gray-800">{activePeriod.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {activePeriod.isLocked ? 'Periode telah dikunci. Input nilai tidak dapat diubah.' : `Berlangsung ${activePeriod.startDate} hingga ${activePeriod.endDate}`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-700">
          Tidak ada periode seleksi aktif saat ini.
        </div>
      )}

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courseStats.map(({ course, candidates, accepted, completePct, quota }) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 font-semibold">{course.name}</h3>
                <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{course.code}</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${completePct === 100 ? 'bg-green-100 text-green-700' : completePct > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                {completePct === 100 ? 'Nilai Lengkap' : completePct > 0 ? 'Input Sebagian' : 'Belum Ada Nilai'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Kandidat', value: candidates, icon: <Users size={14} />, color: 'text-blue-600' },
                { label: 'Diterima', value: accepted, icon: <Trophy size={14} />, color: 'text-green-600' },
                { label: 'Kuota', value: quota, icon: <CheckCircle2 size={14} />, color: 'text-purple-600' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-0.5">{s.icon}{s.label}</p>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Kelengkapan Nilai</span>
                <span className="text-xs font-medium text-gray-700">{completePct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${completePct === 100 ? 'bg-green-500' : completePct > 60 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  style={{ width: `${completePct}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate('/app/candidates')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
              >
                <ClipboardList size={14} /> Nilai
              </button>
              <button
                onClick={() => navigate('/app/rankings')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-all"
              >
                <Trophy size={14} /> Hasil <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Criteria Reference */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-gray-800 mb-3">Kriteria & Bobot Penilaian</h3>
        <div className="space-y-2">
          {activeCriteria.map(c => (
            <div key={c.id} className="flex items-center gap-3 py-1">
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold min-w-[30px] text-center ${c.type === 'cost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{c.code}</span>
              <span className="text-sm text-gray-700 flex-1">{c.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${c.type === 'cost' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{c.type}</span>
              <span className="text-sm font-mono font-semibold text-gray-700 w-12 text-right">{(c.weight * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
