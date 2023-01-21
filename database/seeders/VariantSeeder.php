<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Seeder;

class VariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();

        foreach ($products as $product) {
            Variant::factory()->count(6)->forEachSequence(
                ['name' => 'Size'],
                ['name' => 'Color'],
                ['name' => 'Material'],
                ['name' => 'Style'],
                ['name' => 'Pattern'],
                ['name' => 'Margin'],
            )->create([
                'product_id' => $product->id,
            ]);
        }
    }
}
