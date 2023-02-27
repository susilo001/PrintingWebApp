<?php

namespace Tests\Feature\Order;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::where('email', 'test@test.com')->first();

        $this->actingAs($this->user);
    }

    /**
     * Test if customer can view order list page
     */
    public function testOrderListPage(): void
    {
        $this->get('/order')->assertStatus(200);

        $this->assertAuthenticatedAs($this->user);
    }

    /**
     * Test if user can get the order invoice
     */
    // public function testOrderInvoice(): void
    // {
    //     $order = Order::factory()
    //         ->has(OrderItem::factory()->count(2))
    //         ->create([
    //             'user_id' => $this->user->id,
    //         ]);

    //     $response = $this->getJson('/invoice/' . $order->id);
    //     dd($response->json());
    // }
}
