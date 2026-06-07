import { usePage } from '@inertiajs/react';
import { BookOpen, Users, Trophy, ClipboardList } from 'lucide-react';

export default function AdminDashboard() {
    const { props } = usePage();
    const courses = props.courses || [];
    const activePeriod = props.activePeriod || null;

    const totalCandidates = courses.reduce(
        (sum: number, c: any) => sum + (c.candidates_count || 0),
        0,
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard Admin
                </h1>
                <p className="mt-1 text-gray-500">
                    Periode Aktif:{' '}
                    {activePeriod?.name || 'Tidak ada periode aktif'}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Kandidat
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {totalCandidates}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <Users className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Mata Kuliah</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {courses.length}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                            <BookOpen className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Status Seleksi
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {activePeriod ? 'Berjalan' : 'Tutup'}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <Trophy className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Assigned Courses */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Mata Kuliah yang Ditugaskan
                </h2>
                <div className="space-y-3">
                    {courses.map((course: any) => (
                        <div
                            key={course.id}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <BookOpen
                                        className="text-blue-600"
                                        size={18}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {course.code}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {course.name}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {course.candidates_count || 0} kandidat
                                </p>
                                <div className="mt-2 flex gap-2">
                                    <a
                                        href={`/admin/scores?course_id=${course.id}`}
                                        className="rounded bg-blue-100 px-3 py-1 text-xs text-blue-800 hover:bg-blue-200"
                                    >
                                        Input Nilai
                                    </a>
                                    <a
                                        href={`/admin/topsis-results?course_id=${course.id}`}
                                        className="rounded bg-green-100 px-3 py-1 text-xs text-green-800 hover:bg-green-200"
                                    >
                                        Hasil
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
