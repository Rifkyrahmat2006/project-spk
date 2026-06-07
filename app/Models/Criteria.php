<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'weight',
        'type',
        'description',
        'is_active',
    ];

    protected $casts = [
        'weight' => 'decimal:4',
        'is_active' => 'boolean',
    ];

    /**
     * Get candidate scores using this criteria.
     */
    public function candidateScores()
    {
        return $this->hasMany(CandidateScore::class);
    }

    /**
     * Scope to get only active criteria.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Check if criteria is benefit type.
     */
    public function isBenefit(): bool
    {
        return $this->type === 'benefit';
    }

    /**
     * Check if criteria is cost type.
     */
    public function isCost(): bool
    {
        return $this->type === 'cost';
    }
}
