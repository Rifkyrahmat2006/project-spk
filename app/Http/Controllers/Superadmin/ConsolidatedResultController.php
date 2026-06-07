<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\TopsisResult;
use App\Models\SelectionPeriod;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsolidatedResultController extends Controller
{
    /**
     * Display consolidated TOPSIS results across all courses.
     */
    public function index(Request $request)
    {
        $periods = SelectionPeriod::orderBy('start_date', 'desc')->get();
        $courses = Course::where('is_active', true)->get();
        
        $selectedPeriodId = $request->query('period_id');
        $selectedCourseId = $request->query('course_id');

        $results = TopsisResult::query()
            ->with(['candidate.user', 'course'])
            ->when($selectedPeriodId, fn($q) => $q->whereHas('period', fn($pq) => $pq->where('id', $selectedPeriodId)))
            ->when($selectedCourseId, fn($q) => $q->where('course_id', $selectedCourseId))
            ->orderBy('score', 'desc')
            ->get();

        return Inertia::render('spk/superadmin/ConsolidatedResults', [
            'results' => $results,
            'periods' => $periods,
            'courses' => $courses,
            'selectedPeriodId' => $selectedPeriodId,
            'selectedCourseId' => $selectedCourseId,
        ]);
    }

    /**
     * Export results as CSV.
     */
    public function export(Request $request)
    {
        $results = TopsisResult::query()
            ->with(['candidate.user', 'course'])
            ->when($request->query('period_id'), fn($q) => $q->whereHas('period', fn($pq) => $pq->where('id', $request->query('period_id'))))
            ->when($request->query('course_id'), fn($q) => $q->where('course_id', $request->query('course_id')))
            ->orderBy('score', 'desc')
            ->get();

        $filename = 'topsis-results-' . now()->format('Y-m-d-His') . '.csv';
        $headers = [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => "attachment; filename=$filename",
        ];

        $callback = function () use ($results) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Rank', 'Candidate Name', 'NIM', 'Course', 'Score', 'Status']);

            foreach ($results as $index => $result) {
                fputcsv($file, [
                    $index + 1,
                    $result->candidate->user->name,
                    $result->candidate->user->nim,
                    $result->course->name,
                    round($result->score, 4),
                    $result->is_qualified ? 'Qualified' : 'Not Qualified',
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
