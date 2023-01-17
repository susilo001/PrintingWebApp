<?php

namespace App\Http\Controllers\Cart;

use Inertia\Inertia;
use DebugBar\DebugBar;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Services\Cart\CartService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Date;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index()
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

    public function store(Request $request)
    {
        $this->cartService->add($request);

        return redirect()->route('cart.index');
    }

    public function update(Request $request)
    {
        Cart::update($request->rowId, $request->quantity);

        return redirect()->route('cart.index');
    }

    public function destroy($rowId)
    {
        Cart::remove($rowId);

        return redirect()->route('cart.index');
    }

    /**
     * Checkout the cart content
     * 
     * @return void
     */
    public function checkout(Request $request)
    {
        $response = $this->cartService->checkout($request->all());

        return Inertia::render('Cart', [
            'cart' => Cart::content(),
            'weight' => Cart::weight(),
            'priceTotal' => Cart::priceTotal(),
            'subtotal' => Cart::subtotal(),
            'tax' => Cart::tax(),
            'discount' => Cart::discount(),
            'total' => Cart::total(),
            'token' => $response,
        ]);
    }
}
