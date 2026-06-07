import { useMemo } from 'react';
import { Users, BookOpen, CheckCircle2, Clock, Trophy, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { useApp } from '../context/AppContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function SADashboard() {
  const { courses, candidates, candidateCourses, periods, criteria, getTopsisForCourse } = useApp();

  const activePeriod = periods.find(p => p.isActive);

  const stats = useMemo(() => {
    const totalCandidates = new Set(candidateCourses.map(cc => cc.candidateId)).size;
    let totalAccepted = 0;
    let totalCompleted = 0;
    courses.forEach(course => {
      const snap = getTopsisForCourse(course.id);
      totalAccepted += snap.results.filter(r => r.isAccepted).length;
      if (snap.results.length > 0) totalCompleted++;
    });
    return { totalCandidates, totalAccepted, totalCourses: courses.length, totalCompleted };
  }, [courses, candidateCourses, getTopsisForCourse]);

  const chartData = useMemo(() =>
    courses.map(course => {
      const snap = getTopsisForCourse(course.id);
      const top = snap.results[0];
      return {
        name: course.name.split(' ').slice(0, 2).join(' '),
        kandidat: candidateCourses.filter(cc => cc.courseId === course.id && cc.status === 'active').length,
        diterima: snap.results.filter(r => r.isAccepted).length,
        topScore: top ? parseFloat((top.preferenceScore * 100).toFixed(1)) : 0,
      };
    }), [courses, candidateCourses, getTopsisForCourse]);

  const topCandidates = useMemo(() => {
    const all: { name: string; courseName: string; score: number; rank: number }[] = [];
    courses.forEach(course => {
      const snap = getTopsisForCourse(course.id);
      snap.results.filter(r => r.isAccepted).forEach(r => {
        const cand = candidates.find(c => c.id === r.candidateId);
        if (cand) all.push({ name: cand.name, courseName: course.name, score: r.preferenceScore, rank: r.ranking });
      });
    });
    return all.sort((a, b) => b.score - a.score).slice(0, 8);
  }, [courses, candidates, getTopsisForCourse]);

  const pieData = [
    { name: 'Diterima', value: stats.totalAccepted, color: '#10b981' },
    { name: 'Tidak Diterima', value: Math.max(0, stats.totalCandidates - stats.totalAccepted), color: '#f87171' },
  ];

  const criteriaWeightData = criteria.filter(c => c.isActive).map(c => ({
    name: c.code,
    fullName: c.name,
    weight: Math.round(c.weight * 100),
    type: c.type,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Dashboard Analitik</h1>
        <p className="text-gray-500 text-sm mt-1">
          {activePeriod ? (
            <>Periode aktif: <span className="font-medium text-blue-600">{activePeriod.name}</span></>
          ) : 'Tidak ada periode aktif saat ini.'}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Kandidat', value: stats.totalCandidates, icon: <Users size={20} />, color: 'bg-blue-50 text-blue-600', bg: 'bg-blue-600' },
          { label: 'Kandidat Diterima', value: stats.totalAccepted, icon: <CheckCircle2 size={20} />, color: 'bg-green-50 text-green-600', bg: 'bg-green-600' },
          { label: 'Mata Kuliah Aktif', value: stats.totalCourses, icon: <BookOpen size={20} />, color: 'bg-purple-50 text-purple-600', bg: 'bg-purple-600' },
          { label: 'Proses Selesai', value: `${stats.totalCompleted}/${stats.totalCourses}`, icon: <Trophy size={20} />, color: 'bg-amber-50 text-amber-600', bg: 'bg-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Period Status */}
      {activePeriod && (
        <div className={`rounded-xl border p-4 flex items-center gap-4 ${
          activePeriod.isLocked ? 'bg-gray-50 border-gray-200' :
          activePeriod.isPublished ? 'bg-green-50 border-green-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <Activity size={20} className={activePeriod.isLocked ? 'text-gray-500' : activePeriod.isPublished ? 'text-green-600' : 'text-blue-600'} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{activePeriod.name}</p>
            <p className="text-xs text-gray-500">{activePeriod.startDate} s.d. {activePeriod.endDate}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${activePeriod.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {activePeriod.isActive ? 'Aktif' : 'Tidak Aktif'}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${activePeriod.isPublished ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {activePeriod.isPublished ? 'Dipublikasikan' : 'Belum Dipublikasikan'}
            </span>
            {activePeriod.isLocked && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-red-100 text-red-700">Terkunci</span>
            )}
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-gray-800 mb-4">Kandidat per Mata Kuliah</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number, name: string) => [value, name === 'kandidat' ? 'Total' : 'Diterima']}
              />
              <Bar key="bar-total" dataKey="kandidat" fill="#bfdbfe" radius={[4, 4, 0, 0]} name="Total" />
              <Bar key="bar-diterima" dataKey="diterima" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Diterima" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-gray-800 mb-4">Distribusi Kelulusan</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {pieData.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bobot Kriteria */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-gray-800 mb-4">Bobot Kriteria Aktif</h3>
        <div className="space-y-3">
          {criteriaWeightData.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold min-w-[30px] text-center ${c.type === 'cost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{c.name}</span>
              <span className="text-sm text-gray-700 flex-1">{c.fullName}</span>
              <div className="w-32 bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${c.weight}%`, backgroundColor: COLORS[i % COLORS.length] }} />
              </div>
              <span className="text-sm font-medium text-gray-700 w-10 text-right">{c.weight}%</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${c.type === 'cost' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{c.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Candidates */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-gray-800 mb-4">Kandidat Diterima — Semua Mata Kuliah</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Ranking</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Nama</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Mata Kuliah</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Skor TOPSIS</th>
              </tr>
            </thead>
            <tbody>
              {topCandidates.map((c, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 px-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full inline-flex items-center justify-center text-xs font-bold">{c.rank}</span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-gray-900">{c.name}</td>
                  <td className="py-2.5 px-3 text-gray-500">{c.courseName}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="font-mono text-green-700 font-semibold">{c.score.toFixed(4)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
