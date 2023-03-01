<?php

namespace App\Http\Controllers\Order;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\OrderCollection;
use App\Http\Requests\StoreOrderRequest;
use Gloudemans\Shoppingcart\Facades\Cart;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource belongs to user.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Order/index', [
            'orders' => new OrderCollection(Order::with('orderItems', 'paymentDetail')->where('user_id', auth()->user()->id)->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(StoreOrderRequest $request): RedirectResponse
    {
        $request->validated();

        $order = Order::create([
            'id' => (int) $request->order_id,
            'user_id' => auth()->user()->id,
            'status' => 'pending',
            'subtotal' => Cart::priceTotal(),
            'discount' => Cart::discount(),
            'tax' => Cart::tax(),
            'total_amount' => Cart::total(),
        ]);

        foreach (Cart::content() as $item) {
            $orderItem =  $order->orderItems()->create([
                'product_id' => $item->options->product_id,
                'name' => $item->name,
                'description' => $item->options->description,
                'qty' => $item->qty,
                'price' => $item->price,
                'variants' => $item->options->variants,
                'discount' => $item->discount,
                'tax' => $item->tax,
            ]);

            $path = storage_path('app/public/' . $item->options->design);

            $orderItem->addMedia($path)->toMediaCollection('designs');
        }

        $order->paymentDetail()->create([
            'status' => $request->status,
            'gross_amount' => (int) $request->gross_amount,
            'payment_type' => $request->payment_type,
            'transaction_id' => $request->transaction_id,
            'transaction_time' => $request->transaction_time,
        ]);

        Cart::destroy();

        return redirect()->route('order.index')->with('message', 'survey');
    }
}
