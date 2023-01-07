<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\PaymentDetail;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PaymentDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $order = Order::all();

        foreach ($order as $order) {
            PaymentDetail::factory()->create([
                'order_id' => $order->id,
            ]);
        }
    }
}
