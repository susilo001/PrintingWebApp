<?php

namespace Tests\Feature\Payment;

use Tests\TestCase;

class PaymentTest extends TestCase
{
    /**
     * Test webhook notification from Midtrans
     *
     * @return void
     */
    public function testWebhookPaymentNotification()
    {
        $response = $this->postJson(route('payment.store'), [
            'transaction_id' => fake()->randomElement(['1234567890', '0987654321']),
            'transaction_time' => now()->toDateTimeString(),
            'status_message' => 'midtrans payment notification',
            'status_code' => '200',
            'payment_type' => fake()->randomElement(['bank_transfer', 'credit_card']),
            'order_id' => 'OTC'.'-'.now()->format('Ymd').'-'.fake()->randomNumber(5),
            'gross_amount' => (string) fake()->numberBetween(10000, 1000000),
        ]);

        $response->assertStatus(200);
    }
}
