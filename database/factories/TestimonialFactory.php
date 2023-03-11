<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\testimonial>
 */
class TestimonialFactory extends Factory
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
            'product_id' => Product::factory(),
            'order_id' => Order::factory(),
            'testimonial' => fake()->realText(),
            'rating' => fake()->numberBetween(1, 5),
            'is_approved' => fake()->boolean(50) ? 1 : 0,
            'is_featured' => fake()->boolean(50) ? 1 : 0,
        ];
    }
}
