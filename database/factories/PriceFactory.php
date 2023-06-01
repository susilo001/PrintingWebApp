<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */
class PriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'product_id' => Product::factory(),
            'price' => fake()->numberBetween(1000, 10000),
            'min_order' => fake()->numberBetween(1, 10),
            'max_order' => fake()->numberBetween(10, 100),
        ];
    }
}
