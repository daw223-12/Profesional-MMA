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
    Schema::table('users', function (Blueprint $table) {
        $table->string('role')->default('user')->after('password');
        $table->boolean('is_premium')->default(false)->after('role');

        $table->foreignId('promotion_id')
            ->nullable()
            ->after('is_premium')
            ->constrained('promotions')
            ->nullOnDelete();

        $table->foreignId('gym_id')
            ->nullable()
            ->after('promotion_id')
            ->constrained('gyms')
            ->nullOnDelete();
    });
}

    /**
     * Reverse the migrations.
     */
   public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropForeign(['promotion_id']);
        $table->dropForeign(['gym_id']);

        $table->dropColumn([
            'role',
            'is_premium',
            'promotion_id',
            'gym_id',
        ]);
    });
}
};
