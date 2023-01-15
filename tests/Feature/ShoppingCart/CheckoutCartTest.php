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
     * Test if user can checkout the cart using snap payment method
     * 
     * return void
     */

    public function testIfUserCanCheckoutTheCart()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/cart', [
            'product_id' => 10,
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

        $this->actingAs($user)->post('/cart', [
            'product_id' => 3,
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

        $reponse =  $this->actingAs($user)
            ->post('/cart/checkout', [
                'payment_method' => 'snap'
            ]);

        $reponse->assertStatus(200);
    }

    /**
     * Test if user can checkout the cart using cash payment method
     * 
     * return void
     */

    public function testIfUserCanCheckoutTheCartUsingCashPaymentMethod()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/cart', [
            'product_id' => 10,
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

        $this->actingAs($user)->post('/cart', [
            'product_id' => 3,
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

        $reponse =  $this->actingAs($user)
            ->post('/cart/checkout', [
                'payment_method' => 'cash'
            ]);

        $reponse->assertStatus(200);
    }
}
