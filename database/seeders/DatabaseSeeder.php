<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Office;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create the Root Office (Headquarters)
        $hq = Office::create([
            'name' => 'Rail Bhaban (Headquarters)',
            'code' => 'HQ-001',
            'address' => '16 Abdul Gani Road, Dhaka',
            'parent_id' => null, // Top of the hierarchy
        ]);

        // 2. Create Zones (Children of HQ)
        $eastZone = Office::create([
            'name' => 'East Zone',
            'code' => 'EZ-001',
            'address' => 'CRB, Chattogram',
            'parent_id' => $hq->id,
        ]);

        $westZone = Office::create([
            'name' => 'West Zone',
            'code' => 'WZ-001',
            'address' => 'Rajshahi',
            'parent_id' => $hq->id,
        ]);

        // 3. Create Divisions (Children of Zones)
        $ctgDiv = Office::create([
            'name' => 'Chattogram Division',
            'code' => 'DIV-CTG',
            'address' => 'Chattogram Railway Station',
            'parent_id' => $eastZone->id,
        ]);

        $dhakaDiv = Office::create([
            'name' => 'Dhaka Division',
            'code' => 'DIV-DHK',
            'address' => 'Kamalapur, Dhaka',
            'parent_id' => $eastZone->id,
        ]);

        // 4. Create the Super Admin User
        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@railway.gov.bd',
            'password' => Hash::make('password'), // Default password
            'designation' => 'Director General',
            'role' => 'super_admin',
            'office_id' => $hq->id, // Admin sits at HQ
            'is_active' => true,
        ]);

        // 5. Create a Divisional Admin (for testing hierarchy later)
        User::create([
            'name' => 'Divisional Manager (CTG)',
            'email' => 'drm.ctg@railway.gov.bd',
            'password' => Hash::make('password'),
            'designation' => 'Divisional Railway Manager',
            'role' => 'office_admin',
            'office_id' => $ctgDiv->id, // Assigned to Chattogram Division
            'is_active' => true,
        ]);
        
        echo "Database seeded with Railway Hierarchy and Admin Users!\n";
    }
}