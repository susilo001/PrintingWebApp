<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use LaravelDaily\Invoices\Classes\InvoiceItem;
use LaravelDaily\Invoices\Classes\Party;
use LaravelDaily\Invoices\Invoice;

class InvoiceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Order $order)
    {
        $items = $order->orderItems()->get();
        $payment = $order->paymentDetail()->first();

        $customer = new Party(
            [
                'name' => $order->user->name,
                'custom_fields' => [
                    'address' => $order->user->addresses->first()->address,
                    'phone' => $order->user->phone_number,
                ],
            ]
        );

        $items = collect($items)->map(function ($item) {
            return (new InvoiceItem())
                ->title($item->product->name)
                ->pricePerUnit($item->price)
                ->quantity($item->qty);
        });

        $invoice = Invoice::make('Invoice')
            ->series('INV')
            ->status($payment->status)
            ->sequence(1)
            ->serialNumberFormat('{SERIES}{SEQUENCE}')
            ->buyer($customer)
            ->date(now()->subWeeks(3))
            ->dateFormat('m/d/Y')
            ->filename('INV' . $order->id)
            ->addItems($items)
            ->logo(public_path('vendor/invoices/logo.png'))
            ->notes('Thank you for your business!')
            ->save('public');

        return response()->json([
            'invoice' => $invoice->url(),
        ]);
    }
}
