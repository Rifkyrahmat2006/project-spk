import { usePage, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface FormData {
    user_id: string;
    course_ids: string[];
}

const empty: FormData = {
    user_id: '',
    course_ids: [],
};

export default function CandidateManagement() {
    const { props } = usePage();
    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>(empty);
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [selected, setSelected] = useState<any>(null);

    const candidates = props.candidates || [];
    const courses = props.courses || [];
    const availableUsers = props.availableUsers || [];

    const openCreate = () => {
        reset();
        setModal('create');
    };

    const openEdit = (candidate: any) => {
        setData({
            user_id: candidate.user_id,
            course_ids: candidate.courses?.map((c: any) => c.id) || [],
        });
        setSelected(candidate);
        setModal('edit');
    };

    const handleSave = () => {
        if (modal === 'create') {
            post(route('admin.candidates.store'), {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        } else if (modal === 'edit' && selected) {
            post(route('admin.candidates.update', selected.id), {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        }
    };

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = () => {
        if (!deleteId) return;
        const id = deleteId;
        setDeleteId(null);
        window.location.href = route('admin.candidates.destroy', id);
    };

    const toggleCourse = (courseId: string) => {
        setData((prev) => ({
            ...prev,
            course_ids: prev.course_ids.includes(courseId)
                ? prev.course_ids.filter((id) => id !== courseId)
                : [...prev.course_ids, courseId],
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Manajemen Kandidat
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {candidates.length} kandidat terdaftar
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Kandidat
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Nama
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                NIM
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Mata Kuliah
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate: any) => (
                            <tr
                                key={candidate.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                    {candidate.user?.name}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-700">
                                    {candidate.user?.nim}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-700">
                                    {candidate.user?.email}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    <div className="flex flex-wrap gap-1">
                                        {candidate.courses?.map(
                                            (course: any) => (
                                                <span
                                                    key={course.id}
                                                    className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
                                                >
                                                    {course.code}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </td>
                                <td className="space-x-2 px-6 py-3 text-sm">
                                    <button
                                        onClick={() => openEdit(candidate)}
                                        className="inline-flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-200"
                                    >
                                        <Pencil size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(candidate.id)
                                        }
                                        className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-200"
                                    >
                                        <Trash2 size={14} /> Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <h2 className="text-xl font-semibold">
                                {modal === 'create'
                                    ? 'Tambah Kandidat'
                                    : 'Edit Kandidat'}
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
                            {modal === 'create' && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Pilih User
                                    </label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData('user_id', e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">
                                            -- Pilih User --
                                        </option>
                                        {availableUsers.map((user: any) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name} ({user.nim})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.user_id}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Mata Kuliah
                                </label>
                                <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border border-gray-200 p-3">
                                    {courses.map((course: any) => (
                                        <div
                                            key={course.id}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.course_ids.includes(
                                                    course.id,
                                                )}
                                                onChange={() =>
                                                    toggleCourse(course.id)
                                                }
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label className="text-sm text-gray-700">
                                                {course.code} - {course.name}
                                            </label>
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
                title="Hapus Kandidat"
                description="Apakah Anda yakin ingin menghapus kandidat ini?"
                confirmText="Ya, Hapus"
                destructive
            />
        </div>
    );
}
