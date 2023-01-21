<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Return the product list
     */
    public function index()
    {
        return Inertia::render('Product/Index', [
            'products' => Product::with(['variants', 'variants.options', 'prices', 'category'])->get(),
        ]);
    }

    /**
     * Show Product
     *
     * @param  Product  $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        return Inertia::render('Product/Show', [
            'product' => $product->load(['variants', 'variants.options', 'prices', 'category']),
        ]);
    }
}
