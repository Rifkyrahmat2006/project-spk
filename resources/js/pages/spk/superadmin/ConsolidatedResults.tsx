import { usePage } from '@inertiajs/react';
import { Download, Filter } from 'lucide-react';
import React, { useState } from 'react';

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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Rekap Hasil TOPSIS
                </h1>
                <p className="mt-1 text-gray-500">
                    Hasil seleksi dari semua mata kuliah
                </p>
            </div>

            {/* Filter Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-end gap-4">
                    <div className="flex-1">
                        <label className="mb-2 block text-sm font-medium">
                            Periode
                        </label>
                        <select
                            value={selectedPeriodId}
                            onChange={(e) =>
                                setSelectedPeriodId(e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                        <label className="mb-2 block text-sm font-medium">
                            Mata Kuliah
                        </label>
                        <select
                            value={selectedCourseId}
                            onChange={(e) =>
                                setSelectedCourseId(e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        <Filter size={18} /> Filter
                    </button>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Results Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                {results.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <p>Tidak ada hasil TOPSIS untuk filter yang dipilih</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Rank
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Nama Kandidat
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    NIM
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Mata Kuliah
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Skor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result: any, idx: number) => (
                                <tr
                                    key={result.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-3 text-center text-sm font-bold text-gray-900">
                                        {idx + 1}
                                    </td>
                                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                        {result.candidate?.user?.name}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-700">
                                        {result.candidate?.user?.nim}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-700">
                                        {result.course?.name}
                                    </td>
                                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                        {result.score.toFixed(4)}
                                    </td>
                                    <td className="px-6 py-3 text-sm">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                result.is_qualified
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {result.is_qualified
                                                ? 'Lolos'
                                                : 'Tidak Lolos'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Summary */}
            {results.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <p className="text-sm text-gray-500">Total Hasil</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            {results.length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <p className="text-sm text-gray-500">Lolos Seleksi</p>
                        <p className="mt-1 text-2xl font-bold text-green-600">
                            {results.filter((r: any) => r.is_qualified).length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <p className="text-sm text-gray-500">Tidak Lolos</p>
                        <p className="mt-1 text-2xl font-bold text-red-600">
                            {results.filter((r: any) => !r.is_qualified).length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
