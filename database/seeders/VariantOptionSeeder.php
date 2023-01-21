<?php

namespace Database\Seeders;

use App\Models\Variant;
use App\Models\VariantOption;
use Illuminate\Database\Seeder;

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

        $variantSize = Variant::where('name', 'Size')->get();
        $variantColor = Variant::where('name', 'Color')->get();
        $variantMaterial = Variant::where('name', 'Material')->get();
        $variantPattern = Variant::where('name', 'Pattern')->get();
        $variantStyle = Variant::where('name', 'Style')->get();
        $variantMargin = Variant::where('name', 'Margin')->get();

        foreach ($variantSize as $size) {
            VariantOption::factory()->forEachSequence(
                ['value' => 'S'],
                ['value' => 'M'],
                ['value' => 'L'],
                ['value' => 'XL'],
                ['value' => 'XXL'],
                ['value' => 'XXXL']
            )->count(6)->create([
                'variant_id' => $size->id,
            ]);
        }

        foreach ($variantColor as $color) {
            VariantOption::factory()->forEachSequence(
                ['value' => 'Black'],
                ['value' => 'White'],
                ['value' => 'Red'],
                ['value' => 'Blue'],
                ['value' => 'Green'],
                ['value' => 'Yellow']
            )->count(6)->create([
                'variant_id' => $color->id,
            ]);
        }

        foreach ($variantMaterial as $material) {
            VariantOption::factory()->forEachSequence(
                ['value' => 'Cotton'],
                ['value' => 'Polyester'],
                ['value' => 'Nylon'],
                ['value' => 'Silk'],
                ['value' => 'Wool'],
                ['value' => 'Leather']
            )->count(6)->create([
                'variant_id' => $material->id,
            ]);
        }

        foreach ($variantPattern as $pattern) {
            VariantOption::factory()->forEachSequence(
                ['value' => 'Solid'],
                ['value' => 'Striped'],
                ['value' => 'Printed'],
                ['value' => 'Plaid'],
                ['value' => 'Checked'],
                ['value' => 'Floral']
            )->count(6)->create([
                'variant_id' => $pattern->id,
            ]);
        }

        foreach ($variantStyle as $style) {
            VariantOption::factory()->forEachSequence(
                ['value' => 'Casual'],
                ['value' => 'Formal'],
                ['value' => 'Vintage'],
                ['value' => 'Bohemian'],
                ['value' => 'Sporty'],
                ['value' => 'Gothic']
            )->count(6)->create([
                'variant_id' => $style->id,
            ]);
        }

        foreach ($variantMargin as $margin) {
            VariantOption::factory()->forEachSequence(
                ['value' => '10%'],
                ['value' => '20%'],
                ['value' => '30%'],
                ['value' => '40%'],
                ['value' => '50%'],
                ['value' => '60%']
            )->count(6)->create([
                'variant_id' => $margin->id,
            ]);
        }
    }
}
