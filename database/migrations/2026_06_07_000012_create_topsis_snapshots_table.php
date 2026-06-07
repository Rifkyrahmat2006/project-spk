<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('topsis_snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->cascadeOnDelete();
            $table->foreignId('period_id')->constrained('selection_periods')->cascadeOnDelete();
            $table->json('matrix_data')->comment('All intermediate matrices: normalized, weighted, A+, A-, D+, D-, Vi');
            $table->dateTime('snapshotted_at');
            $table->timestamps();
            $table->unique(['course_id', 'period_id']);
            $table->index('snapshotted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topsis_snapshots');
    }
};
