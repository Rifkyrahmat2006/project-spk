import { usePage, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    nim: string;
    password: string;
    password_confirmation: string;
    role: 'superadmin' | 'admin' | 'user';
    is_active: boolean;
    course_ids: string[];
}

const empty: FormData = {
    name: '',
    email: '',
    nim: '',
    password: '',
    password_confirmation: '',
    role: 'user',
    is_active: true,
    course_ids: [],
};

export default function UserManagement() {
    const { props } = usePage();
    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>(empty);
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [selected, setSelected] = useState<any>(null);

    const users = props.users || [];
    const courses = props.courses || [];

    const openCreate = () => {
        reset();
        setModal('create');
    };

    const openEdit = (user: any) => {
        setData({
            name: user.name,
            email: user.email,
            nim: user.nim || '',
            password: '',
            password_confirmation: '',
            role: user.role,
            is_active: user.is_active,
            course_ids: user.assigned_courses?.map((c: any) => c.id) || [],
        });
        setSelected(user);
        setModal('edit');
    };

    const handleSave = () => {
        if (modal === 'create') {
            post(route('superadmin.users.store'), {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        } else if (modal === 'edit' && selected) {
            post(route('superadmin.users.update', selected.id), {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            window.location.href = route('superadmin.users.destroy', id);
        }
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
                        Manajemen Pengguna
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {users.length} pengguna terdaftar
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Pengguna
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
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                NIM
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                    {user.name}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-700">
                                    {user.email}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-700">
                                    {user.nim || '-'}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            user.role === 'superadmin'
                                                ? 'bg-purple-100 text-purple-800'
                                                : user.role === 'admin'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : 'bg-green-100 text-green-800'
                                        }`}
                                    >
                                        {user.role === 'superadmin'
                                            ? 'Superadmin'
                                            : user.role === 'admin'
                                              ? 'Admin'
                                              : 'User'}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            user.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {user.is_active
                                            ? 'Aktif'
                                            : 'Tidak Aktif'}
                                    </span>
                                </td>
                                <td className="space-x-2 px-6 py-3 text-sm">
                                    <button
                                        onClick={() => openEdit(user)}
                                        className="inline-flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-200"
                                    >
                                        <Pencil size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
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
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <h2 className="text-xl font-semibold">
                                {modal === 'create'
                                    ? 'Tambah Pengguna'
                                    : 'Edit Pengguna'}
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
                                <label className="mb-1 block text-sm font-medium">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    NIM
                                </label>
                                <input
                                    type="text"
                                    value={data.nim}
                                    onChange={(e) =>
                                        setData('nim', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.nim && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.nim}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Role
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) =>
                                        setData('role', e.target.value as any)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                >
                                    <option value="user">
                                        User (Calon Asisten)
                                    </option>
                                    <option value="admin">
                                        Admin (Koordinator)
                                    </option>
                                    <option value="superadmin">
                                        Superadmin
                                    </option>
                                </select>
                                {errors.role && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    {modal === 'create'
                                        ? 'Password'
                                        : 'Password (Kosongkan jika tidak ingin mengubah)'}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required={modal === 'create'}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required={modal === 'create'}
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center gap-2 text-sm font-medium">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    Aktif
                                </label>
                            </div>

                            {data.role === 'admin' && courses.length > 0 && (
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Mata Kuliah yang Ditugaskan
                                    </label>
                                    <div className="max-h-40 space-y-2 overflow-y-auto">
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
                                                    {course.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModal(null)}
                                    className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
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
        </div>
    );
}
