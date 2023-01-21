<?php

use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Design\DesignController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Invoice\InvoiceController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

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
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index')->name('product.index');
    Route::get('/product/{product}', 'show')->name('product.show');
});

/**
 * Authenticated Route
 */
Route::group(['middleware' => 'auth'], function () {
    Route::resource('design', DesignController::class)->names([
        'index' => 'design.index',
        'store' => 'design.store',
    ]);

    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

    Route::resource('cart', CartController::class)->except('show')->names([
        'index' => 'cart.index',
        'store' => 'cart.store',
        'update' => 'cart.update',
        'destroy' => 'cart.destroy',
    ]);

    Route::resource('order', OrderController::class)->names([
        'index' => 'order.index',
        // 'show' => 'order.show',
        'update' => 'order.update',
    ]);

    Route::post('/invoice', InvoiceController::class)->name('invoice');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
