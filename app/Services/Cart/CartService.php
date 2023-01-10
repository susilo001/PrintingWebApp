<?php

namespace App\Services\Cart;

use App\Models\Product;
use Illuminate\Support\Facades\Date;
use Gloudemans\Shoppingcart\Facades\Cart;

class CartService
{
    protected $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Add item to cart
     *
     * @param Request $request
     * @return void
     */
    public function add($request)
    {
        $path = $request->file('design')->store('public/designs');

        $product = $this->product->find($request->product_id);

        $prices = $product->prices;

        if ($request->quantity > $prices->max('max_order')) {
            $price = $prices->last();
        } else {
            $price = $prices
                ->where('min_order', '<=', $request->quantity)
                ->where('max_order', '>=', $request->quantity)
                ->first();
        }

        if ($request->file('design')->isValid()) {
            Cart::add([
                'id' => Date::now()->timestamp,
                'qty' => $request->quantity,
                'name' => $product->name,
                'price' => $price->price,
                'weight' => 0,
                'options' => [
                    'design' => $path,
                    'variants' => $request->variants,
                ]
            ]);
        }
    }

    /**
     * Update item in cart
     *
     * @param Request $request
     * @return void
     */
    public function update($request)
    {
        Cart::update($request->rowId, $request->quantity);
    }

    /**
     * Remove item from cart
     *
     * @param Request $request
     * @return void
     */
    public function remove($request)
    {
        Cart::remove($request->rowId);
    }
}
