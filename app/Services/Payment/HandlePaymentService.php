<?php

namespace App\Services\Payment;

use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Date;

class HandlePaymentService extends Midtrans
{
    /**
     * Transform transaction to midtrans format
     *
     * @return array $transaction
     */
    public function transform()
    {
        $cart = Cart::content();

        $transaction = [
            'transaction_details' => [
                'order_id' => Date::now()->timestamp,
                'gross_amount' => (int) Cart::total(),
            ],

            'customer_details' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone_number,
            ],

            'item_details' => array_map(function ($item) {
                return [
                    'id' => (int) $item['options']['product_id'],
                    'name' => $item['name'],
                    'price' => $item['price'],
                    'quantity' => (int) $item['qty'],
                ];
            }, array_values($cart->toArray())),
        ];

        $additionalFee = [
            [
                'id' => 'F01',
                'name' => 'Fee',
                'price' => 0,
                'quantity' => 1,
            ],
            [
                'id' => 'T01',
                'name' => 'Tax',
                'price' => (int) Cart::tax(),
                'quantity' => 1,
            ],
            [
                'id' => 'D01',
                'name' => 'Discount',
                'price' => (int) Cart::discount(),
                'quantity' => 1,
            ],
        ];

        $transaction['item_details'] = array_merge($transaction['item_details'], $additionalFee);

        return $transaction;
    }

    public function handle()
    {
        $transaction = $this->transform();

        return $this->getSnapToken($transaction);
    }
}
