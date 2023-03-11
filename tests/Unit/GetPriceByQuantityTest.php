<?php

namespace Tests\Unit;

use App\Models\Product;
use Tests\TestCase;

class GetPriceByQuantityTest extends TestCase
{
    protected $product;

    public function setUp(): void
    {
        parent::setUp();

        $this->product = Product::factory()->create();
    }

    /**
     * if quantity is greater than max_order, return price of last price
     */
    public function testGetPriceIfQuantityIsGreaterThanMaxOrder(): void
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

        $price = $this->product->getPriceByOrderQuantity(15);

        $this->assertEquals(2000, $price);
    }

    /**
     * if quantity is equal to min_order, return price of first price
     */
    public function testGetPriceIfQuantityIsEqualToMinOrder(): void
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

        $price = $this->product->getPriceByOrderQuantity(5);

        $this->assertEquals(1000, $price);
    }

    /**
     * throw Exception if quantity is less than min_order  'The minimum order is 5 pcs'
     */
    public function testThrowExceptionIfQtyIsLessThanMinOrder(): void
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

        $this->product->getPriceByOrderQuantity(4);
    }
}
