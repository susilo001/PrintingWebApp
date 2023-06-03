<?php

namespace App\Services\Payment;

use App\Models\Cart;

class PaymentService extends Midtrans
{
    protected $cart;

    public function __construct()
    {
        $this->cart = Cart::class;
    }

    public function requestPayment(): string
    {
        $userCart = $this->cart::where('user_id', auth()->user()->id)->first();
        $cartDiscount = $userCart->getDiscount();
        $cartTax = $userCart->getTax();
        $cartTotal = $userCart->getTotal();

        $transaction = [
            'transaction_details' => [
                'order_id' => 'OTC'.'-'.now()->timestamp.'-'.substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 5),
                'gross_amount' => (int) $cartTotal,
            ],

            'customer_details' => [
                'first_name' => auth()->user()->name,
                'last_name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone_number,
                'billing_address' => [
                    'first_name' => 'Budi',
                    'last_name' => 'Susanto',
                    'email' => 'budisusanto@example.com',
                    'phone' => '08123456789',
                    'address' => 'Sudirman No.12',
                    'city' => 'Jakarta',
                    'postal_code' => '12190',
                    'country_code' => 'IDN',
                ],
                'shipping_address' => [
                    'first_name' => 'Budi',
                    'last_name' => 'Susanto',
                    'email' => 'budisusanto@example.com',
                    'phone' => '08123456789',
                    'address' => 'Sudirman No.12',
                    'city' => 'Jakarta',
                    'postal_code' => '12190',
                    'country_code' => 'IDN',
                ],
            ],

            'item_details' => $userCart->cartItems->map(function ($item) {
                return [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => (int) $item->product->getPriceByOrderQuantity($item->qty),
                    'quantity' => $item->qty,
                ];
            })->toArray(),
        ];

        $additionalFee = [
            [
                'id' => 'D01',
                'name' => 'Discount',
                'price' => (int) -$cartDiscount,
                'quantity' => 1,
            ],
            [
                'id' => 'T01',
                'name' => 'Tax',
                'price' => (int) $cartTax,
                'quantity' => 1,
            ],

        ];

        $transaction['item_details'] = array_merge($transaction['item_details'], $additionalFee);

        return $this->getSnapToken($transaction);
    }
}
