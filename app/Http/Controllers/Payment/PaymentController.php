<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentNotificationRequest;
use App\Services\Payment\PaymentService;

class PaymentController extends Controller
{
    public function store(PaymentNotificationRequest $request, paymentService $paymentService)
    {
        $paymentService->notification($request->validated());

        return response()->json([
            'message' => 'Payment notification has been processed',
        ]);
    }
}
