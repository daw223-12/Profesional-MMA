<?php

namespace Database\Factories;

use App\Models\Fighter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Fighter>
 */
class FighterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'name' => fake()->name(),
        'nickname' => fake()->optional()->firstName(),

        'wins' => fake()->numberBetween(0, 30),
        'losses' => fake()->numberBetween(0, 10),
        'draws' => fake()->numberBetween(0, 3),

        'height' => fake()->randomFloat(2, 160, 210),
        'reach' => fake()->randomFloat(2, 160, 220),

        'photo_url' => fake()->imageUrl(),
    ];
}
}
