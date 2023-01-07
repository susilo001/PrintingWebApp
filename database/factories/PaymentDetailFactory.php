<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentDetail>
 */
class PaymentDetailFactory extends Factory
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
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'declined']),
            'payment_type' => $this->faker->randomElement(['credit_card', 'bank_transfer', 'gopay']),
            'expiry' => $this->faker->date(),
            'payment_details' => $this->faker->randomElement(
                [
                    'account_number' => fake()->creditCardNumber(),
                ],
                [
                    'gopay_phone' => $this->faker->phoneNumber,
                ],
            ),
            'gross_amount' => $this->faker->numberBetween(10000, 10000),
        ];
    }
}
