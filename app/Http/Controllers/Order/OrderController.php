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
    public function invoice(Order $order): RedirectResponse
    {
        $order->load([
            'orderItems.product',
            'paymentDetail',
            'user.addresses'
        ]);
    
        $items = $order->orderItems;
    
        $customer = new Party([
            'name' => $order->user->name,
            'custom_fields' => [
                'address' => $order->user->addresses->first(),
                'phone' => $order->user->phone_number,
            ],
        ]);
    
        $items = $items->map(function ($item) {
            return (new InvoiceItem())
                ->title($item->product->name)
                ->pricePerUnit($item->price)
                ->quantity($item->qty);
        });
    
        $invoice = Invoice::make('Invoice')
            ->status($order->paymentDetail->status)
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
