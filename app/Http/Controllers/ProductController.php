<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
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
            'products' => new ProductCollection(Product::with(['prices', 'category'])->get()),
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
            'product' => new ProductResource($product->load(['variants', 'prices', 'category'])),
        ]);
    }
}
