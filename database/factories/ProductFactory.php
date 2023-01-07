<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Discount;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'description' => fake()->paragraph(3),
            'highlights' => fake()->text(),
            'details' => fake()->text(),
            'image' => 'https://picsum.photos/200/' . fake()->numberBetween(1, 100),
            'tax' => fake()->numberBetween(1, 100),
            'featured' => fake()->boolean(50),
        ];
    }
}
