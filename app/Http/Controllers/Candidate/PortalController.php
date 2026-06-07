<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortalController extends Controller
{
    /**
     * Display candidate portal with available courses and applications.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $candidate = $user->candidate;

        if (!$candidate) {
            return redirect()->route('dashboard')
                ->with('error', 'Candidate profile not found.');
        }

        $courses = $candidate->courses()
            ->with(['candidates' => fn($q) => $q->select('candidates.id')])
            ->get();

        $applications = $user->applications()
            ->with(['course'])
            ->orderBy('created_at', 'desc')
            ->get();

        $topsisResults = $candidate->topsisResults()
            ->with(['course'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('spk/candidate/Portal', [
            'candidate' => $candidate,
            'courses' => $courses,
            'applications' => $applications,
            'topsisResults' => $topsisResults,
        ]);
    }

    /**
     * Apply for a course.
     */
    public function apply(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $user = $request->user();
        $candidate = $user->candidate;

        if (!$candidate) {
            return back()->with('error', 'Candidate profile not found.');
        }

        // Check if already applied
        if ($user->applications()->where('course_id', $validated['course_id'])->exists()) {
            return back()->with('error', 'You have already applied for this course.');
        }

        // Check if candidate is enrolled in this course
        if (!$candidate->courses()->where('courses.id', $validated['course_id'])->exists()) {
            return back()->with('error', 'You are not enrolled in this course.');
        }

        $user->applications()->create([
            'course_id' => $validated['course_id'],
            'status' => 'pending',
            'applied_at' => now(),
        ]);

        return back()->with('success', 'Application submitted successfully.');
    }

    /**
     * Withdraw an application.
     */
    public function withdraw(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
        ]);

        $application = $request->user()->applications()->findOrFail($validated['application_id']);
        
        if ($application->status !== 'pending') {
            return back()->with('error', 'Cannot withdraw a ' . $application->status . ' application.');
        }

        $application->delete();

        return back()->with('success', 'Application withdrawn successfully.');
    }
}
