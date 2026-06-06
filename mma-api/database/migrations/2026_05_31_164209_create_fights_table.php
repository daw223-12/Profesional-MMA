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
    Schema::create('fights', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('fight_type')->default('single');
        $table->string('result_method')->nullable();
        $table->unsignedTinyInteger('result_round')->nullable();
        $table->string('result_time')->nullable();

        $table->foreignId('rule_id')
            ->constrained('rules')
            ->cascadeOnDelete();

        $table->foreignId('event_id')
            ->constrained('events')
            ->cascadeOnDelete();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fights');
    }
};
