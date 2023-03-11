<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Cart;
use App\Models\Price;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\Discount;

class CalculateCartValueTest extends TestCase
{
    use RefreshDatabase;

    protected $cart;

    protected $product;

    protected $discount;

    public function setUp(): void
    {
        parent::setUp();

        $this->discount = Discount::factory()->state([
            'discount_percentage' => 10,
            'active' => true,
        ])->create();

        $this->product = Product::factory()->state([
            'discount_id' => $this->discount->id,
            'tax' => 10,
        ])->has(Price::factory()->count(3)->forEachSequence(
            ['name' => '1 - 10', 'min_order' => 1, 'max_order' => 10, 'price' => 10],
            ['name' => '11 - 20', 'min_order' => 11, 'max_order' => 20, 'price' => 20],
            ['name' => '21 - 30', 'min_order' => 21, 'max_order' => 30, 'price' => 30],
        ))->create();

        $this->cart = Cart::factory()->has(CartItem::factory()->count(2)->forEachSequence(
            ['qty' => 5, 'product_id' => $this->product->id],
            ['qty' => 15, 'product_id' => $this->product->id],
        ))->create();
    }

    public function testGetSubtotal(): void
    {
        $subtotal = $this->cart->getSubtotal();

        $this->assertEquals(350, $subtotal);
    }

    public function testGetDiscount(): void
    {
        $discount = $this->cart->getDiscount();

        $this->assertEquals(35, $discount);
    }

    public function testGetTax(): void
    {
        $tax = $this->cart->getTax();

        $this->assertEquals(35, $tax);
    }

    public function testGetTotal(): void
    {
        $total = $this->cart->getTotal();

        $this->assertEquals(350, $total);
    }
}
