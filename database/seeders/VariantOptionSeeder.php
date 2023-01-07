<?php

namespace Database\Seeders;

use App\Models\Variant;
use App\Models\VariantOption;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VariantOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $variant = Variant::all();

        foreach ($variant as $variant) {
            VariantOption::factory()->create([
                'variant_id' => $variant->id,
            ]);
        }
    }
}
