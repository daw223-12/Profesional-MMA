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
    Schema::create('rules', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('weight_class');
        $table->unsignedTinyInteger('rounds');
        $table->unsignedTinyInteger('minutes_per_round');
        $table->string('style');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rules');
    }
};
