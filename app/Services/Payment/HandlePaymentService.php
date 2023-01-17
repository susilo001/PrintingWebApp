<?php

namespace App\Services\Payment;

use App\Models\OrderItem;
use App\Services\Payment\Midtrans;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Date;

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

        $transaction = array(
            'transaction_details' => array(
                'order_id' => $data->id . Date::now()->timestamp,
                'gross_amount' => (int) $data->total_amount,
            ),

            'customer_details' => array(
                'name' => $data->user->name,
                'email' => $data->user->email,
                'phone' => $data->user->phone_number,
            ),

            'item_details' => $orderItems->map(function ($item) {
                return array(
                    'id' => $item->id,
                    'name' => $item->product->name,
                    'price' => $item->price,
                    'quantity' => $item->qty,
                );
            })->toArray(),
        );

        $additionalFee = array(
            array(
                'id' => 'F01',
                'name' => 'Fee',
                'price' => 0,
                'quantity' => 1,
            ),
            array(
                'id' => 'T01',
                'name' => 'Tax',
                'price' => Cart::tax(),
                'quantity' => 1,
            ),
            array(
                'id' => 'D01',
                'name' => 'Discount',
                'price' => Cart::discount(),
                'quantity' => 1,
            ),
        );

        $transaction['item_details'] = array_merge($transaction['item_details'], $additionalFee);

        Cart::destroy();

        return $transaction;
    }

    public function handle($data)
    {
        $transaction = $this->transform($data);

        $token = $this->getSnapToken($transaction);

        return $token;
    }
}
