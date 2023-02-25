<?php

use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Design\DesignController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Invoice\InvoiceController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\AddressController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
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

    Route::get('/design', [DesignController::class, 'index'])->name('design.index');
    Route::post('/design', [DesignController::class, 'store'])->name('design.store');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::match(['put', 'patch'], '/cart/{cart}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

    Route::get('/order', [OrderController::class, 'index'])->name('order.index');
    Route::post('/order', [OrderController::class, 'store'])->name('order.store');

    Route::post('/invoice', InvoiceController::class)->name('invoice');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::match(['put', 'patch'], '/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/profile/address', [AddressController::class, 'store'])->name('address.store');
    Route::match(['put', 'patch'], '/profile/address/{address}', [AddressController::class, 'update'])->name('address.update');
    Route::delete('/profile/address/{address}', [AddressController::class, 'destroy'])->name('address.destroy');
});

require __DIR__ . '/auth.php';
