import { useMemo } from 'react';
import {
    Users,
    Trophy,
    ClipboardList,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
} from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';

interface PageProps {
    [key: string]: any;
    myCourses?: any[];
    criteria?: any[];
    periods?: any[];
    coursesData?: any;
}

export default function AdminDashboard() {
    const { props } = usePage<PageProps>();
    const user = props.auth?.user;
    const myCourses = props.myCourses || [];
    const criteria = props.criteria || [];
    const periods = props.periods || [];
    const coursesData = props.coursesData || {}; // Format: { courseId: { candidates: [], topsisResult: TopsisSnapshot } }

    const activePeriod = periods.find((p) => p.isActive);

    const courseStats = useMemo(
        () =>
            myCourses.map((course) => {
                const courseInfo = coursesData[course.id] || {
                    candidates: [],
                    topsisResult: null,
                };
                const candidates = courseInfo.candidates || [];
                const snap = courseInfo.topsisResult;
                const accepted = snap?.results
                    ? snap.results.filter((r) => r.isAccepted).length
                    : 0;

                // Calculate completion percentage
                const activeCriteria = criteria.filter((c) => c.isActive);
                const totalCriteria = activeCriteria.length;
                let filled = 0;
                candidates.forEach((cand) => {
                    const scores = cand.scores || {};
                    filled += Object.keys(scores).length;
                });
                const totalExpected = candidates.length * totalCriteria;
                const completePct =
                    totalExpected > 0
                        ? Math.round((filled / totalExpected) * 100)
                        : 0;

                return {
                    course,
                    candidates: candidates.length,
                    accepted,
                    completePct,
                    quota: course.quota,
                };
            }),
        [myCourses, coursesData, criteria],
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-gray-900">Dashboard KoorAsPrak</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Selamat datang,{' '}
                    <span className="font-medium text-gray-700">
                        {user?.name}
                    </span>
                    . Anda mengelola {myCourses.length} mata kuliah.
                </p>
            </div>

            {/* Period Status */}
            {activePeriod ? (
                <div
                    className={`rounded-xl border p-4 ${activePeriod.isLocked ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'}`}
                >
                    <div className="flex items-start gap-3">
                        {activePeriod.isLocked ? (
                            <AlertCircle
                                size={18}
                                className="mt-0.5 shrink-0 text-gray-500"
                            />
                        ) : (
                            <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0 text-blue-600"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {activePeriod.name}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                                {activePeriod.isLocked
                                    ? 'Periode telah dikunci. Input nilai tidak dapat diubah.'
                                    : `Berlangsung ${activePeriod.startDate} hingga ${activePeriod.endDate}`}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
                    Tidak ada periode seleksi aktif saat ini.
                </div>
            )}

            {/* Course Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {courseStats.map(
                    ({
                        course,
                        candidates,
                        accepted,
                        completePct,
                        quota,
                    }: any) => (
                        <div
                            key={course.id}
                            className="rounded-xl border border-gray-200 bg-white p-5"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {course.name}
                                    </h3>
                                    <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600">
                                        {course.code}
                                    </span>
                                </div>
                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${completePct === 100 ? 'bg-green-100 text-green-700' : completePct > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    {completePct === 100
                                        ? 'Nilai Lengkap'
                                        : completePct > 0
                                          ? 'Input Sebagian'
                                          : 'Belum Ada Nilai'}
                                </span>
                            </div>

                            <div className="mb-4 grid grid-cols-3 gap-3">
                                {[
                                    {
                                        label: 'Kandidat',
                                        value: candidates,
                                        icon: <Users size={14} />,
                                        color: 'text-blue-600',
                                    },
                                    {
                                        label: 'Diterima',
                                        value: accepted,
                                        icon: <Trophy size={14} />,
                                        color: 'text-green-600',
                                    },
                                    {
                                        label: 'Kuota',
                                        value: quota,
                                        icon: <CheckCircle2 size={14} />,
                                        color: 'text-purple-600',
                                    },
                                ].map((s) => (
                                    <div key={s.label} className="text-center">
                                        <p
                                            className={`text-xl font-bold ${s.color}`}
                                        >
                                            {s.value}
                                        </p>
                                        <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-gray-400">
                                            {s.icon}
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        Kelengkapan Nilai
                                    </span>
                                    <span className="text-xs font-medium text-gray-700">
                                        {completePct}%
                                    </span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-100">
                                    <div
                                        className={`h-2 rounded-full transition-all ${completePct === 100 ? 'bg-green-500' : completePct > 60 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                                        style={{ width: `${completePct}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/scores?course_id=${course.id}`}
                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-50 py-2 text-sm text-blue-600 transition-all hover:bg-blue-100"
                                >
                                    <ClipboardList size={14} /> Nilai
                                </Link>
                                <Link
                                    href={`/admin/topsis?course_id=${course.id}`}
                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-50 py-2 text-sm text-green-600 transition-all hover:bg-green-100"
                                >
                                    <Trophy size={14} /> Hasil{' '}
                                    <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    ),
                )}
            </div>

            {/* Criteria Reference */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-3 text-gray-800">
                    Kriteria & Bobot Penilaian
                </h3>
                <div className="space-y-2">
                    {criteria
                        .filter((c) => c.isActive)
                        .map((c) => (
                            <div
                                key={c.id}
                                className="flex items-center gap-3 py-1"
                            >
                                <span
                                    className={`min-w-7.5 rounded px-2 py-0.5 text-center font-mono text-xs font-bold ${c.type === 'cost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
                                >
                                    {c.code}
                                </span>
                                <span className="flex-1 text-sm text-gray-700">
                                    {c.name}
                                </span>
                                <span
                                    className={`rounded px-2 py-0.5 text-xs ${c.type === 'cost' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
                                >
                                    {c.type}
                                </span>
                                <span className="w-12 text-right font-mono text-sm font-semibold text-gray-700">
                                    {(c.weight * 100).toFixed(0)}%
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
