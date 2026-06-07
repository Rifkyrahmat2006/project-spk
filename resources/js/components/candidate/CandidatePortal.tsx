import { useState } from 'react';
import {
    CheckCircle2,
    XCircle,
    Clock,
    BookOpen,
    BarChart3,
    AlertCircle,
    Info,
} from 'lucide-react';
import { usePage, useForm } from '@inertiajs/react';

export default function CandidatePortal() {
    const { props } = usePage();
    const user = props.auth?.user;
    const courses = props.courses || [];
    const periods = props.periods || [];
    const enrollments = getCandidateEnrollments();

    function getCandidateEnrollments() {
        const candidateRecords = candidates.filter(
            (c) => c.userId === currentUser?.id,
        );
        return candidateRecords.flatMap((candidate) => {
            const ccs = candidateCourses.filter(
                (cc) => cc.candidateId === candidate.id,
            );
            return ccs.map((cc) => {
                const course = courses.find((c) => c.id === cc.courseId)!;
                let topsisResult = null;
                if (activePeriod?.isPublished) {
                    const snap = getTopsisForCourse(cc.courseId);
                    topsisResult =
                        snap.results.find(
                            (r) => r.candidateId === candidate.id,
                        ) ?? null;
                }
                return { candidate, candidateCourse: cc, course, topsisResult };
            });
        });
    }

    const enrolledCourseIds = enrollments.map((e) => e.course.id);
    const availableCourses = courses.filter(
        (c) => c.isActive && !enrolledCourseIds.includes(c.id),
    );

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('spk.apply'), {
            onSuccess: () => {
                setShowApply(false);
                setData('course_id', '');
            },
        });
    };

    const getStatusInfo = (enrollment: (typeof enrollments)[0]) => {
        const { topsisResult, candidateCourse } = enrollment;
        if (!activePeriod?.isPublished) {
            return {
                label: 'Menunggu Pengumuman',
                color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                icon: <Clock size={16} className="text-yellow-600" />,
            };
        }
        if (!topsisResult) {
            return {
                label: 'Belum Diproses',
                color: 'bg-gray-100 text-gray-600 border-gray-200',
                icon: <AlertCircle size={16} className="text-gray-400" />,
            };
        }
        if (topsisResult.isAccepted) {
            return {
                label: 'DITERIMA',
                color: 'bg-green-100 text-green-700 bueen-200',
                icon: <CheckCircle2 size={16} className="text-green-600" />,
            };
        }
        return {
            label: 'Tidak Diterima',
            color: 'bg-red-100 text-red-700 border-red-200',
            icon: <XCircle size={16} className="text-red-500" />,
        };
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-gray-900">Portal Seleksi Asprak</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Selamat datang,{' '}
                    <span className="font-medium text-gray-700">
                        {currentUser?.name}
                    </span>
                    . Pantau status pendaftaran asprak Anda.
                </p>
            </div>

            {/* Period Status */}
            {activePeriod ? (
                <div
                    className={`rounded-xl border p-4 ${activePeriod.isPublished ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}
                >
                    <div className="flex items-center gap-3">
                        {activePeriod.isPublished ? (
                            <CheckCircle2
                                size={18}
                                className="shrink-0 text-green-600"
                            />
                        ) : (
                            <Clock
                                size={18}
                                className="shrink-0 text-blue-600"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {activePeriod.name}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                                {activePeriod.isPublished
                                    ? 'Hasil seleksi telah dipublikasikan. Lihat status Anda di bawah.'
                                    : 'Seleksi sedang berlangsung. Hasil akan diumumkan setelah periode selesai.'}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                    Tidak ada periode seleksi yang aktif saat ini.
                </div>
            )}

            {/* Apply Button */}
            {activePeriod &&
                !activePeriod.isLocked &&
                availableCourses.length > 0 && (
                    <button
                        onClick={() => setShowApply(true)}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
                    >
                        <BookOpen size={16} /> Daftar Mata Kuliah Baru
                    </button>
                )}

            {/* Enrollments */}
            {enrollments.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                    <BookOpen
                        size={40}
                        className="mx-auto mb-3 text-gray-300"
                    />
                    <p className="mb-2 text-gray-500">
                        Anda belum mendaftar ke mata kuliah apapun.
                    </p>
                    {activePeriod && !activePeriod.isLocked && (
                        <button
                            onClick={() => setShowApply(true)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Daftar sekarang →
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {enrollments.map((enrollment) => {
                        const status = getStatusInfo(enrollment);
                        const { candidate, course, topsisResult } = enrollment;
                        return (
                            <div
                                key={`${candidate.id}-${course.id}`}
                                className={`rounded-xl border-2 bg-white p-5 ${status.color.includes('green') ? 'border-green-200' : status.color.includes('red') ? 'border-red-200' : status.color.includes('yellow') ? 'border-yellow-200' : 'border-gray-200'}`}
                            >
                                <div className="mb-3 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {course.name}
                                        </h3>
                                        <p className="font-mono text-xs text-gray-500">
                                            {course.code}
                                        </p>
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${status.color}`}
                                    >
                                        {status.icon} {status.label}
                                    </div>
                                </div>

                                {/* Score Details (if published and showScores enabled) */}
                                {topsisResult && activePeriod?.showScores && (
                                    <div className="mt-3 rounded-lg bg-gray-50 p-4">
                                        <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                            <BarChart3 size={14} /> Detail Skor
                                            TOPSIS Anda
                                        </p>
                                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                            {[
                                                {
                                                    label: 'Ranking',
                                                    value: `#${topsisResult.ranking}`,
                                                    color: 'text-blue-700',
                                                },
                                                {
                                                    label: 'Skor (Vi)',
                                                    value: topsisResult.preferenceScore.toFixed(
                                                        4,
                                                    ),
                                                    color: 'text-green-700',
                                                },
                                                {
                                                    label: 'D+',
                                                    value: topsisResult.dPlus.toFixed(
                                                        4,
                                                    ),
                                                    color: 'text-gray-700',
                                                },
                                                {
                                                    label: 'D−',
                                                    value: topsisResult.dMinus.toFixed(
                                                        4,
                                                    ),
                                                    color: 'text-gray-700',
                                                },
                                            ].map((s) => (
                                                <div
                                                    key={s.label}
                                                    className="rounded-lg border border-gray-100 bg-white p-3 text-center"
                                                >
                                                    <p
                                                        className={`font-mono text-lg font-bold ${s.color}`}
                                                    >
                                                        {s.value}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-gray-400">
                                                        {s.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Weighted scores per criteria */}
                                        <div className="mt-3">
                                            <p className="mb-2 text-xs text-gray-400">
                                                Nilai terbobot per kriteria:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(
                                                    topsisResult.weightedRow,
                                                ).map(([cId, v]) => (
                                                    <div
                                                        key={cId}
                                                        className="rounded border border-gray-100 bg-white px-2 py-1.5 text-center"
                                                    >
                                                        <p className="font-mono text-xs text-gray-400">
                                                            {cId}
                                                        </p>
                                                        <p className="font-mono text-xs font-semibold text-gray-700">
                                                            {(
                                                                v as number
                                                            ).toFixed(4)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Score hidden notice */}
                                {topsisResult && !activePeriod?.showScores && (
                                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                                        <Info size={13} /> Detail skor belum
                                        diaktifkan oleh pengelola sistem.
                                    </div>
                                )}

                                {/* Not published notice */}
                                {!activePeriod?.isPublished && (
                                    <div className="mt-2 flex items-center gap-2 text-xs text-yellow-600">
                                        <Clock size={13} /> Hasil belum
                                        dipublikasikan. Harap tunggu pengumuman
                                        resmi.
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Apply Modal */}
            {showApply && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h3 className="text-gray-900">
                                Daftar Mata Kuliah
                            </h3>
                            <button
                                onClick={() => setShowApply(false)}
                                className="text-2xl text-gray-400 hover:text-gray-600"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleApply} className="p-6">
                            <p className="mb-4 text-sm text-gray-500">
                                Pilih mata kuliah yang ingin Anda ikuti
                                seleksinya:
                            </p>
                            <div className="mb-5 space-y-2">
                                {availableCourses.map((c) => (
                                    <label
                                        key={c.id}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${data.course_id === c.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="course_id"
                                            value={c.id}
                                            checked={data.course_id === c.id}
                                            onChange={(e) =>
                                                setData(
                                                    'course_id',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {c.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {c.code} · Kuota {c.quota}{' '}
                                                asprak
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.course_id && (
                                <p className="mb-4 text-xs text-red-500">
                                    {errors.course_id}
                                </p>
                            )}
                            <p className="mb-4 rounded-lg border border-yellow-100 bg-yellow-50 p-3 text-xs text-gray-400">
                                Catatan: Setelah mendaftar, data Anda akan
                                ditinjau oleh KoorAsPrak sebelum nilai diinput.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowApply(false)}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={!data.course_id || processing}
                                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
                                >
                                    {processing
                                        ? 'Mendaftar...'
                                        : 'Kirim Pendaftaran'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
