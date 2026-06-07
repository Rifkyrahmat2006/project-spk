import { usePage, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, X, Lock, Unlock } from 'lucide-react';
import React, { useState } from 'react';

interface FormData {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    is_locked: boolean;
}

const empty: FormData = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    is_active: false,
    is_locked: false,
};

export default function PeriodManagement() {
    const { props } = usePage();
    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>(empty);
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [selected, setSelected] = useState<any>(null);

    const periods = props.periods || [];

    const openCreate = () => {
        reset();
        setModal('create');
    };

    const openEdit = (period: any) => {
        setData({
            name: period.name,
            description: period.description || '',
            start_date: period.start_date.split('T')[0],
            end_date: period.end_date.split('T')[0],
            is_active: period.is_active,
            is_locked: period.is_locked,
        });
        setSelected(period);
        setModal('edit');
    };

    const handleSave = () => {
        if (modal === 'create') {
            post(route('superadmin.periods.store'), {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        } else if (modal === 'edit' && selected) {
            post(route('superadmin.periods.update', selected.id), {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus periode ini?')) {
            window.location.href = route('superadmin.periods.destroy', id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Periode Seleksi
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {periods.length} periode terdaftar
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Periode
                </button>
            </div>

            <div className="grid gap-4">
                {periods.map((period: any) => (
                    <div
                        key={period.id}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="mb-2 flex items-center gap-3">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {period.name}
                                    </h3>
                                    <div className="flex gap-2">
                                        {period.is_active && (
                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                Aktif
                                            </span>
                                        )}
                                        {period.is_locked && (
                                            <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                                <Lock size={12} /> Terkunci
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {period.description && (
                                    <p className="mb-3 text-sm text-gray-600">
                                        {period.description}
                                    </p>
                                )}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">
                                            Tanggal Mulai
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(
                                                period.start_date,
                                            ).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">
                                            Tanggal Selesai
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(
                                                period.end_date,
                                            ).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(period)}
                                    className="flex items-center gap-1 rounded bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800 hover:bg-yellow-200"
                                >
                                    <Pencil size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(period.id)}
                                    className="flex items-center gap-1 rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 hover:bg-red-200"
                                >
                                    <Trash2 size={14} /> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <h2 className="text-xl font-semibold">
                                {modal === 'create'
                                    ? 'Tambah Periode'
                                    : 'Edit Periode'}
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
                                    Nama Periode
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
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="h-20 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData('start_date', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.start_date}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.end_date}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
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
                                    Aktifkan Periode
                                </label>
                                <label className="flex items-center gap-2 text-sm font-medium">
                                    <input
                                        type="checkbox"
                                        checked={data.is_locked}
                                        onChange={(e) =>
                                            setData(
                                                'is_locked',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    Kunci Periode (Tidak dapat diubah)
                                </label>
                            </div>

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
