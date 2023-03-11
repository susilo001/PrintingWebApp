<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $products = Product::all();
        $orders = Order::all();

        foreach ($orders as $order) {
            Testimonial::factory()->count(1)->create([
                'order_id' => $order->id,
                'user_id' => $users->random()->id,
                'product_id' => $products->random()->id,
            ]);
        }
    }
}
