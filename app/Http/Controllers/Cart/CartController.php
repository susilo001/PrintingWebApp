<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Services\Cart\CartService;
use App\Services\Payment\PaymentService;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    protected $cartService;

    protected $paymentService;

    public function __construct(CartService $cartService, PaymentService $paymentService)
    {
        $this->cartService = $cartService;
        $this->paymentService = $paymentService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Cart', [
            'cart' => Cart::content(),
            'weight' => Cart::weight(),
            'subtotal' => Cart::priceTotal(),
            'tax' => Cart::tax(),
            'discount' => Cart::discount(),
            'total' => Cart::total(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request): RedirectResponse
    {
        $this->cartService->add($request->validated());

        return redirect()->back()->with([
            'title' => 'Success',
            'message' => 'Item added to cart successfully',
            'status' => 'success',
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  string  $rowId
     */
    public function update(Request $request, $rowId): RedirectResponse
    {
        Cart::update($rowId, (int) $request->qty);

        return redirect()->route('cart.index')->with([
            'title' => 'Success',
            'message' => 'Item cart updated successfully',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $rowId
     */
    public function destroy($rowId): RedirectResponse
    {
        Cart::remove($rowId);

        return to_route('cart.index', '', 302)->with([
            'title' => 'Success',
            'message' => 'Item cart removed successfully',
            'status' => 'error',
        ]);
    }

    /**
     * Checkout the cart content
     */
    public function checkout()
    {
        $snapToken = $this->paymentService->requestPayment();

        return Inertia::render('Cart', [
            'cart' => Cart::content(),
            'weight' => Cart::weight(),
            'subtotal' => Cart::priceTotal(),
            'tax' => Cart::tax(),
            'discount' => Cart::discount(),
            'total' => Cart::total(),
            'token' => $snapToken,
        ]);
    }
}
