<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'quota',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'quota' => 'integer',
    ];

    /**
     * Get the admins assigned to this course.
     */
    public function assignedAdmins()
    {
        return $this->belongsToMany(User::class, 'user_course_assignments')
            ->withTimestamps();
    }

    /**
     * Get candidates enrolled in this course.
     */
    public function candidates()
    {
        return $this->belongsToMany(Candidate::class, 'candidate_courses')
            ->withPivot('status')
            ->withTimestamps();
    }

    /**
     * Get candidate scores for this course.
     */
    public function candidateScores()
    {
        return $this->hasMany(CandidateScore::class);
    }

    /**
     * Get TOPSIS results for this course.
     */
    public function topsisResults()
    {
        return $this->hasMany(TopsisResult::class);
    }

    /**
     * Get applications for this course.
     */
    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    /**
     * Get TOPSIS snapshots for this course.
     */
    public function topsisSnapshots()
    {
        return $this->hasMany(TopsisSnapshot::class);
    }
}
