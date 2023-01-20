<?php

namespace Tests\Feature\Admin;

use Tests\TestCase;
use App\Models\User;
use App\Models\Order;
use App\Filament\Resources\OrderResource;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;

    public function setUp(): void
    {
        parent::setUp();

        $this->admin = User::where('email', 'admin@admin.com')->first();
    }

    /**
     * Test if Admin can view orders
     * 
     * @return void
     */
    public function testAdminCanViewOrders()
    {
        $this->actingAs($this->admin)->get(OrderResource::getUrl('index'))
            ->assertStatus(200);
    }

    /**
     * Test if Admin can view order create form
     * 
     * @return void
     */
    public function testAdminCanViewOrderCreateForm()
    {
        $this->actingAs($this->admin)->get(OrderResource::getUrl('create'))
            ->assertStatus(200);
    }

    /**
     * Test if Admin can view order edit form
     * 
     * @return void
     */
    public function testAdminCanViewOrderEditForm()
    {
        $order = Order::factory()->create();

        $this->actingAs($this->admin)->get(OrderResource::getUrl('edit', $order->id))
            ->assertStatus(200);
    }
}
