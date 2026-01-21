<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\File;

// 1. Main Entry Point
Route::get('/', function () {
    return view('welcome');
});

// 2. Your Debug Tools (Keep these for now, they are useful!)
Route::get('/debug-fix', function () {
    // 1. Delete files with no office
    $deleted = \App\Models\File::whereNull('current_office_id')->delete();
    
    // 2. Check remaining files
    $count = \App\Models\File::count();

    return "✅ Cleanup Complete! Deleted $deleted ghost files. You have $count valid files remaining.";
});

Route::get('/debug-move', function () {
    if (!class_exists(\App\Models\FileMovement::class)) return "❌ Error: Model missing.";
    $user = User::first();
    $file = File::first();
    if (!$user || !$file) return "❌ Error: Missing data.";
    return "✅ Ready to move file: " . $file->subject;
});

// ----------------------------------------------------------------
// 3. THE CRITICAL FIX (The Catch-All Route)
// ----------------------------------------------------------------
// This tells Laravel: "For any other URL (like /dashboard, /files), 
// don't show 404. Just load the React app."
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');