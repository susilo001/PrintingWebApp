<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'qty' => $this->faker->numberBetween(1, 10),
            'name' => $this->faker->name,
            'weight' => $this->faker->numberBetween(1, 10),
            'description' => $this->faker->text,
            'variants' => $this->faker->text,
            'discount' => $this->faker->numberBetween(1, 10),
            'tax' => $this->faker->numberBetween(1, 10),
            'product_id' => Product::factory(),
            'cart_id' => Cart::factory(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (CartItem $cartItem) {
            $cartItem->addMedia(storage_path('app/public/asset/products/sticker.png'))->preservingOriginal()->toMediaCollection('cart-item-designs');
        });
    }
}
