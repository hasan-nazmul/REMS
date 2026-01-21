<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OfficeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FileController;

// Public Routes
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Only logged-in users can access these)
Route::middleware('auth:sanctum')->group(function () {
    
    // 1. Auth & User Profile
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // THE FIX: This route loads the user AND their office info
    Route::get('/user', function (Request $request) {
        return $request->user()->load('office');
    });
    
    // 2. Office Routes
    Route::get('/offices/hierarchy', [OfficeController::class, 'index']);

    // 3. User Management Routes
    Route::get('/users', [UserController::class, 'index']);  // List users
    Route::post('/users', [UserController::class, 'store']); // Create user

    // 4. File (Dak) Routes
    Route::get('/files', [FileController::class, 'index']);
    Route::post('/files', [FileController::class, 'store']);
    Route::get('/files/{id}', [FileController::class, 'show']);
    Route::post('/files/{id}/forward', [FileController::class, 'forward']);
    Route::get('/files/search/all', [FileController::class, 'search']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::post('/files/{id}/status', [FileController::class, 'updateStatus']);
});