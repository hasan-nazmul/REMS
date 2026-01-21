<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // 1. LIST: Get all employees with their Office Name
    public function index()
    {
        // "with('office')" is crucial for showcasing where they work!
        return User::with('office')->latest()->get();
    }

    // 2. CREATE: Add a new employee
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required',
            'office_id' => 'required|exists:offices,id'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'office_id' => $request->office_id
        ]);

        return response()->json($user, 201);
    }

    // 3. DELETE: Remove an employee (Admin Activity)
    public function destroy($id)
    {
        $user = User::find($id);
        
        if (!$user) return response()->json(['message' => 'User not found'], 404);
        
        // Prevent deleting yourself!
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'You cannot delete yourself!'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Employee deleted successfully']);
    }
}