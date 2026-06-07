import { usePage, Link, useForm } from '@inertiajs/react';
import { BookOpen, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function CandidatePortal() {
    const { props } = usePage();
    const candidate = props.candidate || {};
    const courses = props.courses || [];
    const applications = props.applications || [];
    const topsisResults = props.topsisResults || [];

    const { post, processing } = useForm({});

    const handleApply = (courseId: string) => {
        if (
            window.confirm(
                'Apakah Anda yakin ingin mendaftar seleksi mata kuliah ini?',
            )
        ) {
            post(route('portal.apply'), {
                data: { course_id: courseId },
                preserveScroll: true,
            });
        }
    };

    const alreadyApplied = (courseId: string) =>
        applications.some(
            (app: any) =>
                app.course_id === courseId && app.status === 'pending',
        );

    const getApplicationStatus = (courseId: string) => {
        const app = applications.find((a: any) => a.course_id === courseId);
        return app?.status;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Portal Seleksi
                </h1>
                <p className="mt-1 text-gray-500">
                    Daftar seleksi asisten praktikum
                </p>
            </div>

            {/* Candidate Info */}
            {candidate && (
                <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <FileText size={22} />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">
                                Selamat Datang
                            </p>
                            <p className="text-sm text-blue-100">
                                {candidate.user?.name} — {candidate.user?.nim}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Course List */}
            <div>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <BookOpen size={20} /> Mata Kuliah Tersedia
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {courses.map((course: any) => {
                        const status = getApplicationStatus(course.id);
                        return (
                            <div
                                key={course.id}
                                className="rounded-xl border border-gray-200 bg-white p-6"
                            >
                                <div className="mb-3 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {course.code}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {course.name}
                                        </p>
                                    </div>
                                    {status === 'accepted' && (
                                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                            <CheckCircle size={12} /> Diterima
                                        </span>
                                    )}
                                    {status === 'rejected' && (
                                        <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                                            <XCircle size={12} /> Ditolak
                                        </span>
                                    )}
                                </div>

                                {course.description && (
                                    <p className="mb-4 text-sm text-gray-500">
                                        {course.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        {course.candidates_count || 0} peserta
                                    </div>

                                    {!status ? (
                                        <button
                                            onClick={() =>
                                                handleApply(course.id)
                                            }
                                            disabled={processing}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Memproses...'
                                                : 'Daftar'}
                                        </button>
                                    ) : status === 'pending' ? (
                                        <span className="rounded-lg bg-yellow-100 px-4 py-2 text-sm text-yellow-800">
                                            Menunggu
                                        </span>
                                    ) : status === 'accepted' ||
                                      status === 'rejected' ? (
                                        <span
                                            className={`rounded-lg px-4 py-2 text-sm ${
                                                status === 'accepted'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {status === 'accepted'
                                                ? 'Diterima'
                                                : 'Ditolak'}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* TOPSIS Results */}
            {topsisResults.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <FileText size={20} /> Hasil Seleksi
                    </h2>
                    <div className="space-y-3">
                        {topsisResults.map((result: any) => (
                            <div
                                key={result.id}
                                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {result.course?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Skor: {result.score.toFixed(4)}
                                    </p>
                                </div>
                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                                        result.is_qualified
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {result.is_qualified
                                        ? 'Lolos'
                                        : 'Tidak Lolos'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {courses.length === 0 && (
                <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
                    <BookOpen
                        size={48}
                        className="mx-auto mb-4 text-gray-300"
                    />
                    <p className="text-gray-500">
                        Tidak ada mata kuliah yang tersedia untuk Anda
                    </p>
                </div>
            )}
        </div>
    );
}
