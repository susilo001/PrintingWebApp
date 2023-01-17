<?php

namespace App\Http\Controllers\Order;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
            'orders' => Order::where('user_id', auth()->user()->id)->with('orderItems')->get(),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return Inertia::render('Order/show', [
            'order' => $order->load('orderItems'),
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
            'status' => 'On Progress',
        ]);

        $order->paymentDetail()->update([
            'status' => $request->status,
            'payment_type' => $request->payment_type,
        ]);

        return redirect()->route('order.index');
    }
}
