<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TopsisResult;
use App\Models\TopsisSnapshot;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopsisResultController extends Controller
{
    /**
     * Display TOPSIS results for admin's assigned courses.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $assignedCourseIds = $user->assignedCourses()->pluck('courses.id');

        $results = TopsisResult::query()
            ->with(['candidate.user', 'course'])
            ->whereIn('course_id', $assignedCourseIds)
            ->orderBy('course_id')
            ->orderBy('preference_score', 'desc')
            ->get()
            ->groupBy('course_id');

        $courses = $user->assignedCourses;
        
        // Get snapshots for each course
        $snapshots = TopsisSnapshot::whereIn('course_id', $assignedCourseIds)
            ->orderBy('snapshotted_at', 'desc')
            ->get()
            ->groupBy('course_id')
            ->map(fn($group) => $group->first());

        return Inertia::render('spk/admin/TopsisResults', [
            'results' => $results,
            'courses' => $courses,
            'snapshots' => $snapshots,
        ]);
    }

    /**
     * Show detailed results for a specific course.
     */
    public function show(Course $course, Request $request)
    {
        // Verify admin has access to this course
        if (!$request->user()->assignedCourses()->where('courses.id', $course->id)->exists()) {
            abort(403, 'Unauthorized access to this course.');
        }

        $results = TopsisResult::where('course_id', $course->id)
            ->with(['candidate.user', 'course'])
            ->orderBy('preference_score', 'desc')
            ->get();

        return Inertia::render('spk/admin/TopsisResultDetail', [
            'course' => $course,
            'results' => $results,
        ]);
    }
}
