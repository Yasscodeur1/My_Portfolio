<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjetController;
use App\Models\User;
use App\Models\Projet;
use App\Models\Skill;
use App\Models\Experience;

Route::get('/', function () {

    $user = Auth::user() ?? User::find(1);
    $projets = Projet::all();
    $skills = Skill::all();
    $experiences = Experience::all();

    return Inertia::render('welcome', [
        'user' => $user,
        'projets' => $projets,
        'skills' => $skills,
        'experiences' => $experiences,
    ]);
    return Inertia::render('welcome');
})->name('home');



// Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
// Route::get('projets/{projet}', [ProjetController::class, 'show'])->name('projets.show');
// Route::get('skills/{skill}', [SkillController::class, 'show'])->name('skills.show');
// Route::get('experiences/{experience}', [ExperienceController::class, 'show'])->name('experiences.show');


Route::middleware(['auth', 'verified', 'isAdmin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', UserController::class)->except(['show']);
    Route::resource('projets', ProjetController::class)->except(['show']);
    Route::resource('skills', SkillController::class)->except(['show']);
    Route::resource('experiences', ExperienceController::class)->except(['show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

