<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CandidateManagementController extends Controller
{
    /**
     * Display candidates for admin's assigned courses.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $assignedCourseIds = $user->assignedCourses()->pluck('courses.id');

        $candidates = Candidate::query()
            ->with(['user', 'courses'])
            ->whereHas('courses', fn($q) => $q->whereIn('courses.id', $assignedCourseIds))
            ->get();

        $courses = $user->assignedCourses;

        return Inertia::render('spk/admin/CandidateManagement', [
            'candidates' => $candidates,
            'courses' => $courses,
        ]);
    }

    /**
     * Store a newly created candidate.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:candidates,user_id',
            'course_ids' => 'required|array|min:1',
            'course_ids.*' => 'exists:courses,id',
        ]);

        // Verify admin has access to all selected courses
        $assignedCourseIds = $request->user()->assignedCourses()->pluck('courses.id')->toArray();
        $unauthorizedCourses = array_diff($validated['course_ids'], $assignedCourseIds);
        
        if (!empty($unauthorizedCourses)) {
            return back()->withErrors(['course_ids' => 'You do not have permission to assign some of the selected courses.']);
        }

        DB::transaction(function () use ($validated) {
            $candidate = Candidate::create([
                'user_id' => $validated['user_id'],
            ]);

            $candidate->courses()->attach($validated['course_ids']);
        });

        return redirect()->route('admin.candidates.index')
            ->with('success', 'Candidate created successfully.');
    }

    /**
     * Update the specified candidate.
     */
    public function update(Request $request, Candidate $candidate)
    {
        $validated = $request->validate([
            'course_ids' => 'required|array|min:1',
            'course_ids.*' => 'exists:courses,id',
        ]);

        // Verify admin has access to all selected courses
        $assignedCourseIds = $request->user()->assignedCourses()->pluck('courses.id')->toArray();
        $unauthorizedCourses = array_diff($validated['course_ids'], $assignedCourseIds);
        
        if (!empty($unauthorizedCourses)) {
            return back()->withErrors(['course_ids' => 'You do not have permission to assign some of the selected courses.']);
        }

        $candidate->courses()->sync($validated['course_ids']);

        return redirect()->route('admin.candidates.index')
            ->with('success', 'Candidate updated successfully.');
    }

    /**
     * Remove the specified candidate.
     */
    public function destroy(Candidate $candidate)
    {
        // Verify admin has access to at least one of candidate's courses
        $candidateCourseIds = $candidate->courses()->pluck('courses.id')->toArray();
        $assignedCourseIds = auth()->user()->assignedCourses()->pluck('courses.id')->toArray();
        
        if (empty(array_intersect($candidateCourseIds, $assignedCourseIds))) {
            return back()->with('error', 'You do not have permission to delete this candidate.');
        }

        $candidate->delete();

        return redirect()->route('admin.candidates.index')
            ->with('success', 'Candidate deleted successfully.');
    }
}
