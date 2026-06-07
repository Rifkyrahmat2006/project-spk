<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopsisSnapshot extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'period_id',
        'matrix_data',
        'snapshotted_at',
    ];

    protected $casts = [
        'matrix_data' => 'json',
        'snapshotted_at' => 'datetime',
    ];

    /**
     * Get the course for this snapshot.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the selection period for this snapshot.
     */
    public function period()
    {
        return $this->belongsTo(SelectionPeriod::class, 'period_id');
    }
}
