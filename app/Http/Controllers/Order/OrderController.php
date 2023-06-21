<?php

namespace App\Http\Controllers\Order;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderCollection;
use LaravelDaily\Invoices\Invoice;
use LaravelDaily\Invoices\Classes\Party;
use LaravelDaily\Invoices\Classes\InvoiceItem;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource belongs to user.
     */
    public function index(): \Inertia\Response
    {
        $userId = auth()->user()->id;
        $orders = Order::with('orderItems.media', 'paymentDetail', 'orderItems.product:id,name')
            ->where('user_id', $userId)
            ->get();

        return Inertia::render('Order/index', [
            'orders' => new OrderCollection($orders),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        return to_route('cart.index', '', 303)->with([
            'title' => 'Error',
            'message' => 'Payment failed. Please try again.',
            'status' => 'error',
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
    public function invoice(Order $order)
    {
        $order->load([
            'orderItems.product',
            'paymentDetail',
            'user.addresses',
        ]);

        $items = $order->orderItems;

        $address = $order->user->addresses->where('is_active', true)->first();

        $customer = new Party([
            'name' => $order->user->name,
            'custom_fields' => [
                'address' => $address->address . ' ' . $address->city . ' ' . $address->province . ' ' . $address->postal_code,
                'phone' => $order->user->phone_number,
            ],
        ]);


        $items = $items->map(function ($item) {
            return (new InvoiceItem())
                ->title($item->product->name)
                ->pricePerUnit($item->price)
                ->quantity($item->qty);
        });

        $invoice = Invoice::make()
            ->filename('INV' . $order->id)
            ->logo(public_path('vendor/invoices/logo.png'))
            ->status($order->paymentDetail->status)
            ->buyer($customer)
            ->addItems($items)
            ->taxableAmount($order->tax)
            ->totalDiscount($order->discount)
            ->notes('Terima kasih atas pembelianya')
            ->save('public');

        return redirect()->route('order.index')->with([
            'invoice' => $invoice->url(),
        ]);
    }
}
