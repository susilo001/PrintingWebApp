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
                ['name' => 'Color', 'options' => [
                    ['value' => 'Black'],
                    ['value' => 'White'],
                    ['value' => 'Red'],
                    ['value' => 'Blue'],
                    ['value' => 'Green'],
                    ['value' => 'Yellow'],
                ]],
                ['name' => 'Material', 'options' => [
                    ['value' => 'Cotton'],
                    ['value' => 'Polyester'],
                    ['value' => 'Nylon'],
                    ['value' => 'Silk'],
                    ['value' => 'Wool'],
                    ['value' => 'Leather'],
                ]],
                ['name' => 'Pattern', 'options' => [
                    ['value' => 'Casual'],
                    ['value' => 'Formal'],
                    ['value' => 'Vintage'],
                    ['value' => 'Bohemian'],
                    ['value' => 'Sporty'],
                    ['value' => 'Gothic'],
                ]],
                ['name' => 'Margin', 'options' => [
                    ['value' => '10%'],
                    ['value' => '20%'],
                    ['value' => '30%'],
                    ['value' => '40%'],
                    ['value' => '50%'],
                    ['value' => '60%'],
                ]],
            )->create([
                'product_id' => $product->id,
            ]);
        }
    }
}
