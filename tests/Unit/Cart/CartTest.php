<?php

namespace Tests\Unit\Cart;

use App\Models\Product;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use App\Services\Cart\CartService;
use Illuminate\Foundation\Testing\RefreshDatabase;


class CartTest extends TestCase
{
    use RefreshDatabase;

    protected $cartService;

    public function setUp(): void
    {
        parent::setUp();

        $this->cartService = new CartService(new Product);
    }

    /**
     * if quantity is greater than max_order, return price of last price
     * 
     * @return void
     */
    public function testGetPriceIfQuantityIsGreaterThanMaxOrder()
    {
        $product = Product::factory()->create();

        $product->prices()->create([
            'name' => '1 - 10',
            'min_order' => 1,
            'max_order' => 10,
            'price' => 1000,
        ]);

        $product->prices()->create([
            'name' => '11 - 20',
            'min_order' => 11,
            'max_order' => 20,
            'price' => 2000,
        ]);

        $price = $this->cartService->getPrice($product->id, 1000);

        $this->assertEquals(2000, $price);
    }


    /**
     * if quantity is between min_order and max_order, return price of first price
     * 
     * @return void
     */
    public function testGetPriceIfQuantityIsBetweenMinOrderAndMaxOrder()
    {
        $product = Product::factory()->create();

        $product->prices()->create([
            'name' => '1 - 10',
            'min_order' => 1,
            'max_order' => 10,
            'price' => 1000,
        ]);

        $product->prices()->create([
            'name' => '11 - 20',
            'min_order' => 11,
            'max_order' => 20,
            'price' => 2000,
        ]);

        $price = $this->cartService->getPrice($product->id, 5);

        $this->assertEquals(1000, $price);
    }
}
