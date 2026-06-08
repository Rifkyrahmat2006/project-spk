import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
    Trophy,
    Medal,
    Award,
    CheckCircle2,
    XCircle,
    Info,
} from 'lucide-react';

interface PageProps {
    [key: string]: any;
    results?: any;
    courses?: any[];
    snapshots?: any;
}

export default function TopsisResults() {
    const { props } = usePage<PageProps>();
    const results = props.results || {};
    const courses = props.courses || [];
    const snapshots = props.snapshots || {};
    const [auditTarget, setAuditTarget] = useState<{
        candidateId: string;
        courseId: string;
        candidateName: string;
    } | null>(null);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="text-yellow-500" size={20} />;
            case 2:
                return <Medal className="text-gray-400" size={20} />;
            case 3:
                return <Award className="text-orange-500" size={20} />;
            default:
                return (
                    <span className="w-5 text-center text-sm font-bold text-gray-400">
                        {rank}
                    </span>
                );
        }
    };

    const openAudit = (candidateId: string, courseId: string, name: string) => {
        setAuditTarget({ candidateId, courseId, candidateName: name });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Hasil TOPSIS
                </h1>
                <p className="mt-1 text-gray-500">
                    Perankingan kandidat berdasarkan metode TOPSIS
                </p>
            </div>

            {courses.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-500">
                    <p>Tidak ada mata kuliah yang ditugaskan</p>
                </div>
            ) : (
                courses.map((course: any) => {
                    const courseResults = results[course.id] || [];
                    const top3 = courseResults.slice(0, 3);
                    const snapshot = snapshots[course.id];

                    return (
                        <div
                            key={course.id}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 bg-linear-to-r from-blue-50 to-white px-5 py-4">
                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        {course.code} - {course.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {courseResults.length} kandidat
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                                        {
                                            courseResults.filter(
                                                (r: any) => r.is_accepted,
                                            ).length
                                        }{' '}
                                        Diterima
                                    </span>
                                    <a
                                        href={`/admin/scores?course_id=${course.id}`}
                                        className="flex items-center gap-1 text-sm text-blue-600 transition-colors hover:text-blue-800"
                                    >
                                        <Info size={16} /> Detail
                                    </a>
                                </div>
                            </div>

                            {/* Podium Top 3 */}
                            {top3.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 bg-linear-to-b from-gray-50 to-white p-6">
                                    {top3.map((result: any, idx: number) => (
                                        <div
                                            key={result.id}
                                            className={`rounded-xl p-4 text-center shadow-sm transition-all hover:shadow-md ${
                                                idx === 0
                                                    ? 'border-2 border-yellow-300 bg-yellow-50'
                                                    : idx === 1
                                                      ? 'border border-gray-200 bg-gray-50'
                                                      : 'border-2 border-orange-200 bg-orange-50'
                                            }`}
                                        >
                                            <div className="mb-2 flex justify-center">
                                                {getRankIcon(idx + 1)}
                                            </div>
                                            <p className="font-bold text-gray-900">
                                                {result.candidate?.user?.name ||
                                                    result.candidate?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {result.candidate?.user?.nim ||
                                                    result.candidate?.nim}
                                            </p>
                                            <p className="mt-1 text-lg font-bold text-blue-600">
                                                {Number(
                                                    result.preference_score ||
                                                        0,
                                                ).toFixed(4)}
                                            </p>
                                            <span
                                                className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                                                    result.is_accepted
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {result.is_accepted ? (
                                                    <>
                                                        <CheckCircle2
                                                            size={10}
                                                        />{' '}
                                                        Diterima
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle size={10} />{' '}
                                                        Tidak
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Full Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-100 bg-gray-50/80">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                Rank
                                            </th>
                                            <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                Kandidat
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
                                            <th className="px-4 py-3 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                Audit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {courseResults.map(
                                            (result: any, idx: number) => {
                                                const isAccepted =
                                                    result.is_accepted;
                                                return (
                                                    <tr
                                                        key={result.id}
                                                        className={`transition-colors hover:bg-gray-50/80 ${isAccepted ? 'bg-green-50/30' : ''}`}
                                                    >
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-sm ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-100 text-gray-600' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-500'}`}
                                                            >
                                                                {idx + 1}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-semibold text-gray-900">
                                                            {result.candidate
                                                                ?.user?.name ||
                                                                result.candidate
                                                                    ?.name}
                                                        </td>
                                                        <td className="px-4 py-3 font-mono text-[11px] text-gray-400">
                                                            {result.candidate
                                                                ?.user?.nim ||
                                                                result.candidate
                                                                    ?.nim}
                                                        </td>
                                                        <td className="px-4 py-3 text-right font-mono text-[11px] text-gray-500">
                                                            {Number(
                                                                result.d_plus ||
                                                                    0,
                                                            ).toFixed(4)}
                                                        </td>
                                                        <td className="px-4 py-3 text-right font-mono text-[11px] text-gray-500">
                                                            {Number(
                                                                result.d_minus ||
                                                                    0,
                                                            ).toFixed(4)}
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <span
                                                                className={`font-mono font-bold ${isAccepted ? 'text-green-700' : 'text-gray-600'}`}
                                                            >
                                                                {Number(
                                                                    result.preference_score ||
                                                                        0,
                                                                ).toFixed(4)}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            {isAccepted ? (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-green-700 uppercase">
                                                                    <CheckCircle2
                                                                        size={
                                                                            10
                                                                        }
                                                                    />{' '}
                                                                    Diterima
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-700 uppercase">
                                                                    <XCircle
                                                                        size={
                                                                            10
                                                                        }
                                                                    />{' '}
                                                                    Tidak
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <button
                                                                onClick={() =>
                                                                    openAudit(
                                                                        result.candidate_id,
                                                                        result.course_id,
                                                                        result
                                                                            .candidate
                                                                            ?.user
                                                                            ?.name ||
                                                                            result
                                                                                .candidate
                                                                                ?.name ||
                                                                            '—',
                                                                    )
                                                                }
                                                                className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold tracking-wider text-gray-600 uppercase transition-colors hover:bg-blue-100 hover:text-blue-700"
                                                            >
                                                                Audit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
