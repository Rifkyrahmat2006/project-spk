import { useMemo } from 'react';
import {
    Users,
    BookOpen,
    CheckCircle2,
    Clock,
    Trophy,
    Activity,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend,
} from 'recharts';
import { usePage } from '@inertiajs/react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function SADashboard() {
    const { props } = usePage();
    const courses = props.courses || [];
    const candidates = props.candidates || [];
    const candidateCourses = props.candidateCourses || [];
    const periods = props.periods || [];
    const criteria = props.criteria || [];
    const topsisResults = props.topsisResults || {}; // Format: { courseId: TopsisSnapshot }

    const activePeriod = periods.find((p) => p.isActive);

    const stats = useMemo(() => {
        const totalCandidates = new Set(
            candidateCourses.map((cc) => cc.candidateId),
        ).size;
        let totalAccepted = 0;
        let totalCompleted = 0;
        courses.forEach((course) => {
            const snap = topsisResults[course.id];
            if (snap && snap.results) {
                totalAccepted += snap.results.filter(
                    (r) => r.isAccepted,
                ).length;
                if (snap.results.length > 0) totalCompleted++;
            }
        });
        return {
            totalCandidates,
            totalAccepted,
            totalCourses: courses.length,
            totalCompleted,
        };
    }, [courses, candidateCourses, topsisResults]);

    const chartData = useMemo(
        () =>
            courses.map((course) => {
                const snap = topsisResults[course.id];
                const top = snap?.results?.[0];
                return {
                    name: course.name.split(' ').slice(0, 2).join(' '),
                    kandidat: candidateCourses.filter(
                        (cc) =>
                            cc.courseId === course.id && cc.status === 'active',
                    ).length,
                    diterima: snap?.results
                        ? snap.results.filter((r) => r.isAccepted).length
                        : 0,
                    topScore: top
                        ? parseFloat((top.preferenceScore * 100).toFixed(1))
                        : 0,
                };
            }),
        [courses, candidateCourses, topsisResults],
    );

    const topCandidates = useMemo(() => {
        const all: {
            name: string;
            courseName: string;
            score: number;
            rank: number;
        }[] = [];
        courses.forEach((course) => {
            const snap = topsisResults[course.id];
            if (snap?.results) {
                snap.results
                    .filter((r) => r.isAccepted)
                    .forEach((r) => {
                        const cand = candidates.find(
                            (c) => c.id === r.candidateId,
                        );
                        if (cand)
                            all.push({
                                name: cand.name,
                                courseName: course.name,
                                score: r.preferenceScore,
                                rank: r.ranking,
                            });
                    });
            }
        });
        return all.sort((a, b) => b.score - a.score).slice(0, 8);
    }, [courses, candidates, topsisResults]);

    const pieData = [
        { name: 'Diterima', value: stats.totalAccepted, color: '#10b981' },
        {
            name: 'Tidak Diterima',
            value: Math.max(0, stats.totalCandidates - stats.totalAccepted),
            color: '#f87171',
        },
    ];

    const criteriaWeightData = criteria
        .filter((c) => c.isActive)
        .map((c) => ({
            name: c.code,
            fullName: c.name,
            weight: Math.round(c.weight * 100),
            type: c.type,
        }));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-gray-900">Dashboard Analitik</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {activePeriod ? (
                        <>
                            Periode aktif:{' '}
                            <span className="font-medium text-blue-600">
                                {activePeriod.name}
                            </span>
                        </>
                    ) : (
                        'Tidak ada periode aktif saat ini.'
                    )}
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                    {
                        label: 'Total Kandidat',
                        value: stats.totalCandidates,
                        icon: <Users size={20} />,
                        color: 'bg-blue-50 text-blue-600',
                        bg: 'bg-blue-600',
                    },
                    {
                        label: 'Kandidat Diterima',
                        value: stats.totalAccepted,
                        icon: <CheckCircle2 size={20} />,
                        color: 'bg-green-50 text-green-600',
                        bg: 'bg-green-600',
                    },
                    {
                        label: 'Mata Kuliah Aktif',
                        value: stats.totalCourses,
                        icon: <BookOpen size={20} />,
                        color: 'bg-purple-50 text-purple-600',
                        bg: 'bg-purple-600',
                    },
                    {
                        label: 'Proses Selesai',
                        value: `${stats.totalCompleted}/${stats.totalCourses}`,
                        icon: <Trophy size={20} />,
                        color: 'bg-amber-50 text-amber-600',
                        bg: 'bg-amber-600',
                    },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
                    >
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}
                        >
                            {s.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {s.value}
                            </p>
                            <p className="text-xs text-gray-500">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Period Status */}
            {activePeriod && (
                <div
                    className={`flex items-center gap-4 rounded-xl border p-4 ${
                        activePeriod.isLocked
                            ? 'border-gray-200 bg-gray-50'
                            : activePeriod.isPublished
                              ? 'border-green-200 bg-green-50'
                              : 'border-blue-200 bg-blue-50'
                    }`}
                >
                    <Activity
                        size={20}
                        className={
                            activePeriod.isLocked
                                ? 'text-gray-500'
                                : activePeriod.isPublished
                                  ? 'text-green-600'
                                  : 'text-blue-600'
                        }
                    />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                            {activePeriod.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {activePeriod.startDate} s.d. {activePeriod.endDate}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${activePeriod.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                        >
                            {activePeriod.isActive ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${activePeriod.isPublished ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}
                        >
                            {activePeriod.isPublished
                                ? 'Dipublikasikan'
                                : 'Belum Dipublikasikan'}
                        </span>
                        {activePeriod.isLocked && (
                            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                                Terkunci
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Bar Chart */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
                    <h3 className="mb-4 text-gray-800">
                        Kandidat per Mata Kuliah
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                        >
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                                formatter={(value: number, name: string) => [
                                    value,
                                    name === 'kandidat' ? 'Total' : 'Diterima',
                                ]}
                            />
                            <Bar
                                key="bar-total"
                                dataKey="kandidat"
                                fill="#bfdbfe"
                                radius={[4, 4, 0, 0]}
                                name="Total"
                            />
                            <Bar
                                key="bar-diterima"
                                dataKey="diterima"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                                name="Diterima"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <h3 className="mb-4 text-gray-800">Distribusi Kelulusan</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                dataKey="value"
                                label={({ percent }) =>
                                    `${(percent * 100).toFixed(0)}%`
                                }
                                labelLine={false}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`pie-cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Legend
                                formatter={(value) => (
                                    <span className="text-xs">{value}</span>
                                )}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bobot Kriteria */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-gray-800">Bobot Kriteria Aktif</h3>
                <div className="space-y-3">
                    {criteriaWeightData.map((c, i) => (
                        <div key={c.name} className="flex items-center gap-3">
                            <span
                                className={`min-w-[30px] rounded px-2 py-0.5 text-center font-mono text-xs font-bold ${c.type === 'cost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
                            >
                                {c.name}
                            </span>
                            <span className="flex-1 text-sm text-gray-700">
                                {c.fullName}
                            </span>
                            <div className="h-2 w-32 rounded-full bg-gray-100">
                                <div
                                    className="h-2 rounded-full"
                                    style={{
                                        width: `${c.weight}%`,
                                        backgroundColor:
                                            COLORS[i % COLORS.length],
                                    }}
                                />
                            </div>
                            <span className="w-10 text-right text-sm font-medium text-gray-700">
                                {c.weight}%
                            </span>
                            <span
                                className={`rounded px-1.5 py-0.5 text-xs ${c.type === 'cost' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
                            >
                                {c.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Candidates */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-gray-800">
                    Kandidat Diterima — Semua Mata Kuliah
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-3 py-2 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    Ranking
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    Nama
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    Mata Kuliah
                                </th>
                                <th className="px-3 py-2 text-right text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    Skor TOPSIS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {topCandidates.map((c, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-gray-50 hover:bg-gray-50"
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                            {c.rank}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5 font-medium text-gray-900">
                                        {c.name}
                                    </td>
                                    <td className="px-3 py-2.5 text-gray-500">
                                        {c.courseName}
                                    </td>
                                    <td className="px-3 py-2.5 text-right">
                                        <span className="font-mono font-semibold text-green-700">
                                            {c.score.toFixed(4)}
                                        </span>
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
