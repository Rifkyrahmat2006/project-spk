<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Superadmin\CourseController;
use App\Http\Controllers\Superadmin\CriteriaController;
use App\Http\Controllers\Superadmin\UserManagementController;
use App\Http\Controllers\Superadmin\PeriodController;
use App\Http\Controllers\Superadmin\ConsolidatedResultController;
use App\Http\Controllers\Admin\CandidateManagementController;
use App\Http\Controllers\Admin\ScoreController;
use App\Http\Controllers\Admin\TopsisResultController;
use App\Http\Controllers\Candidate\PortalController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Superadmin Routes
    Route::middleware(['role.superadmin'])->prefix('superadmin')->name('superadmin.')->group(function () {
        Route::resource('courses', CourseController::class);
        Route::resource('criteria', CriteriaController::class);
        Route::resource('users', UserManagementController::class);
        Route::resource('periods', PeriodController::class);
        Route::get('consolidated-results', [ConsolidatedResultController::class, 'index'])->name('consolidated.index');
    });

    // Admin / KoorAsPrak Routes (Superadmin can also access)
    Route::middleware(['role.admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::resource('candidates', CandidateManagementController::class);
        Route::resource('scores', ScoreController::class);
        Route::get('topsis-results', [TopsisResultController::class, 'index'])->name('results.index');
    });

    // Candidate / User Routes
    Route::middleware(['role.candidate'])->prefix('portal')->name('portal.')->group(function () {
        Route::get('/', [PortalController::class, 'index'])->name('index');
    });
});

require __DIR__.'/settings.php';

