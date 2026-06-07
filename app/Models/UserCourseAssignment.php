<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCourseAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'assigned_by',
    ];

    /**
     * Get the admin user assigned to this course.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the course assigned.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the superadmin who made this assignment.
     */
    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }
}
