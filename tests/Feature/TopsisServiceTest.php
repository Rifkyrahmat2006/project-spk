<?php

namespace Tests\Feature;

use App\Models\Criteria;
use App\Models\Course;
use App\Models\User;
use App\Models\Candidate;
use App\Models\CandidateScore;
use App\Models\SelectionPeriod;
use App\Services\TopsisService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('TopsisService calculates ranking with valid data', function () {
    // Setup: Create courses, criteria, and candidates
    $course = Course::create([
        'name' => 'Data Structures',
        'code' => 'DS101',
        'quota' => 3,
        'is_active' => true,
    ]);

    // Create criteria with weights summing to 1.0
    $criteria = [
        Criteria::create(['code' => 'C1', 'name' => 'Theory', 'type' => 'benefit', 'weight' => 0.3, 'is_active' => true]),
        Criteria::create(['code' => 'C2', 'name' => 'Practice', 'type' => 'benefit', 'weight' => 0.4, 'is_active' => true]),
        Criteria::create(['code' => 'C3', 'name' => 'Communication', 'type' => 'benefit', 'weight' => 0.3, 'is_active' => true]),
    ];

    // Create 3 candidates
    $candidates = [];
    for ($i = 1; $i <= 3; $i++) {
        $user = User::create([
            'name' => "Candidate $i",
            'email' => "cand$i@test.com",
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);
        
        $candidate = Candidate::create([
            'user_id' => $user->id,
            'nim' => "2024010$i",
            'name' => "Candidate $i",
        ]);
        
        $candidate->courses()->attach($course->id, ['status' => 'active']);
        
        // Add scores for each criterion
        $scores = [75 + ($i * 5), 80 + ($i * 3), 70 + ($i * 4)];
        foreach ($criteria as $idx => $criterion) {
            CandidateScore::create([
                'candidate_id' => $candidate->id,
                'course_id' => $course->id,
                'criteria_id' => $criterion->id,
                'score' => $scores[$idx],
            ]);
        }
        
        $candidates[] = $candidate;
    }

    // Run TOPSIS
    $service = new TopsisService();
    $result = $service->calculateForCourse($course);

    // Verify results
    expect($result['candidate_count'])->toBe(3);
    expect($result['rankings'])->toHaveCount(3);
    expect($result['rankings'][0]['ranking'])->toBe(1); // First ranked
    expect($result['rankings'][0]['preference_score'])->toBeGreaterThan(0);
    expect($result['rankings'][0]['preference_score'])->toBeLessThanOrEqual(1.0);
});

test('TopsisService validates criteria weights equal 1.0', function () {
    $course = Course::create([
        'name' => 'Test Course',
        'code' => 'TC101',
        'quota' => 3,
        'is_active' => true,
    ]);

    // Create criteria with weights NOT summing to 1.0 (should fail)
    Criteria::create(['code' => 'C1', 'name' => 'Test', 'type' => 'benefit', 'weight' => 0.5, 'is_active' => true]);
    Criteria::create(['code' => 'C2', 'name' => 'Test2', 'type' => 'benefit', 'weight' => 0.3, 'is_active' => true]);

    $service = new TopsisService();
    
    $this->expectException(\Exception::class);
    $this->expectExceptionMessage('Total criteria weight must be 1.0');
    $service->calculateForCourse($course);
});

test('TopsisService handles empty candidates gracefully', function () {
    $course = Course::create([
        'name' => 'Empty Course',
        'code' => 'EC101',
        'quota' => 3,
        'is_active' => true,
    ]);

    Criteria::create(['code' => 'C1', 'name' => 'Test', 'type' => 'benefit', 'weight' => 1.0, 'is_active' => true]);

    $service = new TopsisService();
    
    // Should throw exception about no candidates
    $this->expectException(\Exception::class);
    $this->expectExceptionMessage('No candidates');
    $service->calculateForCourse($course);
});

test('TopsisService handles all zero scores correctly', function () {
    $course = Course::create([
        'name' => 'Zero Score Course',
        'code' => 'ZS101',
        'quota' => 1,
        'is_active' => true,
    ]);

    $criteria = [
        Criteria::create(['code' => 'C1', 'name' => 'C1', 'type' => 'benefit', 'weight' => 0.5, 'is_active' => true]),
        Criteria::create(['code' => 'C2', 'name' => 'C2', 'type' => 'benefit', 'weight' => 0.5, 'is_active' => true]),
    ];

    // Create candidate with all zero scores
    $user = User::create([
        'name' => 'Zero Scorer',
        'email' => 'zero@test.com',
        'password' => bcrypt('password'),
        'role' => 'user',
    ]);
    
    $candidate = Candidate::create([
        'user_id' => $user->id,
        'nim' => '20240100',
        'name' => 'Zero Scorer',
    ]);
    
    $candidate->courses()->attach($course->id, ['status' => 'active']);
    
    foreach ($criteria as $criterion) {
        CandidateScore::create([
            'candidate_id' => $candidate->id,
            'course_id' => $course->id,
            'criteria_id' => $criterion->id,
            'score' => 0,
        ]);
    }

    $service = new TopsisService();
    $result = $service->calculateForCourse($course);

    expect($result['candidate_count'])->toBe(1);
    expect($result['rankings'][0]['preference_score'])->toBe(1.0); // Edge case: all zeros = perfect score
});
