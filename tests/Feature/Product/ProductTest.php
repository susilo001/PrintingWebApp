<?php

namespace Tests\Feature\Product;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the product list
     *
     * @return void
     */
    public function testProductList()
    {
        $this->get('/products')->assertStatus(200);
    }

    /**
     * Test the product show
     *
     * @return void
     */
    public function testProductShow()
    {
        $product = Product::factory()->create();

        $this->get('/product/'.$product->id)->assertSee($product->name);
    }
}
