<?php

namespace App\Http\Controllers\Cart;

use DebugBar\DebugBar;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Termwind\Components\Dd;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render('Cart', [
            'cart' => Cart::content(),
            'subtotal' => Cart::subtotal(),
            'total' => Cart::total(),
            'tax' => Cart::tax(),
            'count' => Cart::count(),
        ]);
    }

    public function store(Request $request)
    {
        $path = $request->file('design')->store('public/designs');

        $product = Product::find($request->product_id);

        $prices = $product->prices;

        if ($request->quantity > $prices->max('max_order')) {
            $price = $prices->last();
        } else {
            $price = $prices
                ->where('min_order', '<=', $request->quantity)
                ->where('max_order', '>=', $request->quantity)
                ->first();
        }

        foreach ($request->variants as $variant) {
            $variants[] = array(
                'name' => $variant['name'],
                'value' => $variant['value']
            );
        }

        if ($request->file('design')->isValid()) {
            Cart::add([
                'id' => Date::now()->timestamp,
                'qty' => $request->quantity,
                'name' => $product->name,
                'price' => $price->price,
                'weight' => 0,
                'options' => [
                    'design' => $path,
                    'variants' => $variants,
                ]
            ])->associate('App\Models\Product');
        }
        return redirect()->route('cart.index');
    }
}
