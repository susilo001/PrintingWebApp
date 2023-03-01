<?php

namespace Tests\Feature\ShoppingCart;

use App\Models\User;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $qty;

    protected $projectName;

    protected $description;

    protected $variants;

    protected $design;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->actingAs($this->user);

        $this->qty = fake()->numberBetween(1, 10000);
        $this->projectName = fake()->sentence(3);
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
        $this->design = UploadedFile::fake()->image('design.png');
    }

    /**
     * Test if user can see cart page
     *
     * return void
     */
    public function testIfUserCanSeeCartPage()
    {
        $this->get('/cart')->assertOk();
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
            'project_name' => $this->projectName,
            'description' => $this->description,
            'variants' => json_encode($this->variants),
            'design' => $this->design,
        ]);

        $this->assertEquals(1, Cart::content()->count());
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
            'project_name' => $this->projectName,
            'description' => $this->description,
            'variants' => json_encode($this->variants),
            'design' => $this->design,
        ]);

        $this->post('/cart', [
            'product_id' => 2,
            'quantity' => $this->qty,
            'project_name' => $this->projectName,
            'description' => $this->description,
            'variants' => json_encode($this->variants),
            'design' => $this->design,
        ]);

        $this->assertEquals(2, Cart::content()->count());
    }

    /**
     * Test if user can update cart
     *
     * return void
     */
    public function testIfUserCanUpdateCart()
    {
        $this->post('/cart', [
            'product_id' => 2,
            'quantity' => 1,
            'project_name' => $this->projectName,
            'description' => $this->description,
            'variants' => json_encode($this->variants),
            'design' => $this->design,
        ]);

        $this->patch('/cart/'.Cart::content()->first()->rowId, [
            'qty' => $this->qty,
        ]);

        $this->assertEquals(Cart::content()->first()->qty, $this->qty);
    }

    /**
     * Test if user can remove cart
     *
     * return void
     */
    public function testIfUserCanRemoveCart()
    {
        Cart::add([
            'id' => 1,
            'qty' => 1,
            'name' => 'Product',
            'price' => 100,
            'weight' => 0,
        ]);

        $this->delete('/cart/'.Cart::content()->first()->rowId)->assertRedirect('/cart');

        $this->assertEquals(Cart::content()->count(), 0);
    }
}
