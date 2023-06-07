<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderItem;
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
            ['name' => 'material', 'value' => 'paper'],
            ['name' => 'finishing', 'value' => 'glossy'],
            ['name' => 'color', 'value' => 'red'],
            ['name' => 'paper', 'value' => 'A4'],
        ];

        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'name' => $this->faker->name,
            'description' => fake()->realText(200),
            'variants' => $variants,
            'qty' => $this->faker->numberBetween(1000, 10000),
            'price' => $this->faker->numberBetween(1000, 10000),
            'discount' => $this->faker->numberBetween(1000, 10000),
            'tax' => $this->faker->numberBetween(1000, 10000),
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (OrderItem $orderItem) {
            $orderItem->addMedia(storage_path('app/public/asset/products/'.fake()->randomElement(['sticker.png', 'name-card.png', 'poster.png', 'invitation.png'])))
                ->preservingOriginal()
                ->withResponsiveImages()
                ->toMediaCollection('designs');
        });
    }
}
