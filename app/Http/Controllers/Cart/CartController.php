<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Services\Cart\CartService;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->cartService->add($request);

        to_route('cart.index', '', 302)->with('message', 'Item added to cart successfully');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $rowId)
    {
        Cart::update($rowId, (int) $request['data']['qty']);

        return redirect()->route('cart.index')->with('message', 'Cart updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($rowId)
    {
        Cart::remove($rowId);

        return to_route('cart.index', '', 302)->with('message', 'Item cart deleted successfully');
    }

    /**
     * Checkout the cart content
     *
     * @return void
     */
    public function checkout()
    {
        $response = $this->cartService->checkout();

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
