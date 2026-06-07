import { usePage, Link } from '@inertiajs/react';
import { BookOpen, FileText, Trophy } from 'lucide-react';

export default function CandidateDashboard() {
    const { props } = usePage();
    const candidate = props.candidate || {};
    const applications = props.applications || [];
    const activePeriod = props.activePeriod || null;
    const user = props.auth?.user || {};

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard Calon Asisten
                </h1>
                <p className="mt-1 text-gray-500">
                    Selamat datang, {user.name}
                </p>
            </div>

            {/* User Info Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-2xl font-bold text-white">
                        {user.name?.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Nama</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {user.name}
                        </p>
                        {user.nim && (
                            <>
                                <p className="mt-2 text-sm text-gray-500">
                                    NIM
                                </p>
                                <p className="text-lg font-medium text-gray-900">
                                    {user.nim}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Period Status */}
            {activePeriod && (
                <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                    <h2 className="mb-2 text-lg font-semibold">
                        Periode Seleksi Aktif
                    </h2>
                    <p className="mb-4 text-blue-100">{activePeriod.name}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-blue-200">Mulai</p>
                            <p className="font-medium">
                                {new Date(
                                    activePeriod.start_date,
                                ).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200">Selesai</p>
                            <p className="font-medium">
                                {new Date(
                                    activePeriod.end_date,
                                ).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Applications */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <FileText size={20} /> Lamaran Saya
                </h2>
                {applications.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                        <p>Anda belum melakukan pendaftaran</p>
                        <Link
                            href="/portal"
                            className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Lihat Portal Seleksi
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {applications.map((app: any) => (
                            <div
                                key={app.id}
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
                                            {app.course?.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Terdaftar:{' '}
                                            {new Date(
                                                app.applied_at,
                                            ).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                                        app.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : app.status === 'accepted'
                                              ? 'bg-green-100 text-green-800'
                                              : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {app.status === 'pending'
                                        ? 'Menunggu'
                                        : app.status === 'accepted'
                                          ? 'Diterima'
                                          : 'Ditolak'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className="flex gap-3">
                <Link
                    href="/portal"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <FileText size={18} /> Lihat Portal Seleksi
                </Link>
            </div>
        </div>
    );
}
