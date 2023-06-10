<?php

namespace App\Services;

use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;

class OrderService
{
    protected $cart;

    public function __construct()
    {
        $this->cart = new Cart;
    }

    public function createOrder()
    {
        $userCart = $this->cart->getUserCart();

        $order = Order::create([
            'user_id' => auth()->user()->id,
            'status' => 'pending',
            'subtotal' => $userCart->getSubtotal(),
            'discount' => $userCart->getDiscount(),
            'tax' => $userCart->getTax(),
            'total_amount' => $userCart->getTotal(),
        ]);

        $shippingAddress = Address::where('user_id', auth()->user()->id)->where('is_active', true)->first();

        $order->shipping()->create($shippingAddress->toArray());

        foreach ($userCart->cartItems as $item) {
            $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'name' => $item->name,
                'description' => $item->description,
                'qty' => $item->qty,
                'price' => $item->product->getPriceByOrderQuantity($item->qty),
                'variants' => $item->variants,
                'discount' => $item->discount,
                'tax' => $item->tax,
            ]);

            $cartItemMedia = $item->getMedia('cart')->first();

            $cartItemMedia->copy($orderItem, 'designs');
        }

        $userCart->cartItems()->delete();

        return $order;
    }
}
