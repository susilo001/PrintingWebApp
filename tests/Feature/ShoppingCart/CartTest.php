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

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->actingAs($this->user);
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
        $quantity = fake()->numberBetween(1, 10000);
        $projectName = fake()->sentence(3);
        $description = fake()->text();
        $variants = [
            [
                'name' => 'size',
                'value' => 's',
            ],
            [
                'name' => 'color',
                'value' => 'red',
            ],
        ];

        $this->withoutExceptionHandling();
        $this->post('/cart', [
            'product_id' => 1,
            'quantity' => $quantity,
            'project_name' => $projectName,
            'description' => $description,
            'variants' => $variants,
            'design' => UploadedFile::fake()->image('design.png'),
        ])->assertRedirect('/cart');
    }

    /**
     * Test if user can add multiple product to cart
     *
     * return void
     */
    public function testIfUserCanAddMultipleProductToCart()
    {
        $quantity = fake()->numberBetween(1, 10000);
        $projectName = fake()->sentence(3);
        $description = fake()->text();
        $variants = [
            [
                'name' => 'size',
                'value' => 's',
            ],
            [
                'name' => 'color',
                'value' => 'red',
            ],
        ];

        $this->withoutExceptionHandling();
        $this->post('/cart', [
            'product_id' => 1,
            'quantity' => $quantity,
            'project_name' => $projectName,
            'description' => $description,
            'variants' => $variants,
            'design' => UploadedFile::fake()->image('design.png'),
        ])->assertRedirect('/cart');

        $this->post('/cart', [
            'product_id' => 2,
            'quantity' => $quantity,
            'project_name' => $projectName,
            'description' => $description,
            'variants' => $variants,
            'design' => UploadedFile::fake()->image('design.png'),
        ])->assertRedirect('/cart');

        $this->assertEquals(2, Cart::content()->count());
    }

    /**
     * Test if user can update cart
     *
     * return void
     */
    public function testIfUserCanUpdateCart()
    {
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

        $qty = fake()->numberBetween(1, 10000);

        $this->put('/cart/'.Cart::content()->first()->rowId, [
            'rowId' => Cart::content()->first()->rowId,
            'quantity' => $qty,
        ])->assertRedirect('/cart');

        $this->assertEquals(Cart::content()->first()->qty, $qty);
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

        $this->delete('/cart/'.Cart::content()->first()->rowId)->assertRedirect('/cart');

        $this->assertEquals(Cart::content()->count(), 0);
    }

    /**
     * Test if user can checkout the cart using snap payment method
     *
     * return void
     */
    public function testIfUserCanCheckoutTheCartUsingSnapPaymentMethod()
    {
        $quantity = fake()->numberBetween(1, 10000);
        $projectName = fake()->sentence(3);
        $description = fake()->text();

        $this->post('/cart', [
            'product_id' => 2,
            'quantity' => $quantity,
            'project_name' => $projectName,
            'description' => $description,
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
            'design' => UploadedFile::fake()->image('design.png'),
        ]);

        $this->post('/cart', [
            'product_id' => 3,
            'quantity' => 1000,
            'project_name' => 'test',
            'description' => 'test',
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
            'design' => UploadedFile::fake()->image('design.png'),
        ]);

        $this->post('/cart/checkout', [
            'payment_method' => 'snap',
        ])->assertStatus(200);

        $this->assertDatabaseHas('orders', [
            'user_id' => $this->user->id,
            'status' => 'pending',
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
        $this->post('/cart', [
            'product_id' => 10,
            'quantity' => fake()->numberBetween(1, 10000),
            'project_name' => fake()->sentence(3),
            'description' => fake()->text(),
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
            'design' => UploadedFile::fake()->image('design.png'),
        ]);

        $this->post('/cart', [
            'product_id' => 3,
            'quantity' => fake()->numberBetween(1, 10000),
            'project_name' => fake()->sentence(3),
            'description' => fake()->text(),
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
            'design' => UploadedFile::fake()->image('design.png'),
        ]);

        $this->post('/cart/checkout', [
            'payment_method' => 'cash',
        ])->assertStatus(200);
    }
}
