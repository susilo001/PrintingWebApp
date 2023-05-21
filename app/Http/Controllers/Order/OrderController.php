<?php

namespace App\Http\Controllers\Order;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\OrderCollection;
use App\Http\Requests\StoreOrderRequest;
use Illuminate\Http\Response;
use LaravelDaily\Invoices\Classes\Party;
use LaravelDaily\Invoices\Facades\Invoice;
use LaravelDaily\Invoices\Classes\InvoiceItem;

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

        $cart = Cart::where('user_id', auth()->id())->first();

        $order = Order::create([
            'id' => (int) $request->order_id,
            'user_id' => auth()->user()->id,
            'status' => 'pending',
            'subtotal' => $cart->getSubtotal(),
            'discount' => $cart->getDiscount(),
            'tax' => $cart->getTax(),
            'total_amount' => $cart->getTotal(),
        ]);

        $order->paymentDetail()->create([
            'status' => $request->status,
            'gross_amount' => (int) $request->gross_amount,
            'payment_type' => $request->payment_type,
            'transaction_id' => $request->transaction_id,
            'transaction_time' => $request->transaction_time,
        ]);

        foreach ($cart->cartItems as $item) {
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

        $cart->cartItems()->delete();

        return redirect()->route('order.index')->with([
            'title' => 'Success',
            'message' => 'Your order has been placed. Thank you!',
            'status' => 'success',
        ]);
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
