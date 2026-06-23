import { usePage, useForm, router } from '@inertiajs/react';
import {
    Plus,
    Pencil,
    Trash2,
    X,
    Lock,
    Unlock,
    Globe,
    CalendarDays,
    AlertTriangle,
    Eye,
    EyeOff,
} from 'lucide-react';
import React, { useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';

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
    const { data, setData, post, put, processing, errors, reset } =
        useForm<FormData>(empty);
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [selected, setSelected] = useState<any>(null);
    const [confirmAction, setConfirmAction] = useState<{
        periodId: string;
        action: string;
    } | null>(null);

    const periods = props.periods || [];

    const handleCreate = () => {
        post('/superadmin/periods', {
            onSuccess: () => {
                setModal(null);
                reset();
            },
        });
    };

    const handleAction = () => {
        if (!confirmAction) return;
        const { periodId, action } = confirmAction;

        post(`/superadmin/periods/${periodId}/${action}`, {
            onSuccess: () => setConfirmAction(null),
        });
    };

    const statusBadge = (p: any) => {
        if (p.is_locked)
            return (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    Terkunci
                </span>
            );
        if (p.is_active)
            return (
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                    Aktif
                </span>
            );
        return (
            <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                Selesai
            </span>
        );
    };

    const actionLabels: Record<string, string> = {
        lock: 'Kunci Periode',
        unlock: 'Buka Kunci Periode',
        publish: 'Publikasikan Hasil',
        unpublish: 'Batalkan Publikasi',
    };

    const actionDescs: Record<string, string> = {
        lock: 'Setelah dikunci, tidak ada data yang dapat diubah. Kalkulasi TOPSIS akan diblokir.',
        unlock: 'Periode akan dibuka kembali, kalkulasi ulang TOPSIS akan diizinkan.',
        publish:
            'Hasil seleksi akan dapat dilihat oleh CalonAsPrak yang terdaftar.',
        unpublish: 'Hasil seleksi akan disembunyikan dari CalonAsPrak.',
    };

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
            post('/superadmin/periods', {
                onSuccess: () => {
                    setModal(null);
                    reset();
                },
            });
        } else if (modal === 'edit' && selected) {
            put(`/superadmin/periods/${selected.id}`, {
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
        router.delete(`/superadmin/periods/${id}`, {
            onSuccess: () => {
                router.visit('/superadmin/periods', {
                    preserveScroll: true,
                });
            },
        });
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

            <div className="space-y-4">
                {periods.length === 0 && (
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                        <CalendarDays
                            size={40}
                            className="mx-auto mb-3 text-gray-300"
                        />
                        <p className="text-gray-500">
                            Belum ada periode seleksi.
                        </p>
                    </div>
                )}
                {periods.map((period: any) => (
                    <div
                        key={period.id}
                        className="rounded-xl border border-gray-200 bg-white p-5"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="mb-2 flex flex-wrap items-center gap-3">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {period.name}
                                    </h3>
                                    {statusBadge(period)}
                                    {period.is_published && (
                                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                                            Dipublikasikan
                                        </span>
                                    )}
                                    {period.show_scores && (
                                        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                                            Skor Terlihat
                                        </span>
                                    )}
                                </div>
                                {period.description && (
                                    <p className="mb-3 text-sm text-gray-600">
                                        {period.description}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays size={14} /> Mulai:{' '}
                                        {new Date(
                                            period.start_date,
                                        ).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays size={14} /> Selesai:{' '}
                                        {new Date(
                                            period.end_date,
                                        ).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="mt-4 flex gap-2">
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

                            <div className="flex shrink-0 flex-col gap-2">
                                {!period.is_locked ? (
                                    <button
                                        onClick={() =>
                                            setConfirmAction({
                                                periodId: period.id,
                                                action: 'lock',
                                            })
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-all hover:bg-gray-200"
                                    >
                                        <Lock size={14} /> Kunci
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setConfirmAction({
                                                periodId: period.id,
                                                action: 'unlock',
                                            })
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm text-amber-700 transition-all hover:bg-amber-100"
                                    >
                                        <Unlock size={14} /> Buka Kunci
                                    </button>
                                )}

                                {!period.is_published ? (
                                    <button
                                        onClick={() =>
                                            setConfirmAction({
                                                periodId: period.id,
                                                action: 'publish',
                                            })
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-700 transition-all hover:bg-blue-100"
                                    >
                                        <Globe size={14} /> Publikasikan
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setConfirmAction({
                                                periodId: period.id,
                                                action: 'unpublish',
                                            })
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-700 transition-all hover:bg-red-100"
                                    >
                                        <X size={14} /> Unpublish
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        router.post(
                                            `/superadmin/periods/${period.id}/toggle-scores`,
                                            {},
                                            { preserveScroll: true },
                                        )
                                    }
                                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-all ${period.show_scores ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {period.show_scores ? (
                                        <>
                                            <EyeOff size={14} /> Sembunyikan
                                            Skor
                                        </>
                                    ) : (
                                        <>
                                            <Eye size={14} /> Tampilkan Skor
                                        </>
                                    )}
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
                            <h2 className="text-xl font-semibold text-gray-900">
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
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Nama Periode
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
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData('start_date', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.start_date}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.end_date}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
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
                                    Aktifkan Periode
                                </label>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
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
            {/* Confirm Action Modal */}
            {confirmAction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                            <AlertTriangle
                                size={22}
                                className="text-yellow-600"
                            />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            {actionLabels[confirmAction.action]}
                        </h3>
                        <p className="mb-5 text-sm text-gray-500">
                            {actionDescs[confirmAction.action]}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmAction(null)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAction}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
                title="Hapus Periode"
                description="Apakah Anda yakin ingin menghapus periode ini?"
                confirmText="Ya, Hapus"
                destructive
            />
        </div>
    );
}
