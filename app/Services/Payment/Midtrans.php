<?php

namespace App\Services\Payment;

use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;

abstract class Midtrans
{
    /**
     * Configure midtrans
     */
    private function configure()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.is_sanitized');
        Config::$is3ds = config('services.midtrans.is_3ds');
    }

    public function getSnapToken($transaction)
    {
        $this->configure();

        return Snap::getSnapToken($transaction);
    }

    public function handleNotification($request)
    {
        $this->configure();

        $notification = new Notification();

        $transactionId = $notification->transaction_id;
        $transactionTime = $notification->transaction_time;
        $status = $notification->transaction_status;
        $fraud = $notification->fraud_status;
        $type = $notification->payment_type;
        $order = $notification->order_id;
        $amount = $notification->gross_amount;

        $orderStatus = '';

        switch ($status) {
            case 'capture':
                if ($type == 'credit_card') {
                    $orderStatus = ($fraud == 'challenge') ? 'pending' : 'success';
                }
                break;

            case 'settlement':
                $orderStatus = 'success';
                break;

            case 'pending':
                $orderStatus = 'pending';
                break;

            case 'deny':
            case 'expire':
            case 'cancel':
                $orderStatus = 'failure';
                break;
        }

        return [
            'status' => $status,
            'type' => $type,
            'fraud' => $fraud,
            'order' => $order,
            'amount' => $amount,
            'order_status' => $orderStatus,
            'transaction_id' => $transactionId,
            'transaction_time' => $transactionTime,
        ];
    }
}
