<?php

namespace Tests\Feature\ShoppingCart;

use Tests\TestCase;
use App\Models\User;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\UploadedFile;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CheckoutCartTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if user can checkout the cart
     * 
     * return void
     */

    public function testIfUserCanCheckoutTheCart()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/cart', [
            'product_id' => 2,
            'quantity' => fake()->numberBetween(1, 10000),
            'project_name' => fake()->sentence(3),
            'description' => fake()->text(),
            'variants' => [
                [
                    'name' => 'size',
                    'value' => 's'
                ],
                [
                    'name' => 'color',
                    'value' => 'red'
                ]
            ],
            'design' => UploadedFile::fake()->image('design.png')
        ]);

        $this->actingAs($user)
            ->post('/cart/checkout')
            ->assertOk();
    }
}
