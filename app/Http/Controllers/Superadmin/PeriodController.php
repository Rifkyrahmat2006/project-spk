<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\SelectionPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class PeriodController extends Controller
{
    /**
     * Display a listing of selection periods.
     */
    public function index()
    {
        $periods = SelectionPeriod::orderBy('start_date', 'desc')->get();

        return Inertia::render('spk/superadmin/PeriodManagement', [
            'periods' => $periods,
        ]);
    }

    /**
     * Store a newly created selection period.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:selection_periods,name',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'boolean',
        ]);

        // Only one period can be active at a time
        if ($validated['is_active'] ?? false) {
            SelectionPeriod::where('is_active', true)->update(['is_active' => false]);
        }

        SelectionPeriod::create($validated);

        return redirect()->route('superadmin.periods.index')
            ->with('success', 'Selection period created successfully.');
    }

    /**
     * Update the specified selection period.
     */
    public function update(Request $request, SelectionPeriod $period)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('selection_periods')->ignore($period->id)],
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'boolean',
            'is_locked' => 'boolean',
        ]);

        if ($validated['is_active'] ?? false) {
            SelectionPeriod::where('is_active', true)
                ->where('id', '!=', $period->id)
                ->update(['is_active' => false]);
        }

        $period->update($validated);

        return redirect()->route('superadmin.periods.index')
            ->with('success', 'Selection period updated successfully.');
    }

    /**
     * Remove the specified selection period.
     */
    public function destroy(SelectionPeriod $period)
    {
        // Prevent deletion of active period
        if ($period->is_active) {
            return back()->with('error', 'Cannot delete an active selection period.');
        }

        $period->delete();

        return redirect()->route('superadmin.periods.index')
            ->with('success', 'Selection period deleted successfully.');
    }

    /**
     * Lock a selection period
     */
    public function lock(SelectionPeriod $period)
    {
        if (auth()->user()->role !== 'superadmin') abort(403);

        $period->update([
            'is_locked' => true,
            'locked_at' => now(),
            'is_active' => false,
        ]);

        return redirect()->route('superadmin.periods.index');
    }

    /**
     * Unlock a selection period
     */
    public function unlock(SelectionPeriod $period)
    {
        if (auth()->user()->role !== 'superadmin') abort(403);

        $period->update([
            'is_locked' => false,
            'locked_at' => null,
            'is_active' => true,
        ]);

        return redirect()->route('superadmin.periods.index');
    }

    /**
     * Publish a selection period
     */
    public function publish(SelectionPeriod $period)
    {
        if (auth()->user()->role !== 'superadmin') abort(403);

        $period->update([
            'is_published' => true,
            'published_at' => now(),
        ]);

        return redirect()->route('superadmin.periods.index');
    }

    /**
     * Unpublish a selection period
     */
    public function unpublish(SelectionPeriod $period)
    {
        if (auth()->user()->role !== 'superadmin') abort(403);

        $period->update([
            'is_published' => false,
            'published_at' => null,
        ]);

        return redirect()->route('superadmin.periods.index');
    }

    /**
     * Toggle show scores for a selection period
     */
    public function toggleScores(SelectionPeriod $period)
    {
        if (auth()->user()->role !== 'superadmin') abort(403);

        $period->update([
            'show_scores' => !$period->show_scores,
        ]);

        return redirect()->route('superadmin.periods.index');
    }
}
