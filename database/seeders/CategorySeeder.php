<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::factory()->count(10)->forEachSequence(
            ['name' => 'A3', 'slug' => 'a3'],
            ['name' => 'A4', 'slug' => 'a4'],
            ['name' => 'Sticker', 'slug' => 'sticker'],
            ['name' => 'Calendar', 'slug' => 'calendar'],
            ['name' => 'Books', 'slug' => 'books'],
            ['name' => 'Packages', 'slug' => 'packages'],
            ['name' => 'Others', 'slug' => 'others'],
            ['name' => 'Undangan', 'slug' => 'undangan'],
            ['name' => 'Brosur', 'slug' => 'brosur'],
            ['name' => 'Paper Bag', 'slug' => 'paper-bag'],
        )->create();
    }
}
