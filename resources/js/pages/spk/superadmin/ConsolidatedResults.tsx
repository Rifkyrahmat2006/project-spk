import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, Download, Filter } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from 'recharts';
import { usePage } from '@inertiajs/react';

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
        const params = new URLSearchParams();
        if (selectedPeriodId) params.append('period_id', selectedPeriodId);
        if (selectedCourseId) params.append('course_id', selectedCourseId);
        window.location.href = `/superadmin/consolidated-results?${params.toString()}`;
    };

    const handleExport = () => {
        const params = new URLSearchParams();
        if (selectedPeriodId) params.append('period_id', selectedPeriodId);
        if (selectedCourseId) params.append('course_id', selectedCourseId);
        window.location.href = `/superadmin/consolidated-results/export?${params.toString()}`;
    };

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
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Rekap Hasil Seleksi
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Konsolidasi hasil TOPSIS dari seluruh mata kuliah.
                </p>
            </div>

            {/* Filter Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-end gap-4">
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                    <button
                        onClick={handleFilter}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Filter size={18} /> Filter
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                    >
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-2xl font-bold text-gray-900">
                        {results.length}
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        Total Kandidat
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-2xl font-bold text-green-600">
                        {accepted.length}
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        Diterima
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-2xl font-bold text-red-500">
                        {rejected.length}
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        Tidak Diterima
                    </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-2xl font-bold text-blue-600">
                        {courses.length}
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        Mata Kuliah
                    </p>
                </div>
            </div>

            {/* Score Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-6 font-semibold text-gray-800">
                    Perbandingan Skor per Mata Kuliah
                </h3>
                <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barGap={4}
                            barCategoryGap="50%"
                        >
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                            <Tooltip
                                formatter={(v: number) => `${v}%`}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Bar
                                dataKey="Top Skor"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                                barSize={60}
                            />
                            <Bar
                                dataKey="Rata-rata"
                                fill="#9ca3af"
                                radius={[4, 4, 0, 0]}
                                barSize={60}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
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
                            className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-5 py-4"
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
                                        <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            #
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            Nama
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            NIM
                                        </th>
                                        <th className="px-4 py-3 text-right text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            D+
                                        </th>
                                        <th className="px-4 py-3 text-right text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            D−
                                        </th>
                                        <th className="px-4 py-3 text-right text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            Skor (Vi)
                                        </th>
                                        <th className="px-4 py-3 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase">
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
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-sm ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-500'}`}
                                                    >
                                                        {r.ranking || i + 1}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 font-semibold text-gray-900">
                                                    {r.candidate?.user?.name ||
                                                        r.candidate?.name ||
                                                        '—'}
                                                </td>
                                                <td className="px-4 py-3 font-mono text-[11px] text-gray-400">
                                                    {r.candidate?.user?.nim ||
                                                        r.candidate?.nim ||
                                                        '—'}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-[11px] text-gray-500">
                                                    {Number(
                                                        r.d_plus || 0,
                                                    ).toFixed(4)}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-[11px] text-gray-500">
                                                    {Number(
                                                        r.d_minus || 0,
                                                    ).toFixed(4)}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <span
                                                        className={`font-mono font-bold ${isAccepted ? 'text-green-700' : 'text-gray-600'}`}
                                                    >
                                                        {Number(
                                                            r.preference_score ||
                                                                0,
                                                        ).toFixed(4)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
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
