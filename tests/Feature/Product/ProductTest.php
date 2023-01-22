<?php

namespace Tests\Feature\Product;

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
        $response = $this->get('/products');

        $response->assertStatus(200);
    }

    /**
     * Test the product show
     *
     * @return void
     */
    public function testProductShow()
    {
        $response = $this->get('/product/1');

        $response->assertStatus(200);
    }
}
