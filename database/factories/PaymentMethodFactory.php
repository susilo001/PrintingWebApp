<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentMethod>
 */
class PaymentMethodFactory extends Factory
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
            'payment_type' => fake()->randomElement(['credit_card', 'bank_transfer', 'gopay']),
            'account_name' => $this->faker->name,
            'account_number' => fake()->creditCardNumber(),
            'bank' => fake()->randomElement(['bca', 'bni', 'bri', 'mandiri']),
        ];
    }
}
