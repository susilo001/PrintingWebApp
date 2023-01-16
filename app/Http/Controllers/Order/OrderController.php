<?php

namespace App\Http\Controllers\Order;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Order/index', [
            'orders' => Order::where('user_id', auth()->user()->id)->with('orderItems')->get(),
        ]);
    }
}
