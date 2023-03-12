<?php

namespace App\Http\Controllers;

use App\Filters\Instances\ProductFilter;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Return the product list
     */
    public function index(ProductFilter $filter): \Inertia\Response
    {
        return Inertia::render('Product/Index', [
            'products' => new ProductCollection(Product::filter($filter)->with(['category'])->get()),
            'categories' => new CategoryCollection(Category::all()),
        ]);
    }

    /**
     * Show Product
     */
    public function show(Product $product): \Inertia\Response
    {
        return Inertia::render('Product/Show', [
            'product' => new ProductResource($product->load(['variants', 'prices', 'category'])),
        ]);
    }
}
