<?php

namespace Database\Seeders;

use App\Models\Price;
use App\Models\Product;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::all();

        foreach ($product as $product) {
            Price::factory()->count(6)->forEachSequence(
                ['min_order' => 1, 'max_order' => 10],
                ['min_order' => 11, 'max_order' => 50],
                ['min_order' => 51, 'max_order' => 100],
                ['min_order' => 101, 'max_order' => 300],
                ['min_order' => 301, 'max_order' => 500],
                ['min_order' => 501, 'max_order' => 1000],
            )->create([
                'product_id' => $product->id,
            ]);
        }
    }
}
