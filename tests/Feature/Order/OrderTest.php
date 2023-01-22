<?php

namespace Tests\Feature\Order;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PaymentDetail;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if customer can view order list page
     *
     * @return void
     */
    public function testOrderListPage()
    {
        $user = User::where('email', 'test@test.com')->first();

        $this->actingAs($user)->get('/order')
            ->assertStatus(200);

        $this->assertAuthenticatedAs($user);
    }

    /**
     * Test if Order can be updated
     *
     * @return void
     */
    public function testOrderUpdate()
    {
        $user = User::where('email', 'test@test.com')->first();

        $order = Order::factory()
            ->for($user)
            ->has(OrderItem::factory()->count(1))
            ->has(PaymentDetail::factory()->count(1))
            ->create();

        $this->actingAs($user)->put('/order/'.$order->id, [
            'status' => 'Paid',
            'payment_type' => 'Bank Transfer',
        ])
            ->assertStatus(302);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'Proccessing',
        ]);

        $this->assertDatabaseHas('payment_details', [
            'id' => $order->paymentDetail->id,
            'status' => $order->paymentDetail->status,
        ]);
    }
}
