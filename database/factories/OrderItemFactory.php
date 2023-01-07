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
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'image' => 'https://picsum.photos/200/' . $this->faker->numberBetween(1, 100),
            'qty' => $this->faker->numberBetween(1, 10000),
            'price' => $this->faker->numberBetween(1, 10000),
            'subtotal' => $this->faker->numberBetween(1, 10000),
            'discount' => $this->faker->numberBetween(1, 10000),
            'tax' => $this->faker->numberBetween(1, 10000),
            'total' => $this->faker->numberBetween(1, 10000),
        ];
    }
}
