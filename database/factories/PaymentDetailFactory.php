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
            'status' => $this->faker->randomElement(['settlement', 'pending', 'capture', 'expired', 'cancel']),
            'payment_type' => $this->faker->randomElement(['credit_card', 'bank_transfer', 'gopay']),
            'transaction_id' => $this->faker->uuid,
            'transaction_time' => $this->faker->dateTime,
            'gross_amount' => $this->faker->numberBetween(10000, 1000000),
        ];
    }
}
