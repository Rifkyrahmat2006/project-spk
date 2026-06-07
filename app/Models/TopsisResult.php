<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopsisResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'course_id',
        'period_id',
        'd_plus',
        'd_minus',
        'preference_score',
        'ranking',
        'is_accepted',
        'calculated_at',
    ];

    protected $casts = [
        'd_plus' => 'decimal:10',
        'd_minus' => 'decimal:10',
        'preference_score' => 'decimal:10',
        'ranking' => 'integer',
        'is_accepted' => 'boolean',
        'calculated_at' => 'datetime',
    ];

    /**
     * Get the candidate for this result.
     */
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    /**
     * Get the course for this result.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the selection period for this result.
     */
    public function period()
    {
        return $this->belongsTo(SelectionPeriod::class, 'period_id');
    }

    /**
     * Scope to get only accepted candidates.
     */
    public function scopeAccepted($query)
    {
        return $query->where('is_accepted', true);
    }

    /**
     * Scope to order by ranking.
     */
    public function scopeByRanking($query)
    {
        return $query->orderBy('ranking');
    }
}
