<?php

namespace App\Services\Payment;

use App\Models\OrderItem;
use App\Models\Product;
use Midtrans\Config;
use Midtrans\Snap;

abstract class Midtrans
{
    protected $clientKey;
    protected $serverKey;
    protected $isProduction;
    protected $isSanitized;
    protected $is3ds;

    public function __construct()
    {
        $this->clientKey = config('services.midtrans.client_key');
        $this->serverKey = config('services.midtrans.server_key');
        $this->isProduction = config('services.midtrans.is_production');
        $this->isSanitized = config('services.midtrans.is_sanitized');
        $this->is3ds = config('services.midtrans.is_3ds');
    }

    /**
     * Configure midtrans 
     * 
     * @return void
     */

    public function configure()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.is_sanitized');
        Config::$is3ds = config('services.midtrans.is_3ds');
    }

    /**
     * Transform transaction to midtrans format
     * 
     * @return array $transaction
     */

    public function transform($data)
    {
        $orderItems = OrderItem::where('order_id', $data['id'])->get();

        $transaction = [
            'transaction_details' => [
                'order_id' => $data->id,
                'gross_amount' => $data->total_amount,
            ],

            'customer_details' => [
                'name' => $data->user->name,
                'email' => $data->user->email,
                'phone' => $data->user->phone_number,
            ],

            'item_details' => $orderItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->product->name,
                    'price' => $item->price + $item->tax - $item->discount,
                    'quantity' => $item->qty,
                ];
            })->toArray(),
        ];

        return $transaction;
    }

    public function getSnapToken($transaction)
    {
        $this->configure();

        return Snap::getSnapToken($transaction);
    }
}
