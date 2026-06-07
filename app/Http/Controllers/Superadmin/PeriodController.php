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
}
