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
            ['name' => fake()->sentence(10), 'value' => fake()->sentence(10)],
            ['name' => fake()->sentence(10), 'value' => fake()->sentence(10)],
            ['name' => fake()->sentence(10), 'value' => fake()->sentence(10)],
            ['name' => fake()->sentence(10), 'value' => fake()->sentence(10)],
        ];
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'image' => 'https://picsum.photos/200/' . $this->faker->numberBetween(1, 100),
            'qty' => $this->faker->numberBetween(1, 10000),
            'price' => $this->faker->numberBetween(1, 10000),
            'variants' => json_encode($variants),
            'discount' => $this->faker->numberBetween(1, 10000),
            'tax' => $this->faker->numberBetween(1, 10000),
        ];
    }
}
