<?php

namespace Tests\Feature\ShoppingCart;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
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
        $this->withoutExceptionHandling();
        $this->actingAs($user)->post('/cart', [
            'product_id' => 1,
            'quantity' => fake()->numberBetween(1, 10000),
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
    }
}
