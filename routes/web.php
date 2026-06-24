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
use App\Http\Controllers\Admin\TopsisController;
use App\Http\Controllers\Candidate\PortalController;
use App\Http\Controllers\Auth\GoogleLoginController;

Route::inertia('/', 'welcome')->name('home');

// Google OAuth Routes (guest)
Route::middleware('guest')->group(function () {
    Route::post('/auth/google/authenticate', [GoogleLoginController::class, 'authenticate'])->name('google.authenticate');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Superadmin Routes
    Route::middleware(['role.superadmin'])->prefix('superadmin')->name('superadmin.')->group(function () {
        Route::resource('courses', CourseController::class);
        Route::resource('criteria', CriteriaController::class);
        Route::resource('users', UserManagementController::class);
        Route::resource('periods', PeriodController::class);
        Route::post('periods/{period}/lock', [PeriodController::class, 'lock'])->name('periods.lock');
        Route::post('periods/{period}/unlock', [PeriodController::class, 'unlock'])->name('periods.unlock');
        Route::post('periods/{period}/publish', [PeriodController::class, 'publish'])->name('periods.publish');
        Route::post('periods/{period}/unpublish', [PeriodController::class, 'unpublish'])->name('periods.unpublish');
        Route::post('periods/{period}/toggle-scores', [PeriodController::class, 'toggleScores'])->name('periods.toggleScores');
        Route::get('consolidated-results', [ConsolidatedResultController::class, 'index'])->name('consolidated.index');
    });

    // Admin / KoorAsPrak Routes (Superadmin can also access)
    Route::middleware(['role.admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::resource('candidates', CandidateManagementController::class);
        Route::resource('scores', ScoreController::class);
        Route::get('topsis-results', [TopsisResultController::class, 'index'])->name('results.index');

        // TOPSIS Engine Routes
        Route::prefix('topsis')->name('topsis.')->group(function () {
            Route::post('calculate-all', [TopsisController::class, 'calculateAll'])->name('calculate-all');
            Route::post('periods/{period}/lock', [TopsisController::class, 'lock'])->name('lock');
        });

        Route::prefix('courses/{course}/topsis')->name('courses.topsis.')->group(function () {
            Route::get('/', [TopsisController::class, 'show'])->name('show');
            Route::post('calculate', [TopsisController::class, 'calculate'])->name('calculate');
        });
    });

    // Candidate / User Routes
    Route::middleware(['role.candidate'])->prefix('portal')->name('portal.')->group(function () {
        Route::get('/', [PortalController::class, 'index'])->name('index');
    });

    // Profile Routes (all authenticated users)
    Route::prefix('profile')->name('my-profile.')->group(function () {
        Route::get('/', [\App\Http\Controllers\ProfileController::class, 'index'])->name('index');
        Route::patch('/', [\App\Http\Controllers\ProfileController::class, 'update'])->name('update');
        Route::post('/avatar', [\App\Http\Controllers\ProfileController::class, 'updateAvatar'])->name('avatar');
        Route::put('/password', [\App\Http\Controllers\ProfileController::class, 'updatePassword'])->name('password');
    });

    // Notification Routes (all authenticated users)
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{notification}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
});

require __DIR__.'/settings.php';

