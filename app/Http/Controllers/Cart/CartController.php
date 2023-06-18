<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Services\CartService;
use App\Services\Payment\PaymentService;
use App\Services\RajaOngkirService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'cart' => new CartResource(Cart::with('cartItems.media', 'cartItems.product.prices', 'cartItems.product.discount')->where('user_id', auth()->id())->first()),
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
    public function shipment(Request $request, RajaOngkirService $rajaOngkirService)
    {
        $user = $request->user();
        $cart = Cart::with(['cartItems.product', 'cartItems.media'])
            ->where('user_id', $user->id)
            ->first();

        $address = $user->getActiveAddress();
        $destination = $address->city_id;
        $weight = $cart->getWeight();

        $jne = [
            'destination' => $destination,
            'weight' => $weight,
            'courier' => 'jne',
        ];

        $tiki = [
            'destination' => $destination,
            'weight' => $weight,
            'courier' => 'tiki',
        ];

        $pos = [
            'destination' => $destination,
            'weight' => $weight,
            'courier' => 'pos',
        ];

        $jneCourier = $rajaOngkirService->cost($jne);
        $tikiCourier = $rajaOngkirService->cost($tiki);
        $posCourier = $rajaOngkirService->cost($pos);
        $couriers = array_merge($jneCourier, $tikiCourier, $posCourier);

        return Inertia::render('Checkout', [
            'cart' => new CartResource($cart),
            'address' => $address,
            'couriers' => $couriers,
        ]);
    }

    /**
     * Checkout the cart content
     */
    public function checkout(Request $request, Cart $cart): \Inertia\Response
    {
        $snapToken = $this->cartService->checkout($request->all());

        return Inertia::render('Checkout', [
            'cart' => new CartResource($cart->getUserCart()),
            'addresses' => $request->user()->addresses()->get(),
            'token' => $snapToken,
        ]);
    }
}
