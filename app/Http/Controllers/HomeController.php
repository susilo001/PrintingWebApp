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
            'products' => new ProductCollection(Product::with(['category:id,name', 'media', 'prices'])->get()),
            'testimonials' => new TestimonialCollection(Testimonial::with(['user', 'product:id,name', 'product.media'])
                ->where('is_approved', true)
                ->Where('is_featured', true)
                ->get()),
            'banners' => new BannerCollection(Banner::with(['media'])->where('status', true)->get()),
        ]);
    }

    /** 
     * Render about page
     * @return \Inertia\Response
     */
    public function about()
    {
        return Inertia::render('About');
    }

    /** 
     * Render contact page
     * @return \Inertia\Response
     */
    public function contact()
    {
        return Inertia::render('Contact');
    }
}
