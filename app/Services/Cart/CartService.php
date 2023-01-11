<?php

namespace App\Services\Cart;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;
use Gloudemans\Shoppingcart\Facades\Cart;
use App\Services\Payment\HandlePaymentService;

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
        $image = Storage::disk('public')->put('designs', $request->file('design'));

        $path = Storage::url($image);

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

            $cartItems =  Cart::add([
                'id' => Date::now()->timestamp,
                'qty' => $request->quantity,
                'name' => $product->name,
                'price' => $price->price,
                'weight' => 0,
                'options' => [
                    'product_id' => $request->product_id,
                    'project_name' => $request->project_name,
                    'description' => $request->description,
                    'design' => $path,
                    'variants' => $request->variants,
                ]
            ]);

            $cartItems->associate(Product::class);
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

    /**
     * Checkout the cart content
     * 
     * @return void
     */
    public function checkout()
    {
        $cart = Cart::content();

        $order = Order::create([
            'user_id' => auth()->user()->id,
            'total_amount' => (float) Cart::total(),
            'status' => 'pending',
        ]);

        foreach ($cart as $item) {
            $order->orderItems()->create([
                'product_id' => $item->options->product_id,
                'name' => $item->options->project_name,
                'description' => $item->options->description,
                'image' => $item->options->design,
                'qty' => $item->qty,
                'price' => $item->price,
                'variants' => json_encode($item->variants),
                'subtotal' => $item->subtotal,
                'discount' => 0,
                'tax' => $item->tax,
                'total' => $item->total,
            ]);
        }

        $order->paymentDetail()->create([
            'status' => 'pending',
            'gross_amount' => (float) Cart::total(),
        ]);

        Cart::destroy();

        $payment = new HandlePaymentService($order->load(['orderItems', 'paymentDetail', 'user']));

        $payment->handle();
    }
}
