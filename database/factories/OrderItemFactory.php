<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $variants = [
            ['name' => 'margin', 'value' => '10px'],
            ['name' => 'padding', 'value' => '10px'],
            ['name' => 'color', 'value' => 'red'],
            ['name' => 'paper', 'value' => 'A4'],
        ];

        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'name' => $this->faker->name,
            'description' => fake()->realText(200),
            'qty' => $this->faker->numberBetween(1, 10000),
            'price' => $this->faker->numberBetween(1, 10000),
            'variants' => $variants,
            'discount' => $this->faker->numberBetween(1, 10000),
            'tax' => $this->faker->numberBetween(1, 10000),
        ];
    }
}
