<?php

namespace App\Services\Payment;

use App\Models\Order;

class PaymentService extends Midtrans
{
    public function requestPayment(Order $order): string
    {
        $transaction = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => $order->total_amount,
            ],

            'callbacks' => [
                'finish' => 'http://orbit.test/order',
            ],

            'customer_details' => [
                'first_name' => auth()->user()->name,
                'last_name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone_number,
                'shipping_address' => [
                    'first_name' => $order->shipping->first_name,
                    'last_name' => $order->shipping->last_name,
                    'email' => $order->shipping->email,
                    'phone' => $order->shipping->phone,
                    'address' => $order->shipping->address,
                    'city' => $order->shipping->city,
                    'postal_code' => $order->shipping->postal_code,
                    'country_code' => 'IDN',
                ],
            ],

            'item_details' => $order->orderItems->map(function ($item) {
                return [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => $item->price,
                    'quantity' => $item->qty,
                ];
            })->toArray(),
        ];

        $additionalFee = [
            [
                'id' => 'D01',
                'name' => 'Discount',
                'price' => -$order->discount,
                'quantity' => 1,
            ],
            [
                'id' => 'T01',
                'name' => 'Tax',
                'price' => $order->tax,
                'quantity' => 1,
            ],

        ];

        $transaction['item_details'] = array_merge($transaction['item_details'], $additionalFee);

        return $this->getSnapToken($transaction);
    }

    public function notification($request)
    {
        $data = $this->handleNotification($request);

        $order = Order::findOrfail($data['order']);

        $order->update([
            'status' => $data['order_status'],
        ]);

        $order->paymentDetail()->create([
            'status' => $data['status'],
            'payment_type' => $data['type'],
            'gross_amount' => $data['amount'],
            'transaction_id' => $data['transaction_id'],
            'transaction_time' => $data['transaction_time'],
        ]);

        return $order;
    }
}
