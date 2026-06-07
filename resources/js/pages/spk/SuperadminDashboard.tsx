import { usePage } from '@inertiajs/react';
import {
    Users,
    BookOpen,
    CheckCircle2,
    Clock,
    Trophy,
    Activity,
    Calculator,
    Lock,
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

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function SuperadminDashboard() {
    const { props } = usePage();
    const courses = props.courses || [];
    const criteria = props.criteria || [];
    const activePeriod = props.activePeriod || null;
    const stats = props.stats || {};

    const handleRecalculateAll = () => {
        if (confirm('Recalculate TOPSIS untuk semua mata kuliah? Ini akan menghapus hasil sebelumnya.')) {
            fetch('/admin/topsis/calculate-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
            })
            .then(res => res.json())
            .then(data => {
                alert(data.success 
                    ? `Berhasil: ${data.successful_courses} mata kuliah` 
                    : `Error: ${data.error}`
                );
                if (data.success) {
                    window.location.reload();
                }
            })
            .catch(err => alert('Error: ' + err.message));
        }
    };

    const handleLockPeriod = () => {
        if (!activePeriod) {
            alert('Tidak ada periode aktif');
            return;
        }
        if (confirm(`Lock periode "${activePeriod.name}" dan buat snapshot? Ini tidak bisa dibatalkan.`)) {
            fetch(`/admin/topsis/periods/${activePeriod.id}/lock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
            })
            .then(res => res.json())
            .then(data => {
                alert(data.success ? data.message : `Error: ${data.error}`);
                if (data.success) {
                    window.location.reload();
                }
            })
            .catch(err => alert('Error: ' + err.message));
        }
    };

    const chartData = courses.map((course: any) => ({
        name: course.code,
        candidates: course.candidates_count || 0,
    }));

    const criteriaData = criteria.map((c: any) => ({
        name: c.code,
        weight: c.weight * 100,
    }));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard Superadmin
                </h1>
                <p className="mt-1 text-gray-500">
                    Periode Aktif:{' '}
                    {activePeriod?.name || 'Tidak ada periode aktif'}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Kandidat
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {stats.totalCandidates || 0}
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
                            <p className="text-sm text-gray-500">
                                Total Mata Kuliah
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {stats.totalCourses || 0}
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
                                Kriteria Aktif
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {
                                    criteria.filter((c: any) => c.is_active)
                                        .length
                                }
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <Activity className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Status Periode
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {activePeriod ? 'Aktif' : 'Tidak Aktif'}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                            {activePeriod ? (
                                <CheckCircle2
                                    className="text-green-600"
                                    size={24}
                                />
                            ) : (
                                <Clock className="text-yellow-600" size={24} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Kandidat per Mata Kuliah
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="candidates" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Distribusi Bobot Kriteria
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={criteriaData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, weight }) =>
                                    `${name}: ${weight.toFixed(0)}%`
                                }
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="weight"
                            >
                                {criteriaData.map(
                                    (entry: any, index: number) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ),
                                )}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Active Period Details */}
            {activePeriod && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Detail Periode Aktif
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleRecalculateAll}
                                className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                <Calculator size={16} />
                                Hitung Ulang Semua
                            </button>
                            <button
                                onClick={handleLockPeriod}
                                disabled={activePeriod?.is_locked}
                                className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:bg-gray-400"
                            >
                                <Lock size={16} />
                                {activePeriod?.is_locked ? 'Terkunci' : 'Lock Periode'}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <p className="text-sm text-gray-500">
                                Nama Periode
                            </p>
                            <p className="mt-1 text-base font-medium text-gray-900">
                                {activePeriod.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Tanggal Mulai
                            </p>
                            <p className="mt-1 text-base font-medium text-gray-900">
                                {new Date(
                                    activePeriod.start_date,
                                ).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Tanggal Selesai
                            </p>
                            <p className="mt-1 text-base font-medium text-gray-900">
                                {new Date(
                                    activePeriod.end_date,
                                ).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Courses */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Mata Kuliah
                </h2>
                <div className="space-y-3">
                    {courses.slice(0, 5).map((course: any) => (
                        <div
                            key={course.id}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
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
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs ${
                                        course.is_active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    {course.is_active ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
