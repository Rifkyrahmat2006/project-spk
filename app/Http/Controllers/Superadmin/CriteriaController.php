<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Criteria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class CriteriaController extends Controller
{
    /**
     * Display a listing of criteria.
     */
    public function index()
    {
        $criteria = Criteria::orderBy('code')->get();
        $totalWeight = $criteria->where('is_active', true)->sum('weight');

        return Inertia::render('spk/superadmin/CriteriaManagement', [
            'criteria' => $criteria,
            'totalWeight' => round($totalWeight, 2),
        ]);
    }

    /**
     * Store a newly created criterion.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:10|unique:criteria,code',
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric|min:0|max:1',
            'type' => 'required|in:benefit,cost',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // Validate total weight does not exceed 1.0
        $currentWeight = Criteria::where('is_active', true)->sum('weight');
        if ($validated['is_active'] ?? true) {
            if ($currentWeight + $validated['weight'] > 1.0) {
                return back()->withErrors([
                    'weight' => 'Total weight of active criteria would exceed 1.0. Current total: ' . $currentWeight,
                ]);
            }
        }

        Criteria::create($validated);

        return redirect()->route('superadmin.criteria.index')
            ->with('success', 'Criterion created successfully.');
    }

    /**
     * Update the specified criterion.
     */
    public function update(Request $request, Criteria $criterion)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:10', Rule::unique('criteria')->ignore($criterion->id)],
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric|min:0|max:1',
            'type' => 'required|in:benefit,cost',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // Validate total weight
        $currentWeight = Criteria::where('is_active', true)
            ->where('id', '!=', $criterion->id)
            ->sum('weight');
        
        if ($validated['is_active'] ?? true) {
            if ($currentWeight + $validated['weight'] > 1.0) {
                return back()->withErrors([
                    'weight' => 'Total weight of active criteria would exceed 1.0. Current total without this criterion: ' . $currentWeight,
                ]);
            }
        }

        $criterion->update($validated);

        return redirect()->route('superadmin.criteria.index')
            ->with('success', 'Criterion updated successfully.');
    }

    /**
     * Remove the specified criterion.
     */
    public function destroy(Criteria $criterion)
    {
        // Check if criterion is used in scores
        if ($criterion->scores()->count() > 0) {
            return back()->with('error', 'Cannot delete criterion with existing scores.');
        }

        $criterion->delete();

        return redirect()->route('superadmin.criteria.index')
            ->with('success', 'Criterion deleted successfully.');
    }
}
