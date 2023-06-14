<?php

use App\Http\Controllers\Api\Category\CategoryController;
use App\Http\Controllers\Api\Design\DesignController;
use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('design', [DesignController::class, 'index']);

Route::get('category', CategoryController::class);

Route::post('/payment/notification', [PaymentController::class, 'store']);
