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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            
            // File Details
            $table->string('subject'); // e.g., "Application for Leave"
            $table->text('description')->nullable();
            $table->string('priority')->default('normal'); // normal, urgent, top_priority
            $table->string('status')->default('draft');    // draft, open, closed
            
            // Tracking Locations
            // 1. Where did it start?
            $table->foreignId('origin_office_id')->constrained('offices');
            // 2. Where is it right now?
            $table->foreignId('current_office_id')->constrained('offices');
            // 3. Who made it?
            $table->foreignId('creator_user_id')->constrained('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
