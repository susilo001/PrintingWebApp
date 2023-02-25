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

    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::where('email', 'test@test.com')->first();
    }

    /**
     * Test if customer can view order list page
     */
    public function testOrderListPage(): void
    {
        $this->actingAs($this->user)->get('/order')
            ->assertStatus(200);

        $this->assertAuthenticatedAs($this->user);
    }
}
