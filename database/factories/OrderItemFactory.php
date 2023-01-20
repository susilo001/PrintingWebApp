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
            ['name' => fake()->sentence(1), 'value' => fake()->sentence(1)],
            ['name' => fake()->sentence(1), 'value' => fake()->sentence(1)],
            ['name' => fake()->sentence(1), 'value' => fake()->sentence(1)],
            ['name' => fake()->sentence(1), 'value' => fake()->sentence(1)],
        ];
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'name' => $this->faker->name,
            'description' => fake()->realText(200),
            'image' => 'https://picsum.photos/200/' . $this->faker->numberBetween(1, 100),
            'qty' => $this->faker->numberBetween(1, 10000),
            'price' => $this->faker->numberBetween(1, 10000),
            'variants' => $variants,
            'discount' => $this->faker->numberBetween(1, 10000),
            'tax' => $this->faker->numberBetween(1, 10000),
        ];
    }
}
