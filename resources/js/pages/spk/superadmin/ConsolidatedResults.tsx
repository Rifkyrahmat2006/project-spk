import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, Download, Filter } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { usePage, router } from '@inertiajs/react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function ConsolidatedResults() {
    const { props } = usePage();
    const [selectedPeriodId, setSelectedPeriodId] = useState(
        props.selectedPeriodId || '',
    );
    const [selectedCourseId, setSelectedCourseId] = useState(
        props.selectedCourseId || '',
    );

    const results = props.results || [];
    const periods = props.periods || [];
    const courses = props.courses || [];

    const handleFilter = () => {
        const params: Record<string, string> = {};
        if (selectedPeriodId) params.period_id = selectedPeriodId;
        if (selectedCourseId) params.course_id = selectedCourseId;
        router.get('/superadmin/consolidated-results', params, {
            preserveState: true,
            only: ['results', 'selectedPeriodId', 'selectedCourseId'],
        });
    };

    const exportUrl = useMemo(() => {
        const params = new URLSearchParams();
        if (selectedPeriodId) params.append('period_id', selectedPeriodId);
        if (selectedCourseId) params.append('course_id', selectedCourseId);
        const qs = params.toString();
        return `/superadmin/consolidated-results/export${qs ? `?${qs}` : ''}`;
    }, [selectedPeriodId, selectedCourseId]);

    const accepted = results.filter((r: any) => r.is_accepted);
    const rejected = results.filter((r: any) => !r.is_accepted);

    const chartData = useMemo(() => {
        const courseMap = new Map();
        results.forEach((r: any) => {
            if (!courseMap.has(r.course_id)) {
                courseMap.set(r.course_id, {
                    courseName: r.course?.name || `Course ${r.course_id}`,
                    topScore: 0,
                    avgScore: 0,
                    count: 0,
                });
            }
            const course = courseMap.get(r.course_id);
            const score = parseFloat(String(r.preference_score)) || 0;
            course.topScore = Math.max(course.topScore, score);
            course.avgScore += score;
            course.count += 1;
        });

        return Array.from(courseMap.values()).map((course) => ({
            name: course.courseName.split(' ').slice(0, 2).join(' '),
            'Top Skor': parseFloat((course.topScore * 100).toFixed(1)),
            'Rata-rata':
                course.count > 0
                    ? parseFloat(
                          ((course.avgScore / course.count) * 100).toFixed(1),
                      )
                    : 0,
        }));
    }, [results]);

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Rekap Hasil Seleksi
                </h1>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Konsolidasi hasil TOPSIS dari seluruh mata kuliah.
                </p>
            </div>

            {/* Filter Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                    <div className="w-full sm:min-w-[200px] sm:flex-1">
                        <label className="mb-2 block text-sm font-medium text-gray-900">
                            Periode
                        </label>
                        <select
                            value={selectedPeriodId}
                            onChange={(e) =>
                                setSelectedPeriodId(e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Semua Periode</option>
                            {periods.map((p: any) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full sm:min-w-[200px] sm:flex-1">
                        <label className="mb-2 block text-sm font-medium text-gray-900">
                            Mata Kuliah
                        </label>
                        <select
                            value={selectedCourseId}
                            onChange={(e) =>
                                setSelectedCourseId(e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Semua Mata Kuliah</option>
                            {courses.map((c: any) => (
                                <option key={c.id} value={c.id}>
                                    {c.code} - {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                        <button
                            onClick={handleFilter}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:w-auto"
                        >
                            <Filter size={16} /> Filter
                        </button>
                        <a
                            href={exportUrl}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700 sm:w-auto"
                        >
                            <Download size={16} /> Export CSV
                        </a>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {results.length}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold tracking-wider text-gray-500 uppercase sm:text-xs">
                        Total Kandidat
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">
                    <p className="text-xl font-bold text-green-600 sm:text-2xl">
                        {accepted.length}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold tracking-wider text-gray-500 uppercase sm:text-xs">
                        Diterima
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">
                    <p className="text-xl font-bold text-red-500 sm:text-2xl">
                        {rejected.length}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold tracking-wider text-gray-500 uppercase sm:text-xs">
                        Tidak Diterima
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">
                    <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                        {courses.length}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold tracking-wider text-gray-500 uppercase sm:text-xs">
                        Mata Kuliah
                    </p>
                </div>
            </div>

            {/* Score Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 font-semibold text-gray-800 sm:mb-6">
                    Perbandingan Skor per Mata Kuliah
                </h3>
                {chartData.length > 0 ? (
                    <div className="h-48 sm:h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 0,
                                }}
                                barGap={2}
                                barCategoryGap="30%"
                            >
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                <YAxis
                                    tick={{ fontSize: 10 }}
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    formatter={(v: number) => `${v}%`}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar
                                    dataKey="Top Skor"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="Rata-rata"
                                    fill="#9ca3af"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="py-8 text-center text-sm text-gray-400">
                        Tidak ada data untuk ditampilkan.
                    </p>
                )}
            </div>

            {/* Per-course results */}
            {courses.map((course: any, ci: number) => {
                const courseResults = results.filter(
                    (r: any) => r.course_id === course.id,
                );
                if (courseResults.length === 0) return null;

                return (
                    <div
                        key={course.id}
                        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                        <div
                            className="flex flex-col gap-2 border-b border-gray-100 bg-gray-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4"
                            style={{
                                borderLeftWidth: 4,
                                borderLeftColor: COLORS[ci % COLORS.length],
                            }}
                        >
                            <div>
                                <h3 className="font-bold text-gray-900">
                                    {course.name}
                                </h3>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    {courseResults.length} kandidat · Kuota{' '}
                                    {course.quota} asprak
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 shadow-sm">
                                    {
                                        courseResults.filter(
                                            (r: any) => r.is_accepted,
                                        ).length
                                    }{' '}
                                    Diterima
                                </span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-gray-100 bg-gray-50/80">
                                    <tr>
                                        <th className="px-3 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:px-4">
                                            #
                                        </th>
                                        <th className="px-3 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:px-4">
                                            Nama
                                        </th>
                                        <th className="hidden px-3 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:table-cell sm:px-4">
                                            NIM
                                        </th>
                                        <th className="hidden px-3 py-3 text-right text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:table-cell sm:px-4">
                                            D+
                                        </th>
                                        <th className="hidden px-3 py-3 text-right text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:table-cell sm:px-4">
                                            D−
                                        </th>
                                        <th className="px-3 py-3 text-right text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:px-4">
                                            Skor (Vi)
                                        </th>
                                        <th className="px-3 py-3 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:px-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseResults.map((r: any, i: number) => {
                                        const isAccepted = r.is_accepted;
                                        return (
                                            <tr
                                                key={r.id}
                                                className={`border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50 ${isAccepted ? 'bg-green-50/30' : ''}`}
                                            >
                                                <td className="px-3 py-3 sm:px-4">
                                                    <span
                                                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-sm ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-500'}`}
                                                    >
                                                        {r.ranking || i + 1}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 sm:px-4">
                                                    <div className="font-semibold text-gray-900">
                                                        {r.candidate?.user
                                                            ?.name ||
                                                            r.candidate?.name ||
                                                            '—'}
                                                    </div>
                                                    <div className="font-mono text-[11px] text-gray-400 sm:hidden">
                                                        {r.candidate?.user
                                                            ?.nim ||
                                                            r.candidate?.nim ||
                                                            '—'}
                                                    </div>
                                                </td>
                                                <td className="hidden px-3 py-3 font-mono text-[11px] text-gray-400 sm:table-cell sm:px-4">
                                                    {r.candidate?.user?.nim ||
                                                        r.candidate?.nim ||
                                                        '—'}
                                                </td>
                                                <td className="hidden px-3 py-3 text-right font-mono text-[11px] text-gray-500 sm:table-cell sm:px-4">
                                                    {Number(
                                                        r.d_plus || 0,
                                                    ).toFixed(4)}
                                                </td>
                                                <td className="hidden px-3 py-3 text-right font-mono text-[11px] text-gray-500 sm:table-cell sm:px-4">
                                                    {Number(
                                                        r.d_minus || 0,
                                                    ).toFixed(4)}
                                                </td>
                                                <td className="px-3 py-3 text-right sm:px-4">
                                                    <span
                                                        className={`font-mono font-bold ${isAccepted ? 'text-green-700' : 'text-gray-600'}`}
                                                    >
                                                        {Number(
                                                            r.preference_score ||
                                                                0,
                                                        ).toFixed(4)}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-center sm:px-4">
                                                    {isAccepted ? (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-green-700 uppercase">
                                                            <CheckCircle2
                                                                size={10}
                                                            />{' '}
                                                            Diterima
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-700 uppercase">
                                                            <XCircle
                                                                size={10}
                                                            />{' '}
                                                            Tidak
                                                        </span>
                                                    )}
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
