<?php

namespace Tests\Feature\Invoice;

use Tests\TestCase;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InvoiceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if user can see invoice url.
     * 
     * @return void
     */
    public function testUserCanSeeInvoiceUrl()
    {
        $user = User::factory()->create();
        $order = Order::factory()->create([
            'user_id' => $user->id,
        ]);

        OrderItem::factory()->create([
            'order_id' => $order->id,
        ]);

        $response = $this->actingAs($user)
            ->post('/invoice', [
                'id' => $order->id,
            ])->assertStatus(200);

        $response->assertJson([
            'invoice' => $response->json('invoice'),
        ]);
    }
}
