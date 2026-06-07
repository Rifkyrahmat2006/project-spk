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
        Schema::create('selection_periods', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('e.g., Genap 2025/2026');
            $table->text('description')->nullable();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->boolean('is_active')->default(false);
            $table->boolean('is_locked')->default(false)->comment('No changes allowed after lock');
            $table->boolean('is_published')->default(false)->comment('Results visible to candidates');
            $table->boolean('show_scores')->default(false)->comment('Detailed TOPSIS scores visible to candidates');
            $table->dateTime('locked_at')->nullable();
            $table->dateTime('published_at')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            $table->index('is_active');
            $table->index('is_locked');
            $table->index('is_published');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('selection_periods');
    }
};
