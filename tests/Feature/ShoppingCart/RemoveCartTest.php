<?php

namespace Tests\Feature\ShoppingCart;

use App\Models\User;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RemoveCartTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if user can remove cart
     *
     * return void
     */
    public function testIfUserCanRemoveCart()
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
                        'value' => 's',
                    ],
                    [
                        'name' => 'color',
                        'value' => 'red',
                    ],
                ],
            ],
        ]);

        $this->actingAs($user)->delete('/cart/'.Cart::content()->first()->rowId)->assertRedirect('/cart');

        $this->assertEquals(Cart::content()->count(), 0);
    }
}
