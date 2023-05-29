<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request, Cart $cart)
    {
        $request->validate([
            'transaction_id' => 'required|string',
            'transaction_time' => 'required|string',
            'status_message' => 'required|string',
            'status_code' => 'required|string',
            'payment_type' => 'required|string',
            'order_id' => 'required|string',
            'gross_amount' => 'required|string',
        ]);

        $userCart = $cart->getUserCart();

        $order = Order::create([
            'id' => (int) $request->order_id,
            'user_id' => auth()->user()->id,
            'status' => 'pending',
            'subtotal' => $userCart->getSubtotal(),
            'discount' => $userCart->getDiscount(),
            'tax' => $userCart->getTax(),
            'total_amount' => $userCart->getTotal(),
        ]);

        $order->paymentDetail()->create([
            'status' => $request->status,
            'gross_amount' => (int) $request->gross_amount,
            'payment_type' => $request->payment_type,
            'transaction_id' => $request->transaction_id,
            'transaction_time' => $request->transaction_time,
        ]);

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

            $cartItemMedia->move($orderItem, 'designs');
        }

        $userCart->cartItems()->delete();

        return redirect()->route('order.index')->with([
            'title' => 'Success',
            'message' => 'Your order has been placed. Thank you!',
            'status' => 'success',
        ]);
    }
}
