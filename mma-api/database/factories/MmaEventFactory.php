<?php

namespace Database\Factories;

use App\Models\MmaEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Promotion;

/**
 * @extends Factory<MmaEvent>
 */
class MmaEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'name' => fake()->sentence(3),

        'date' => fake()->dateTimeBetween(
            '-6 months',
            '+6 months'
        ),

        'location' => fake()->city(),

        'price' => fake()->randomFloat(2, 20, 150),

        'status' => fake()->randomElement([
            'draft',
            'published'
        ]),

        'capacity' => fake()->numberBetween(
            500,
            20000
        ),

        'image_url' => fake()->imageUrl(),

        'promotion_id' => Promotion::inRandomOrder()->first()?->id,
    ];
}
}
