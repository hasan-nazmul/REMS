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
        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Chattogram Division"
            $table->string('code')->unique()->nullable(); // e.g., "CTG-DIV-01"
            $table->string('address')->nullable();
            
            // This creates the Hierarchy
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('offices')
                ->onDelete('cascade'); 
                
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offices');
    }
};
