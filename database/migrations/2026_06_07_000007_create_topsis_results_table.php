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
        Schema::create('topsis_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained('candidates')->cascadeOnDelete();
            $table->foreignId('course_id')->constrained('courses')->cascadeOnDelete();
            $table->foreignId('period_id')->constrained('selection_periods')->cascadeOnDelete();
            $table->decimal('d_plus', 10, 6)->comment('Distance to ideal positive solution');
            $table->decimal('d_minus', 10, 6)->comment('Distance to ideal negative solution');
            $table->decimal('preference_score', 10, 6)->comment('Vi = D- / (D+ + D-)');
            $table->integer('ranking')->comment('1 = highest score');
            $table->boolean('is_accepted')->default(false)->comment('Top N candidates per quota');
            $table->dateTime('calculated_at');
            $table->timestamps();
            $table->unique(['candidate_id', 'course_id', 'period_id']);
            $table->index(['course_id', 'period_id']);
            $table->index('is_accepted');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topsis_results');
    }
};
