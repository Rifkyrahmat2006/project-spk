<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserManagementController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index()
    {
        $users = User::with('assignedCourses')
            ->orderBy('role')
            ->orderBy('name')
            ->get();

        $courses = Course::where('is_active', true)->get();

        return Inertia::render('spk/superadmin/UserManagement', [
            'users' => $users,
            'courses' => $courses,
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'nim' => 'nullable|string|max:20|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:superadmin,admin,user',
            'is_active' => 'boolean',
            'course_ids' => 'array',
            'course_ids.*' => 'exists:courses,id',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['email_verified_at'] = now();

        $courseIds = $validated['course_ids'] ?? [];
        unset($validated['course_ids']);

        $user = User::create($validated);

        // Assign courses if admin role
        if ($user->role === 'admin' && !empty($courseIds)) {
            $user->assignedCourses()->attach($courseIds);
        }

        return redirect()->route('superadmin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'nim' => ['nullable', 'string', 'max:20', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|in:superadmin,admin,user',
            'is_active' => 'boolean',
            'course_ids' => 'array',
            'course_ids.*' => 'exists:courses,id',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $courseIds = $validated['course_ids'] ?? [];
        unset($validated['course_ids']);

        $user->update($validated);

        // Sync courses for admin
        if ($user->role === 'admin') {
            $user->assignedCourses()->sync($courseIds);
        } else {
            $user->assignedCourses()->detach();
        }

        return redirect()->route('superadmin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(User $user)
    {
        // Prevent deletion of own account
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('superadmin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
