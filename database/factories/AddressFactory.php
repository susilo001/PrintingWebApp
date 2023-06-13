<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->streetAddress,
            'city_id' => $this->faker->randomNumber(1, 500),
            'city_name' => $this->faker->city,
            'province_id' => $this->faker->randomNumber(1, 500),
            'province' => $this->faker->city,
            'postal_code' => $this->faker->postcode,
        ];
    }
}
