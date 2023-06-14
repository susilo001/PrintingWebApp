<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderCollection;
use App\Models\Order;
use App\Services\OrderService;
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
            'orders' => new OrderCollection(Order::with('orderItems.media', 'paymentDetail', 'orderItems.product:id,name')->where('user_id', auth()->user()->id)->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(StoreOrderRequest $request, OrderService $orderService): RedirectResponse
    {
        try {
            $request->validated();

            $orderService->createOrder($request);

            return redirect()->route('order.index')->with([
                'title' => 'Success',
                'message' => 'Your order has been placed. Thank you!',
                'status' => 'success',
            ]);
        } catch (\Exception $e) {
            return redirect()->route('order.index')->with([
                'title' => 'Error',
                'message' => $e->getMessage(),
                'status' => 'error',
            ]);
        }
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

        return redirect()->route('order.index')->with([
            'title' => 'Success',
            'message' => 'Your testimonial has been submitted. Thank you!',
            'status' => 'success',
        ]);
    }

    /**
     * Show order invoice.
     */
    public function invoice(Order $order): RedirectResponse
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
            ->status($payment->status)
            ->buyer($customer)
            ->addItems($items)
            ->logo(public_path('vendor/invoices/logo.png'))
            ->notes('Thank you for your business!')
            ->filename('INV' . $order->id)
            ->save('public');

        return redirect()->route('order.index')->with([
            'invoice' => $invoice->url(),
        ]);
    }
}
