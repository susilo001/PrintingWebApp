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

    public function createOrder($data)
    {
        $userId = auth()->user()->id;
        $userCart = $this->cart->getUserCart();
        $shippingAddress = Address::where('user_id', $userId)->where('is_active', true)->firstOrFail();

        $order = Order::create([
            'user_id' => $userId,
            'status' => 'pending',
            'subtotal' => $userCart->getSubtotal(),
            'discount' => $userCart->getDiscount(),
            'tax' => $userCart->getTax(),
            'total_amount' => $userCart->getTotal(),
        ]);

        $shippingData = $shippingAddress->toArray();
        $shippingData['courier'] = [$data['courier']];

        $order->shipping()->create($shippingData);

        foreach ($userCart->cartItems as $item) {
            $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
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

        return $order;
    }
}
