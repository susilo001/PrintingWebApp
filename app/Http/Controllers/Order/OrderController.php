<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderCollection;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
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
