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
    Schema::create('fighters', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('nickname')->nullable();
        $table->unsignedInteger('wins')->default(0);
        $table->unsignedInteger('losses')->default(0);
        $table->unsignedInteger('draws')->default(0);
        $table->decimal('height', 5, 2)->nullable();
        $table->decimal('reach', 5, 2)->nullable();
        $table->string('photo_url')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fighters');
    }
};
