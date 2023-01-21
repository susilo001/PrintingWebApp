<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::all();
        $order = Order::all();

        foreach ($order as $order) {
            OrderItem::factory()->create([
                'order_id' => $order->id,
                'product_id' => $product->random()->id,
            ]);
        }
    }
}
