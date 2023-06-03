<?php

namespace Database\Factories;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Banner>
 */
class BannerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
            'description' => fake()->realText(200),
            'url' => $this->faker->url,
            'status' => $this->faker->boolean(50),
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (Banner $banner) {
            $banner->addMedia(storage_path('app/public/asset/banners/banner.jpg'))
            ->preservingOriginal()
            ->withResponsiveImages()
            ->toMediaCollection('banners');
        });
    }
}
