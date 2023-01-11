<?php

namespace App\Services\Payment;

class HandlePaymentService extends Midtrans
{
    protected $transaction;

    public function __construct($data)
    {
        $this->transaction = $this->transform($data);
    }

    public function handle()
    {
        $token = $this->getSnapToken($this->transaction);

        return $token;
    }
}
