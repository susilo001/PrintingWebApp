<?php

namespace App\Http\Controllers\Cart;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\CartItem;
use Illuminate\Http\Request;
use App\Services\CartService;
use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Http\Resources\CartResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Services\Payment\PaymentService;

class CartController extends Controller
{
    protected $paymentService;

    protected $cartService;

    public function __construct()
    {
        $this->paymentService = new PaymentService();
        $this->cartService = new CartService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Cart', [
            'cart' => new CartResource(Cart::with('cartItems')->where('user_id', auth()->id())->first()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request): RedirectResponse
    {
        $request->validated();

        $this->cartService->addToCart($request);

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
    public function update(UpdateCartRequest $request, CartItem $cartItem): RedirectResponse
    {
        $cartItem->update($request->validated());

        if ($request->hasFile('design') && $request->file('design')->isValid()) {
            $cartItem->addMediaFromRequest($request->design)->toMediaCollection('cart');
        }

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
    public function destroy(CartItem $cartItem): RedirectResponse
    {
        $cartItem->delete();

        return to_route('cart.index', '', 302)->with([
            'title' => 'Success',
            'message' => 'Item cart removed successfully',
            'status' => 'error',
        ]);
    }

    /**
     * Shipment page
     * 
     * @return \Inertia\Response
     */
    public function shipment(Cart $cart)
    {
        return Inertia::render('Checkout', [
            'cart' => new CartResource($cart->getUserCart()),
        ]);
    }

    /**
     * Checkout the cart content
     */
    public function checkout(CheckoutRequest $request, Cart $cart): \Inertia\Response
    {
        $snapToken = $this->cartService->checkout($request->validated());

        return Inertia::render('Checkout', [
            'cart' => new CartResource($cart->getUserCart()),
            'token' => $snapToken,
        ]);
    }
}
