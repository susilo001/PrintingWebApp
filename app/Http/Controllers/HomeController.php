<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the application Home Page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Welcome', [
            'categories' => Category::with('products')->get(),
            'featuredProducts' => Product::with(['category', 'prices'])->where('featured', true)->get(),
        ]);
    }
}
