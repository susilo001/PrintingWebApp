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

    protected $user;

    protected $order;

    /**
     * Setup the test environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::where('email', 'test@test.com')->first();

        $this->actingAs($this->user);

        $this->order = Order::factory()
            ->has(OrderItem::factory()->count(2))
            ->has(PaymentDetail::factory()->count(1))
            ->create([
                'user_id' => $this->user->id,
            ]);
    }

    /**
     * Test if user can write a testimonial
     */
    public function testOrderTestimonial(): void
    {
        $this->post('order/' . $this->order->id . '/testimonial', [
            'testimonial' => 'This is a test testimonial',
            'product_id' => $this->order->orderItems->first()->product_id,
            'rating' => 5,
        ])->assertStatus(302);

        $this->assertDatabaseHas('testimonials', [
            'order_id' => $this->order->id,
            'user_id' => $this->user->id,
            'testimonial' => 'This is a test testimonial',
            'rating' => 5,
        ]);
    }

    /**
     * Test if user can get the order invoice
     */
    // public function testOrderInvoice(): void
    // {
    //     $this->get('/order/' . $this->order->id . '/invoice')->assertStatus(200);

    //     $this->assertAuthenticatedAs($this->user);
    // }
}
