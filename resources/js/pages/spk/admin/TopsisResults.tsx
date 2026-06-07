import { usePage } from '@inertiajs/react';
import { Trophy, Medal, Award, Users, Eye } from 'lucide-react';

export default function TopsisResults() {
    const { props } = usePage();
    const results = props.results || {};
    const courses = props.courses || [];

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="text-yellow-500" size={20} />;
            case 2:
                return <Medal className="text-gray-400" size={20} />;
            case 3:
                return <Award className="text-orange-500" size={20} />;
            default:
                return (
                    <span className="w-5 text-center text-sm font-bold text-gray-400">
                        {rank}
                    </span>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Hasil TOPSIS
                </h1>
                <p className="mt-1 text-gray-500">
                    Perankingan kandidat berdasarkan metode TOPSIS
                </p>
            </div>

            {courses.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-500">
                    <p>Tidak ada mata kuliah yang ditugaskan</p>
                </div>
            ) : (
                courses.map((course: any) => {
                    const courseResults = results[course.id] || [];
                    const top3 = courseResults.slice(0, 3);

                    return (
                        <div
                            key={course.id}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                        >
                            <div className="flex items-center justify-between border-b bg-gray-50 p-4">
                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        {course.code} - {course.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {courseResults.length} kandidat
                                    </p>
                                </div>
                                <a
                                    href={`/admin/scores?course_id=${course.id}`}
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                >
                                    <Eye size={16} /> Detail
                                </a>
                            </div>

                            {/* Podium Top 3 */}
                            {top3.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 bg-gradient-to-b from-gray-50 to-white p-6">
                                    {top3.map((result: any, idx: number) => (
                                        <div
                                            key={result.id}
                                            className={`rounded-xl p-4 text-center ${
                                                idx === 0
                                                    ? 'border border-yellow-200 bg-yellow-50'
                                                    : idx === 1
                                                      ? 'border border-gray-200 bg-gray-50'
                                                      : 'border border-orange-200 bg-orange-50'
                                            }`}
                                        >
                                            <div className="mb-2 flex justify-center">
                                                {getRankIcon(idx + 1)}
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                {result.candidate?.user?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {result.candidate?.user?.nim}
                                            </p>
                                            <p className="mt-1 text-lg font-bold text-blue-600">
                                                {result.score.toFixed(4)}
                                            </p>
                                            <span
                                                className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                                                    result.is_qualified
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {result.is_qualified
                                                    ? 'Lolos'
                                                    : 'Tidak Lolos'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Full Table */}
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Rank
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Kandidat
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            NIM
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Skor
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {courseResults.map(
                                        (result: any, idx: number) => (
                                            <tr
                                                key={result.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex w-6 items-center justify-center">
                                                        {getRankIcon(idx + 1)}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                    {
                                                        result.candidate?.user
                                                            ?.name
                                                    }
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-500">
                                                    {
                                                        result.candidate?.user
                                                            ?.nim
                                                    }
                                                </td>
                                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                                    {result.score.toFixed(4)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-xs ${
                                                            result.is_qualified
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {result.is_qualified
                                                            ? 'Lolos'
                                                            : 'Tidak'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    );
                })
            )}
        </div>
    );
}
