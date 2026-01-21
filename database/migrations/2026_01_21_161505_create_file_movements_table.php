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
        Schema::create('file_movements', function (Blueprint $table) {
            $table->id();
            
            // Link to the File
            $table->foreignId('file_id')->constrained('files')->onDelete('cascade');
            
            // Where did it move from and to?
            $table->foreignId('from_office_id')->constrained('offices');
            $table->foreignId('to_office_id')->constrained('offices');
            
            // Who moved it?
            $table->foreignId('by_user_id')->constrained('users');
            
            // Details
            $table->string('action')->default('forward'); // forward, return, reject
            $table->text('remarks')->nullable(); // e.g. "Approved, pls process"
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_movements');
    }
};
