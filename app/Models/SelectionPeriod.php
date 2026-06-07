<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectionPeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'is_active',
        'is_locked',
        'is_published',
        'show_scores',
        'locked_at',
        'published_at',
        'created_by',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
        'is_locked' => 'boolean',
        'is_published' => 'boolean',
        'show_scores' => 'boolean',
        'locked_at' => 'datetime',
        'published_at' => 'datetime',
    ];

    /**
     * Get the creator of this period.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get applications submitted during this period.
     */
    public function applications()
    {
        return $this->hasMany(Application::class, 'period_id');
    }

    /**
     * Get TOPSIS results for this period.
     */
    public function topsisResults()
    {
        return $this->hasMany(TopsisResult::class, 'period_id');
    }

    /**
     * Get TOPSIS snapshots for this period.
     */
    public function topsisSnapshots()
    {
        return $this->hasMany(TopsisSnapshot::class, 'period_id');
    }

    /**
     * Scope to get only active periods.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Check if period is currently open for applications.
     */
    public function isOpen(): bool
    {
        return $this->is_active 
            && !$this->is_locked 
            && now()->between($this->start_date, $this->end_date);
    }

    /**
     * Check if period is locked.
     */
    public function isLocked(): bool
    {
        return $this->is_locked;
    }

    /**
     * Check if results are published.
     */
    public function isPublished(): bool
    {
        return $this->is_published;
    }
}
