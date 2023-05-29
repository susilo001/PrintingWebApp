<?php

namespace Tests\Feature\ShoppingCart;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $qty;

    protected $description;

    protected $variants;

    protected $design;

    protected $cart;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->cart = Cart::where('user_id', $this->user->id)->first();

        $this->actingAs($this->user);

        $this->qty = fake()->numberBetween(1, 10000);
        $this->description = fake()->text();
        $this->variants = [
            [
                'name' => 'size',
                'value' => 's',
            ],
            [
                'name' => 'color',
                'value' => 'red',
            ],
        ];
        $this->design = UploadedFile::fake()->create('design.png', 100, 'image/png');
    }

    /**
     * Test if user can add product to cart
     *
     * return void
     */
    public function testIfUserCanAddProductToCart()
    {
        $this->post('/cart', [
            'product_id' => 1,
            'quantity' => $this->qty,
            'description' => $this->description,
            'variants' => json_encode($this->variants),
            'design' => $this->design,
        ]);

        $cart = Cart::where('user_id', $this->user->id)->first();

        $this->assertEquals(1, $cart->cartItems->count());
    }

    /**
     * Test if user can add multiple product to cart
     *
     * return void
     */
    public function testIfUserCanAddMultipleProductToCart()
    {
        $this->post('/cart', [
            'product_id' => 1,
            'quantity' => $this->qty,
            'description' => $this->description,
            'variants' => json_encode($this->variants),
            'design' => $this->design,
        ]);

        $this->post('/cart', [
            'product_id' => 2,
            'quantity' => $this->qty,
            'description' => $this->description,
            'variants' => json_encode($this->variants),
            'design' => $this->design,
        ]);

        $cart = Cart::where('user_id', $this->user->id)->first();

        $this->assertEquals(2, $cart->cartItems->count());
    }

    /**
     * Test if user can update cart
     *
     * return void
     */
    // public function testIfUserCanUpdateCart()
    // {
    //     $cart = Cart::factory()
    //         ->has(CartItem::factory()
    //             ->count(1)
    //             ->state([
    //                 'qty' => 1,
    //             ]))->create([
    //             'user_id' => $this->user->id,
    //         ]);

    //     $this->patch('/cart/' . $cart->cartItems[0]['id'], [
    //         'qty' => $this->qty,
    //     ]);

    //     $this->assertEquals($cart->cartItems[0]['qty'], $this->qty);
    // }

    /**
     * Test if user can remove cart
     *
     * return void
     */
    // public function testIfUserCanRemoveCart()
    // {
    //     $cart = Cart::factory()->has(CartItem::factory()->count(1))->create([
    //         'user_id' => $this->user->id,
    //     ]);

    //     $this->delete('/cart/' .  $cart->cartItems[0]['id'])->assertRedirect('/cart');

    //     $this->assertEquals($cart->cartItems->count(), 0);
    // }
}
