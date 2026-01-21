<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Office;
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    public function index()
    {
        // Fetch offices that are roots (no parent), with their children
        // We use 'with' to eager load the relationships to prevent N+1 query problems
        $hierarchy = Office::whereNull('parent_id')
            ->with('children.children') // Get 3 levels deep: HQ -> Zone -> Division
            ->get();

        return response()->json($hierarchy);
    }
}