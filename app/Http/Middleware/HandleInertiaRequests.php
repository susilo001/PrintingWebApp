<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $sharedData = parent::share($request);

        $sharedData['auth'] = [
            'user' => $request->user(),
        ];

        $sharedData['cartCount'] = fn () => Cart::withCount('cartItems')->where('user_id', auth()->id())->value('cart_items_count') ?? 0;

        $sharedData['flash'] = [
            'title' => $request->session()->get('title'),
            'message' => $request->session()->get('message'),
            'status' => $request->session()->get('status'),
            'invoice' => $request->session()->get('invoice'),
            'token' => $request->session()->get('token'),
        ];

        $sharedData['ziggy'] = fn () => array_merge((new Ziggy)->toArray(), [
            'location' => $request->url(),
        ]);

        return $sharedData;
    }
}
