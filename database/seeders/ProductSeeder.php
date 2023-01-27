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
        $other = Category::where('slug', 'others')->first();

        Product::factory()->count(10)->create([
            'category_id' => $other->id,
            'images' => [
                'asset/products/invitation.jpg',
            ],
        ]);

        $undagan = Category::where('slug', 'undangan')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $undagan->id,
                'name' => 'Undangan',
                'slug' => 'undangan',
                'images' => [
                    'asset/products/invitation.jpg',
                ],
            ],
            [
                'category_id' => $undagan->id,
                'name' => 'Undangan v2',
                'slug' => 'undangan-v2',
                'images' => [
                    'asset/products/invitation.jpg',
                ],
            ],
            [
                'category_id' => $undagan->id,
                'name' => 'Undangan v3',
                'slug' => 'undangan-v3',
                'images' => [
                    'asset/products/invitation.jpg',
                ],
            ],
            [
                'category_id' => $undagan->id,
                'name' => 'Undangan v4',
                'slug' => 'undangan-v4',
                'images' => [
                    'asset/products/invitation.jpg',
                ],
            ],
            [
                'category_id' => $undagan->id,
                'name' => 'Undangan v5',
                'slug' => 'undangan-v5',
                'images' => [
                    'asset/products/invitation.jpg',
                ],
            ],
        )->create();

        $calendar = Category::where('slug', 'calendar')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $calendar->id,
                'name' => 'Kalender',
                'slug' => 'kalender',
                'images' => [
                    'asset/products/calendar.jpg',
                ],
            ],
            [
                'category_id' => $calendar->id,
                'name' => 'Kalender v2',
                'slug' => 'kalender-v2',
                'images' => [
                    'asset/products/calendar.jpg',
                ],
            ],
            [
                'category_id' => $calendar->id,
                'name' => 'Kalender v3',
                'slug' => 'kalender-v3',
                'images' => [
                    'asset/products/calendar.jpg',
                ],
            ],
            [
                'category_id' => $calendar->id,
                'name' => 'Kalender v4',
                'slug' => 'kalender-v4',
                'images' => [
                    'asset/products/calendar.jpg',
                ],
            ],
            [
                'category_id' => $calendar->id,
                'name' => 'Kalender v5',
                'slug' => 'kalender-v5',
                'images' => [
                    'asset/products/calendar.jpg',
                ],
            ],
        )->create();

        $a3 = Category::where('slug', 'a3')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $a3->id,
                'name' => 'A3',
                'slug' => 'a3',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a3->id,
                'name' => 'A3 v2',
                'slug' => 'a3-v2',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a3->id,
                'name' => 'A3 v3',
                'slug' => 'a3-v3',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a3->id,
                'name' => 'A3 v4',
                'slug' => 'a3-v4',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a3->id,
                'name' => 'A3 v5',
                'slug' => 'a3-v5',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
        )->create();

        $a4 = Category::where('slug', 'a4')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $a4->id,
                'name' => 'A4',
                'slug' => 'a4',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a4->id,
                'name' => 'A4 v2',
                'slug' => 'a4-v2',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a4->id,
                'name' => 'A4 v3',
                'slug' => 'a4-v3',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a4->id,
                'name' => 'A4 v4',
                'slug' => 'a4-v4',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
            [
                'category_id' => $a4->id,
                'name' => 'A4 v5',
                'slug' => 'a4-v5',
                'images' => [
                    'asset/products/flayer.jpg',
                ],
            ],
        )->create();

        $packages = Category::where('slug', 'packages')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $packages->id,
                'name' => 'Kotak Makanan Bento',
                'slug' => 'kotak-makanan-bento',
                'images' => [
                    'asset/products/Box1.png',
                    'asset/products/Box2.png',
                    'asset/products/Box3.png',
                    'asset/products/Box4.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Kotak Makanan Bento v2',
                'slug' => 'kotak-makanan-bento-v2',
                'images' => [
                    'asset/products/Bento-Box1.png',
                    'asset/products/Bento-Box2.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Box Makanan',
                'slug' => 'box-makanan',
                'images' => [
                    'asset/products/Food-Box1.png',
                    'asset/products/Food-Box2.png',
                    'asset/products/Food-Box3.png',
                    'asset/products/Food-Box4.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Rounded Box Makanan',
                'slug' => 'rounded-box-makanan',
                'images' => [
                    'asset/products/Rounded-Bento1.png',
                    'asset/products/Rounded-Bento2.png',
                    'asset/products/Rounded-Bento3.png',
                ],
            ],
            [
                'category_id' => $packages->id,
                'name' => 'Box Cartoon Makanan',
                'slug' => 'box-cartoon-makanan',
                'images' => [
                    'asset/products/Cartoon-Box1.png',
                    'asset/products/Cartoon-Box2.png',
                    'asset/products/Cartoon-Box3.png',
                    'asset/products/Cartoon-Box4.png',
                ],
            ],
        )->create();

        $books = Category::where('slug', 'books')->first();

        Product::factory()->count(5)->forEachSequence(
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
                'category_id' => $books->id,
                'name' => 'Cover Buku v2',
                'slug' => 'cover-buku-v2',
                'images' => [
                    'asset/products/book-cover-1.png',
                    'asset/products/book-cover-2.png',
                    'asset/products/book-cover-3.png',
                ],
            ],
            [
                'category_id' => $books->id,
                'name' => 'Cover Buku v3',
                'slug' => 'cover-buku-v3',
                'images' => [
                    'asset/products/book-cover-1.png',
                    'asset/products/book-cover-2.png',
                    'asset/products/book-cover-3.png',
                ],
            ],
            [
                'category_id' => $books->id,
                'name' => 'Cover Buku v4',
                'slug' => 'cover-buku-v4',
                'images' => [
                    'asset/products/book-cover-1.png',
                    'asset/products/book-cover-2.png',
                    'asset/products/book-cover-3.png',
                ],
            ],
            [
                'category_id' => $books->id,
                'name' => 'Cover Buku v5',
                'slug' => 'cover-buku-v5',
                'images' => [
                    'asset/products/book-cover-1.png',
                    'asset/products/book-cover-2.png',
                    'asset/products/book-cover-3.png',
                ],
            ],
        )->create();

        $posters = Category::where('slug', 'poster')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $posters->id,
                'name' => 'Poster',
                'slug' => 'poster',
                'images' => [
                    'asset/products/poster.jpg',
                ],
            ],
            [
                'category_id' => $posters->id,
                'name' => 'Poster v2',
                'slug' => 'poster-v2',
                'images' => [
                    'asset/products/poster.jpg',
                ],
            ],
            [
                'category_id' => $posters->id,
                'name' => 'Poster v3',
                'slug' => 'poster-v3',
                'images' => [
                    'asset/products/poster.jpg',
                ],
            ],
            [
                'category_id' => $posters->id,
                'name' => 'Poster v4',
                'slug' => 'poster-v4',
                'images' => [
                    'asset/products/poster.jpg',
                ],
            ],
            [
                'category_id' => $posters->id,
                'name' => 'Poster v5',
                'slug' => 'poster-v5',
                'images' => [
                    'asset/products/poster.jpg',
                ],
            ],
        )->create();

        $brochure = Category::where('slug', 'brochure')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $brochure->id,
                'name' => 'Brochure',
                'slug' => 'brochure',
                'images' => [
                    'asset/products/brochure.jpg',
                ],
            ],
            [
                'category_id' => $brochure->id,
                'name' => 'Brochure v2',
                'slug' => 'brochure-v2',
                'images' => [
                    'asset/products/brochure.jpg',
                ],
            ],
            [
                'category_id' => $brochure->id,
                'name' => 'Brochure v3',
                'slug' => 'brochure-v3',
                'images' => [
                    'asset/products/brochure.jpg',
                ],
            ],
            [
                'category_id' => $brochure->id,
                'name' => 'Brochure v4',
                'slug' => 'brochure-v4',
                'images' => [
                    'asset/products/brochure.jpg',
                ],
            ],
            [
                'category_id' => $brochure->id,
                'name' => 'Brochure v5',
                'slug' => 'brochure-v5',
                'images' => [
                    'asset/products/brochure.jpg',
                ],
            ],
        )->create();

        $sticker = Category::where('slug', 'sticker')->first();

        Product::factory()->count(5)->forEachSequence(
            [
                'category_id' => $sticker->id,
                'name' => 'Sticker',
                'slug' => 'sticker',
                'images' => [
                    'asset/products/sticker.jpg',
                ],
            ],
            [
                'category_id' => $sticker->id,
                'name' => 'Sticker v2',
                'slug' => 'sticker-v2',
                'images' => [
                    'asset/products/sticker.jpg',
                ],
            ],
            [
                'category_id' => $sticker->id,
                'name' => 'Sticker v3',
                'slug' => 'sticker-v3',
                'images' => [
                    'asset/products/sticker.jpg',
                ],
            ],
            [
                'category_id' => $sticker->id,
                'name' => 'Sticker v4',
                'slug' => 'sticker-v4',
                'images' => [
                    'asset/products/sticker.jpg',
                ],
            ],
            [
                'category_id' => $sticker->id,
                'name' => 'Sticker v5',
                'slug' => 'sticker-v5',
                'images' => [
                    'asset/products/sticker.jpg',
                ],
            ],
        )->create();
    }
}
