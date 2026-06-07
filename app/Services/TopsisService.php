<?php

namespace App\Services;

use App\Models\Candidate;
use App\Models\CandidateScore;
use App\Models\Criteria;
use App\Models\Course;
use App\Models\TopsisResult;
use App\Models\TopsisSnapshot;
use Illuminate\Support\Collection;

/**
 * TOPSIS Service — Technique for Order of Preference by Similarity to Ideal Solution
 *
 * Implements 9-step algorithm:
 * 1. Decision Matrix (D) — raw scores from candidates
 * 2. Normalized Matrix (N) — divide by column norm
 * 3. Weighted Normalized Matrix (V) — apply criteria weights
 * 4. Ideal Positive (A+) — max for benefit, min for cost
 * 5. Ideal Negative (A-) — min for benefit, max for cost
 * 6. Distance to Positive (D+) — Euclidean distance to A+
 * 7. Distance to Negative (D-) — Euclidean distance to A-
 * 8. Preference Score (Vi) — D- / (D+ + D-)
 * 9. Ranking — sort by Vi descending
 */
class TopsisService
{
    private array $decisionMatrix = [];
    private array $normalizedMatrix = [];
    private array $weightedMatrix = [];
    private array $idealPositive = [];
    private array $idealNegative = [];
    private array $distancePositive = [];
    private array $distanceNegative = [];
    private array $preferenceScores = [];
    private array $criteriaMeta = []; // stores type (benefit/cost) for each column
    private Collection $criteria;
    private Collection $candidates;

    /**
     * Calculate TOPSIS ranking for candidates in a specific course
     *
     * @param Course $course
     * @return array Result with intermediate steps and final rankings
     */
    public function calculateForCourse(Course $course): array
    {
        // Load all criteria (must be same for all courses)
        $this->criteria = Criteria::where('is_active', true)
            ->orderBy('code')
            ->get();

        if ($this->criteria->isEmpty()) {
            throw new \Exception('No active criteria found');
        }

        // Validate total weight = 1.0
        $totalWeight = $this->criteria->sum('weight');
        if (abs($totalWeight - 1.0) > 0.001) {
            throw new \Exception("Total criteria weight must be 1.0, got {$totalWeight}");
        }

        // Load candidates who applied to this course
        $this->candidates = Candidate::whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->id);
        })
        ->with(['scores' => function ($query) use ($course) {
            $query->where('course_id', $course->id);
        }])
        ->get();

        if ($this->candidates->isEmpty()) {
            throw new \Exception('No candidates found for this course');
        }

        // Step 1: Build decision matrix
        $this->buildDecisionMatrix();

        // Step 2: Normalize matrix
        $this->normalizeMatrix();

        // Step 3: Apply weights
        $this->applyWeights();

        // Steps 4-5: Determine ideal points
        $this->determineIdealPoints();

        // Steps 6-7: Calculate distances
        $this->calculateDistances();

        // Step 8: Calculate preference scores
        $this->calculatePreferenceScores();

        // Step 9: Rank candidates
        $rankings = $this->rankCandidates();

        return [
            'course_id' => $course->id,
            'course_name' => $course->name,
            'candidate_count' => $this->candidates->count(),
            'decision_matrix' => $this->decisionMatrix,
            'normalized_matrix' => $this->normalizedMatrix,
            'weighted_matrix' => $this->weightedMatrix,
            'ideal_positive' => $this->idealPositive,
            'ideal_negative' => $this->idealNegative,
            'distance_positive' => $this->distancePositive,
            'distance_negative' => $this->distanceNegative,
            'preference_scores' => $this->preferenceScores,
            'rankings' => $rankings,
            'criteria_meta' => $this->criteriaMeta,
        ];
    }

    /**
     * Step 1: Build decision matrix (raw scores)
     *
     * Rows: candidates
     * Columns: criteria
     * Values: raw scores (0-100 for all criteria)
     */
    private function buildDecisionMatrix(): void
    {
        $this->decisionMatrix = [];
        $this->criteriaMeta = [];

        // Initialize criteria metadata (for later: benefit/cost type)
        foreach ($this->criteria as $criterion) {
            $this->criteriaMeta[$criterion->code] = [
                'type' => $criterion->type, // 'benefit' or 'cost'
                'weight' => $criterion->weight,
            ];
        }

        // Build matrix: each row = candidate, each column = criterion
        foreach ($this->candidates as $candidate) {
            $row = [];
            foreach ($this->criteria as $criterion) {
                // Get score for this candidate-criterion pair
                $score = $candidate->scores
                    ->where('criteria_id', $criterion->id)
                    ->first();

                $row[$criterion->code] = $score ? (float) $score->score : 0.0;
            }
            $this->decisionMatrix[$candidate->id] = $row;
        }
    }

    /**
     * Step 2: Normalize the decision matrix
     *
     * Each column is divided by the Euclidean norm (square root of sum of squares)
     * Formula: n_ij = d_ij / sqrt(sum(d_kj^2) for all k)
     */
    private function normalizeMatrix(): void
    {
        $this->normalizedMatrix = [];

        // Calculate column norms
        $columnNorms = [];
        foreach ($this->criteria as $criterion) {
            $sumSquares = 0.0;
            foreach ($this->candidates as $candidate) {
                $value = $this->decisionMatrix[$candidate->id][$criterion->code] ?? 0.0;
                $sumSquares += $value * $value;
            }
            $columnNorms[$criterion->code] = sqrt($sumSquares);
        }

        // Normalize each element
        foreach ($this->candidates as $candidate) {
            $row = [];
            foreach ($this->criteria as $criterion) {
                $raw = $this->decisionMatrix[$candidate->id][$criterion->code] ?? 0.0;
                $norm = $columnNorms[$criterion->code];
                $row[$criterion->code] = $norm > 0 ? ($raw / $norm) : 0.0;
            }
            $this->normalizedMatrix[$candidate->id] = $row;
        }
    }

    /**
     * Step 3: Apply weights to normalized matrix
     *
     * Each normalized element is multiplied by the criterion's weight
     * Formula: v_ij = w_j * n_ij
     */
    private function applyWeights(): void
    {
        $this->weightedMatrix = [];

        foreach ($this->candidates as $candidate) {
            $row = [];
            foreach ($this->criteria as $criterion) {
                $normalized = $this->normalizedMatrix[$candidate->id][$criterion->code];
                $weight = $criterion->weight;
                $row[$criterion->code] = $normalized * $weight;
            }
            $this->weightedMatrix[$candidate->id] = $row;
        }
    }

    /**
     * Steps 4-5: Determine ideal positive (A+) and ideal negative (A-) solutions
     *
     * For BENEFIT criteria: A+ = max, A- = min
     * For COST criteria: A+ = min, A- = max
     */
    private function determineIdealPoints(): void
    {
        $this->idealPositive = [];
        $this->idealNegative = [];

        foreach ($this->criteria as $criterion) {
            $type = $criterion->type; // 'benefit' or 'cost'
            $values = [];

            foreach ($this->candidates as $candidate) {
                $values[] = $this->weightedMatrix[$candidate->id][$criterion->code];
            }

            if ($type === 'benefit') {
                $this->idealPositive[$criterion->code] = max($values);
                $this->idealNegative[$criterion->code] = min($values);
            } else { // cost
                $this->idealPositive[$criterion->code] = min($values);
                $this->idealNegative[$criterion->code] = max($values);
            }
        }
    }

    /**
     * Steps 6-7: Calculate Euclidean distances to ideal points
     *
     * D+ = sqrt(sum((v_ij - A+_j)^2) for all j)
     * D- = sqrt(sum((v_ij - A-_j)^2) for all j)
     */
    private function calculateDistances(): void
    {
        $this->distancePositive = [];
        $this->distanceNegative = [];

        foreach ($this->candidates as $candidate) {
            $sumSquaresPositive = 0.0;
            $sumSquaresNegative = 0.0;

            foreach ($this->criteria as $criterion) {
                $weighted = $this->weightedMatrix[$candidate->id][$criterion->code];
                $aPlus = $this->idealPositive[$criterion->code];
                $aMinus = $this->idealNegative[$criterion->code];

                $sumSquaresPositive += pow($weighted - $aPlus, 2);
                $sumSquaresNegative += pow($weighted - $aMinus, 2);
            }

            $this->distancePositive[$candidate->id] = sqrt($sumSquaresPositive);
            $this->distanceNegative[$candidate->id] = sqrt($sumSquaresNegative);
        }
    }

    /**
     * Step 8: Calculate preference scores (closeness coefficient)
     *
     * Vi = D- / (D+ + D-)
     * Range: [0, 1] where 1 = best (closest to ideal)
     */
    private function calculatePreferenceScores(): void
    {
        $this->preferenceScores = [];

        foreach ($this->candidates as $candidate) {
            $dPlus = $this->distancePositive[$candidate->id];
            $dMinus = $this->distanceNegative[$candidate->id];
            $sum = $dPlus + $dMinus;

            // Handle edge case: both distances are 0 (perfect score on all criteria)
            $this->preferenceScores[$candidate->id] = $sum > 0 ? ($dMinus / $sum) : 1.0;
        }
    }

    /**
     * Step 9: Rank candidates by preference score (descending)
     *
     * @return array Sorted rankings with candidate details
     */
    private function rankCandidates(): array
    {
        $rankings = [];

        foreach ($this->candidates as $candidate) {
            $rankings[] = [
                'candidate_id' => $candidate->id,
                'candidate_name' => $candidate->user->name ?? 'Unknown',
                'nim' => $candidate->nim,
                'd_plus' => $this->distancePositive[$candidate->id],
                'd_minus' => $this->distanceNegative[$candidate->id],
                'preference_score' => $this->preferenceScores[$candidate->id],
                'weighted_row' => $this->weightedMatrix[$candidate->id],
            ];
        }

        // Sort by preference score descending
        usort($rankings, function ($a, $b) {
            return $b['preference_score'] <=> $a['preference_score'];
        });

        // Add ranking position
        foreach ($rankings as $index => &$rank) {
            $rank['ranking'] = $index + 1;
        }

        return $rankings;
    }

    /**
     * Save TOPSIS results to database
     *
     * @param Course $course
     * @param int $periodId
     * @param array $calculationResult
     * @param int|null $quota Top N candidates to mark as accepted
     * @return void
     */
    public function saveResults(Course $course, int $periodId, array $calculationResult, ?int $quota = 3): void
    {
        // Delete existing results for this course and period
        TopsisResult::where('course_id', $course->id)
            ->where('period_id', $periodId)
            ->delete();

        $now = now();

        foreach ($calculationResult['rankings'] as $rankData) {
            TopsisResult::create([
                'candidate_id' => $rankData['candidate_id'],
                'course_id' => $course->id,
                'period_id' => $periodId,
                'd_plus' => $rankData['d_plus'],
                'd_minus' => $rankData['d_minus'],
                'preference_score' => $rankData['preference_score'],
                'ranking' => $rankData['ranking'],
                'is_accepted' => $rankData['ranking'] <= $quota,
                'calculated_at' => $now,
            ]);
        }
    }

    /**
     * Create snapshot of TOPSIS results when period is locked
     *
     * @param int $periodId
     * @param Course $course
     * @param array $calculationResult
     * @return TopsisSnapshot
     */
    public function createSnapshot(int $periodId, Course $course, array $calculationResult): TopsisSnapshot
    {
        $matrixData = [
            'decision_matrix' => $calculationResult['decision_matrix'],
            'normalized_matrix' => $calculationResult['normalized_matrix'],
            'weighted_matrix' => $calculationResult['weighted_matrix'],
            'ideal_positive' => $calculationResult['ideal_positive'],
            'ideal_negative' => $calculationResult['ideal_negative'],
            'rankings' => $calculationResult['rankings'],
            'criteria_meta' => $calculationResult['criteria_meta'],
            'criteria_snapshot' => $this->criteria->toArray(),
            'candidate_count' => $calculationResult['candidate_count'],
        ];

        return TopsisSnapshot::create([
            'course_id' => $course->id,
            'period_id' => $periodId,
            'matrix_data' => json_encode($matrixData),
            'snapshotted_at' => now(),
        ]);
    }

    /**
     * Recalculate TOPSIS for all courses (used when criteria/weights change)
     *
     * @return array Results for all courses
     */
    public function recalculateAll(): array
    {
        $courses = Course::where('is_active', true)->get();
        // Assuming the recalculation applies to the currently active period
        $activePeriod = \App\Models\SelectionPeriod::where('is_active', true)->first();
        
        if (!$activePeriod) {
            return ['error' => 'No active selection period found'];
        }

        $results = [];

        foreach ($courses as $course) {
            try {
                $result = $this->calculateForCourse($course);
                $this->saveResults($course, $activePeriod->id, $result, $course->quota ?? 3);
                $results[$course->id] = $result;
            } catch (\Exception $e) {
                $results[$course->id] = ['error' => $e->getMessage()];
            }
        }

        return $results;
    }

    /**
     * Get current TOPSIS results for a course from database
     *
     * @param Course $course
     * @return Collection
     */
    public function getResultsForCourse(Course $course): Collection
    {
        return TopsisResult::where('course_id', $course->id)
            ->with('candidate.user')
            ->orderBy('ranking')
            ->get();
    }
}

