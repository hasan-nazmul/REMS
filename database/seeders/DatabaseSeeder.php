<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Office;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create the Railway Hierarchy first (so offices exist)
        $hq = Office::create([
            'name' => 'Rail Bhaban (Headquarters)',
            'code' => 'HQ-001',
            'address' => '16 Abdul Gani Road, Dhaka'
        ]);

        $eastZone = $hq->children()->create([
            'name' => 'East Zone',
            'code' => 'EZ-001',
            'address' => 'CRB, Chattogram'
        ]);

        $westZone = $hq->children()->create([
            'name' => 'West Zone',
            'code' => 'WZ-001',
            'address' => 'Rajshahi'
        ]);

        $eastZone->children()->createMany([
            ['name' => 'Chattogram Division', 'code' => 'DIV-CTG', 'address' => 'Pahartali'],
            ['name' => 'Dhaka Division', 'code' => 'DIV-DHK', 'address' => 'Kamalapur'],
        ]);

        // 2. Create the System Administrator
        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@railway.gov.bd',
            'password' => Hash::make('12345678'),
            'role' => 'admin', // Matches your database column
            'office_id' => $hq->id,
        ]);
        
        // 3. Create an Office Head (Example)
        User::create([
            'name' => 'General Manager (East)',
            'email' => 'gm.east@railway.gov.bd',
            'password' => Hash::make('12345678'),
            'role' => 'office_head',
            'office_id' => $eastZone->id,
        ]);
    }
}