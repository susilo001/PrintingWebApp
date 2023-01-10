<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    /**
     * Return the product list
     * 
     * 
     */
    public function index()
    {
        return view('products.index');
    }

    /**
     * Show Product
     * 
     * @param Product $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        return Inertia::render('Product', [
            'product' => $product->load(['variants', 'variants.options', 'prices', 'category'])
        ]);
    }
}
