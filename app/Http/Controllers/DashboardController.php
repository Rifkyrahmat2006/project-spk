<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Criteria;
use App\Models\Candidate;
use App\Models\SelectionPeriod;

class DashboardController extends Controller
{
    /**
     * Display the appropriate dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return match ($user->role) {
            'superadmin' => $this->superadminDashboard($user),
            'admin' => $this->adminDashboard($user),
            'user' => $this->candidateDashboard($user),
            default => Inertia::render('dashboard'),
        };
    }

    /**
     * Superadmin dashboard with all overview data.
     */
    private function superadminDashboard($user)
    {
        $courses = Course::withCount('candidates')->get();
        $criteria = Criteria::active()->get();
        $activePeriod = SelectionPeriod::where('is_active', true)->first();
        $totalCandidates = Candidate::count();

        return Inertia::render('spk/SuperadminDashboard', [
            'courses' => $courses,
            'criteria' => $criteria,
            'activePeriod' => $activePeriod,
            'totalCandidates' => $totalCandidates,
            'stats' => [
                'totalCourses' => $courses->count(),
                'totalCandidates' => $totalCandidates,
                'activePeriod' => $activePeriod?->name,
            ],
        ]);
    }

    /**
     * Admin dashboard with assigned course data.
     */
    private function adminDashboard($user)
    {
        $assignedCourseIds = $user->assignedCourses()->pluck('courses.id');
        $courses = Course::whereIn('id', $assignedCourseIds)->withCount('candidates')->get();
        $criteria = Criteria::active()->get();
        $activePeriod = SelectionPeriod::where('is_active', true)->first();

        return Inertia::render('spk/AdminDashboard', [
            'courses' => $courses,
            'criteria' => $criteria,
            'activePeriod' => $activePeriod,
        ]);
    }

    /**
     * Candidate dashboard with personal application status.
     */
    private function candidateDashboard($user)
    {
        $candidate = $user->candidate;
        $activePeriod = SelectionPeriod::where('is_active', true)->first();
        $applications = $user->applications()->with('course')->get();

        return Inertia::render('spk/CandidateDashboard', [
            'candidate' => $candidate,
            'activePeriod' => $activePeriod,
            'applications' => $applications,
        ]);
    }
}
