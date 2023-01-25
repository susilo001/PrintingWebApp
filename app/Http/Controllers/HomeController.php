<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\ProductCollection;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

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
            'categories' => new CategoryCollection(Category::with('products')->get()),
            'featuredProducts' => new ProductCollection(Product::with(['category', 'prices'])->where('featured', true)->get()),
        ]);
    }
}
