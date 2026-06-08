import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, BookOpen, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Course } from '../types';

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
    const {
        courses,
        users,
        candidateCourses,
        createCourse,
        updateCourse,
        deleteCourse,
    } = useApp();
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [selected, setSelected] = useState<Course | null>(null);
    const [form, setForm] = useState<FormData>(empty);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const admins = users.filter((u) => u.role === 'admin' && u.isActive);

    const openCreate = () => {
        setForm(empty);
        setModal('create');
    };
    const openEdit = (c: Course) => {
        setSelected(c);
        setForm({
            code: c.code,
            name: c.name,
            description: c.description,
            quota: c.quota,
            isActive: c.isActive,
            assignedAdminIds: c.assignedAdminIds,
        });
        setModal('edit');
    };

    const handleSave = () => {
        if (modal === 'create') createCourse(form);
        else if (modal === 'edit' && selected) updateCourse(selected.id, form);
        setModal(null);
    };

    const handleDelete = () => {
        if (deleteId) deleteCourse(deleteId);
        setDeleteId(null);
    };

    const toggleAdmin = (id: string) => {
        setForm((f) => ({
            ...f,
            assignedAdminIds: f.assignedAdminIds.includes(id)
                ? f.assignedAdminIds.filter((a) => a !== id)
                : [...f.assignedAdminIds, id],
        }));
    };

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
                    const enrolled = candidateCourses.filter(
                        (cc) =>
                            cc.courseId === course.id && cc.status === 'active',
                    ).length;
                    const assignedAdmins = admins.filter((a) =>
                        course.assignedAdminIds.includes(a.id),
                    );
                    return (
                        <div
                            key={course.id}
                            className="rounded-xl border border-gray-200 bg-white p-5"
                        >
                            <div className="mb-3 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                        <BookOpen size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {course.name}
                                        </p>
                                        <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600">
                                            {course.code}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEdit(course)}
                                        className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(course.id)}
                                        className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                            <p className="mb-3 text-sm text-gray-500">
                                {course.description}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1.5 text-gray-600">
                                    <Users size={14} /> {enrolled} kandidat ·
                                    Kuota {course.quota}
                                </span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    {course.isActive ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                            {assignedAdmins.length > 0 && (
                                <div className="mt-2 border-t border-gray-100 pt-2">
                                    <p className="text-xs text-gray-400">
                                        KoorAsPrak:{' '}
                                        <span className="text-gray-600">
                                            {assignedAdmins
                                                .map((a) => a.name)
                                                .join(', ')}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h3 className="text-gray-900">
                                {modal === 'create'
                                    ? 'Tambah Mata Kuliah'
                                    : 'Edit Mata Kuliah'}
                            </h3>
                            <button
                                onClick={() => setModal(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4 p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm text-gray-700">
                                        Kode Matkul
                                    </label>
                                    <input
                                        value={form.code}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                code: e.target.value,
                                            }))
                                        }
                                        placeholder="IF201"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-gray-700">
                                        Kuota Diterima
                                    </label>
                                    <input
                                        type="number"
                                        value={form.quota}
                                        min={1}
                                        max={20}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                quota:
                                                    parseInt(e.target.value) ||
                                                    3,
                                            }))
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Nama Mata Kuliah
                                </label>
                                <input
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="Struktur Data"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Deskripsi
                                </label>
                                <textarea
                                    rows={2}
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            description: e.target.value,
                                        }))
                                    }
                                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm text-gray-700">
                                    Tugaskan KoorAsPrak
                                </label>
                                <div className="space-y-2">
                                    {admins.map((admin) => (
                                        <label
                                            key={admin.id}
                                            className="flex cursor-pointer items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.assignedAdminIds.includes(
                                                    admin.id,
                                                )}
                                                onChange={() =>
                                                    toggleAdmin(admin.id)
                                                }
                                                className="rounded"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {admin.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={form.isActive}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            isActive: e.target.checked,
                                        }))
                                    }
                                />
                                <label
                                    htmlFor="isActive"
                                    className="text-sm text-gray-700"
                                >
                                    Mata kuliah aktif
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 border-t border-gray-100 px-6 py-4">
                            <button
                                onClick={() => setModal(null)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!form.code || !form.name}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <Trash2 size={22} className="text-red-600" />
                        </div>
                        <h3 className="mb-2 text-gray-900">
                            Hapus Mata Kuliah?
                        </h3>
                        <p className="mb-5 text-sm text-gray-500">
                            Aksi ini tidak dapat dibatalkan. Seluruh data
                            terkait akan terhapus.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
