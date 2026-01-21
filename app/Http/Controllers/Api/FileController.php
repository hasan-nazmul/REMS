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

    // 3. Forward a File to another Office
    public function forward(Request $request, $id)
    {
        $user = $request->user();
        
        // Validation
        $request->validate([
            'to_office_id' => 'required|exists:offices,id',
            'remarks' => 'nullable|string'
        ]);

        // Find the file
        $file = File::find($id);

        if (!$file) {
            return response()->json(['message' => 'File not found'], 404);
        }

        // Security Check: Is the file actually in the user's office?
        if ($file->current_office_id != $user->office_id) {
            return response()->json(['message' => 'You cannot move a file that is not in your office.'], 403);
        }

        // 1. Log the history (Create the paper trail)
        \App\Models\FileMovement::create([
            'file_id' => $file->id,
            'from_office_id' => $file->current_office_id,
            'to_office_id' => $request->to_office_id,
            'by_user_id' => $user->id,
            'action' => 'forward',
            'remarks' => $request->remarks,
        ]);

        // 2. Actually move the file (Update current location)
        $file->current_office_id = $request->to_office_id;
        $file->save();

        return response()->json(['message' => 'File forwarded successfully!']);
    }

    // 4. Get a Single File's Details
    public function show(Request $request, $id)
    {
        $file = File::with([
            'creator', 
            'currentOffice', 
            'movements.fromOffice', 
            'movements.toOffice', 
            'movements.user'
        ])->find($id);

        if (!$file) {
            return response()->json(['message' => 'File not found'], 404);
        }

        // Also send a list of ALL offices so the user can choose where to forward it
        $offices = \App\Models\Office::all();

        return response()->json([
            'file' => $file,
            'offices' => $offices
        ]);
    }

    // 5. Admin View: See ALL Files in the system
    public function search(Request $request)
    {
        // Optional: Search by subject
        $query = File::with(['currentOffice', 'creator'])->latest();

        if ($request->has('q')) {
            $search = $request->q;
            $query->where('subject', 'LIKE', "%{$search}%");
        }

        return $query->get();
    }

    // 6. Update Status (Approve/Reject)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Approved,Rejected,Closed',
            'remarks' => 'required|string'
        ]);

        $file = File::findOrFail($id);
        
        // 1. Update the File Status
        $file->status = $request->status;
        $file->save();

        // 2. Log this in History
        FileMovement::create([
            'file_id' => $file->id,
            'from_office_id' => $file->current_office_id, // Stays in same office
            'to_office_id' => $file->current_office_id,   // No movement, just decision
            'by_user_id' => auth()->id(),
            'action' => 'Status Changed: ' . $request->status,
            'remarks' => $request->remarks
        ]);

        return response()->json(['message' => 'File status updated successfully!']);
    }
}