<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\File;

class FileController extends Controller
{
    // 1. List files currently in the user's office
    public function index(Request $request)
    {
        $user = $request->user();

        // Safety Check: Does the user belong to an office?
        if (!$user->office_id) {
            return response()->json(['message' => 'You are not assigned to an office.'], 403);
        }

        return File::with(['creator', 'currentOffice'])
            ->where('current_office_id', $user->office_id)
            ->latest() // Newest first
            ->get();
    }

    // 2. Create a new File (Dak)
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user->office_id) {
            return response()->json(['message' => 'You must be in an office to create files.'], 403);
        }

        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:normal,urgent,top_priority',
        ]);

        $file = File::create([
            'subject' => $validated['subject'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'status' => 'open',
            // Auto-fill the tracking info:
            'origin_office_id' => $user->office_id,
            'current_office_id' => $user->office_id, // Starts at the creator's office
            'creator_user_id' => $user->id,
        ]);

        return response()->json(['message' => 'File created successfully!', 'file' => $file], 201);
    }
}