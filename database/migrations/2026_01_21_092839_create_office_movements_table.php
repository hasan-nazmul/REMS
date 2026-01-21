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
        Schema::create('office_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Who moved?
            
            // Where did they move from/to?
            $table->foreignId('from_office_id')->nullable()->constrained('offices');
            $table->foreignId('to_office_id')->nullable()->constrained('offices');
            
            // Did their rank change?
            $table->string('from_designation')->nullable();
            $table->string('to_designation')->nullable();
            
            $table->date('movement_date');
            $table->enum('type', ['transfer', 'promotion', 'release']);
            $table->text('remarks')->nullable(); // Reason for transfer
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_movements');
    }
};
