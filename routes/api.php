<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OfficeController;
use App\Http\Controllers\Api\AuthController; 
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FileController;

// Public Routes
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Only logged-in users can access these)
Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Move the hierarchy route inside here!
    // Now you MUST be logged in to see the offices.
    Route::get('/offices/hierarchy', [OfficeController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Office Routes
    Route::get('/offices/hierarchy', [OfficeController::class, 'index']);

    // NEW: User Management Routes
    Route::get('/users', [UserController::class, 'index']);  // List users
    Route::post('/users', [UserController::class, 'store']); // Create user
    Route::get('/files', [FileController::class, 'index']);
    Route::post('/files', [FileController::class, 'store']);
});