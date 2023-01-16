<?php

namespace Tests\Feature\ShoppingCart;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddCartTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if user can add product to cart
     * 
     * return void
     */
    public function testIfUserCanAddProductToCart()
    {
        $user = User::factory()->create();
        $quantity = fake()->numberBetween(1, 10000);
        $projectName = fake()->sentence(3);
        $description = fake()->text();
        $variants = [
            [
                'name' => 'size',
                'value' => 's'
            ],
            [
                'name' => 'color',
                'value' => 'red'
            ]
        ];

        $this->withoutExceptionHandling();
        $this->actingAs($user)->post('/cart', [
            'product_id' => 1,
            'quantity' => $quantity,
            'project_name' => $projectName,
            'description' => $description,
            'variants' => $variants,
            'design' => UploadedFile::fake()->image('design.png')
        ])->assertRedirect('/cart');
    }

    /**
     * Test if user can add multiple product to cart
     * 
     * return void
     */
    public function testIfUserCanAddMultipleProductToCart()
    {
        $user = User::factory()->create();

        $this->withoutExceptionHandling();
        $this->actingAs($user)->post('/cart', [
            'product_id' => 1,
            'quantity' => 100,
            'project_name' => 'test 1',
            'description' => 'test 1',
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
        ])->assertRedirect('/cart');

        $this->actingAs($user)->post('/cart', [
            'product_id' => 1,
            'quantity' => 10,
            'project_name' => 'test 2',
            'description' => 'test 2',
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
        ])->assertRedirect('/cart');

        $this->assertEquals(2, Cart::content()->count());
    }
}
