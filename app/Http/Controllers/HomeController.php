<?php

namespace App\Http\Controllers;

use App\Http\Resources\BannerCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\TestimonialCollection;
use App\Models\Banner;
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
        return Inertia::render('Index', [
            'products' => new ProductCollection(Product::with(['category'])->get()),
            'testimonials' => new TestimonialCollection(Testimonial::with(['user', 'product', 'order'])
                ->where(function ($query) {
                    $query->where('is_approved', true)->Where('is_featured', true);
                })->get()),
            'banners' => new BannerCollection(Banner::where('status', true)->get()),
        ]);
    }
}
