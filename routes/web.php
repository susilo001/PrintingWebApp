<?php

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Order\OrderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Public Route
 */

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'categories' => Category::with('products')->get(),
        'featuredProducts' => Product::with(['category', 'prices'])->where('featured', true)->get(),
    ]);
})->name('home');

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index')->name('product.index');
    Route::get('/product/{product}', 'show')->name('product.show');
});



/**
 * Authenticated Route
 */

Route::group(['middleware' => ['auth', 'verified']], function () {

    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

    Route::resource('cart', CartController::class)->except('show')->names([
        'index' => 'cart.index',
        'store' => 'cart.store',
        'update' => 'cart.update',
        'destroy' => 'cart.destroy',
    ]);

    Route::resource('order', OrderController::class)->names([
        'index' => 'order.index',
        'show' => 'order.show',
        'update' => 'order.update',
    ]);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/design', function () {
        return Inertia::render('Design');
    })->name('design');
});


require __DIR__ . '/auth.php';
