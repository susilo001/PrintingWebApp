<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderCollection;
use App\Models\Order;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use LaravelDaily\Invoices\Classes\InvoiceItem;
use LaravelDaily\Invoices\Classes\Party;
use LaravelDaily\Invoices\Facades\Invoice;

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
     *
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
            $orderItem = $order->orderItems()->create([
                'product_id' => $item->options->product_id,
                'name' => $item->name,
                'description' => $item->options->description,
                'qty' => $item->qty,
                'price' => $item->price,
                'variants' => $item->options->variants,
                'discount' => $item->discount,
                'tax' => $item->tax,
            ]);

            $path = storage_path('app/public/'.$item->options->design);

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

    /**
     * Store order testimonial.
     */
    public function testimonial(Request $request, Order $order): RedirectResponse
    {
        $order->testimonial()->create([
            'user_id' => auth()->user()->id,
            'product_id' => $request->product_id,
            'testimonial' => $request->testimonial,
            'rating' => $request->rating,
            'is_approved' => false,
        ]);

        return redirect()->route('order.index')->with(['message' => 'Your testimonial has been submitted. Thank you!', 'status' => 'success']);
    }

    /**
     * Show order invoice.
     */
    public function invoice(Order $order): JsonResponse
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
            ->filename('INV'.$order->id)
            ->addItems($items)
            ->logo(public_path('vendor/invoices/logo.png'))
            ->notes('Thank you for your business!')
            ->save('public');

        return response()->json([
            'invoice' => $invoice->url(),
        ]);
    }
}
