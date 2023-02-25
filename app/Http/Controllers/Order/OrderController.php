<?php

namespace App\Http\Controllers\Order;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderCollection;
use Gloudemans\Shoppingcart\Facades\Cart;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource belongs to user.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Order/index', [
            'orders' => new OrderCollection(Order::where('user_id', auth()->user()->id)->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = Order::create([
            'id' => (int) $request->data['order_id'],
            'user_id' => auth()->user()->id,
            'status' => 'pending',
            'subtotal' => Cart::priceTotal(),
            'tax' => Cart::tax(),
            'discount' => Cart::discount(),
            'total_amount' => Cart::total(),
        ]);

        foreach (Cart::content() as $item) {
            $orderItem =  $order->orderItems()->create([
                'product_id' => $item->options->product_id,
                'name' => $item->options->project_name,
                'description' => $item->options->description,
                'qty' => $item->qty,
                'price' => $item->price,
                'variants' => $item->options->variants,
                'discount' => $item->discount,
                'tax' => $item->tax,
            ]);

            $path = storage_path('app/public/' . $item->options->design);

            $orderItem->addMedia($path)->preservingOriginal() // preserve the original file for testing
                ->toMediaCollection('designs');
        }

        $order->paymentDetail()->create([
            'status' => $request->data['status'],
            'gross_amount' => (int) $request->data['gross_amount'],
            'payment_type' => $request->data['payment_type'],
            'transaction_id' => $request->data['transaction_id'],
            'transaction_time' => $request->data['transaction_time'],
        ]);

        return redirect()->route('order.index')->with('message', 'survey');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $order->update([
            'status' => 'Proccessing',
        ]);

        $order->paymentDetail()->update([
            'status' => $request->status,
            'payment_type' => $request->payment_type,
        ]);

        return redirect()->route('order.index')->with('message', 'survey');
    }
}
