<?php

namespace App\Http\Controllers\Cart;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\Cart\CartService;
use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StoreCartRequest;
use App\Models\CartItem;
use App\Models\Product;
use App\Services\Payment\PaymentService;

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
            'cart' => new CartResource(Cart::with('cartItems')->where('user_id', auth()->id())->first()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request): RedirectResponse
    {
        $request->validated();

        if (Cart::where('user_id', auth()->id())->first()) {
            $cart = Cart::where('user_id', auth()->id())->first();
        } else {
            $cart = Cart::create([
                'user_id' => auth()->user()->id,
            ]);
        }

        $product = Product::findOrfail($request->product_id);

        $cartItem = $cart->cartItems()->create([
            'product_id' => $request->product_id,
            'qty' => $request->quantity,
            'name' => $product->name,
            'description' => $request->description,
            'variants' => json_decode($request->variants),
            'discount' => $product->discount->active ? $product->discount->discount_percentage : 0,
            'tax' => $product->tax,
        ]);

        if ($request->hasFile('design') && $request->file('design')->isValid()) {
            $cartItem->addMediaFromRequest('design')->toMediaCollection('cart');
        }

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
    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        $cartItem->update($request->all());

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
     * Checkout the cart content
     */
    public function checkout()
    {
        $snapToken = $this->paymentService->requestPayment();

        return Inertia::render('Cart', [
            'cart' => new CartResource(Cart::with('cartItems')->where('user_id', auth()->id())->first()),
            'token' => $snapToken,
        ]);
    }
}
