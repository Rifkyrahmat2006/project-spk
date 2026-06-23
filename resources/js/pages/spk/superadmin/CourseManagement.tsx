import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, X, BookOpen, Users } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface FormData {
    code: string;
    name: string;
    description: string;
    quota: number;
    isActive: boolean;
    assignedAdminIds: string[];
}

const empty: FormData = {
    code: '',
    name: '',
    description: '',
    quota: 3,
    isActive: true,
    assignedAdminIds: [],
};

export default function CourseManagement() {
    const { props } = usePage();
    const { data, setData, post, put, processing, errors, reset } =
        useForm<FormData>(empty);

    const courses = props.courses || [];
    const admins = props.admins || [];

    const openCreate = () => {
        setData(empty);
        setModal('create');
    };

    const openEdit = (course: any) => {
        setData({
            code: course.code || '',
            name: course.name || '',
            description: course.description || '',
            quota: course.quota || 3,
            isActive: !!course.is_active,
            assignedAdminIds:
                course.assigned_admins?.map((a: any) => String(a.id)) || [],
        });
        setSelected(course);
        setModal('edit');
    };

    const handleSave = () => {
        if (modal === 'create') {
            post('/superadmin/courses', {
                onSuccess: () => {
                    setModal(null);
                    router.visit('/superadmin/courses', {
                        preserveScroll: true,
                    });
                },
                onError: () => setModal('create'),
            });
        } else if (modal === 'edit' && selected) {
            put(`/superadmin/courses/${selected.id}`, {
                onSuccess: () => {
                    setModal(null);
                    router.visit('/superadmin/courses', {
                        preserveScroll: true,
                    });
                },
                onError: () => setModal('edit'),
            });
        }
    };

    const [deleteId, setDeleteId] = React.useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = () => {
        if (!deleteId) return;
        const id = deleteId;
        setDeleteId(null);
        router.delete(`/superadmin/courses/${id}`, {
            onSuccess: () => {
                router.visit('/superadmin/courses', {
                    preserveScroll: true,
                });
            },
        });
    };

    const toggleAdmin = (id: string) => {
        setData((f) => ({
            ...f,
            assignedAdminIds: f.assignedAdminIds.includes(id)
                ? f.assignedAdminIds.filter((a) => a !== id)
                : [...f.assignedAdminIds, id],
        }));
    };

    const [modal, setModal] = React.useState<'create' | 'edit' | null>(null);
    const [selected, setSelected] = React.useState<any>(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-900">Manajemen Mata Kuliah</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {courses.length} mata kuliah terdaftar
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Matkul
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {courses.map((course) => {
                    const enrolled =
                        course.candidate_courses?.filter(
                            (cc: any) => cc.status === 'active',
                        ).length || 0;
                    const assignedAdmins = course.assigned_admins || [];

                    return (
                        <div
                            key={course.id}
                            className="rounded-xl border border-gray-200 bg-white p-5"
                        >
                            <div className="mb-3 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-medium text-blue-600">
                                        <BookOpen size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {course.code}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {course.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1 text-right">
                                    <span className="${ course.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500' } rounded-full px-2 py-0.5 text-xs">
                                        {course.is_active
                                            ? 'Aktif'
                                            : 'Tidak Aktif'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {enrolled} peserta
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-sm">
                                    <p className="flex-1 text-gray-600">
                                        Kapasitas:
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        {course.quota}
                                    </p>
                                </div>
                                <div className="flex items-center text-sm">
                                    <p className="flex-1 text-gray-600">
                                        Admin Tim:
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        {assignedAdmins.length}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <button
                                    onClick={() => openEdit(course)}
                                    className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800 hover:bg-yellow-200"
                                >
                                    <Pencil size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 hover:bg-red-200"
                                >
                                    <Trash2 size={14} /> Hapus
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {modal === 'create'
                                    ? 'Tambah Mata Kuliah Baru'
                                    : 'Edit Mata Kuliah'}
                            </h2>
                            <button
                                onClick={() => setModal(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Kode Matkul
                                </label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData('code', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.code}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Nama Mata Kuliah
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="h-20 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Kapasitas Maksimal
                                </label>
                                <input
                                    type="number"
                                    value={data.quota}
                                    onChange={(e) =>
                                        setData(
                                            'quota',
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    min="1"
                                    required
                                />
                                {errors.quota && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.quota}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <label className="mb-0 flex items-center gap-2 text-sm font-medium text-gray-900">
                                    <input
                                        type="checkbox"
                                        checked={data.isActive}
                                        onChange={(e) =>
                                            setData(
                                                'isActive',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    Aktif
                                </label>
                            </div>

                            <div className="mt-4">
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Admin Tim
                                </label>
                                <div className="space-y-2">
                                    {admins.map((admin: any) => (
                                        <div
                                            key={admin.id}
                                            className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.assignedAdminIds.includes(
                                                    admin.id,
                                                )}
                                                onChange={(e) =>
                                                    toggleAdmin(admin.id)
                                                }
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <span className="text-gray-700">
                                                {admin.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {errors.course_ids && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.course_ids}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModal(null)}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
                title="Hapus Mata Kuliah"
                description="Apakah Anda yakin ingin menghapus mata kuliah ini?"
                confirmText="Ya, Hapus"
                destructive
            />
        </div>
    );
}
