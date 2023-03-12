<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\TestimonialCollection;
use App\Models\Category;
use App\Models\Product;
use App\Models\Testimonial;
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
            'products' => new ProductCollection(Product::with(['category'])->get()),
            'testimonials' => new TestimonialCollection(Testimonial::with(['user', 'product', 'order'])
                ->where(function ($query) {
                    $query->where('is_approved', true)->Where('is_featured', true);
                })->get()),
        ]);
    }
}
