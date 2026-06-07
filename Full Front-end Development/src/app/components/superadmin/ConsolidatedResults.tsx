import { useMemo } from 'react';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { useApp } from '../context/AppContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function ConsolidatedResults() {
  const { courses, candidates, candidateCourses, criteria, getTopsisForCourse } = useApp();

  const allResults = useMemo(() => {
    return courses.flatMap(course => {
      const snap = getTopsisForCourse(course.id);
      return snap.results.map(r => {
        const cand = candidates.find(c => c.id === r.candidateId);
        return { ...r, candidateName: cand?.name ?? '—', nim: cand?.nim ?? '—', courseName: course.name, courseCode: course.code };
      });
    });
  }, [courses, candidates, getTopsisForCourse]);

  const accepted = allResults.filter(r => r.isAccepted);
  const rejected = allResults.filter(r => !r.isAccepted);

  const chartData = useMemo(() =>
    courses.map((course, i) => {
      const snap = getTopsisForCourse(course.id);
      const topResult = snap.results[0];
      const avgScore = snap.results.length > 0 ? snap.results.reduce((s, r) => s + r.preferenceScore, 0) / snap.results.length : 0;
      return {
        name: course.name.split(' ').slice(0, 2).join(' '),
        'Top Skor': topResult ? parseFloat((topResult.preferenceScore * 100).toFixed(1)) : 0,
        'Rata-rata': parseFloat((avgScore * 100).toFixed(1)),
        color: COLORS[i],
      };
    }), [courses, getTopsisForCourse]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Rekap Hasil Seleksi</h1>
        <p className="text-gray-500 text-sm mt-1">Konsolidasi hasil TOPSIS dari seluruh mata kuliah.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl font-bold text-gray-900">{allResults.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Kandidat</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl font-bold text-green-600">{accepted.length}</p>
          <p className="text-xs text-gray-500 mt-1">Diterima</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl font-bold text-red-500">{rejected.length}</p>
          <p className="text-xs text-gray-500 mt-1">Tidak Diterima</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
          <p className="text-xs text-gray-500 mt-1">Mata Kuliah</p>
        </div>
      </div>

      {/* Score Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-gray-800 mb-4">Perbandingan Skor per Mata Kuliah</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ left: -10 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar key="bar-top" dataKey="Top Skor" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => <Cell key={`cell-top-${i}`} fill={entry.color} />)}
            </Bar>
            <Bar key="bar-avg" dataKey="Rata-rata" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Per-course results */}
      {courses.map((course, ci) => {
        const snap = getTopsisForCourse(course.id);
        return (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100" style={{ borderLeftWidth: 4, borderLeftColor: COLORS[ci % COLORS.length] }}>
              <div>
                <h3 className="text-gray-900">{course.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{snap.results.length} kandidat · Kuota {course.quota} asprak</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  {snap.results.filter(r => r.isAccepted).length} Diterima
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-500 uppercase">Nama</th>
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-500 uppercase">NIM</th>
                    <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500 uppercase">D+</th>
                    <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500 uppercase">D−</th>
                    <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500 uppercase">Skor (Vi)</th>
                    <th className="text-center py-2.5 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {snap.results.map((r, i) => {
                    const cand = candidates.find(c => c.id === r.candidateId);
                    return (
                      <tr key={r.candidateId} className={`border-b border-gray-50 last:border-0 ${r.isAccepted ? 'bg-green-50/50' : ''}`}>
                        <td className="py-2.5 px-4">
                          <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-500'}`}>
                            {r.ranking}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-medium text-gray-900">{cand?.name ?? '—'}</td>
                        <td className="py-2.5 px-4 font-mono text-gray-500 text-xs">{cand?.nim ?? '—'}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-xs text-gray-600">{r.dPlus.toFixed(4)}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-xs text-gray-600">{r.dMinus.toFixed(4)}</td>
                        <td className="py-2.5 px-4 text-right">
                          <span className={`font-mono font-semibold ${r.isAccepted ? 'text-green-700' : 'text-gray-600'}`}>{r.preferenceScore.toFixed(4)}</span>
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          {r.isAccepted
                            ? <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium"><CheckCircle2 size={12} /> Diterima</span>
                            : <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-medium"><XCircle size={12} /> Tidak</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
