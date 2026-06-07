<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class CourseController extends Controller
{
    /**
     * Display a listing of courses.
     */
    public function index()
    {
        $courses = Course::withCount('candidates')
            ->orderBy('code')
            ->get();

        return Inertia::render('spk/superadmin/CourseManagement', [
            'courses' => $courses,
        ]);
    }

    /**
     * Store a newly created course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:10|unique:courses,code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $course = Course::create($validated);

        return redirect()->route('superadmin.courses.index')
            ->with('success', 'Course created successfully.');
    }

    /**
     * Update the specified course.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:10', Rule::unique('courses')->ignore($course->id)],
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $course->update($validated);

        return redirect()->route('superadmin.courses.index')
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified course.
     */
    public function destroy(Course $course)
    {
        // Check if course has candidates
        if ($course->candidates()->count() > 0) {
            return back()->with('error', 'Cannot delete course with existing candidates.');
        }

        $course->delete();

        return redirect()->route('superadmin.courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}
