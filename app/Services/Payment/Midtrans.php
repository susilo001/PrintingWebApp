<?php

namespace App\Services\Payment;

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
}
