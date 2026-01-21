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
        Schema::create('delegations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('delegator_id')->constrained('users'); // The Boss
            $table->foreignId('delegatee_id')->constrained('users'); // The Subordinate
            
            $table->string('power_type'); // e.g., "approve_leave", "sign_documents"
            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->text('reason')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delegations');
    }
};
