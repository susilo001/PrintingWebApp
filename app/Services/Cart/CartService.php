<?php

namespace App\Services\Cart;

use App\Models\Product;
use App\Services\Payment\HandlePaymentService;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Storage;

class CartService
{
    protected Product $product;

    protected Cart $cart;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Get price of product based on quantity ordered by user
     *
     * @param  int  $product_id
     * @param  int  $quantity
     * @return int
     */
    public function getPrice($product_id, $quantity)
    {
        $product = $this->product->with('prices')->find($product_id);

        $prices = $product->prices;

        if ($quantity < $prices->min('min_order')) {
            throw new \Exception('The minimum order is ' . $prices->min('min_order') . ' pcs');
        } elseif ($quantity > $prices->max('max_order')) {
            $price = $prices->last();
        } else {
            $price = $prices
                ->where('min_order', '<=', $quantity)
                ->where('max_order', '>=', $quantity)
                ->first();
        }

        return $price->price;
    }

    /**
     * Add item to cart
     *
     * @param $data
     */
    public function add($data): void
    {
        $image = Storage::disk('public')->put('designs', $data['design']);

        $price = $this->getPrice($data['product_id'], $data['quantity']);

        $product = $this->product->find($data['product_id']);

        $cartItems = Cart::add([
            'id' => now()->timestamp,
            'qty' => $data['quantity'],
            'name' => $product->name,
            'price' => $price,
            'weight' => 0,
            'options' => [
                'product_id' => $data['product_id'],
                'description' => $data['description'],
                'design' => $image,
                'variants' => json_decode($data['variants']),
            ],
        ])->associate(Product::class);

        Cart::setTax($cartItems->rowId, $product->tax);

        $product->discount->active ? Cart::setDiscount($cartItems->rowId, $product->discount->discount_percentage) : null;
    }

    /**
     * Checkout the cart content
     *
     * @return void
     */
    public function checkout()
    {
        $payment = new HandlePaymentService();

        return $payment->handle();
    }
}
