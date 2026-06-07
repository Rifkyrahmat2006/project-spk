<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nim',
        'name',
    ];

    /**
     * Get the user account for this candidate.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get courses this candidate is enrolled in.
     */
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'candidate_courses')
            ->withPivot('status')
            ->withTimestamps();
    }

    /**
     * Get scores for this candidate.
     */
    public function scores()
    {
        return $this->hasMany(CandidateScore::class);
    }

    /**
     * Get TOPSIS results for this candidate.
     */
    public function topsisResults()
    {
        return $this->hasMany(TopsisResult::class);
    }

    /**
     * Get scores for a specific course.
     */
    public function scoresForCourse($courseId)
    {
        return $this->scores()->where('course_id', $courseId);
    }

    /**
     * Get TOPSIS result for a specific course and period.
     */
    public function resultForCoursePeriod($courseId, $periodId)
    {
        return $this->topsisResults()
            ->where('course_id', $courseId)
            ->where('period_id', $periodId)
            ->first();
    }
}
