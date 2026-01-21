<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Office;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // 1. List all users with their Office info
    public function index()
    {
        return User::with('office')->get();
    }

    // 2. Create a new user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,office_head,user',
            'office_id' => 'required|exists:offices,id', // Must belong to a real office
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'office_id' => $validated['office_id'],
        ]);

        return response()->json(['message' => 'User created successfully!', 'user' => $user], 201);
    }
}