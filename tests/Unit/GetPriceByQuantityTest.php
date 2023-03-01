<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Product;
use App\Services\Cart\CartService;
use Database\Seeders\CategorySeeder;

class GetPriceByQuantityTest extends TestCase
{
    protected $cartService;

    protected $product;

    public function setUp(): void
    {
        parent::setUp();

        $this->cartService = new CartService(new Product);

        $this->seed(CategorySeeder::class);

        $this->product = Product::factory()->create();
    }

    /**
     * if quantity is greater than max_order, return price of last price
     *
     * @return void
     */
    public function testGetPriceIfQuantityIsGreaterThanMaxOrder()
    {
        $this->product->prices()->create([
            'name' => '1 - 10',
            'min_order' => 1,
            'max_order' => 10,
            'price' => 1000,
        ]);

        $this->product->prices()->create([
            'name' => '11 - 20',
            'min_order' => 11,
            'max_order' => 20,
            'price' => 2000,
        ]);

        $price = $this->cartService->getPrice($this->product->id, 1000);

        $this->assertEquals(2000, $price);
    }

    /**
     * if quantity is less than min_order, return error message 'The minimum order is 5 pcs'
     */
    public function testGetPriceIfQuantityIsLessThanMinOrder(): void
    {
        $this->product->prices()->create([
            'name' => '1 - 10',
            'min_order' => 5,
            'max_order' => 10,
            'price' => 1000,
        ]);

        $this->product->prices()->create([
            'name' => '11 - 20',
            'min_order' => 11,
            'max_order' => 20,
            'price' => 2000,
        ]);

        $this->expectException(\Exception::class);

        $this->expectExceptionMessage('The minimum order is 5 pcs');

        $this->cartService->getPrice($this->product->id, 4);
    }
}
