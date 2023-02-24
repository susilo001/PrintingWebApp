<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
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
    public function __invoke(Request $request)
    {
        $order = Order::find($request->id);
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
            ->serialNumberFormat('{SERIES}{SEQUENCE}')
            ->buyer($customer)
            ->date(now()->subWeeks(3))
            ->dateFormat('m/d/Y')
            ->payUntilDays(14)
            ->filename($customer->name)
            ->addItems($items)
            ->logo(public_path('vendor/invoices/orbit-logo.jpg'))
            ->save('public');

        return response()->json([
            'invoice' => $invoice->url(),
        ]);
    }
}
