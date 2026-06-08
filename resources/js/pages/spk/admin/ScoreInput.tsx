import { usePage, useForm, router } from '@inertiajs/react';
import { Save, Search } from 'lucide-react';
import React, { useState } from 'react';

interface PageProps {
    [key: string]: any;
    course?: any;
    courses?: any[];
    criteria?: any[];
    candidates?: any[];
}

export default function ScoreInput() {
    const { props } = usePage<PageProps>();
    const course = props.course || {};
    const courses = props.courses || [];
    const criteria = props.criteria || [];
    const candidates = props.candidates || [];

    const { data, setData, post, processing, reset } = useForm({
        candidate_id: '',
        course_id: course.id || '',
        scores: [] as any[],
    });

    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

    const handleCandidateSelect = (candidate: any) => {
        setSelectedCandidate(candidate);
        const existingScores = candidate.scores || [];
        const newScores = criteria.map((c: any) => {
            const existing = existingScores.find(
                (s: any) => s.criteria_id === c.id,
            );
            return {
                criteria_id: c.id,
                score: existing ? existing.score : 0,
            };
        });
        setData({
            candidate_id: candidate.id,
            course_id: course.id,
            scores: newScores,
        });
    };

    const handleScoreChange = (criteriaId: string, value: number) => {
        const newScores = [...data.scores];
        const idx = newScores.findIndex((s) => s.criteria_id === criteriaId);
        if (idx !== -1) {
            newScores[idx].score = value;
            setData('scores', newScores);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Use router.post or fixed route helper if available. Assuming router.post for Inertia.
        router.post('/admin/scores', data, {
            onSuccess: () => {
                alert('Nilai berhasil disimpan!');
            },
        });
    };

    const handleCourseChange = (courseId: string) => {
        router.visit(`/admin/scores?course_id=${courseId}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    Input Nilai Kandidat
                </h1>
                <div className="w-64">
                    <select
                        value={course.id}
                        onChange={(e) => handleCourseChange(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {courses.map((c: any) => (
                            <option key={c.id} value={c.id}>
                                {c.code} - {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Candidate List */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white lg:col-span-1">
                    <div className="border-b bg-gray-50 p-4">
                        <h2 className="font-semibold text-gray-900">
                            Daftar Kandidat
                        </h2>
                    </div>
                    <div className="max-h-150 divide-y overflow-y-auto">
                        {candidates.map((c: any) => (
                            <button
                                key={c.id}
                                onClick={() => handleCandidateSelect(c)}
                                className={`w-full p-4 text-left transition-all hover:bg-gray-50 ${
                                    selectedCandidate?.id === c.id
                                        ? 'border-l-4 border-blue-600 bg-blue-50'
                                        : ''
                                }`}
                            >
                                <p className="font-medium text-gray-900">
                                    {c.name}
                                </p>
                                <p className="text-xs text-gray-500">{c.nim}</p>
                                <div className="mt-1">
                                    <span
                                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                            c.scores?.length === criteria.length
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {c.scores?.length === criteria.length
                                            ? 'Selesai'
                                            : 'Belum Lengkap'}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Score Form */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white lg:col-span-2">
                    <div className="border-b bg-gray-50 p-4">
                        <h2 className="font-semibold text-gray-900">
                            Form Penilaian:{' '}
                            {selectedCandidate?.user?.name || 'Pilih Kandidat'}
                        </h2>
                    </div>
                    {selectedCandidate ? (
                        <form onSubmit={handleSave} className="space-y-6 p-6">
                            <div className="grid gap-6">
                                {criteria.map((criterion: any) => {
                                    const scoreValue =
                                        data.scores.find(
                                            (s) =>
                                                s.criteria_id === criterion.id,
                                        )?.score || 0;
                                    return (
                                        <div
                                            key={criterion.id}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-end justify-between">
                                                <label className="text-sm font-medium text-gray-900">
                                                    {criterion.code} -{' '}
                                                    {criterion.name}
                                                    <span className="ml-2 text-xs text-gray-500">
                                                        (Bobot:{' '}
                                                        {(
                                                            criterion.weight *
                                                            100
                                                        ).toFixed(0)}
                                                        %)
                                                    </span>
                                                </label>
                                                <span className="text-lg font-bold text-blue-600">
                                                    {scoreValue}
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={scoreValue}
                                                onChange={(e) =>
                                                    handleScoreChange(
                                                        criterion.id,
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400">
                                                <span>0</span>
                                                <span>100</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end border-t pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Save size={18} />{' '}
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Nilai'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="p-20 text-center text-gray-500">
                            <Search
                                size={48}
                                className="mx-auto mb-4 text-gray-300"
                            />
                            <p>
                                Pilih kandidat dari daftar di sebelah kiri untuk
                                menginput nilai
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
