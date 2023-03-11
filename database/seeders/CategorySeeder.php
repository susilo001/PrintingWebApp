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
            ['name' => 'Calendar', 'slug' => 'calendar'],
            ['name' => 'Books', 'slug' => 'books'],
            ['name' => 'Packages', 'slug' => 'packages'],
            ['name' => 'Stationery', 'slug' => 'stationery']
        )->create();
    }
}
