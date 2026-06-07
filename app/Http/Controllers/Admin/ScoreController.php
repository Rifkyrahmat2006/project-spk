<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CandidateScore;
use App\Models\Candidate;
use App\Models\Course;
use App\Models\Criteria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ScoreController extends Controller
{
    /**
     * Display score input page for a specific course.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $courseId = $request->query('course_id');
        
        $assignedCourses = $user->assignedCourses;
        
        if (!$courseId) {
            $courseId = $assignedCourses->first()?->id;
        }

        // Verify admin has access to this course
        if (!$assignedCourses->contains('id', $courseId)) {
            abort(403, 'Unauthorized access to this course.');
        }

        $course = Course::findOrFail($courseId);
        $criteria = Criteria::where('is_active', true)->orderBy('code')->get();
        
        $candidates = Candidate::query()
            ->whereHas('courses', fn($q) => $q->where('courses.id', $courseId))
            ->with(['user', 'scores' => fn($q) => $q->where('course_id', $courseId)])
            ->get();

        return Inertia::render('spk/admin/ScoreInput', [
            'course' => $course,
            'courses' => $assignedCourses,
            'criteria' => $criteria,
            'candidates' => $candidates,
        ]);
    }

    /**
     * Store or update scores for a candidate.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'course_id' => 'required|exists:courses,id',
            'scores' => 'required|array',
            'scores.*.criteria_id' => 'required|exists:criteria,id',
            'scores.*.score' => 'required|numeric|min:0|max:100',
        ]);

        // Verify admin has access to this course
        if (!$request->user()->assignedCourses()->where('courses.id', $validated['course_id'])->exists()) {
            abort(403, 'Unauthorized access to this course.');
        }

        DB::transaction(function () use ($validated) {
            foreach ($validated['scores'] as $scoreData) {
                CandidateScore::updateOrCreate(
                    [
                        'candidate_id' => $validated['candidate_id'],
                        'course_id' => $validated['course_id'],
                        'criteria_id' => $scoreData['criteria_id'],
                    ],
                    [
                        'score' => $scoreData['score'],
                    ]
                );
            }
        });

        return back()->with('success', 'Scores saved successfully.');
    }
}
