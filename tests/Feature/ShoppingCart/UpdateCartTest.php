<?php

namespace Tests\Feature\ShoppingCart;

use Tests\TestCase;
use App\Models\User;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateCartTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if user can update cart
     * 
     * return void
     */
    public function testIfUserCanUpdateCart()
    {
        $user = User::factory()->create();
        $this->withoutExceptionHandling();
        Cart::add([
            'id' => 1,
            'qty' => 1,
            'name' => 'Product',
            'price' => 100,
            'weight' => 0,
            'options' => [
                'design' => 'design.png',
                'variants' => [
                    [
                        'name' => 'size',
                        'value' => 's'
                    ],
                    [
                        'name' => 'color',
                        'value' => 'red'
                    ]
                ]
            ]
        ]);

        $qty = fake()->numberBetween(1, 10000);

        $this->actingAs($user)->put('/cart/' . Cart::content()->first()->rowId, [
            'rowId' => Cart::content()->first()->rowId,
            'quantity' => $qty,
        ])->assertRedirect('/cart');

        $this->assertEquals(Cart::content()->first()->qty, $qty);
    }
}
