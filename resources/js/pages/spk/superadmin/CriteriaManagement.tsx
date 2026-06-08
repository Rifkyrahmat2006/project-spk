import { usePage, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

interface FormData {
    code: string;
    name: string;
    weight: number;
    type: 'benefit' | 'cost';
    description: string;
    is_active: boolean;
}

const empty: FormData = {
    code: '',
    name: '',
    weight: 0,
    type: 'benefit',
    description: '',
    is_active: true,
};

export default function CriteriaManagement() {
    const { props } = usePage();
    const { data, setData, post, put, processing, errors, reset } =
        useForm<FormData>(empty);
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [selected, setSelected] = useState<any>(null);

    const criteria = props.criteria || [];
    const totalWeight = props.totalWeight || 0;

    const openCreate = () => {
        reset();
        setModal('create');
    };

    const openEdit = (c: any) => {
        setData({
            code: c.code,
            name: c.name,
            weight: c.weight,
            type: c.type,
            description: c.description,
            is_active: c.is_active,
        });
        setSelected(c);
        setModal('edit');
    };

    const handleSave = () => {
        if (modal === 'create') {
            post('/superadmin/criteria', {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        } else if (modal === 'edit' && selected) {
            put(`/superadmin/criteria/${selected.id}`, {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus kriteria ini?')) {
            router.delete(`/superadmin/criteria/${id}`, {
                onSuccess: () => {
                    router.visit('/superadmin/criteria', {
                        preserveScroll: true,
                    });
                },
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Kriteria & Bobot
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Total Bobot: {totalWeight.toFixed(2)} / 1.00
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Kriteria
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Kode
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Nama
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Bobot
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Tipe
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
                        {criteria.map((c: any) => (
                            <tr
                                key={c.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-3 text-sm font-semibold text-gray-900">
                                    {c.code}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-700">
                                    {c.name}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-700">
                                    {(c.weight * 100).toFixed(0)}%
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            c.type === 'benefit'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {c.type === 'benefit'
                                            ? 'Benefit'
                                            : 'Cost'}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            c.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {c.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </span>
                                </td>
                                <td className="space-x-2 px-6 py-3 text-sm">
                                    <button
                                        onClick={() => openEdit(c)}
                                        className="inline-flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-200"
                                    >
                                        <Pencil size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(c.id)}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {modal === 'create'
                                    ? 'Tambah Kriteria'
                                    : 'Edit Kriteria'}
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
                                    Kode Kriteria
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
                                    Nama Kriteria
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
                                    Bobot (0-1)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={data.weight}
                                    onChange={(e) =>
                                        setData(
                                            'weight',
                                            parseFloat(e.target.value) || 0,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.weight && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.weight}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Tipe
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) =>
                                        setData(
                                            'type',
                                            e.target.value as
                                                | 'benefit'
                                                | 'cost',
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                >
                                    <option value="benefit">
                                        Benefit (Semakin tinggi semakin baik)
                                    </option>
                                    <option value="cost">
                                        Cost (Semakin rendah semakin baik)
                                    </option>
                                </select>
                                {errors.type && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.type}
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

                            <div className="flex items-center">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
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
        </div>
    );
}
