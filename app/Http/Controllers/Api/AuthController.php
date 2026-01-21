<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validate the input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Check the user
        $user = User::where('email', $request->email)->first();

        // 3. Check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }

        // 4. GENERATE THE TOKEN (This was likely missing or broken)
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. Return the token to the frontend
        return response()->json([
            'message' => 'Login successful',
            'token' => $token, // <--- The Frontend is looking for this!
            'user' => $user
        ], 200);
    }
    
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}