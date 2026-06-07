<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'course_id',
        'criteria_id',
        'score',
    ];

    protected $casts = [
        'score' => 'decimal:2',
    ];

    /**
     * Get the candidate for this score.
     */
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    /**
     * Get the course for this score.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the criteria for this score.
     */
    public function criteria()
    {
        return $this->belongsTo(Criteria::class);
    }
}
