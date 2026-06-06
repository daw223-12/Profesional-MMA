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
        Schema::create('fight_fighters', function (Blueprint $table) {
            $table->foreignId('fight_id')
                ->constrained('fights')
                ->cascadeOnDelete();

            $table->foreignId('fighter_id')
                ->constrained('fighters')
                ->cascadeOnDelete();

            $table->string('team_name')->nullable();
            $table->string('position')->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->boolean('is_winner')->default(false);
            $table->unsignedInteger('result_order')->nullable();

            $table->timestamps();

            $table->primary(['fight_id', 'fighter_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fight_fighters');
    }
};
