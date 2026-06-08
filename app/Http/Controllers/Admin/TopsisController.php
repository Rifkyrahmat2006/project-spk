<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\SelectionPeriod;
use App\Models\TopsisResult;
use App\Services\TopsisService;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TopsisController extends Controller
{
    use AuthorizesRequests;

    protected TopsisService $topsisService;

    public function __construct(TopsisService $topsisService)
    {
        $this->topsisService = $topsisService;
    }

    /**
     * Display TOPSIS results for a course (admin view)
     */
    public function show(Course $course)
    {
        // Verify admin is assigned to this course
        $this->authorizeAdmin($course);

        $activePeriod = SelectionPeriod::where('is_active', true)
            ->orWhere('id', TopsisResult::where('course_id', $course->id)->value('period_id'))
            ->first();

        $results = TopsisResult::where('course_id', $course->id)
            ->when($activePeriod, fn($q) => $q->where('period_id', $activePeriod->id))
            ->with('candidate.user')
            ->orderBy('ranking')
            ->get()
            ->map(fn($r) => [
                'id' => $r->id,
                'candidate_id' => $r->candidate_id,
                'candidate_name' => $r->candidate->user->name ?? 'Unknown',
                'nim' => $r->candidate->nim,
                'd_plus' => (float) $r->d_plus,
                'd_minus' => (float) $r->d_minus,
                'preference_score' => (float) $r->preference_score,
                'ranking' => $r->ranking,
                'is_accepted' => $r->is_accepted,
                'calculated_at' => $r->calculated_at?->format('Y-m-d H:i:s'),
            ]);

        return Inertia::render('spk/admin/TopsisResults', [
            'course' => [
                'id' => $course->id,
                'name' => $course->name,
                'code' => $course->code,
                'quota' => $course->quota,
            ],
            'period' => $activePeriod ? [
                'id' => $activePeriod->id,
                'name' => $activePeriod->name,
                'is_locked' => $activePeriod->is_locked,
                'is_published' => $activePeriod->is_published,
            ] : null,
            'results' => $results,
            'result_count' => $results->count(),
            'accepted_count' => $results->where('is_accepted', true)->count(),
        ]);
    }

    /**
     * Trigger TOPSIS calculation for a single course
     */
    public function calculate(Course $course)
    {
        $this->authorizeAdmin($course);

        try {
            $activePeriod = SelectionPeriod::where('is_active', true)->firstOrFail();

            // Calculate TOPSIS
            $result = $this->topsisService->calculateForCourse($course);

            // Save results
            $this->topsisService->saveResults(
                $course,
                $activePeriod->id,
                $result,
                $course->quota ?? 3
            );

            return response()->json([
                'success' => true,
                'message' => "TOPSIS calculated for {$course->name}",
                'result_count' => count($result['rankings']),
                'accepted_count' => collect($result['rankings'])
                    ->where('ranking', '<=', $course->quota ?? 3)
                    ->count(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Trigger recalculation for all courses
     */
    public function calculateAll()
    {
        $user = auth()->user();
        if (!$user || !in_array($user->role, ['superadmin', 'admin'])) {
            abort(403, 'Unauthorized.');
        }

        try {
            $results = $this->topsisService->recalculateAll();

            $errors = collect($results)->filter(fn($r) => isset($r['error']));
            $success = collect($results)->filter(fn($r) => !isset($r['error']));

            return response()->json([
                'success' => $errors->isEmpty(),
                'message' => "Recalculated {$success->count()} courses",
                'successful_courses' => $success->count(),
                'failed_courses' => $errors->count(),
                'errors' => $errors->mapWithKeys(fn($v, $k) => [$k => $v['error']]),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Lock TOPSIS results for a period (create snapshot)
     */
    public function lock(SelectionPeriod $period)
    {
        $user = auth()->user();
        if (!$user || !in_array($user->role, ['superadmin', 'admin'])) {
            abort(403, 'Unauthorized.');
        }

        try {
            // Verify period is closed
            if (!$period->is_closed && now()->isBefore($period->ends_at)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Period must be closed before locking results',
                ], 422);
            }

            $courses = Course::where('is_active', true)->get();

            foreach ($courses as $course) {
                // Create snapshot if results exist
                $latestResult = TopsisResult::where('course_id', $course->id)
                    ->orderBy('period_id', 'desc')
                    ->first();

                if ($latestResult) {
                    $courseResults = TopsisResult::where('course_id', $course->id)
                        ->where('period_id', $period->id)
                        ->with('candidate.user')
                        ->orderBy('ranking')
                        ->get();

                    if ($courseResults->isNotEmpty()) {
                        $calculationResult = [
                            'candidate_count' => $courseResults->count(),
                            'rankings' => $courseResults->map(fn($r) => [
                                'candidate_id' => $r->candidate_id,
                                'ranking' => $r->ranking,
                                'preference_score' => (float) $r->preference_score,
                                'd_plus' => (float) $r->d_plus,
                                'd_minus' => (float) $r->d_minus,
                            ])->toArray(),
                        ];

                        $this->topsisService->createSnapshot($period->id, $course, $calculationResult);
                    }
                }
            }

            // Mark period as locked
            $period->update(['is_locked' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Period results locked and snapshots created',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Verify admin is assigned to this course
     */
    private function authorizeAdmin(Course $course): void
    {
        $user = auth()->user();
        if ($user->role !== 'superadmin') {
            $hasAssignment = $user->assignedCourses()
                ->where('course_id', $course->id)
                ->exists();

            if (!$hasAssignment) {
                abort(403, 'Not assigned to this course');
            }
        }
    }
}
