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
    /**
     * @var Product
     */
    protected Product $product;

    /**
     * @var Cart
     */
    protected Cart $cart;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Get price of product based on quantity ordered by user
     *
     * @param int $product_id
     * @param int $quantity
     * @return int
     */
    public function getPrice($product_id, $quantity)
    {
        $product = $this->product->find($product_id);

        $prices = $product->prices;

        if ($quantity > $prices->max('max_order')) {
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
     * @param Request $request
     * @return void
     */
    public function add($request)
    {
        $image = Storage::disk('public')->put('designs', $request->file('design'));

        $path = Storage::url($image);

        $price = $this->getPrice($request->product_id, $request->quantity);

        $product = $this->product->find($request->product_id);

        $cartItems =  Cart::add([
            'id' => Date::now()->timestamp,
            'qty' => $request->quantity,
            'name' => $product->name,
            'price' => $price,
            'weight' => 0,
            'options' => [
                'product_id' => $request->product_id,
                'project_name' => $request->project_name,
                'description' => $request->description,
                'design' => $path,
                'variants' => $request->variants,
            ]
        ])->associate(Product::class);

        if ($product->discount->active) {
            Cart::setDiscount($cartItems->rowId, $product->discount->discount_percentage);
        }

        if ($product->tax) {
            Cart::setTax($cartItems->rowId, $product->tax);
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
    public function checkout($request)
    {
        $order = Order::create([
            'user_id' => auth()->user()->id,
            'status' => 'pending',
            'subtotal' => Cart::priceTotal(),
            'tax' => Cart::tax(),
            'discount' => Cart::discount(),
            'total_amount' => Cart::total(),
        ]);

        foreach (Cart::content() as $item) {
            $order->orderItems()->create([
                'product_id' => $item->options->product_id,
                'name' => $item->options->project_name,
                'description' => $item->options->description,
                'image' => $item->options->design,
                'qty' => $item->qty,
                'price' => $item->price,
                'variants' => $item->options->variants,
                'discount' => $item->discount,
                'tax' => $item->tax,
            ]);
        }

        $order->paymentDetail()->create([
            'status' => 'pending',
            'gross_amount' => Cart::priceTotal(),
        ]);

        if ($request['payment_method'] == 'snap') {

            $data = $order->load(['orderItems', 'paymentDetail', 'user']);

            $payment = new HandlePaymentService();

            return $payment->handle($data);
        } else {
            Cart::destroy();
            return $order;
        }
    }
}
