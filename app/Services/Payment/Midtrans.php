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

    private function mapOrderStatus($status, $fraud, $type)
    {
        switch ($status) {
            case 'capture':
                if ($type == 'credit_card') {
                    return ($fraud == 'challenge') ? 'pending' : 'paid';
                }
                break;

            case 'settlement':
                return 'paid';

            case 'pending':
                return 'pending';

            case 'deny':
            case 'expire':
            case 'cancel':
                return 'failure';
        }

        return '';
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

        $orderStatus = $this->mapOrderStatus($status, $fraud, $type);

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
