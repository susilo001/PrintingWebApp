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

        $highlights = [
            fake()->sentence(10),
            fake()->sentence(10),
            fake()->sentence(10),
            fake()->sentence(10),
            fake()->sentence(10),
        ];

        $images = [
            'images/asset/products/Box1.png',
            'images/asset/products/Box2.png',
            'images/asset/products/Box3.png',
            'images/asset/products/Box4.png',
        ];

        return [
            'category_id' => Category::factory(),
            'discount_id' => Discount::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->realText(200),
            'highlights' => json_encode($highlights),
            'details' => fake()->realText(200),
            'images' => $images,
            'weight' => fake()->numberBetween(1, 100),
            'tax' => fake()->numberBetween(1, 100),
            'featured' => fake()->boolean(50),
        ];
    }
}
