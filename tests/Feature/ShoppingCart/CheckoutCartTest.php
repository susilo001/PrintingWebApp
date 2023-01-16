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

        $quantity = fake()->numberBetween(1, 10000);
        $projectName = fake()->sentence(3);
        $description = fake()->text();

        $this->actingAs($user)->post('/cart', [
            'product_id' => 2,
            'quantity' => $quantity,
            'project_name' => $projectName,
            'description' => $description,
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
            'quantity' => 1000,
            'project_name' => 'test',
            'description' => 'test',
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

        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'status' => 'pending'
        ]);

        $this->assertDatabaseHas('order_items', [
            'product_id' => 3,
            'name' => 'test',
            'description' => 'test',
            'qty' => 1000,
        ]);

        $this->assertDatabaseHas('order_items', [
            'product_id' => 2,
            'name' => $projectName,
            'description' => $description,
            'qty' => $quantity,
        ]);
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
