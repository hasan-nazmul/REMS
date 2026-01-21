<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\File; // <--- THIS WAS MISSING!

Route::get('/', function () {
    return view('welcome');
});

// 1. Debug Route for Users
Route::get('/debug-users', function () {
    return User::with('office')->get();
});

// 2. Debug Route for Files (The one failing)
Route::get('/debug-file', function () {
    // Get the first user (Admin)
    $user = User::first(); 
    
    if (!$user) {
        return "Error: No users found in database. Run migration/seed.";
    }

    // Create a dummy file
    $file = File::create([
        'subject' => 'Test File ' . rand(1, 100),
        'description' => 'This is a test file created via debug route.',
        'priority' => 'normal',
        'status' => 'open',
        'origin_office_id' => $user->office_id,
        'current_office_id' => $user->office_id,
        'creator_user_id' => $user->id,
    ]);

    return $file;
});

// React Catch-all Route (Must be last)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');