<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'canceled', 'order placed']),
            'subtotal' => fake()->numberBetween(10000, 1000000),
            'discount' => fake()->numberBetween(10000, 1000000),
            'tax' => fake()->numberBetween(10000, 1000000),
            'total_amount' => fake()->numberBetween(10000, 1000000),
        ];
    }
}
