<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $calendar = Category::where('slug', 'calendar')->first();
        $packages = Category::where('slug', 'packages')->first();
        $books = Category::where('slug', 'books')->first();
        $stationery = Category::where('slug', 'stationery')->first();

        $products = [
            [
                'category_id' => $stationery->id,
                'name' => 'Name Card',
                'slug' => 'name-card',
                'images' => [
                    'asset/products/name-card.png',
                    'asset/products/name-card.png',
                ],
            ],
            [
                'category_id' => $stationery->id,
                'name' => 'Undangan',
                'slug' => 'undangan',
                'images' => [
                    'asset/products/invitation.png',
                    'asset/products/invitation.png',
                ],
            ],
            [
                'category_id' => $calendar->id,
                'name' => 'Kalender',
                'slug' => 'kalender',
                'images' => [
                    'asset/products/calendar.png',
                ],
            ],
            [
                'category_id' => $stationery->id,
                'name' => 'Stationery A3',
                'slug' => 'statinery-a3',
                'images' => [
                    'asset/products/flayer.png',
                ],
            ],
            [
                'category_id' => $stationery->id,
                'name' => 'Stationery A4',
                'slug' => 'Stationery-a4',
                'images' => [
                    'asset/products/flayer.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Kotak Bento',
                'slug' => 'kotak-bento',
                'images' => [
                    'asset/products/box-1.png',
                    'asset/products/box-2.png',
                    'asset/products/box-3.png',
                    'asset/products/box-4.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Box Makanan',
                'slug' => 'box-makanan',
                'images' => [
                    'asset/products/food-box-packages-1.png',
                    'asset/products/food-box-packages-2.png',
                    'asset/products/food-box-packages-3.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Rounded Box',
                'slug' => 'rounded-box',
                'images' => [
                    'asset/products/rounded-bento-packages-1.png',
                    'asset/products/rounded-bento-packages-2.png',
                    'asset/products/rounded-bento-packages-3.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Box Cartoon',
                'slug' => 'box-cartoon',
                'images' => [
                    'asset/products/cartoon-box-packages-1.png',
                    'asset/products/cartoon-box-packages-2.png',
                    'asset/products/cartoon-box-packages-3.png',
                    'asset/products/cartoon-box-packages-4.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Honeycomb Box',
                'slug' => 'honeycomb-box',
                'images' => [
                    'asset/products/honey-comb-packages-1.png',
                    'asset/products/honey-comb-packages-2.png',
                    'asset/products/honey-comb-packages-3.png',
                    'asset/products/honey-comb-packages-4.png',
                ],
            ],
            [
                'category_id' => $books->id,
                'name' => 'Cover Buku',
                'slug' => 'cover-buku',
                'images' => [
                    'asset/products/book-cover-1.png',
                    'asset/products/book-cover-2.png',
                    'asset/products/book-cover-3.png',
                ],
            ],
            [
                'category_id' => $stationery->id,
                'name' => 'Poster',
                'slug' => 'poster',
                'images' => [
                    'asset/products/poster.png',
                ],
            ],
            [
                'category_id' => $stationery->id,
                'name' => 'Brochure',
                'slug' => 'brochure',
                'images' => [
                    'asset/products/brochure.png',
                ],
            ],
            [
                'category_id' => $stationery->id,
                'name' => 'Sticker',
                'slug' => 'sticker',
                'images' => [
                    'asset/products/sticker.png',
                ],
            ],
        ];

        foreach ($products as $product) {
            $item = Product::factory()->make([
                'category_id' => $product['category_id'],
                'name' => $product['name'],
                'slug' => $product['slug'],
            ]);

            $item->save();
            foreach ($product['images'] as $image) {
                $path = storage_path('app/public/'.$image);
                $item->addMedia($path)
                    ->preservingOriginal()
                    ->withResponsiveImages()
                    ->toMediaCollection('products');
            }
        }
    }
}
