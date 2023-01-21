<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use LaravelDaily\Invoices\Classes\InvoiceItem;
use LaravelDaily\Invoices\Classes\Party;
use LaravelDaily\Invoices\Invoice;

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
        $items = $order->orderItems()->get();
        $payment = $order->paymentDetail()->get();

        $customer = new Party(
            [
                'name' => $order->user->name,
                'custom_fields' => [
                    'address' => $order->user->address,
                    'phone' => $order->user->phone,
                ],
            ]
        );

        $items = collect($items)->map(function ($item) {
            return (new InvoiceItem())
                ->title($item->product->name)
                ->pricePerUnit($item->price)
                ->quantity($item->qty)
                ->discountByPercent($item->discount);
        });

        $invoice = Invoice::make('Invoice')
            ->series('INV')
            ->status('Paid')
            ->sequence(1)
            ->serialNumberFormat('{SEQUENCE}/{SERIES}')
            ->buyer($customer)
            ->date(now()->subWeeks(3))
            ->dateFormat('m/d/Y')
            ->payUntilDays(14)
            ->filename($customer->name)
            ->addItems($items)
            ->logo(public_path('vendor/invoices/sample-logo.png'))
            // You can additionally save generated invoice to configured disk
            ->save('public');

        return Inertia::render('Order/index', [
            'invoice' => $invoice->url(),
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
