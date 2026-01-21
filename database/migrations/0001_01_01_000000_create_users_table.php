<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            
            // Railway Specific Fields
            $table->string('designation')->nullable(); // e.g. "Chief Engineer"
            $table->enum('role', ['super_admin', 'office_admin', 'employee'])->default('employee');
            $table->boolean('is_active')->default(true); // For releasing employees
            
            // Link user to an Office
            $table->foreignId('office_id')
                ->nullable()
                ->constrained('offices')
                ->onDelete('set null');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
