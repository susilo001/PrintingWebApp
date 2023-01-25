<?php

namespace Tests\Unit;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * add a product
     *
     * @test
     */
    public function add_a_product()
    {
        $product = Product::factory()->create(
            [
                'images' => [
                    'images/asset/products/flayer.jpg',
                    'images/asset/products/flayer.jpg',
                    'images/asset/products/flayer.jpg',
                    'images/asset/products/flayer.jpg',
                ],
            ]
        );

        $this->assertDatabaseHas('products', [
            'name' => $product->name,
        ]);
    }
}
