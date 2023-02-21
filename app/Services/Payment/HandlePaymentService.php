<?php

namespace App\Services\Payment;

use App\Models\OrderItem;
use Illuminate\Support\Facades\Date;
use Gloudemans\Shoppingcart\Facades\Cart;

class HandlePaymentService extends Midtrans
{
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
                'gross_amount' => (int) $data->total_amount,
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
                    'price' => $item->price,
                    'quantity' => $item->qty,
                ];
            })->toArray(),
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

        // Cart::destroy();

        return $transaction;
    }

    public function handle($data)
    {
        $transaction = $this->transform($data);

        $token = $this->getSnapToken($transaction);

        return $token;
    }
}
