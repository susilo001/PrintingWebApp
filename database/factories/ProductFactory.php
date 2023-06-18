<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Discount;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->name();

        return [
            'category_id' => Category::factory(),
            'discount_id' => Discount::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->realText(600),
            'weight' => fake()->numberBetween(1, 50),
            'tax' => fake()->numberBetween(1, 10),
            'featured' => fake()->boolean(50),
        ];
    }
}
